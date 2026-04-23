/* =========== 亗 WEKA_7_BOT - SYSTEM TERMINATION 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Total System Blackout Protocol ⚡
 * ============================================================ */

const test = async (m, { conn, bot }) => {
  const devName = "Ahmed_wek7";
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
   *تـحـت سـيـطرة الـ Weka_7 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

  await conn.sendMessage(m.chat, { 
    text: stopMsg,
    contextInfo: {
        externalAdReply: {
            title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
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
