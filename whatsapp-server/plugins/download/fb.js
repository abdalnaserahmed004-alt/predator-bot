/* =========== 亗 WEKA_7_BOT - FB DOWNLOADER 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🛰️ Component : Professional FB Downloader 📥⚡
 * ======================================================== */

import axios from 'axios';
import qs from 'qs';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, command }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";

  if (!text) {
    return m.reply(`*⚠️ ركز يا "نرم"! فين الرابط؟ 🤨*\n\nاكتب: .${command} (رابط الفيديو)\n\n> *بـأمر الـقـيـادة: Ahmed_wek7* 🦅`);
  }

  // رياكت البداية (تسلل للبيانات)
  await m.react('📥');

  try {
    const tokenRes = await userVerify(text);
    const htmlRes = await ajaxSearch(text, tokenRes.k_token, tokenRes.k_exp, tokenRes.token);
    const $ = cheerio.load(htmlRes.data);

    const title = $('.detail h3').text().trim() || 'فيديو فيسبوك';
    const downloads = [];

    $('table.table tbody tr').each((_, el) => {
      const quality = $(el).find('.video-quality').text().trim();
      const url = $(el).find('a.download-link-fb').attr('href');
      if (quality && url) downloads.push({ quality, url });
    });

    if (!downloads.length) throw new Error('No links found');

    const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📥 تـم جـلب الـفـيـديـو بـنـجـاح*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـمـطور Ahmed_wek7:*
┃ ➲ *الـعنوان:* ${title}
┃ ➲ *الـطلب بـواسطة:* @${m.sender.split('@')[0]}
┃ ➲ *الـقـناة:* Ahmed_wek7 TSHANAL

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *خـد الـفيديو يـا "نـرم" وفـكـنا* 🚮
   *مـمنـوع تـحمل حـاجـة تـغـضب ربـنا!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Developed by Ahmed_wek7 🦅`;

    await conn.sendMessage(m.chat, {
      video: { url: downloads[0].url },
      caption: msg,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
          body: "تـم تـحـمـيـل الـفـيـديـو بـأمر أحـمـد",
          thumbnailUrl: "https://telegra.ph/file/0680061e89b456e70a7b4.jpg",
          sourceUrl: myChannel,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.log(e.message);
    await m.react('❌');
    await m.reply(`*❌ فشلت المهمة يا "فاشل"! 🤡*\nالرابط غلط أو السيرفر وقع.. روح اشتكي للالمطور احمد_wek7 لو تقدر! 🐍🚮`);
  }
};

handler.usage = ["فيس"]
handler.category = "downloads";
handler.command = /^(فيس|فيسبوك|fb|fbdl|facebook)$/i;

export default handler;

// --- [ الدوال التقنية (لا تلمسها يا "نرم" 😂) ] ---

async function userVerify(url) {
  const data = qs.stringify({ url });
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
    'Referer': 'https://fdownloader.net/id'
  };
  const res = await axios.post('https://fdownloader.net/api/userverify', data, { headers });
  return res.data;
}

async function ajaxSearch(query, token, exp, cftoken) {
  const data = qs.stringify({
    k_exp: exp, k_token: token, q: query,
    lang: 'id', web: 'fdownloader.net', v: 'v2', cftoken
  });
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
    'Referer': 'https://fdownloader.net/id'
  };
  const res = await axios.post('https://v3.fdownloader.net/api/ajaxSearch', data, { headers });
  return res.data;
}
