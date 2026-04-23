/* =========== 亗 WEKA_7_BOT - COMMAND CENTER 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🛰️ Component : Interactive Multi-Action UI ⚡
 * ======================================================== */

const example = async (m, { conn }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const devName = "Ahmed_wek7";
  const myNum = "201210155616";

  const body = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🎮 مـركـز سـيـطـرة الـبـريديتور*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـقـائد الـمـطلق ${devName}:*
┃ ➲ أهلاً بك يا "نرم" في واجهة التحكم.
┃ ➲ @${m.sender.split('@')[0]}
┃ ➲ مـستوى الـوصـول: "مـنـبطح مـستجد"

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *اخـتار مـن الأزرار دي يـا "دمج"* 🚮
   *ممنوع الـلعب فـي إعدادات الـقيادة!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

  await conn.sendButton(m.chat, {
    imageUrl: "https://telegra.ph/file/0680061e89b456e70a7b4.jpg", // صورتك الفخمة
    bodyText: body,
    footerText: `© Developed by ${devName} 🦅`,
    buttons: [
      // 1. أزرار الرد السريع المستفزة
      { name: "quick_reply", params: { display_text: "👑 تـحـية الـقـائد", id: ".تست" } },
      { name: "quick_reply", params: { display_text: "🚮 أنـا نـرم", id: ".حذف_تسجيلي" } },
      
      // 2. رابط العرين (القناة)
      { name: "cta_url", params: { display_text: "📢 عـريـن الـمـطور أحمد", url: myChannel } },
      
      // 3. اتصال مباشر بالقيادة
      { name: "cta_call", params: { display_text: "📞 هـاتـف الـجـزار", phone_number: myNum } },
      
      // 4. نسخ كود البريديتور
      { name: "cta_copy", params: { display_text: "📋 نـسخ كـود الـفجارة", copy_code: "WEKA_7-AI-V1" } },
      
      // 5. منيو اختراق الأنظمة
      { name: "single_select", params: { 
        title: "🛠️ قـائمة الأدوات الـجاحدة",
        sections: [{
          title: "亗 بـوابـات الـسـيـطـرة 亗",
          rows: [
            { title: "📥 سـحب الـميديا", description: "لسرقة فيديوهات المنبطحين", id: ".سرقة" },
            { title: "🐍 رادار الـتسلل", description: "لمراقبة تحركات الأنظام", id: ".تست1" }
          ]
        }]
      }},
      
      // 6. طلب إذن مكالمة سيادية
      { name: "call_permission_request", params: { 
        display_text: "🤙 طـلب مـقابلة الـمـطور",
        phone_number: myNum,
        duration: 30
      }}
    ],
    mentions: [m.sender],
    newsletter: {
        name: `亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗`,
        jid: '120363225356834044@newsletter'
      },
    interactiveConfig: {
      buttons_limits: 10,
      list_title: "🗂️ بـوابات الـمـلك",
      button_title: "اضـغط هـنا يـا نـرم 👞",
      canonical_url: myChannel
    }
  }, m);

};

example.usage = ["تست2"]
example.category = "owner";
example.command = ["تست2", "مركز_السيطرة"]
export default example;
