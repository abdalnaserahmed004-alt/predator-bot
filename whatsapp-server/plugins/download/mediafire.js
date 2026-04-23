/* =========== 亗 WEKA_7_BOT - MF DOWNLOADER 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🛰️ Component : High-Speed File Hijacker 📁⚡
 * ======================================================== */

import axios from 'axios';

const handler = async (m, { conn, text, command }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";

  if (!text) {
    return m.reply(`*⚠️ ركز يا "نرم"! فين رابط الميديا فاير؟ 🤨*\n\nاكتب: .${command} (رابط الملف)\n\n> *بـأمر الـقـيـادة: Ahmed_wek7* 🦅`);
  }

  // رياكت "جاري سحب الملف"
  await m.react('🛰️');

  try {
    const apiUrl = `https://emam-api.web.id/home/sections/Download/api/api/mediafire?url=${encodeURIComponent(text)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data.status) throw new Error('Failed to fetch data');

    const fileInfo = data.data;

    const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📂 تـم سـحـب الـمـلـف بـنـجـاح*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـمـطور Ahmed_wek7:*
┃ ➲ *الاسـم:* ${fileInfo.filename}
┃ ➲ *الـنوع:* ${fileInfo.type}
┃ ➲ *الـحـجم:* ${fileInfo.filesize}
┃ ➲ *الـطـلـب بـواسطة:* @${m.sender.split('@')[0]}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *خـد الـملف يـا "نـرم" وحافظ عليه* 🚮
   *مملكة الـ Weka_7 بـتمـسي عـليك!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Developed by Ahmed_wek7 🦅`;

    await conn.sendMessage(m.chat, {
      document: { url: fileInfo.downloadUrl },
      mimetype: fileInfo.mimetype || 'application/octet-stream',
      fileName: fileInfo.filename,
      caption: msg,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
          body: `تـم جـلب [ ${fileInfo.filename} ] بـنـجـاح ✅`,
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
    await m.reply(`*❌ فشلت في سحب الملف يا "فاشل"! 🤡*\nالرابط منتهي أو السيرفر مش طايقك.. ارجع للالمطور احمد_wek7 يشوف لك حل! 🐍🚮`);
  }
};

handler.usage = ["ميديافاير"]
handler.category = "downloads";
handler.command = /^(mf|mediafire|ميديافاير)$/i;

export default handler;
