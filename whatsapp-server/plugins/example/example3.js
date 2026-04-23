/* =========== 亗 WEKA_7_BOT - SOVEREIGNTY 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🛰️ Component : Interactive Sovereignty Protocol ⚡
 * ======================================================== */

const example = async (m, { conn }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const devName = "Ahmed_wek7";
  const myNum = "201210155616";

  const body = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📡 بـروتـوكـول الـسـيـادة الـرقمية*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـقائد الـجاحد ${devName}:*
┃ ➲ أهلاً بك في منطقة العمليات المحظورة.
┃ ➲ الـهدف: @${m.sender.split('@')[0]}
┃ ➲ الـوضع: "نـرم" خـاضع للـتفتيش

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *اسـتعد لـلاخـتـراق يـا "دمـج"* 🚮
   *كـل شـيء تـحت سـيطرة ${devName}!*
╰─┈─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

await conn.sendButton(m.chat, {
  imageUrl: "https://telegra.ph/file/0680061e89b456e70a7b4.jpg", // صورتك الفخمة
  bodyText: body,
  footerText: `© Created by ${devName} 亗`,
  buttons: [
    // 1. أزرار الرد السريع الساخرة
    { name: "quick_reply", params: { display_text: "🫡 تـقديم الـولاء", id: ".تست" } },
    { name: "quick_reply", params: { display_text: "👞 تـقـبيل الـحذاء", id: ".حذف_تسجيلي" } },
    
    // 2. رابط العرين السيادي
    { name: "cta_url", params: { display_text: "🔗 قـناة الـقائد أحمد", url: myChannel } },
    
    // 3. اتصال مباشر بخط النار
    { name: "cta_call", params: { display_text: "📞 هـاتـف الـجـزار", phone_number: myNum } },
    
    // 4. نسخ كود الاختراق
    { name: "cta_copy", params: { display_text: "📋 نـسخ شـفـرة ${devName}", copy_code: "WEKA_7-ULTIMATE-V1" } },
    
    // 5. منيو اختراق الأنظمة
    { name: "single_select", params: { 
      title: "🛠️ أدوات الـفـجـارة الـمطلقة",
      sections: [{
        title: "亗 أقـسـام الـسـيـطـرة 亗",
        rows: [
          { title: "🐍 رادار الـتسلل", description: "لمراقبة تحركات المنبطحين", id: ".تست1" },
          { title: "📥 سـحـب الـبيـانات", description: "لاجـتياح مـيديا الـنرمات", id: ".تست2" }
        ]
      }]
    }},
    
    // 6. طلب إذن مكالمة سيادية
    { name: "call_permission_request", params: { 
      display_text: "🤙 طـلب مـقابلة الـمـلك",
      phone_number: myNum,
      duration: 120
    }}
  ],
  mentions: [m.sender],
  newsletter: {
      name: `亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗`,
      jid: '120363225356834044@newsletter'
    },
  interactiveConfig: {
    buttons_limits: 1, // زي ما طلبت يا ملك
    list_title: "🗂️ بـوابات الـقيـادة",
    button_title: "اضـغط هـنا يـا نـرم 👞",
    canonical_url: myChannel
  }
}, m);

};

example.usage = ["تست3"]
example.category = "owner";
example.command = ["تست3", "سيادة"]
export default example;
