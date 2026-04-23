/* =========== 亗 WEKA_7_BOT - DATA EXTRACTION 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Precision OCR Intelligence ⚡
 * ======================================================== */

import axios from 'axios';
import FormData from 'form-data';

let handler = async (m, { conn }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  try {
    if (!m.quoted) return m.reply(`*⚠️ يـا "نـرم" رد عـلى الـصـورة اللي عـايز الـ Weka_7 يـسحب مـنها الـبيانات! 🤡*`);
    
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    if (!/image/.test(mime)) return m.reply(`*❌ دي مـش صـورة يـا "دمـج".. الـرادار بـيـتعامل مـع الـبيانات الـبصرية بـس! 🚮*`);

    await m.react("👁️‍🗨️");

    const buffer = await q.download();
    const form = new FormData();
    form.append('image', buffer, { filename: 'target.jpg', contentType: 'image/jpeg' });

    // بـدء عـمـلية فـك الـتـشـفـير
    const res = await axios.post('https://emam-api.web.id/home/sections/Tools/api/ocr-image', form, {
      headers: form.getHeaders()
    });

    if (!res.data || !res.data.result) throw new Error("No data extracted");

    const successMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📄 نـتـائـج فـك الـتـشـفـيـر* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمـر الـقـائد ${devName}:*
┃ ➲ تـم اسـتـخراج الـبـيانات بـنجاح

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
${res.data.result}
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯

> الـ Weka_7 قـرأ الـواقـع بـالـجـزمـة 👞
> Power by Ahmed_wek7 🦅`;

    await conn.sendMessage(m.chat, { 
        text: successMsg,
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `OCR Intelligence: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    await m.react("✅");

  } catch (error) {
    console.error(error);
    m.react("❌");
    await m.reply(`*❌ الـمـعالج كـرف.. الـمطور ${devName} بـيـراجع الـخوارزمـيـات! 🚮*`);
  }
};

handler.usage = ["نسخ"];
handler.command = ["نسخ", "ocr", "اسحب"];
handler.category = "tools";

export default handler;
