/* =========== 亗 WEKA_7_BOT - HUG PROTOCOL 亗 ===========
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
        if (!target) return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ حدد "منبطح" عشان أحتويه برمجياً! 🤡*\n> مثال: .${command} @الضحية`);

        let group = await conn.groupMetadata(m.chat);
        if (!group.participants.find(p => p.id === target)) {
            return m.reply(`*❌ الـ "دمج" ده مش هنا أصلاً.. ركز مع المطور ${devName}! 👞*`);
        }

        await m.react('🫂');
        const res = await Scrapy.AnimeGif("hug");
        const { url, anime_name } = res.results[0];
        const video = await gifToMp4(url);
        
        const caption = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🫂 بـروتوكول الـاحـتـواء الـقـسـري* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح مـن الـقائد ${devName}:*
┃ ➲ @${m.sender.split('@')[0]} بـيـحضن الـنرم @${target.split('@')[0]} عـشان يـبطل عـياط! 🚮

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *اسـكن فـي الـركن يـا "دمـج" بـالـجـزمة* 👞
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
                    body: `Authorized by Weka_7: ${devName} 🦅`,
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
        m.reply(`*❌ السيرفر كرف للحضن ده.. المطور ${devName} بيصلحه! 🚮*`);
    }
}

handler.usage = ["حضن @منشن"];
handler.category = "gif";
handler.command = ["حضن"];

export default handler;
