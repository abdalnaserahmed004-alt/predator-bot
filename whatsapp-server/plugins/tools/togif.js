/* =========== 亗 PREDATOR AI - MOTION PROCESSING 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Speed Video to GIF Conversion ⚡
 * ============================================================ */

const toGif = async (m, { conn }) => {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!/video/.test(mime)) {
      return m.reply(`*⚠️ يـا "نـرم" رد عـلى فـيـديـو عـشان الـ Predator يـحـوله لــ GIF بـالـجـزمـة! 🤡*`);
    }

    await m.react("📽️");

    const buffer = await q.download();
    
    await conn.sendMessage(m.chat, { 
      video: buffer, 
      gifPlayback: true,
      caption: `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🎬 تـم تـحويـل الـهـدف* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *بـأمـر الـقـائد ${devName}:*\n┃ ➲ الـحـالـة: مـعـالـجـة مـتـحـركـة نـاجـحـة\n\n> الـ Predator يـتـلاعب بـالـزمن 🦅`,
      contextInfo: {
          mentionedJid: [m.sender],
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363225356834044@newsletter',
              newsletterName: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗',
              serverMessageId: 100
          },
          externalAdReply: {
              title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐌𝐨𝐭𝐢𝐨𝐧 𝐄𝐧𝐠𝐢𝐧𝐞",
              body: `Processed by: ${devName} 🦅`,
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
    await m.reply(`*❌ الـمـعـالج كـرف.. الـمطور ${devName} بـيـصلح الـتروس! 🚮*`);
  }
};

toGif.usage = ["لجيف"];
toGif.category = "tools";
toGif.command = ["لجيف", "togif", "لچيف"];

export default toGif;
