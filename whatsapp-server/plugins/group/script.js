/* =========== 亗 PREDATOR AI - SOURCE CODE 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Level Technical Sovereignty ⚡
 * ======================================================== */

let handler = async (m, { conn }) => {
    const devName = "Ahmed Abdel Nasser";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة
    const myGithub = "https://github.com/deveni0/Pomni-AI"; // لينك الريبو بتاعك
    const myVideo = "https://youtu.be/hA5aCpvesJE"; // فيديو الشرح

    const context = {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363225356834044@newsletter', // لو عندك JID لقناتك حطه هنا
            newsletterName: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗',
            serverMessageId: 100
        },
        externalAdReply: {
            title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐒𝐨𝐯𝐞𝐫𝐞𝐢𝐠𝐧𝐭𝐲 𝐒𝐲𝐬𝐭𝐞𝐦",
            body: `Developed by: ${devName} 🦅`,
            thumbnailUrl: mySovereigntyPic,
            sourceUrl: myChannel,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    };

    const scMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🐍 سـورس الـسـيـادة الـمـطـور* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح تـقـني مـن ${devName}:*
┃ ➲ 𝐆𝐢𝐭𝐇𝐮𝐛: ${myGithub}
┃ ➲ 𝐕𝐢𝐝𝐞𝐨: ${myVideo}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *حـط نـجـمة لـلـريـبـو يـا "نـرم" بـالـجـزمة 👞*
   *تـحـت رقـابـة الـ Predator 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

    await conn.sendMessage(m.chat, { 
        text: scMsg,
        contextInfo: context
    }, { quoted: m });
}

handler.usage = ["سكريبت"];
handler.category = "main";
handler.command = ["سكريبت", "سورس", "sc"];

export default handler;
