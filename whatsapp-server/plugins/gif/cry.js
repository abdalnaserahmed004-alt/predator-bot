/* =========== 亗 WEKA_7_BOT - CRY PROTOCOL 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Toxicity & GIF Logic ⚡
 * ======================================================== */

import { Scrapy } from "meowsab";
import { gifToMp4 } from "../../system/utils.js";

let handler = async (m, { conn, command }) => {
    const devName = "Ahmed_wek7";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة مع اللوجو

    try {
        let target = m.mentionedJid?.[0] || m.quoted?.sender;
        
        // لو مفيش ضحية (منشن)
        if (!target) return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ حدد "منبطح" عشان أخليه يعيط! 🤡*\n> مثال: .${command} @الضحية`);

        let group = await conn.groupMetadata(m.chat);
        if (!group.participants.find(p => p.id === target)) {
            return m.reply(`*❌ الـ "دمج" اللي منشنته ده مش هنا أصلاً.. ركز مع المطور ${devName}! 👞*`);
        }

        await m.react('🛰️');
        const res = await Scrapy.AnimeGif("cry");
        const { url, anime_name } = res.results[0];
        const video = await gifToMp4(url);
        
        const caption = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚠️ رادار رصـد الـانـبـطـاح* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح مـن الـقائد ${devName}:*
┃ ➲ @${m.sender.split('@')[0]} جـايـب فـيـديـو لـيـك وأنـت بـتـعـيط يـا @${target.split('@')[0]} 🚮

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *امـسـح دمـوعـك يـا "دمـج" بـالـجـزمة* 👞
   *الأنـمـي:* ${anime_name} 📺
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

        await conn.sendMessage(m.chat, {
            video: video,
            caption: caption,
            gifPlayback: true,
            mentions: [target, m.sender],
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                    body: `Targeted by Weka_7: ${devName} 🦅`,
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
        m.reply(`*❌ السيرفر كرف للـ "نرمات".. المطور ${devName} بيتعامل! 🚮*`);
    }
}

handler.usage = ["ابكي @منشن"];
handler.category = "gif";
handler.command = ["ابكي"];

export default handler;
