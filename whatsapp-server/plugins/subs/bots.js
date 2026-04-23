const run = async (m, { conn, bot }) => {
  // الرسالة اللي طلبتها (قصف جبهة)
  const warningText = `⚠️ جـاي تـشـغـل بـوت عـمـك *أحـمـد عـبـد الـنـاصـر* يـا كـلـب؟ 😂🐕\n\n*الـسـيـطـرة لـلـمـفـتـرس فـقـط.. مـلـوك الـمـجـال مـش بـتـوع عـيـال!* 🦅🔥`;

  const sub = global.subBots;
  if (!sub) return m.reply("❌ نـظـام الـتـدمـيـر الـفـرعـي غـيـر مـتـاح حـالـيـاً");

  const bots = sub.list();
  
  // لو مفيش بوتات، برضه هيديله الرسالة بتاعتك الأول
  if (bots.length === 0) {
      return await conn.sendMessage(m.chat, { text: warningText }, { quoted: m });
  }

  let text = `*╭───────────────╮*
*│  亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐒𝐔𝐁-𝐁𝐎𝐓𝐒 亗 │*
*╰───────────────╯*

${warningText}

*┏━━━ 亗 [ الـقـائـمـة ] 亗 ━━━┓*\n`;
  
  const mentions = [];
  
  bots.forEach((b, i) => {
    const jid = b.phone ? `${b.phone}@s.whatsapp.net` : null;
    if (jid) mentions.push(jid);
    
    text += `*┃* 💀 *#${i+1}* \n`;
    text += `*┃* 📱 الرقم: ${jid ? `@${b.phone}` : 'مـخـفـي'}\n`;
    text += `*┃* 📍 الحالة: ${b.connected ? '🟢 Active' : '🔴 Dead'}\n`;
    text += `*┃* 🆔 الايدي: ${b.id}\n`;
    text += `*┃* ──────────────\n`;
  });
  
  text += `*┗━━━━━━━━━━━━━━━━━━┛*
\n> *📊 إجمالي التابعين: ${bots.length}*`;

  // استخدام الصورة النيون اللي بتعبر عن Weka_7
  const img = "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg";

  await conn.sendMessage(m.chat, {
    text: text,
    mentions: mentions,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999,
      externalAdReply: {
        title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐃𝐎Ｍ𝐈𝐍𝐀𝐓𝐈𝐎𝐍 亗",
        body: "🦅 Created By Ahmed_wek7",
        thumbnailUrl: img,
        sourceUrl: 'https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a', // قناتك
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

run.command = ["البوتات", "bots"];
run.noSub = true;
run.usage = ["تنصيب"];
run.category = "البوتات";
export default run;
