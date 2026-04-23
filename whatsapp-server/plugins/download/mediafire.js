/* =========== 亗 PREDATOR AI - MF DOWNLOADER 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🛰️ Component : High-Speed File Hijacker 📁⚡
 * ======================================================== */

import axios from 'axios';

const handler = async (m, { conn, text, command }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";

  if (!text) {
    return m.reply(`*⚠️ ركز يا "نرم"! فين رابط الميديا فاير؟ 🤨*\n\nاكتب: .${command} (رابط الملف)\n\n> *بـأمر الـقـيـادة: Ahmed Abdel Nasser* 🦅`);
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

👑 *بـأمر الـمـطور Ahmed Abdel Nasser:*
┃ ➲ *الاسـم:* ${fileInfo.filename}
┃ ➲ *الـنوع:* ${fileInfo.type}
┃ ➲ *الـحـجم:* ${fileInfo.filesize}
┃ ➲ *الـطـلـب بـواسطة:* @${m.sender.split('@')[0]}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *خـد الـملف يـا "نـرم" وحافظ عليه* 🚮
   *مملكة الـ Predator بـتمـسي عـليك!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Developed by Ahmed Abdel Nasser 🦅`;

    await conn.sendMessage(m.chat, {
      document: { url: fileInfo.downloadUrl },
      mimetype: fileInfo.mimetype || 'application/octet-stream',
      fileName: fileInfo.filename,
      caption: msg,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
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
    await m.reply(`*❌ فشلت في سحب الملف يا "فاشل"! 🤡*\nالرابط منتهي أو السيرفر مش طايقك.. ارجع للمطور أحمد يشوف لك حل! 🐍🚮`);
  }
};

handler.usage = ["ميديافاير"]
handler.category = "downloads";
handler.command = /^(mf|mediafire|ميديافاير)$/i;

export default handler;
