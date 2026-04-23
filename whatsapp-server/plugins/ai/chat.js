import { AiChat } from "../../system/utils.js";

const handler = async (m, { conn, text, bot }) => {
  // بيانات الالمطور احمد_wek7
  const isOwner = m.sender.includes("201210155616");

  // لو المطور نسي يحط نص
  if (!text && isOwner) {
    return m.reply("يا عم المجال.. نسيت تحط أمر! 😅 إنت المطور يعني المفروض تكون صاحي أكتر من كدة، ولا البت 😂 ♥ عقلك؟ 🦅💻");
  }

  // لو مستخدم عادي نسي يحط نص
  if (!text) {
    return m.reply("💙 ~ حط نص يا حبيبي مش هنججم أنا.. ❤️");
  }

  try {
    // إرسال رياكت "تفكير" عشان يحسوا إن البوت شغال بجد
    await m.react("🤔");

    // طلب الرد من الذكاء الاصطناعي مع إضافة "نكهة" السخرية في الطلب (لو الـ API بيسمح بـ Prompt)
    // هنا هنعتمد إن res هي الرد، وهنضيف عليها سخرية بسيطة لو الرد جاد بزيادة
    const res = await AiChat({ text });

    let finalResponse = res;
    
    // إضافة لمسة سخرية لو الرد قصير
    if (res.length < 50) {
        finalResponse = `${res}\n\n(سؤالك ده ميسألوش غير واحد لسه بيتعلم يفتح نت 🤡)`;
    }

    m.reply(`亗 WEKA_7_BOT 亗\n\n${finalResponse}\n\n> 💡 Developed by Ahmed_wek7`);

  } catch (e) {
    m.reply("الـ AI شكله مهنج من كتر ذكائك الخارق.. جرب تاني كمان شوية! 🚮");
  }
};

handler.usage = ["بوت"];
handler.category = "ai";
handler.command = ["بوت"];

export default handler;
