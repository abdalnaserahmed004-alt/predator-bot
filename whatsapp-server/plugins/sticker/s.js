/* =========== 亗 WEKA_7_BOT - STICKER FACTORY 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Performance Media Conversion ⚡
 * ======================================================== */

import { createSticker } from "../../system/utils.js";

const test = async (m, { conn, bot }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  if (!m.quoted) return m.reply(`*⚠️ يـا "نـرم" رد عـلى صورة أو فـيديو عـشان الـ Weka_7 يـحولـهـا لـمـلـصـق! 🤡*`);
  
  await m.react("🎨");

  try {
    const q = await m.quoted;
    
    // التحقق من نوع الميديا (صورة أو فيديو)
    if (!/image|video/.test(q.mimetype)) {
        return m.reply(`*❌ الـرادار مـلـقـطـش مـيـديا صـحيحة يـا "دمـج".. ابـعـت صورة أو فـيديـو! 🚮*`);
    }

    // جلب الحقوق الافتراضية من ملف الإعدادات
    const { pack, author } = bot.config?.info?.copyright || { pack: "亗 WEKA_7 亗", author: devName };

    const buffer = await createSticker(await q.download(), { 
        mime: q.mimetype, 
        pack: pack, 
        author: author 
    });

    await conn.sendMessage(
        m.chat,
        { 
            sticker: buffer,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363225356834044@newsletter',
                    newsletterName: '亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗',
                    serverMessageId: 100
                },
                externalAdReply: {
                    title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐌𝐞𝐝𝐢𝐚 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐫",
                    body: `Engineered by: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        },
        { quoted: m }
    );
    
    await m.react("✅");

  } catch (e) {
    console.error(e);
    m.react("❌");
    m.reply(`*❌ الـمـعـالـج كـرف.. الـمطور ${devName} بـيـصلح الـمـصنـع! 🚮*`);
  }
};

test.usage = ["ملصق"];
test.command = ["ملصق", "s", "sticker"];
test.category = "sticker";

export default test;
