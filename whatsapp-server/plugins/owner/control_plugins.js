/* =========== 亗 PREDATOR AI - FILE ENGINEER 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Level System Architecture ⚡
 * ======================================================== */

import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, bot, command }) => {
    const devName = "Ahmed Abdel Nasser";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة
    const base = bot.config?.commandsPath || './plugins';
    const text = m.text.split(' ');
    const target = text[1];

    const listFiles = () => {
        const files = [];
        const walk = (dir) => {
            if (!fs.existsSync(dir)) return;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const p = path.join(dir, item);
                if (fs.statSync(p).isDirectory()) walk(p);
                else if (item.endsWith('.js')) files.push(path.relative(base, p).replace(/\.js$/, ''));
            }
        };
        walk(base);
        return files.sort();
    };

    const findFile = (name) => {
        const search = (dir) => {
            if (!fs.existsSync(dir)) return null;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const p = path.join(dir, item);
                if (fs.statSync(p).isDirectory()) {
                    const found = search(p);
                    if (found) return found;
                } else if (item === `${name}.js`) return p;
            }
            return null;
        };
        return search(base);
    };

    // --- بروتوكول الإضافة ---
    if (command === 'اضافه_ملف') {
        if (!target) {
            const files = listFiles();
            let msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *📁 أرشـيف ملفات الـنـظام* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n`;
            msg += `👑 *بـرعـايـة الـقائد: ${devName}*\n\n`;
            if (!files.length) {
                msg += '⚠️ لا تـوجد مـلفات فـي الـرادار يـا "نـرم" 👞';
            } else {
                msg += files.map(f => `┃ 📄 ${f}`).join('\n');
                msg += `\n\n╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮\n   *اسـتخدم: .اضافه_ملف [المسار/الاسم]*\n╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯`;
            }
            return m.reply(msg);
        }
        
        if (!m.quoted) return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ رد عـلى الكـود اللي عايز تـزرعه فـي سورس ${devName}! 🤡*`);
        const content = m.quoted.text || m.quoted.msg;
        if (!content) return m.reply(`*❌ الـكود فـاضـي يـا "دمـج".. مـتـضيـعـش وقـت الـ Predator! 🚮*`);
        
        const parts = target.split('/');
        const name = parts.pop();
        let dir = base;
        for (const p of parts) {
            dir = path.join(dir, p);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        }
        
        const filePath = path.join(dir, `${name}.js`);
        fs.writeFileSync(filePath, content);
        
        const successAdd = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *✅ تـم زراعة الـمـلـف بـنـجاح* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n┃ ➲ الـمـسار: \`${path.relative(base, filePath)}\`\n┃ ➲ الـمـهندس: ${devName}\n\n> الـسـورس يـتـطور بـأمـر الـ Predator 🦅`;
        
        await conn.sendMessage(m.chat, { 
            text: successAdd,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                    body: `File Engineering by: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }
    
    // --- بروتوكول الحذف ---
    else if (command === 'حذف_ملف') {
        if (!target) return m.reply(`*⚠️ يـا "نـرم" حـدد الـملف اللي عـايز تـمسحـه مـن الـوجود! 🤡*`);
        
        let filePath = path.join(base, `${target}.js`);
        if (!fs.existsSync(filePath)) {
            filePath = findFile(target.split('/').pop());
        }
        
        if (!filePath || !fs.existsSync(filePath)) {
            return m.reply(`*❌ الـمـلـف ده مـلـوش أثـر فـي رادار ${devName}! 👞*`);
        }
        
        fs.unlinkSync(filePath);
        
        const clean = (dir) => {
            if (dir === base) return;
            if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
                fs.rmdirSync(dir);
                clean(path.dirname(dir));
            }
        };
        clean(path.dirname(filePath));
        
        const successDel = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🗑️ تـم مـسح الـمـلـف مـن الـذاكـرة* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n┃ ➲ الـمـلـف: \`${path.relative(base, filePath)}\`\n┃ ➲ الـقـرار: إبـادة نـهـائـية\n\n> تـم تـنـظـيف الـسورس بـأمـر الـ Predator 🦅`;

        await conn.sendMessage(m.chat, { 
            text: successDel,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                    body: `System Cleanup by: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }
};

handler.category = 'owner';
handler.command = ['اضافه_ملف', 'حذف_ملف'];
handler.owner = true;

export default handler;
   