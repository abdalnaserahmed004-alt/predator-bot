/* =========== 亗 PREDATOR AI - SONIC EXTRACTION 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Fidelity Audio Stream Isolator ⚡
 * ======================================================== */

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

const toAudio = async (m, { conn }) => {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!/video|audio/.test(mime)) {
      return m.reply(`*⚠️ يـا "نـرم" رد عـلى فـيديو عـشان الـ Predator يـعـزلـك الـصوت بـالـجـزمـة! 🤡*`);
    }

    await m.react("🎙️");

    const tmp = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);

    const inputFile = path.join(tmp, `${Date.now()}_in`);
    const outputFile = path.join(tmp, `${Date.now()}.mp3`);

    fs.writeFileSync(inputFile, await q.download());

    // تنفيذ عملية العزل التقني للذبذبات
    await execAsync(`ffmpeg -i "${inputFile}" -vn -acodec libmp3lame -q:a 2 "${outputFile}" -y`);

    const successMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🎵 تـم عـزل الـذبـذبـات* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *بـأمـر الـقـائد ${devName}:*\n┃ ➲ الـحـالـة: اسـتـخراج صـوتـي عـالي الـدقة\n\n> الـ Predator يـسـحب الأثـر الـصوتي 🦅`;

    await conn.sendMessage(m.chat, { 
      audio: fs.readFileSync(outputFile), 
      mimetype: "audio/mpeg",
      fileName: `Sovereign_Audio.mp3`,
      contextInfo: {
          mentionedJid: [m.sender],
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363225356834044@newsletter',
              newsletterName: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗',
              serverMessageId: 100
          },
          externalAdReply: {
              title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐒𝐨𝐧𝐢𝐜 𝐄𝐧𝐠𝐢𝐧𝐞",
              body: `Isolated by: ${devName} 🦅`,
              thumbnailUrl: mySovereigntyPic,
              sourceUrl: myChannel,
              mediaType: 1,
              renderLargerThumbnail: false
          }
      }
    }, { quoted: m });

    // تنظيف مسرح الجريمة التقنية
    if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    
    await m.react("✅");

  } catch (e) {
    console.error(e);
    m.react("❌");
    await m.reply(`*❌ الـمـعـالج كـرف.. الـمطور ${devName} بـيـصلح الـتـرددات! 🚮*`);
  }
};

toAudio.usage = ["لصوت"];
toAudio.category = "tools";
toAudio.command = ["لصوت", "tomp3", "استخراج_صوت"];

export default toAudio;
