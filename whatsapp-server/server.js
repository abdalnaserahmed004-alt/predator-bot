/* * 亗 𝐖𝐄𝐊𝐀_𝟕_𝐁𝐎𝐓 - HTTP BRIDGE 亗
 * -------------------------------------------
 * 🛠️ Developer : Ahmed_wek7
 * 🌐 Bridges WhatsApp (meowsab) <-> Lovable (Telegram bot)
 *
 * Endpoints:
 *  GET  /              health check
 *  POST /pair          create pairing code for a sub-bot
 *  POST /logout        disconnect a sub-bot
 *  GET  /status/:phone check if a phone is active
 *
 * On pairing success/failure, posts to LOVABLE_WEBHOOK_URL.
 */

import express from 'express';
import { Client, SubBots } from 'meowsab';
import { group, access } from './system/control.js';
import UltraDB from './system/UltraDB.js';
import fs from 'fs';

const PORT = process.env.PORT || 3000;
const API_SECRET = process.env.API_SECRET || '';
const LOVABLE_WEBHOOK_URL = process.env.LOVABLE_WEBHOOK_URL || '';
const MAIN_PHONE = process.env.MAIN_PHONE || '201210155616';

/* =========== Bot config (kept from original index.js) =========== */
const botConfig = {
    phoneNumber: MAIN_PHONE,
    prefix: ['.', '/', '!'],
    fromMe: false,
    online: true,
    readStatus: true,
    autoRead: false,
    publicMode: true,
};

const client = new Client({
    phoneNumber: botConfig.phoneNumber,
    prefix: botConfig.prefix,
    fromMe: botConfig.fromMe,
    owners: [
        {
            name: '亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 亗',
            jid: `${botConfig.phoneNumber}@s.whatsapp.net`,
            lid: '276711958704275@lid',
        },
    ],
    settings: {
        noWelcome: false,
        autoRead: botConfig.autoRead,
        readStatus: botConfig.readStatus,
        online: botConfig.online,
    },
    commandsPath: './plugins',
});

client.public = botConfig.publicMode;
client.onGroupEvent(group);
client.onCommandAccess(access);

global.db = global.db || new UltraDB();
global.client = client;

client.config.info = {
    nameBot: '亗 𝐖𝐄𝐊𝐀_𝟕_𝐁𝐎𝐓 亗',
    nameChannel: '亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 亗 🦅',
    idChannel: '120363225356834044@newsletter',
    urls: {
        repo: 'https://github.com/abdalnaserahmed004-alt/predator-bot',
        channel: 'https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a',
        telegram: 'https://t.me/DevAhmed_ZDA',
    },
    copyright: { pack: '亗 𝐖𝐄𝐊𝐀_𝟕_𝐁𝐎𝐓 亗', author: '𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕' },
    images: ['https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg'],
};

/* =========== Tmp cleanup =========== */
function clearTmp() {
    const tmpPath = './tmp';
    try {
        if (fs.existsSync(tmpPath)) {
            fs.readdirSync(tmpPath).forEach((f) => {
                if (f !== '.gitkeep') fs.unlinkSync(`${tmpPath}/${f}`);
            });
        }
    } catch {}
}

/* =========== Lovable webhook =========== */
async function notifyLovable(payload) {
    if (!LOVABLE_WEBHOOK_URL) return;
    try {
        await fetch(LOVABLE_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_SECRET,
            },
            body: JSON.stringify(payload),
        });
    } catch (e) {
        console.error('[notifyLovable]', e?.message);
    }
}

/* =========== Sub-bots manager =========== */
let subBotsReady = false;

async function initSubBots() {
    global.subBots = new SubBots(client.commandSystem);
    await global.subBots.setConfig({
        commandsPath: './plugins',
        owners: client.config.owners,
        prefix: botConfig.prefix,
        info: client.config.info,
        printQR: false,
    });

    await global.subBots.load();

    global.subBots.on('ready', async (uid) => {
        console.log(`✅ [SubBot ${uid}] Connected`);
        await notifyLovable({
            phone_number: uid.replace(/\D/g, ''),
            event: 'connected',
            session_id: `session_${uid}`,
        });
    });

    global.subBots.on('pair', (uid, code) => {
        console.log(`🔐 [SubBot ${uid}] Pair code: ${code}`);
    });

    global.subBots.on('close', async (uid) => {
        console.log(`🔌 [SubBot ${uid}] Disconnected`);
        await notifyLovable({
            phone_number: uid.replace(/\D/g, ''),
            event: 'disconnected',
        });
    });

    global.subBots.on('badSession', async (uid) => {
        console.log(`⚠️ [SubBot ${uid}] Bad session`);
        await notifyLovable({
            phone_number: uid.replace(/\D/g, ''),
            event: 'failed',
            error: 'bad session',
        });
    });

    global.subBots.on('error', async (uid, err) => {
        console.error(`❌ [SubBot ${uid}]`, err?.message || err);
    });

    subBotsReady = true;
    console.log('✅ SubBots manager ready');
}

/* =========== Bot startup =========== */
async function startBot() {
    try {
        console.log('🔄 Connecting WEKA_7_BOT main client...');
        await client.start();

        setTimeout(async () => {
            if (client.commandSystem) {
                console.log('================================================');
                console.log('[+] 亗 𝐖𝐄𝐊𝐀_𝟕_𝐁𝐎𝐓 亗 IS LIVE! 🚀');
                console.log('[!] MASTER : AHMED_WEK7');
                console.log('================================================');
                setInterval(clearTmp, 600000);
                await initSubBots();
            }
        }, 5000);
    } catch (err) {
        console.error('[!] Startup failed:', err?.message);
        setTimeout(startBot, 5000);
    }
}

/* =========== HTTP server =========== */
const app = express();
app.use(express.json());

function requireAuth(req, res, next) {
    if (!API_SECRET) return next();
    if (req.headers['x-api-key'] !== API_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

app.get('/', (_req, res) =>
    res.json({ ok: true, service: 'weka-7-bot', subBotsReady, mainPhone: MAIN_PHONE })
);

app.post('/pair', requireAuth, async (req, res) => {
    const { phone_number, telegram_chat_id, full_name } = req.body || {};
    if (!phone_number) return res.status(400).json({ error: 'phone_number required' });
    if (!subBotsReady) return res.status(503).json({ error: 'sub-bots not ready yet, try again in a few seconds' });

    try {
        // Generate pairing code via meowsab SubBots
        const code = await global.subBots.requestPairingCode(phone_number, {
            telegram_chat_id,
            full_name,
        });
        res.json({
            pairing_code: code,
            session_id: `session_${phone_number}`,
        });
    } catch (e) {
        console.error('[/pair]', e?.message);
        res.status(500).json({ error: e?.message ?? 'pair failed' });
    }
});

app.post('/logout', requireAuth, async (req, res) => {
    const { phone_number } = req.body || {};
    if (!phone_number) return res.status(400).json({ error: 'phone_number required' });
    try {
        await global.subBots.remove(phone_number);
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: e?.message });
    }
});

app.get('/status/:phone', requireAuth, (req, res) => {
    const bot = global.subBots?.get(req.params.phone);
    res.json({ active: !!bot });
});

app.listen(PORT, () => {
    console.log(`🌐 HTTP bridge listening on :${PORT}`);
    startBot();
});

/* =========== Crash protection =========== */
process.on('uncaughtException', (e) => {
    if (e.message?.includes('rate-overlimit')) return;
    if (e.message?.includes('Connection Closed')) return;
    console.error('[uncaught]', e.message);
});
process.on('unhandledRejection', (reason) => {
    console.error('[unhandled]', reason);
});
