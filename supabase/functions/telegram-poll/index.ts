// Polls Telegram getUpdates, handles WhatsApp linking flow, stores messages
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';
const MAX_RUNTIME_MS = 55_000;
const MIN_REMAINING_MS = 5_000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ------------ Types ------------
type Step = 'name' | 'phone' | 'governorate' | 'awaiting_code' | 'completed';

// ------------ Helpers ------------
const normalizePhone = (raw: string): string | null => {
  const digits = raw.replace(/[^\d]/g, '');
  if (digits.length < 10 || digits.length > 15) return null;
  // Egyptian local: 01xxxxxxxxx (11 digits) => 201xxxxxxxxx
  if (digits.startsWith('0') && digits.length === 11) return '2' + digits;
  if (digits.startsWith('20')) return digits;
  return digits;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const startTime = Date.now();
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const WHATSAPP_SERVER_URL = Deno.env.get('WHATSAPP_SERVER_URL');
  const WHATSAPP_SERVER_SECRET = Deno.env.get('WHATSAPP_SERVER_SECRET');

  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'Missing env vars' }), { status: 500, headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: state, error: stateErr } = await supabase
    .from('telegram_bot_state').select('update_offset').eq('id', 1).single();
  if (stateErr) return new Response(JSON.stringify({ error: stateErr.message }), { status: 500, headers: corsHeaders });

  let currentOffset: number = state.update_offset;
  let totalProcessed = 0;

  const { data: commands } = await supabase.from('bot_commands').select('command,response').eq('enabled', true);
  const cmdMap = new Map<string, string>();
  (commands ?? []).forEach((c: any) => cmdMap.set(c.command.toLowerCase(), c.response));

  // --- Telegram senders ---
  const tgFetch = (path: string, body: any) => fetch(`${GATEWAY_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': TELEGRAM_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const sendMessage = async (chat_id: number, text: string, reply_markup?: any) => {
    const body: any = { chat_id, text, parse_mode: 'HTML' };
    if (reply_markup) body.reply_markup = reply_markup;
    const r = await tgFetch('sendMessage', body);
    const d = await r.json();
    if (r.ok) {
      await supabase.from('telegram_messages').insert({ chat_id, direction: 'out', text });
    }
    return r.ok;
  };

  // --- WhatsApp server client ---
  const waRequest = async (path: string, payload: any) => {
    if (!WHATSAPP_SERVER_URL) {
      return { ok: false, error: 'WhatsApp server not configured yet. Admin must set WHATSAPP_SERVER_URL.' };
    }
    try {
      const r = await fetch(`${WHATSAPP_SERVER_URL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(WHATSAPP_SERVER_SECRET ? { 'X-Api-Key': WHATSAPP_SERVER_SECRET } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      return { ok: r.ok, status: r.status, data };
    } catch (e: any) {
      return { ok: false, error: e?.message ?? String(e) };
    }
  };

  // --- Keyboards ---
  const mainMenu = {
    keyboard: [
      [{ text: '🔗 ربط بوت واتساب' }],
      [{ text: '📊 حالة الربط' }, { text: '❌ فصل الجهاز' }],
      [{ text: 'ℹ️ مساعدة' }],
    ],
    resize_keyboard: true,
  };

  const cancelMenu = {
    keyboard: [[{ text: '🚫 إلغاء' }]],
    resize_keyboard: true,
    one_time_keyboard: false,
  };

  const govButtons = async () => {
    const { data } = await supabase.from('governorates').select('name_ar').order('sort_order');
    const rows: { text: string }[][] = [];
    (data ?? []).forEach((g: any, i: number) => {
      const col = i % 3;
      if (col === 0) rows.push([]);
      rows[rows.length - 1].push({ text: g.name_ar });
    });
    rows.push([{ text: '🚫 إلغاء' }]);
    return { keyboard: rows, resize_keyboard: true };
  };

  // --- Conversation handler ---
  const handleMessage = async (chat: any, text: string) => {
    const chatId = chat.id;
    const t = text.trim();

    // Cancel from anywhere
    if (t === '🚫 إلغاء' || t.toLowerCase() === '/cancel') {
      await supabase.from('whatsapp_link_sessions').delete().eq('telegram_chat_id', chatId);
      await sendMessage(chatId, '❎ تم الإلغاء. اختر من القائمة:', mainMenu);
      return true;
    }

    // /start or menu
    if (t === '/start' || t.toLowerCase() === 'start') {
      await sendMessage(chatId,
        `👋 أهلاً ${chat.first_name ?? ''}!\n\nده بوت لربط جهازك بخدمة الواتساب بتاعتنا.\nاختار من القائمة تحت 👇`,
        mainMenu);
      return true;
    }

    if (t === 'ℹ️ مساعدة' || t === '/help') {
      await sendMessage(chatId,
        `🆘 <b>المساعدة</b>\n\n` +
        `• <b>ربط بوت واتساب</b>: يطلب منك اسمك، رقمك، ومحافظتك ثم يرسل كود ربط رقمي من 8 خانات.\n` +
        `• <b>حالة الربط</b>: يعرض حالة جهازك (متصل / في الانتظار / منفصل).\n` +
        `• <b>فصل الجهاز</b>: يفصل الواتساب بتاعك من الخدمة.\n\n` +
        `الكود يدخل في واتساب من: الإعدادات → الأجهزة المرتبطة → ربط بكود.`, mainMenu);
      return true;
    }

    // Check existing session
    const { data: session } = await supabase
      .from('whatsapp_link_sessions')
      .select('*')
      .eq('telegram_chat_id', chatId)
      .maybeSingle();

    // Start link flow
    if (t === '🔗 ربط بوت واتساب' || t === '/link') {
      // Already linked?
      const { data: existing } = await supabase
        .from('whatsapp_linked_users')
        .select('status,phone_number')
        .eq('telegram_chat_id', chatId)
        .in('status', ['connected', 'awaiting_code'])
        .maybeSingle();
      if (existing) {
        await sendMessage(chatId,
          `⚠️ عندك ربط فعّال بالفعل على الرقم <code>${existing.phone_number}</code> (الحالة: ${existing.status}).\nاستخدم "فصل الجهاز" قبل ما تعمل ربط جديد.`,
          mainMenu);
        return true;
      }
      await supabase.from('whatsapp_link_sessions').upsert({
        telegram_chat_id: chatId,
        step: 'name',
        full_name: null, phone_number: null, governorate: null,
      }, { onConflict: 'telegram_chat_id' });
      await sendMessage(chatId, '📝 <b>الخطوة 1 من 3</b>\n\nاكتب اسمك الكامل:', cancelMenu);
      return true;
    }

    if (t === '📊 حالة الربط' || t === '/status') {
      const { data: link } = await supabase
        .from('whatsapp_linked_users')
        .select('status,phone_number,full_name,governorate,last_connected_at,last_error')
        .eq('telegram_chat_id', chatId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!link) {
        await sendMessage(chatId, '📭 مفيش ربط ليك حاليًا. اضغط "🔗 ربط بوت واتساب" للبدء.', mainMenu);
      } else {
        const emoji: Record<string, string> = {
          pending: '⏳', awaiting_code: '🔢', connected: '✅', disconnected: '🔌', failed: '❌',
        };
        await sendMessage(chatId,
          `${emoji[link.status] ?? '•'} <b>حالتك</b>\n\n` +
          `• الاسم: ${link.full_name}\n` +
          `• الرقم: <code>${link.phone_number}</code>\n` +
          `• المحافظة: ${link.governorate}\n` +
          `• الحالة: <b>${link.status}</b>\n` +
          (link.last_connected_at ? `• آخر اتصال: ${new Date(link.last_connected_at).toLocaleString('ar-EG')}\n` : '') +
          (link.last_error ? `\n⚠️ آخر خطأ: ${link.last_error}` : ''),
          mainMenu);
      }
      return true;
    }

    if (t === '❌ فصل الجهاز' || t === '/logout') {
      const { data: link } = await supabase
        .from('whatsapp_linked_users')
        .select('id,phone_number')
        .eq('telegram_chat_id', chatId)
        .in('status', ['connected', 'awaiting_code', 'pending'])
        .maybeSingle();
      if (!link) {
        await sendMessage(chatId, 'مفيش جهاز مربوط.', mainMenu);
        return true;
      }
      const res = await waRequest('/logout', { phone_number: link.phone_number });
      await supabase.from('whatsapp_linked_users')
        .update({ status: 'disconnected', session_id: null, pairing_code: null, pairing_code_expires_at: null })
        .eq('id', link.id);
      await sendMessage(chatId,
        res.ok ? '✅ تم فصل الجهاز بنجاح.' : `⚠️ تم تسجيل الفصل محليًا لكن السيرفر رجع خطأ: ${res.error ?? 'unknown'}`,
        mainMenu);
      return true;
    }

    // Session-driven steps
    if (session) {
      const step = session.step as Step;

      if (step === 'name') {
        if (t.length < 3 || t.length > 80) {
          await sendMessage(chatId, '❗ الاسم لازم يكون بين 3 و 80 حرف. اكتبه تاني:', cancelMenu);
          return true;
        }
        await supabase.from('whatsapp_link_sessions').update({ full_name: t, step: 'phone' }).eq('telegram_chat_id', chatId);
        await sendMessage(chatId,
          `📱 <b>الخطوة 2 من 3</b>\n\nاكتب رقم الواتساب بصيغة دولية أو محلية.\nمثال: <code>01012345678</code> أو <code>+201012345678</code>`,
          cancelMenu);
        return true;
      }

      if (step === 'phone') {
        const normalized = normalizePhone(t);
        if (!normalized) {
          await sendMessage(chatId, '❗ الرقم غير صحيح. أعِد الإدخال:', cancelMenu);
          return true;
        }
        await supabase.from('whatsapp_link_sessions').update({ phone_number: normalized, step: 'governorate' }).eq('telegram_chat_id', chatId);
        const kb = await govButtons();
        await sendMessage(chatId, '🏙️ <b>الخطوة 3 من 3</b>\n\nاختر محافظتك:', kb);
        return true;
      }

      if (step === 'governorate') {
        const { data: gov } = await supabase.from('governorates').select('name_ar').eq('name_ar', t).maybeSingle();
        if (!gov) {
          await sendMessage(chatId, '❗ اختر محافظة من الأزرار تحت:', await govButtons());
          return true;
        }

        // Save linked user
        const { data: linked, error: linkErr } = await supabase.from('whatsapp_linked_users').insert({
          telegram_chat_id: chatId,
          full_name: session.full_name,
          phone_number: session.phone_number,
          governorate: t,
          status: 'pending',
        }).select('id').single();

        if (linkErr) {
          await sendMessage(chatId, `❌ حصل خطأ: ${linkErr.message}`, mainMenu);
          await supabase.from('whatsapp_link_sessions').delete().eq('telegram_chat_id', chatId);
          return true;
        }

        await sendMessage(chatId, '⏳ جاري توليد كود الربط... انتظر ثواني.');

        // Request pairing code from WhatsApp server
        const res = await waRequest('/pair', {
          phone_number: session.phone_number,
          telegram_chat_id: chatId,
          full_name: session.full_name,
          governorate: t,
        });

        if (!res.ok) {
          await supabase.from('whatsapp_linked_users')
            .update({ status: 'failed', last_error: res.error ?? JSON.stringify(res.data) })
            .eq('id', linked.id);
          await supabase.from('whatsapp_link_sessions').delete().eq('telegram_chat_id', chatId);
          await sendMessage(chatId,
            `❌ تعذر الاتصال بسيرفر الواتساب حالياً.\n<code>${res.error ?? res.data?.error ?? 'unknown'}</code>\n\nحاول تاني بعد شوية.`,
            mainMenu);
          return true;
        }

        const code: string = res.data?.pairing_code ?? res.data?.code ?? '';
        const sessionId: string = res.data?.session_id ?? '';

        await supabase.from('whatsapp_linked_users').update({
          status: 'awaiting_code',
          pairing_code: code,
          pairing_code_expires_at: new Date(Date.now() + 120_000).toISOString(),
          session_id: sessionId,
        }).eq('id', linked.id);

        await supabase.from('whatsapp_link_sessions').delete().eq('telegram_chat_id', chatId);

        const formatted = code.length === 8 ? `${code.slice(0, 4)}-${code.slice(4)}` : code;
        await sendMessage(chatId,
          `✅ <b>تم توليد كود الربط!</b>\n\n` +
          `🔢 الكود: <code>${formatted}</code>\n\n` +
          `📲 <b>خطوات الربط:</b>\n` +
          `1. افتح واتساب على الموبايل\n` +
          `2. ⚙️ الإعدادات → الأجهزة المرتبطة\n` +
          `3. اضغط "ربط جهاز"\n` +
          `4. اختار "ربط بالرقم بدلاً من ذلك"\n` +
          `5. اكتب الكود الموجود فوق\n\n` +
          `⏰ الكود صالح لمدة دقيقتين فقط.\n\n` +
          `بعد الربط، اضغط "📊 حالة الربط" للتأكد.`,
          mainMenu);
        return true;
      }
    }

    // Fallback: auto-reply commands
    const key = t.toLowerCase();
    const reply = cmdMap.get(key);
    if (reply) {
      await sendMessage(chatId, reply);
      return true;
    }

    // Default
    await sendMessage(chatId, 'مش فاهم الرسالة. استخدم القائمة تحت 👇', mainMenu);
    return true;
  };

  // --- Main poll loop ---
  while (true) {
    const elapsed = Date.now() - startTime;
    const remaining = MAX_RUNTIME_MS - elapsed;
    if (remaining < MIN_REMAINING_MS) break;
    const timeout = Math.min(50, Math.floor(remaining / 1000) - 5);
    if (timeout < 1) break;

    const response = await fetch(`${GATEWAY_URL}/getUpdates`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': TELEGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ offset: currentOffset, timeout, allowed_updates: ['message'] }),
    });

    const rawText = await response.text();
    let data: any = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.error('getUpdates non-JSON response', response.status, rawText.slice(0, 200));
      // Wait a bit and continue polling instead of crashing
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }
    if (!response.ok) {
      console.error('getUpdates error', response.status, data);
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }
    const updates = data.result ?? [];
    if (updates.length === 0) continue;

    for (const u of updates) {
      if (!u.message) continue;
      const msg = u.message;
      const chat = msg.chat;

      await supabase.from('telegram_users').upsert({
        chat_id: chat.id,
        username: chat.username ?? null,
        first_name: chat.first_name ?? null,
        last_name: chat.last_name ?? null,
        last_seen_at: new Date().toISOString(),
      }, { onConflict: 'chat_id' });

      const { data: tu } = await supabase.from('telegram_users').select('is_blocked').eq('chat_id', chat.id).single();
      if (tu?.is_blocked === true) continue;

      await supabase.from('telegram_messages').upsert({
        update_id: u.update_id,
        chat_id: chat.id,
        direction: 'in',
        text: msg.text ?? null,
        raw: u,
      }, { onConflict: 'update_id' });

      if (msg.text) {
        try {
          await handleMessage(chat, msg.text);
        } catch (e: any) {
          console.error('handleMessage error', e);
          await sendMessage(chat.id, '⚠️ حصل خطأ غير متوقع. حاول تاني.');
        }
      }
    }

    const newOffset = Math.max(...updates.map((u: any) => u.update_id)) + 1;
    await supabase.from('telegram_bot_state').update({
      update_offset: newOffset, updated_at: new Date().toISOString(),
    }).eq('id', 1);
    currentOffset = newOffset;
    totalProcessed += updates.length;
  }

  return new Response(JSON.stringify({ ok: true, processed: totalProcessed, offset: currentOffset }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
