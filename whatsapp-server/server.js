// Predator WhatsApp Server — Baileys-based pairing code provider
// Run on Railway/Render/VPS. Does NOT run on Lovable (Edge Functions can't hold WebSockets).

import express from 'express';
import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3000;
const API_SECRET = process.env.API_SECRET || '';
const LOVABLE_WEBHOOK_URL = process.env.LOVABLE_WEBHOOK_URL || '';
const SESSIONS_DIR = process.env.SESSIONS_DIR || './sessions';

if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR, { recursive: true });

const logger = pino({ level: 'info' });
const app = express();
app.use(express.json());

// In-memory registry of active sockets per phone
const sockets = new Map(); // phone -> { sock, state }

// Notify Lovable
async function notifyLovable(payload) {
  if (!LOVABLE_WEBHOOK_URL) return;
  try {
    await fetch(LOVABLE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_SECRET,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    logger.error({ err: e?.message }, 'notifyLovable failed');
  }
}

// Auth middleware
function requireAuth(req, res, next) {
  if (!API_SECRET) return next(); // Dev mode
  if (req.headers['x-api-key'] !== API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

async function startSocket(phoneNumber, telegramChatId) {
  const authDir = path.join(SESSIONS_DIR, phoneNumber);
  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: ['Predator Bot', 'Chrome', '1.0.0'],
  });

  sockets.set(phoneNumber, { sock, telegramChatId });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (u) => {
    const { connection, lastDisconnect } = u;
    logger.info({ phoneNumber, connection }, 'connection.update');

    if (connection === 'open') {
      await notifyLovable({
        phone_number: phoneNumber,
        event: 'connected',
        session_id: `session_${phoneNumber}`,
        telegram_chat_id: telegramChatId,
      });
    }

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      const loggedOut = code === DisconnectReason.loggedOut;
      sockets.delete(phoneNumber);
      await notifyLovable({
        phone_number: phoneNumber,
        event: loggedOut ? 'disconnected' : 'failed',
        error: loggedOut ? 'logged out' : `code ${code}`,
        telegram_chat_id: telegramChatId,
      });
    }
  });

  // Request pairing code if not registered yet
  if (!sock.authState.creds.registered) {
    // Small delay for socket to stabilize
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const code = await sock.requestPairingCode(phoneNumber);
      return { pairing_code: code, session_id: `session_${phoneNumber}` };
    } catch (e) {
      throw new Error(`requestPairingCode failed: ${e?.message}`);
    }
  }

  return { pairing_code: null, session_id: `session_${phoneNumber}`, already: true };
}

app.get('/', (_, res) => res.json({ ok: true, service: 'predator-whatsapp-server' }));

app.post('/pair', requireAuth, async (req, res) => {
  const { phone_number, telegram_chat_id } = req.body || {};
  if (!phone_number) return res.status(400).json({ error: 'phone_number required' });

  try {
    // If socket exists, close first
    if (sockets.has(phone_number)) {
      try { sockets.get(phone_number).sock.end(); } catch {}
      sockets.delete(phone_number);
    }
    // Clean old session if not registered
    const authDir = path.join(SESSIONS_DIR, phone_number);
    if (fs.existsSync(authDir)) {
      fs.rmSync(authDir, { recursive: true, force: true });
    }

    const result = await startSocket(phone_number, telegram_chat_id);
    res.json(result);
  } catch (e) {
    logger.error({ err: e?.message }, '/pair error');
    res.status(500).json({ error: e?.message ?? 'unknown' });
  }
});

app.post('/logout', requireAuth, async (req, res) => {
  const { phone_number } = req.body || {};
  if (!phone_number) return res.status(400).json({ error: 'phone_number required' });
  try {
    const entry = sockets.get(phone_number);
    if (entry) {
      try { await entry.sock.logout(); } catch {}
      sockets.delete(phone_number);
    }
    const authDir = path.join(SESSIONS_DIR, phone_number);
    if (fs.existsSync(authDir)) fs.rmSync(authDir, { recursive: true, force: true });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e?.message });
  }
});

app.get('/status/:phone', requireAuth, (req, res) => {
  const entry = sockets.get(req.params.phone);
  res.json({ active: !!entry });
});

app.listen(PORT, () => {
  logger.info(`Predator WhatsApp server listening on :${PORT}`);
});
