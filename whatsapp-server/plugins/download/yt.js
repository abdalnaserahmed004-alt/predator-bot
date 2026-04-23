/* =========== 亗 WEKA_7_BOT - YOUTUBE HIJACKER 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🛰️ Component : Professional YT Data Extractor 🎥⚡
 * ======================================================== */

import { Scrapy } from "meowsab";

const handler = async (m, { conn, command, text }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const devName = "Ahmed_wek7";

  if (!text) {
    return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ فين رابط اليوتيوب؟ 🤨*\n\nاكتب: .${command} (الرابط)\n\n> *بـأمر الـقائد: ${devName}* 🦅`);
  }

  if (!text.match(/youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\//)) {
    return m.reply(`*❌ الرابط ده "منبطح" زيك! حط رابط يوتيوب حقيقي يا "دمج"! 🚮🤡*`);
  }

  // رياكت "الاختراق الصامت"
  await m.react('🛰️');

  try {
    const isAudio = command === "يوت_اغنيه" || command === "ytmp3";
    const res = await (isAudio ? Scrapy.ytmp3(text) : Scrapy.ytmp4(text));
    
    if (!res?.status) throw new Error('Failed to fetch data');

    const type = isAudio ? 'AUDIO 🎵' : 'VIDEO 🎥';
    
    let caption = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n`;
    caption += `  *📥 تـم سـحـب بـيـانـات الـيـوت* \n`;
    caption += `╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n`;
    caption += `👑 *بـأمر الـمـطور ${devName}:*\n`;
    caption += `┃ ➲ *الـعنوان:* ${res.title}\n`;
    caption += `┃ ➲ *الـقـناة:* ${res.channel}\n`;
    caption += `┃ ➲ *الـنوع:* ${type}\n`;
    caption += `┃ ➲ *الـطـلـب بـواسطة:* @${m.sender.split('@')[0]}\n\n`;
    caption += `╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮\n`;
    caption += `   *خـد الـمـحتوى يـا "نـرم" وفـكـنا* 🚮\n`;
    caption += `   *مـمنوع اسـتـخـدامـه فـيـما يـغـضب الله!*\n`;
    caption += `╰─┈─┈─┈─⟞👞⟝─┈─┈─┈─╯\n`;
    caption += `> Developed by Ahmed_wek7 🦅`;

    // الرسالة الأولى: بيانات الملف بهوية القناة الجديدة
    await conn.sendMessage(m.chat, { 
      text: caption,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: `亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗`,
          body: `جـاري تـحـميـل: ${res.title}`,
          thumbnailUrl: res.thumbnail,
          sourceUrl: myChannel,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // الرسالة الثانية: إرسال الملف نفسه
    if (isAudio) {
      await conn.sendMessage(m.chat, { 
        audio: { url: res.downloadUrl }, 
        mimetype: 'audio/mpeg',
        fileName: `${res.title}.mp3`,
        contextInfo: { externalAdReply: { title: res.title, body: devName, mediaType: 1, thumbnailUrl: res.thumbnail }}
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { 
        video: { url: res.downloadUrl }, 
        caption: `*亗 تـم الـتـحـميـل بـواسـطـة ${devName} 🦅*`,
        fileName: `${res.title}.mp4`
      }, { quoted: m });
    }

    await m.react('✅');

  } catch (e) {
    console.log(e.message);
    await m.react('❌');
    await m.reply(`*❌ السيرفر طردك يا "فاشل"! 🤡*\nالرابط ميت أو الخدمة واقفة.. روح عيط للالمطور احمد_wek7! 🐍🚮`);
  }
};

handler.usage = ["يوتيوب", "يوت_اغنيه"];
handler.category = "downloads";
handler.command = ['يوت_اغنيه', 'يوتيوب', "ytmp3", "ytmp4"];

export default handler;
