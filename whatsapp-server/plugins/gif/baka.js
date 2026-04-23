/* =========== 亗 PREDATOR AI - BAKA PROTOCOL 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Level Toxicity & GIF Logic ⚡
 * ======================================================== */

import { Scrapy } from "meowsab";
import { gifToMp4 } from "../../system/utils.js";

let handler = async (m, { conn, command }) => {
    const devName = "Ahmed Abdel Nasser";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة مع اللوجو

    try {
        let target = m.mentionedJid?.[0] || m.quoted?.sender;
        
        // لو مفيش ضحية (منشن)
        if (!target) return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ حدد "منبطح" عشان أهينه! 🤡*\n> مثال: .${command} @الضحية`);

        let group = await conn.groupMetadata(m.chat);
        if (!group.participants.find(p => p.id === target)) {
            return m.reply(`*❌ الـ "دمج" اللي منشنته ده مش هنا أصلاً.. ركز مع المطور ${devName}! 👞*`);
        }

        await m.react('🐍');
        const res = await Scrapy.AnimeGif("baka");
        const { url, anime_name } = res.results[0];
        const video = await gifToMp4(url);
        
        const caption = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚠️ بـروتوكول الإهـانة الـرسمي* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح مـن الـقائد ${devName}:*
┃ ➲ @${m.sender.split('@')[0]} بـيـقولك إنك "باكا" (نرم) يـا @${target.split('@')[0]} 🚮

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *خـد الإهـانة واسـكت يـا "دمـج"* 👞
   *الأنـمـي:* ${anime_name} 📺
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

        await conn.sendMessage(m.chat, {
            video: video,
            caption: caption,
            gifPlayback: true,
            mentions: [target, m.sender],
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                    body: `Targeted by Predator: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        await m.react('✅');

    } catch (e) {
        await m.react('❌');
        m.reply(`*❌ السيرفر مش طايق الـ "نرمات".. المطور ${devName} بيصلح القرف ده! 🚮*`);
    }
}

handler.usage = ["باكا @منشن"];
handler.category = "gif";
handler.command = ["باكا"];

export default handler;
