/* =========== 亗 WEKA_7_BOT - TIKTOK HIJACKER 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🛰️ Component : Global TikTok Data Extractor 📥⚡
 * ======================================================== */

import crypto from 'crypto';
import cheerio from 'cheerio';
import axios from 'axios';
import qs from 'qs';

const ff = async (m, { text, conn }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  
  if (!text) {
    return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ فين رابط التيك توك؟ 🤨*\n\nاكتب: .تيك (الرابط)\n\n> *بـأمر الـقـيـادة: Ahmed_wek7* 🦅`);
  }

  // رياكت "جاري سحب التيك توك"
  await m.react('🛰️');
  
  try {
    const videoData = await downloadTikTok(text);

    if (!videoData.videoUrl && !videoData.audioUrl) {
      await m.react('❌');
      return m.reply(`*❌ السيرفر طردك يا "فاشل"! 🤡*\nالرابط غلط أو الفيديو اتمسح.. روح اتعلم من الالمطور احمد_wek7 إزاي تجيب روابط! 🚮`);
    }

    const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📥 تـم سـحب الـبيانات بـنجاح*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـقائد Ahmed_wek7:*
┃ ➲ *الـمـبدع:* ${videoData.author || "غير معروف"}
┃ ➲ *الـوصـف:* ${videoData.description || "بدون وصف"}
┃ ➲ *الـطلب بـواسطة:* @${m.sender.split('@')[0]}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *خـد الـفيديو يـا "نـرم" وابـعد عني* 🚮
   *مملكة الـ Weka_7 تـحييكم!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Developed by Ahmed_wek7 🦅`;

    if (videoData.videoUrl) {
      await conn.sendMessage(m.chat, { 
        video: { url: videoData.videoUrl }, 
        caption: msg,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
            body: "تـم تـحميل تـيك تـوك بـنـجاح ✅",
            thumbnailUrl: "https://telegra.ph/file/0680061e89b456e70a7b4.jpg",
            sourceUrl: myChannel,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: m });
    }
    
    // إرسال الصوت كـ "هدية" إضافية للمنبطحين
    if (videoData.audioUrl) {
      await conn.sendMessage(m.chat, { 
        audio: { url: videoData.audioUrl }, 
        mimetype: 'audio/mpeg',
        ptt: false 
      }, { quoted: m });
    }

    await m.react('✅');
    
  } catch (error) {
    console.error(error.message);
    await m.react('❌');
    m.reply(`*❌ حصل عطل فني يا "دمج"! 🤡*\nالرابط ده مش نافع.. ابعت سكرين للالمطور احمد_wek7 يصلحلك خيبتك! 🐍🚮`);
  }
};

ff.usage = ["تيك"]
ff.category = "downloads";
ff.command = ["تيك", "tiktok", "tt"];

export default ff;

// --- [ مـحرك سـحب الـبيانات - لا تـلمسـه يـا "نـرم" 😂 ] ---
async function downloadTikTok(url) {
  let data = qs.stringify({
    'id': url,
    'locale': 'en',
    'tt': crypto.randomBytes(8).toString('hex'),
  });

  let config = {
    method: 'POST',
    url: 'https://ssstik.io/abc?url=dl',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  const response = await axios.request(config);
  const $ = cheerio.load(response.data);

  return {
    author: $('h2').first().text().trim(),
    description: $('.maintext').text().trim(),
    videoUrl: $('a[href*="tikcdn.io"]:not(#hd_download)').first().attr('href'),
    audioUrl: $('.download_link.music').attr('href'),
    hdVideo: $('#hd_download').attr('href')
  };
}
