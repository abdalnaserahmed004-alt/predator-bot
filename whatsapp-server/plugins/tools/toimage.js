/* =========== 亗 PREDATOR AI - VISUAL RECOVERY 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Fidelity Sticker to Image Decoder ⚡
 * ======================================================== */

const toimg = async (m, { conn }) => {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!/sticker/.test(mime)) {
      return m.reply(`*⚠️ يـا "نـرم" رد عـلى مـلصق عـشان الـ Predator يـفـك ضـغـطه لـصـورة! 🤡*`);
    }

    await m.react("🖼️");

    const buffer = await q.download();
    
    await conn.sendMessage(m.chat, { 
      image: buffer,
      caption: `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🖼️ تـم اسـتـعـادة الـهـدف* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *بـأمـر الـقـائد ${devName}:*\n┃ ➲ الـحـالـة: فـك تـشـفـيـر الـمـلصق نـاجـح\n\n> الـ Predator يـكـشف الـمـستور 🦅`,
      contextInfo: {
          mentionedJid: [m.sender],
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363225356834044@newsletter',
              newsletterName: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗',
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
