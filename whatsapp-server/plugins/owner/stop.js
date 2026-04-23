/* =========== 亗 PREDATOR AI - SYSTEM TERMINATION 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : Total System Blackout Protocol ⚡
 * ============================================================ */

const test = async (m, { conn, bot }) => {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  await m.react("🌑");
  
  const stopMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🌑 بـروتوكول الـتـعـتـيم الـشامل* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر قـطـعي مـن الـقائد ${devName}:*
┃ ➲ إيـقـاف جـميـع الـعـمـليـات الـحـيوية
┃ ➲ الـحـالـة: الـنـظـام يـدخل وضـع الـسـبات

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *الـنـور هـيـقـطع عـليـكم يـا نـرمـات 👞*
   *تـحـت سـيـطرة الـ Predator 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

  await conn.sendMessage(m.chat, { 
    text: stopMsg,
    contextInfo: {
        externalAdReply: {
            title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
            body: `System Shutting Down: ${devName} 🦅`,
            thumbnailUrl: mySovereigntyPic,
            sourceUrl: myChannel,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
  }, { quoted: m });
  
  // تأخير ثانية لضمان وصول الرسالة قبل الانقطاع
  setTimeout(() => {
    bot.stop();
  }, 1000); 
};

test.category = "owner";
test.command = ["ايقاف", "stop", "اوف", "off"];
test.owner = true;

export default test;
