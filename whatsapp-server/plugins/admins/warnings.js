const handler = async (m, { conn, bot }) => {
  const isOwner = m.sender.includes("201554582851");
  const g = global.db.groups?.[m.chat] || {};
  const w = g.warnings || {};
  
  // تحديد الشخص اللي بنكشف عليه (لو رد على حد أو سأل عن نفسه)
  let target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
  const count = w[target] || 0;
  const isSelf = target === m.sender;

  // حركة المطور أحمد (يا عم المجال) لو سأل عن حد مش موجود
  if (!target && isOwner) {
    return m.reply("يا عم المجال.. بتكشف على مين؟ الهوا؟ 😅 حدد ضحية يا دكتور! 🦅🩺");
  }

  // لو ملوش إنذارات
  if (count === 0) {
    let msg = isSelf 
      ? `📊 @${target.split("@")[0]} معندكش أي إنذارات يا "مثالي".. بس متفرحش أوي كدة، عيني عليك! 👀`
      : `📊 الكائن ده @${target.split("@")[0]} سجله نضيف.. باين عليه بيخاف أوي! 😂`;
      
    return conn.sendMessage(m.chat, {
      text: msg,
      mentions: [target]
    });
  }

  // لو عنده إنذارات (السخرية المباشرة)
  let insult = "";
  if (count === 1) insult = "بداية الفشل.. ركز يا حبيبي عشان المرة الجاية هتوحشنا! 🚮";
  if (count === 2) insult = "فاضلك تكّة وتطير.. جهز شنطتك عشان Predator AI مبيسميش! 🥾";

  await m.react("📉");

  await conn.sendMessage(m.chat, {
    text: `*亗 PREDATOR WARNING RADAR 亗*\n\n👤 الـمـسـتـهـدف: @${target.split("@")[0]}\n⚠️ عـدد الإنـذارات: ${count} / 3\n\n> _${insult}_`,
    mentions: [target],
    contextInfo: {
        externalAdReply: {
            title: "كشف السجل الجنائي للجروب",
            body: "Developed by Dev Ahmed",
            thumbnailUrl: bot.config.info.images[0],
            sourceUrl: bot.config.info.urls.channel,
            mediaType: 1,
            showAdAttribution: true
        }
    }
  });
};

handler.command = ["انذاراتي", "انذاراته", "warns", "warnings", "الانذارات"];
handler.usage = ['الانذارات'];
handler.category = "admin";

export default handler;
