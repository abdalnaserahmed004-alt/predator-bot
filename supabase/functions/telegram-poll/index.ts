// Polls Telegram getUpdates and stores messages + responds to commands
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';
const MAX_RUNTIME_MS = 55_000;
const MIN_REMAINING_MS = 5_000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const startTime = Date.now();
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'Missing env vars' }), { status: 500, headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: state, error: stateErr } = await supabase
    .from('telegram_bot_state').select('update_offset').eq('id', 1).single();
  if (stateErr) return new Response(JSON.stringify({ error: stateErr.message }), { status: 500, headers: corsHeaders });

  let currentOffset: number = state.update_offset;
  let totalProcessed = 0;

  // Load enabled commands once
  const { data: commands } = await supabase.from('bot_commands').select('command,response').eq('enabled', true);
  const cmdMap = new Map<string, string>();
  (commands ?? []).forEach((c: any) => cmdMap.set(c.command.toLowerCase(), c.response));

  const sendMessage = async (chat_id: number, text: string) => {
    const r = await fetch(`${GATEWAY_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': TELEGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_id, text }),
    });
    return r.ok;
  };

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

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), { status: 502, headers: corsHeaders });
    }
    const updates = data.result ?? [];
    if (updates.length === 0) continue;

    for (const u of updates) {
      if (!u.message) continue;
      const msg = u.message;
      const chat = msg.chat;

      // Upsert user
      await supabase.from('telegram_users').upsert({
        chat_id: chat.id,
        username: chat.username ?? null,
        first_name: chat.first_name ?? null,
        last_name: chat.last_name ?? null,
        last_seen_at: new Date().toISOString(),
      }, { onConflict: 'chat_id' });

      // Check blocked
      const { data: tu } = await supabase.from('telegram_users').select('is_blocked').eq('chat_id', chat.id).single();
      const blocked = tu?.is_blocked === true;

      // Store message
      await supabase.from('telegram_messages').upsert({
        update_id: u.update_id,
        chat_id: chat.id,
        direction: 'in',
        text: msg.text ?? null,
        raw: u,
      }, { onConflict: 'update_id' });

      // Auto-respond if command matches and not blocked
      if (!blocked && msg.text) {
        const key = msg.text.trim().toLowerCase();
        const reply = cmdMap.get(key);
        if (reply) {
          const ok = await sendMessage(chat.id, reply);
          if (ok) {
            await supabase.from('telegram_messages').insert({
              chat_id: chat.id, direction: 'out', text: reply,
            });
          }
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
