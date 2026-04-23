/* =========== 亗 PREDATOR AI - SPEED RADAR 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Speed Response Metrics ⚡
 * ======================================================== */

const handler = async (m, { conn }) => {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  const start = process.hrtime.bigint();
  await m.react('⚡');
  const end = process.hrtime.bigint();
  const ping = Number(end - start) / 1e6;
  
  const speedMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚡ رادار قـيـاس الـسـرعة* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح تـقـنـي مـن ${devName}:*
┃ ➲ سـرعـة الـرد: \`${ping.toFixed(2)}ms\`
┃ ➲ الـحـالـة: طـيـران 🚀

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *الـسـرعـة دي مـش لـلـنـرمـات 👞*
   *بـقـيـادة الـ Predator: ${devName}* 👑
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

  await conn.sendMessage(m.chat, {
    text: speedMsg,
    contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363225356834044@newsletter',
            newsletterName: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗',
            serverMessageId: 100
        },
        externalAdReply: {
            title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐒𝐩𝐞𝐞𝐝 𝐓𝐞𝐬𝐭",
            body: `Response Time: ${ping.toFixed(2)}ms | Dev: ${devName} 🦅`,
            thumbnailUrl: mySovereigntyPic,
            sourceUrl: myChannel,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
  }, { quoted: m });
};

handler.command = ["بنج", "ping"];
handler.category = "info";
handler.usage = ["بنج"];

export default handler;
