/* =========== 亗 PREDATOR AI - CLOUD INFILTRATION 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Speed Media To URL Conversion ⚡
 * ============================================================ */

import { uploadToCatbox } from "../../system/utils.js";

const handler = async (m, { conn, command }) => {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime) throw `*⚠️ يـا "نـرم" اعـمل ريـبـلاي عـلى (صـورة/فـيديو/صـوت) عـشان الـ Predator يـحوله لـرابط! 🤡*`;
  
  await m.react("📡");

  try {
    const media = await q.download();
    // تحويل المادة إلى نبضات سحابية عبر Catbox
    const link = await uploadToCatbox(media);
    
    const successMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *☁️ بـروتوكول الـرفـع الـسحابـي* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *تـم الـتـنـفـيذ بـأمـر الـقـائد: ${devName}*\n┃ ➲ الـحـالـة: تـم تـوليد الرابـط بـنجاح\n┃ ➲ الـرابـط: \`\`\`${link}\`\`\`\n\n> الـ Predator يـسيـطر عـلى الـسـحابـة 🦅`;

    await conn.sendButton(m.chat, {
      imageUrl: /image/.test(mime) ? link : mySovereigntyPic,
      bodyText: successMsg,
      footerText: `Sovereign Tech by: ${devName} 🦅`,
      buttons: [
        { name: "cta_copy", params: { display_text: "📋╎ نـسـخ الـرابط الـسحـابـي", copy_code: link } },
      ],
      mentions: [m.sender],
      newsletter: {
        name: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗',
        jid: '120363225356834044@newsletter'
      },
      interactiveConfig: {
        buttons_limits: 10,
        list_title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
        button_title: "Explore Sovereignty",
        canonical_url: myChannel
      }
    }, m);

    await m.react("✅");

  } catch (e) {
    console.error(e);
    m.react("❌");
    m.reply(`*❌ الـرادار فـشل فـي الـرفع.. الـمطور ${devName} بـيصلح الـسيرفر! 🚮*`);
  }
};

handler.usage = ["لرابط"];
handler.category = "tools";
handler.command = ['لرابط', 'image2url', 'url'];

export default handler;
