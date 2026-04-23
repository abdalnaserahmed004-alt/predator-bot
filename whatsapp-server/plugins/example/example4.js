/* =========== 亗 PREDATOR AI - CAROUSEL OF POWER 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🛰️ Component : Interactive Sovereignty Interface ⚡
 * ======================================================== */

const example = async (m, { conn }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const devName = "Ahmed Abdel Nasser";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الجاحدة

  await conn.sendCarousel(m.chat, {
    headerText: `亗 مـعـرض سـيـادة الـمـطـور ${devName} 亗`,
    globalFooterText: 'اسـحـب يـا "نـرم" لـلـرؤيـة الـكاملة ←',
    cards: [
      {
        imageUrl: mySovereigntyPic,
        bodyText: `*亗 بـوابـة الـجـحـيـم الـرقـمـي 亗*\n\nأهلاً بك في نظام الـ Predator. هنا يتم سحق "المنبطحين" برمجياً تحت إشراف ${devName}.`,
        footerText: '🦅 Master Logic Control',
        buttons: [
          { name: 'quick_reply', params: { display_text: '🫡 تـقـديم الـولاء', id: '.تست' } },
          { name: 'cta_url', params: { display_text: '📢 انـضـم لـلـعـريـن', url: myChannel } }
        ]
      },
      {
        imageUrl: mySovereigntyPic,
        bodyText: `*亗 رادار رصـد الـنـرمـات 亗*\n\nنظام تتبع الـ "دمـج" تحت سيادة ${devName}. لا مفر من الاختراق والسيطرة المطلقة.`,
        footerText: '🛰️ Advanced Tracking System',
        buttons: [
          { name: 'quick_reply', params: { display_text: '👞 أنـا نـرم مـطـيـع', id: '.حذف_تسجيلي' } },
          { name: 'cta_copy', params: { display_text: '📋 نـسخ شـفـرة أحـمـد', copy_code: `PREDATOR-DEV-AHMED-V1` } }
        ]
      },
      {
        imageUrl: mySovereigntyPic,
        bodyText: `*亗 مـسـتودع الـفـجـارة 亗*\n\nكل أدوات ${devName} الجاحدة في مكان واحد. اختار مصيرك يا "فاشل" قبل ما يتم حظرك.`,
        footerText: '🛠️ Ultimate Dev Tools',
        buttons: [
          { 
            name: 'single_select', 
            params: { 
              title: '🗂️ بـوابـات الـمـلـك',
              sections: [{
                title: 'اخـتـار وجـهـتـك يـا مـنـبطح',
                rows: [
                  { title: '📥 سـحـب الـمـيـديـا', description: `بأمر المطور ${devName}`, id: '.تست2' },
                  { title: '🐍 بـروتوكول الـفجارة', description: 'لتدمير رادارات النرمات', id: '.تست3' },
                  { title: '🚩 إبـلاغ عـن فـشـلـي', description: 'لو إنت فاشل ومش عارف تستخدم البوت', id: '.report' }
                ]
              }]
            } 
          }
        ]
      }
    ],
    mentions: [m.sender],
    newsletter: {
        name: `亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗`,
        jid: '120363225356834044@newsletter'
      },
  }, m)

};

example.usage = ["تست4"]
example.category = "owner";
example.command = ["تست4", "معرض_السيادة"]

export default example;
