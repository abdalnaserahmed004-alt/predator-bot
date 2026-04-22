// Send messages from admin panel. Verifies caller is an admin.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { z } from 'https://esm.sh/zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BodySchema = z.object({
  text: z.string().min(1).max(4000),
  chat_id: z.number().int().optional(),
  broadcast: z.boolean().optional(),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !SUPABASE_URL || !SERVICE_KEY || !ANON_KEY) {
    return new Response(JSON.stringify({ error: 'Missing env vars' }), { status: 500, headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
  }

  // Validate user
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: { user }, error: userErr } = await userClient.auth.getUser();
  if (userErr || !user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data: role } = await admin.from('user_roles')
    .select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle();
  if (!role) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
  }

  const parsed = BodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400, headers: corsHeaders });
  }
  const { text, chat_id, broadcast } = parsed.data;

  const send = async (cid: number) => {
    const r = await fetch(`${GATEWAY_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': TELEGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_id: cid, text }),
    });
    const d = await r.json();
    if (r.ok) {
      await admin.from('telegram_messages').insert({ chat_id: cid, direction: 'out', text });
    }
    return { ok: r.ok, data: d };
  };

  if (broadcast) {
    const { data: users } = await admin.from('telegram_users')
      .select('chat_id').eq('is_blocked', false);
    let sent = 0, failed = 0;
    for (const u of users ?? []) {
      const res = await send(u.chat_id);
      if (res.ok) sent++; else failed++;
    }
    return new Response(JSON.stringify({ ok: true, sent, failed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!chat_id) {
    return new Response(JSON.stringify({ error: 'chat_id required' }), { status: 400, headers: corsHeaders });
  }
  const res = await send(chat_id);
  return new Response(JSON.stringify(res), {
    status: res.ok ? 200 : 502,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
