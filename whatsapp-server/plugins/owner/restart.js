/* =========== 亗 PREDATOR AI - SYSTEM REBOOT 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Level System Initialization ⚡
 * ======================================================== */

const test = async (m, { conn, bot }) => {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  await m.react("🛰️");
  
  const rebootMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚡ بـروتوكول إعـادة الـتـهـيئة* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح تـقـنـي مـن ${devName}:*
┃ ➲ جـاري إعـادة تـشغـيل الـنـظـام...
┃ ➲ الـحـالـة: تـحـديث تـرسانـة الـ Predator

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *ثـوانـي والـسـيطرة تـرجـع كـامـلة 👞*
   *بـقـيـادة الـقائد: ${devName}* 👑
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

  await conn.sendMessage(m.chat, { 
    text: rebootMsg,
    contextInfo: {
        externalAdReply: {
            title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
            body: `System Rebooting: ${devName} 🦅`,
            thumbnailUrl: mySovereigntyPic,
            sourceUrl: myChannel,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
  }, { quoted: m });
  
  // تأخير ثانية لضمان وصول الرسالة قبل القفل
  setTimeout(() => {
    bot.restart();
  }, 1000); 
};

test.usage = ["رستارت"]
test.category = "owner";
test.command = ["رستارت", "restart", "رست"];
test.owner = true;

export default test;
