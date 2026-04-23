/* =========== 亗 WEKA_7_BOT - BANISHMENT PROTOCOL 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Disciplinary Enforcement ⚡
 * ======================================================== */

import fs from 'fs';
import path from 'path';

const ff = async (m, { conn, text, command }) => {
    const devName = "Ahmed_wek7";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    let target = m.mentionedJid?.[0] || m.quoted?.sender;
    
    if (!target && text?.includes('@')) {
        target = text.replace('@', '').trim() + '@s.whatsapp.net';
    }
    
    if (!target) {
        return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ حدد الضحية اللي هطردها من رحمتي! 🤡*\n> مثال: .${command} @المنبطح`);
    }
    
    const jid = await m.lid2jid(target);
    const user = global.db.users[jid] || (global.db.users[jid] = {});
    
    const isUnban = ["فك_حظر", "الغاء_الحظر", "فك"].includes(command);
    
    if (isUnban) {
        if (user.banned) {
            delete user.banned;
            const unbanMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🔓 بـروتوكول فـك الـنـفـي* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح عـفـو مـن ${devName}:*
┃ ➲ تـم الإفـراج عـن الـنرم: @${target.split('@')[0]}
┃ ➲ الـحـالـة: مـسمـوح لـه بـالـنـبـاح مـجـدداً! 🚮

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *احـترم نـفسك عـشان مـتـرجعـش الـسـجن 👞*
   *بـقـيـادة الـ Weka_7: ${devName}* 👑
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

            await conn.sendMessage(m.chat, { 
                text: unbanMsg, 
                mentions: [target],
                contextInfo: {
                    externalAdReply: {
                        title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                        body: `Amnesty Granted by: ${devName} 🦅`,
                        thumbnailUrl: mySovereigntyPic,
                        sourceUrl: myChannel,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } else {
            m.reply(`*❌ الـ "دمج" ده مـش مـحظـور أصـلاً.. ركز يـا مـطور ${devName}! 👞*`);
        }
        return;
    }
    
    // تنفيذ الحظر (النفي)
    user.banned = true;
    const banMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🚫 بـروتوكول الـنـفـي الـسـيـادي* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر مـبـاشر مـن الـقائد ${devName}:*
┃ ➲ تـم نـفـي الـمنـبـطـح: @${target.split('@')[0]}
┃ ➲ الـعـقـوبـة: الـحـرمـان الأبـدي مـن خـدمـاتـي! 🚮

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *اسـكـن فـي مـزبـلة الـتـاريخ يـا "نـرم" 👞*
   *رادار الـ Weka_7 أصـاب الـهـدف! 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

    await conn.sendMessage(m.chat, { 
        text: banMsg, 
        mentions: [target],
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `Banned by Weka_7: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
    await m.react('🚮');
};

ff.usage = ["حظر", "فك_حظر"];
ff.category = "owner";
ff.command = ["حظر", "فك_حظر", "الغاء_الحظر", "فك"];
ff.owner = true;

export default ff;
