const handler = async (m, { conn, command }) => {
  const isOwner = m.sender.includes("201554582851");

  // حركة المطور أحمد (يا عم المجال) لو نسي يعمل ريبلاي
  if (!m.quoted && isOwner) {
    return m.reply("يا عم المجال.. ركز شوية! 😅 عايزني أمسح إيه؟ الهوا؟ رد على الرسالة اللي مش عاجباك يا دكتور! 🦅🩺");
  }

  // لو مستخدم عادي ونسي يعمل ريبلاي
  if (!m.quoted) {
    return m.reply("🌹 - رد على الرسالة اللي عايز تمسحها يا ذكي.. مش بنجم أنا! 🤡");
  }

  try {
    // رياكت الممحاة
    await m.react("🧹");

    // حذف الرسالة اللي معمول عليها ريبلاي
    await m.quoted.delete();

    // حذف رسالة الأمر نفسه (عشان الشات يفضل نضيف)
    await m.delete();

    // اختيار رد ساخر بعد الحذف
    const deleteSnaps = [
        "🚮 تم إزالة القمامة بنجاح..",
        "🧹 نظفنا الشات من العك ده، شكراً يا أدمن.",
        "🚫 الرسالة دي مكنش ليها لزوم من الأول أصلاً.",
        "🌬️ اختفت في ظروف غامضة.. عقبال صاحبها!"
    ];
    const randomMsg = deleteSnaps[Math.floor(Math.random() * deleteSnaps.length)];
    
    // إرسال رسالة تأكيد بتختفي بعد 5 ثواني (لو عندك ميزة الحذف التلقائي)
    console.log(`[!] Dev Ahmed deleted a message in: ${m.chat}`);

  } catch (e) {
    m.reply("❌ شكل الرسالة دي محمية ولا إيه؟ غالباً ناقصني صلاحيات أدمن يا ديف! 🚮");
  }
};

handler.command = ["حذف", "امسح", "del"];
handler.usage = ['حذف'];
handler.category = "admin";
handler.admin = true;
handler.botAdmin = true; // لازم يكون البوت أدمن عشان يمسح رسايل غيره

export default handler;
