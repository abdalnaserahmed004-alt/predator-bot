/* =========== 亗 WEKA_7_BOT - STICKER AUTHORITY 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Sovereign Sticker Metadata Branding ⚡
 * ======================================================== */

import { createSticker } from "../../system/utils.js";

const test = async (m, { conn, args }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  if (!m.quoted) return m.reply(`*⚠️ يـا "نـرم" رد عـلى الـملصق اللي عايز تـطبـع علـيه خـتم الـ Weka_7! 🤡*`);
  
  let [pack, author] = args.join(" ").split(" | ");
  
  if (!args.length) {
    return m.reply(`*📝 بـروتوكول الـتـنـفـيذ:* \n\n.حقوق [اسم الباك] | [اسم المؤلف]\n\n*مثال:* \n\`.حقوق Weka_7 | ${devName}\``);
  }
  
  // القيم الافتراضية بلمسة "احمد_wek7"
  if (!pack) pack = "亗 WEKA_7 亗";
  if (author === undefined) author = devName;
  
  try {
    await m.react("🔖");
    const q = await m.quoted;
    if (!/sticker/.test(q.mimetype)) return m.reply(`*❌ ده مـش مـلصق يـا "دمـج".. ركـز مـع الـ Weka_7! 🚮*`);

    const buffer = await createSticker(await q.download(), { 
        mime: q.mimetype, 
        pack: pack, 
        author: author 
    });

    await conn.sendMessage(
        m.chat,
        { 
            sticker: buffer, 
            contextInfo: context(m.sender, mySovereigntyPic, devName, myChannel) 
        },
        { quoted: m }
    );
    
    await m.react("✅");

  } catch (e) {
    console.error(e);
    m.reply(`*❌ الـنظام كـرف.. الـمطور ${devName} بـيعيد ضـبط الـحقوق! 🚮*`);
  }
};

test.usage = ["حقوق نص | نص"];
test.command = ["حقوق", "تغيير_حقوق"];
test.category = "sticker";

export default test;

// دالة السياق السيادي المحسنة
const context = (jid, img, dev, channel) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363225356834044@newsletter',
        newsletterName: '亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗',
        serverMessageId: 100
    },
    externalAdReply: {
        title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐀𝐮𝐭𝐡𝐨𝐫𝐢𝐭𝐲",
        body: `Verified by: ${dev} 🦅`,
        thumbnailUrl: img,
        sourceUrl: channel,
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
