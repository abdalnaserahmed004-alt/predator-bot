// Webhook receiving status updates from the external WhatsApp (Baileys) server.
// The Railway/VPS server calls this when: pairing succeeded, disconnected, error, etc.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { z } from 'https://esm.sh/zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

const BodySchema = z.object({
  phone_number: z.string().min(5).max(20),
  event: z.enum(['connected', 'disconnected', 'failed', 'code_expired']),
  session_id: z.string().optional(),
  error: z.string().optional(),
  telegram_chat_id: z.number().int().optional(),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const WHATSAPP_SERVER_SECRET = Deno.env.get('WHATSAPP_SERVER_SECRET');

  // Verify shared secret
  const apiKey = req.headers.get('x-api-key');
  if (WHATSAPP_SERVER_SECRET && apiKey !== WHATSAPP_SERVER_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
  }

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'Missing env' }), { status: 500, headers: corsHeaders });
  }

  const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400, headers: corsHeaders });
  }
  const { phone_number, event, session_id, error, telegram_chat_id } = parsed.data;

  const admin = createClient(SUPABASE_URL, SERVICE_KEY);

  const update: any = { updated_at: new Date().toISOString() };
  if (event === 'connected') {
    update.status = 'connected';
    update.last_connected_at = new Date().toISOString();
    update.last_error = null;
    if (session_id) update.session_id = session_id;
    update.pairing_code = null;
    update.pairing_code_expires_at = null;
  } else if (event === 'disconnected') {
    update.status = 'disconnected';
  } else if (event === 'failed') {
    update.status = 'failed';
    update.last_error = error ?? 'unknown';
  } else if (event === 'code_expired') {
    update.status = 'failed';
    update.last_error = 'pairing code expired';
    update.pairing_code = null;
  }

  const { data: rows } = await admin.from('whatsapp_linked_users')
    .update(update)
    .eq('phone_number', phone_number)
    .select('telegram_chat_id,full_name');

  // Notify user on Telegram
  const notifyChatId = telegram_chat_id ?? rows?.[0]?.telegram_chat_id;
  if (notifyChatId && LOVABLE_API_KEY && TELEGRAM_API_KEY) {
    const messages: Record<string, string> = {
      connected: '✅ تم ربط الواتساب بنجاح! جهازك متصل الآن.',
      disconnected: '🔌 تم فصل جهازك من الواتساب.',
      failed: `❌ فشل ربط الواتساب: ${error ?? 'حاول تاني'}`,
      code_expired: '⏰ انتهت صلاحية كود الربط. اضغط "🔗 ربط بوت واتساب" للمحاولة تاني.',
    };
    await fetch(`${GATEWAY_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': TELEGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_id: notifyChatId, text: messages[event] ?? event }),
    }).catch(() => {});
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
