const handler = async (m, { conn, command, text }) => {
  const isOwner = m.sender.includes("201210155616");

  // حركة الالمطور احمد_wek7 (يا عم المجال)
  // لو المطور بيحاول يستخدم الأمر في شات خاص مثلاً
  if (!m.isGroup && isOwner) {
    return m.reply("يا عم المجال.. إنت بتقفل شاتك الخاص ليه؟ هو حد باصص لك فيه؟ 😅 ركز في الجروبات يا دكتور! 🦅🩺");
  }

  try {
    if (command === "قفل") {
      await conn.groupSettingUpdate(m.chat, 'announcement');
      
      // رد ساخر عند القفل
      const closeMessages = [
        "🔒 *تم قفل الشات*.. مسمعش صوت نملة، السادة الأدمن بس اللي يتكلموا! 🤫",
        "🔒 اتقفل القفص.. الرغي الزيادة ممنوع عشان الصداع. 🔇",
        "🔒 ششششش.. Weka_7_BOT أمر بقفل الشات، انبطاح للكل! 🦅"
      ];
      const randomClose = closeMessages[Math.floor(Math.random() * closeMessages.length)];
      await m.reply(randomClose);
      await m.react("🔒");

    } else if (command === "فتح") {
      await conn.groupSettingUpdate(m.chat, 'not_announcement');
      
      // رد عند الفتح
      const openMessages = [
        "🔓 *تم فتح الشات*.. انطلقوا بس اللي هيرغي كتير هقصه! 😈",
        "🔓 اتفك الحظر.. وروني شطارتكم بس من غير وجع دماغ. ✅",
        "🔓 الجروب اتفتح.. اللي عنده كلمة مفيدة يقولها، اللي معندوش يفضل ساكت أحسن. 🚮"
      ];
      const randomOpen = openMessages[Math.floor(Math.random() * openMessages.length)];
      await m.reply(randomOpen);
      await m.react("🔓");
    }
    
  } catch (e) {
    m.reply("❌ حصل مشكلة.. غالباً في أدمن أذكى مني شال صلاحياتي! 🚮");
  }
};

handler.usage = ["قفل", "فتح"];
handler.category = "admin";
handler.command = ["قفل", "فتح"];
handler.admin = true;
handler.botAdmin = true;

export default handler;
