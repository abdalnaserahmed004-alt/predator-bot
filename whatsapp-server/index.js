/* * 亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 - 𝐕𝟐 𝐏𝐑𝐎 𝐄𝐃𝐈𝐓𝐈𝐎𝐍 亗
 * -------------------------------------------
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 🛡️ Status: Public & Ultra Fast
 */

import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';
import fs from 'fs';

// إعدادات المطور والسرعة
const botConfig = {
    phoneNumber: '201554582851', // رقمك الأساسي يا أحمد
    prefix: [".", "/", "!"],
    fromMe: false, // خليها false عشان البوت يرد على الناس مش بس على رسايلك
    online: true,
    readStatus: true,
    autoRead: false,
    publicMode: true 
};

const client = new Client({
    phoneNumber: botConfig.phoneNumber,
    prefix: botConfig.prefix,
    fromMe: botConfig.fromMe,
    owners: [
        {
            name: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 亗",
            jid: `${botConfig.phoneNumber}@s.whatsapp.net`,
            lid: "276711958704275@lid"
        }
    ],
    settings: {
        noWelcome: false,
        autoRead: botConfig.autoRead,
        readStatus: botConfig.readStatus,
        online: botConfig.online
    },
    commandsPath: './plugins'
});

// فرض الوضع العام (Public)
client.public = botConfig.publicMode;

client.onGroupEvent(group);
client.onCommandAccess(access);

// تعريف قاعدة البيانات عالمياً
global.db = global.db || new UltraDB();
global.client = client; // عشان تقدر تستخدم الكلاينت في أي مكان

// معلومات الهوية والقناة (البصمة الشخصية)
client.config.info = {
    nameBot: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 亗",
    nameChannel: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐒𝐘𝐒𝐓𝐄𝐌 亗 🦅",
    idChannel: "120363225356834044@newsletter",
    urls: {
        repo: "https://github.com/Ahmed-ZDA/Predator-AI",
        channel: "https://whatsapp.com/channel/0029VaQim2bAu3aPsRVaDq3v",
        telegram: "https://t.me/DevAhmed_ZDA"
    },
    copyright: {
        pack: '亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 亗',
        author: '𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃'
    },
    images: ["https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg"]
};

/* =========== نظام تنظيف الذاكرة التلقائي =========== */
function clearTmp() {
    const tmpPath = './tmp';
    try {
        if (fs.existsSync(tmpPath)) {
            const files = fs.readdirSync(tmpPath);
            files.forEach(file => {
                // الحماية من مسح ملفات السيستم المهمة
                if (file !== '.gitkeep') fs.unlinkSync(`${tmpPath}/${file}`);
            });
            console.log("\x1b[33m[!] Tmp folder cleared for maximum speed 🧹\x1b[0m");
        }
    } catch (e) {
        console.log("Tmp is already clean.");
    }
}

/* =========== بدء التشغيل الاحترافي =========== */
async function startBot() {
    try {
        console.clear();
        process.stdout.write('\x1b]2;亗 PREDATOR AI - DEV AHMED 亗\x07'); // تغيير اسم نافذة الترمكس
        
        console.log("\x1b[36m%s\x1b[0m", "🔄 Connecting Predator System to WhatsApp...");
        
        await client.start();
        
        // تشغيل نظام الـ Sub-Bots (جيش البوتات)
        setTimeout(async () => {
            if (client.commandSystem) {
                console.log("\x1b[35m%s\x1b[0m", "================================================");
                console.log("\x1b[32m[+] 亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 亗 IS LIVE! 🚀\x1b[0m");
                console.log("\x1b[36m[!] MASTER : AHMED ABDEL NASSER 🦅\x1b[0m");
                console.log("\x1b[33m[!] STATUS : PUBLIC MODE (ALL CHATS) ✅\x1b[0m");
                console.log("\x1b[35m%s\x1b[0m", "================================================");
                
                // تنظيف الملفات كل 10 دقائق
                setInterval(clearTmp, 600000);
                
                // بدء تشغيل البوتات الفرعية
                await sub(client);
            }
        }, 5000); // زيادة الوقت قليلاً لضمان استقرار الاتصال
    } catch (err) {
        console.error("\x1b[31m[!] Startup Failed:\x1b[0m", err);
        // إعادة المحاولة التلقائية بعد 5 ثواني
        setTimeout(startBot, 5000);
    }
}

startBot();

/* =========== حماية السورس من التوقف المفاجئ =========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) return;
    if (e.message.includes('Connection Closed')) return;
    console.error('\x1b[31m[!] Critical Error:\x1b[0m', e.message);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('\x1b[31m[!] Unhandled Rejection at:\x1b[0m', promise, 'reason:', reason);
});
