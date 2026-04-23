/* =========== 亗 WEKA_7_BOT - VISUAL RECOVERY 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Fidelity Sticker to Image Decoder ⚡
 * ======================================================== */

const toimg = async (m, { conn }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!/sticker/.test(mime)) {
      return m.reply(`*⚠️ يـا "نـرم" رد عـلى مـلصق عـشان الـ Weka_7 يـفـك ضـغـطه لـصـورة! 🤡*`);
    }

    await m.react("🖼️");

    const buffer = await q.download();
    
    await conn.sendMessage(m.chat, { 
      image: buffer,
      caption: `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🖼️ تـم اسـتـعـادة الـهـدف* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *بـأمـر الـقـائد ${devName}:*\n┃ ➲ الـحـالـة: فـك تـشـفـيـر الـمـلصق نـاجـح\n\n> الـ Weka_7 يـكـشف الـمـستور 🦅`,
      contextInfo: {
          mentionedJid: [m.sender],
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363225356834044@newsletter',
              newsletterName: '亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗',
              serverMessageId: 100
          },
          externalAdReply: {
              title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐈𝐦𝐚𝐠𝐞 𝐃𝐞𝐜𝐨𝐝𝐞𝐫",
              body: `Restored by: ${devName} 🦅`,
              thumbnailUrl: mySovereigntyPic,
              sourceUrl: myChannel,
              mediaType: 1,
              renderLargerThumbnail: false
          }
      }
    }, { quoted: m });

    await m.react("✅");

  } catch (e) {
    console.error(e);
    m.react("❌");
    await m.reply(`*❌ الـمـعـالج كـرف.. الـمطور ${devName} بـيـصلح الـعدسـات! 🚮*`);
  }
};

toimg.usage = ["لصوره"];
toimg.category = "tools";
toimg.command = ["لصوره", "toimage", "toimg"];

export default toimg;
