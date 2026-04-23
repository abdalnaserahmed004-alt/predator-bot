const handler = async (m, { conn, bot, text }) => {
  const isOwner = m.sender.includes("201554582851");
  let targetLid = m.mentionedJid?.[0] || m.quoted?.sender;
  
  // حركة المطور أحمد (يا عم المجال)
  if (!targetLid && isOwner) {
    return m.reply("يا عم المجال.. عايز تدي إنذار لمين؟ للهوا؟ 😅 حدد ضحية يا دكتور بدل ما أديك إنت إنذار! 🦅🩺");
  }

  if (!targetLid) return m.reply('⚠️ *منشن الشخص أو رد على رسالته عشان أعلمه الأدب* ⚠️');

  const metadata = await conn.groupMetadata(m.chat);
  const user = metadata.participants.find(p => p.id === targetLid);

  if (!user) return m.reply("❌ المستخدم ده شكله خلع أو مش موجود في الجروب أصلاً.");

  // حماية المطور من الإنذارات
  if (targetLid.includes("201554582851")) {
    return m.reply("بتهزر؟ عايز تدي إنذار لأسيادك؟ طب خد إنت إنذار في كرامتك.. 🚮");
  }

  global.db.groups[m.chat] ??= {};
  global.db.groups[m.chat].warnings ??= {};

  const id = targetLid;
  const warnCount = global.db.groups[m.chat].warnings[id] = (global.db.groups[m.chat].warnings[id] || 0) + 1;

  await m.react("⚠️");
  
  await conn.sendMessage(m.chat, {
    text: `*亗 PREDATOR WARNING SYSTEM 亗*\n\n⚠️ تم إعطاء إنذار لـ الكائن ده: @${id.split("@")[0]}\n📊 إجمالي الإنذارات: ${warnCount} / 3\n\n> ركز يا شاطر عشان الإنذار الجاي هتمسح بكرامتك الأرض! 🥾`,
    mentions: [id],
    contextInfo: {
        externalAdReply: {
            title: "نظام الإنذارات الصارم",
            body: "Developed by Dev Ahmed",
            thumbnailUrl: bot.config.info.images[0],
            sourceUrl: bot.config.info.urls.channel,
            mediaType: 1,
            showAdAttribution: true
        }
    }
  });
};

// --- الرادار المسؤول عن تنفيذ الطرد التلقائي ---
handler.before = async (m, { conn }) => {
  if (!m.isGroup) return false;
  const g = global.db?.groups?.[m.chat];
  if (!g?.warnings) return false;

  const user = m.sender;
  if (!g.warnings[user]) return false;

  // تنفيذ الطرد عند الوصول لـ 3 إنذارات
  if (g.warnings[user] >= 3) {
    await conn.sendMessage(m.chat, {
      text: `🚫 @${user.split("@")[0]} خدت 3 إنذارات يا فاشل.. والآن وقت التنظيف! 🚮\n\nإلى اللقاء في الجحيم.. 🥾`,
      mentions: [user]
    });

    await conn.groupParticipantsUpdate(m.chat, [user], "remove");
    delete g.warnings[user]; // تصقير العداد بعد الطرد
    return true;
  }

  return false;
};

handler.command = ["انذار", "تحذير", "warn"];
handler.usage = ['انذار'];
handler.category = "admin";
handler.admin = true;
handler.botAdmin = true;

export default handler;
