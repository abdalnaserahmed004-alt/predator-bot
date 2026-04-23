/* =========== 亗 PREDATOR AI - VISUAL RADAR 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Performance Image Retrieval ⚡
 * ======================================================== */

async function test(m, { conn, bot, text }) {
  const devName = "Ahmed Abdel Nasser";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";

  try {
    if (!text) return m.reply(`*⚠️ يـا "نـرم" اكـتـب اسـم الـصورة بـالـلـغـة الإنجليزية عـشان الـرادار يـلـقـطـها! 🤡*`);
    
    await m.react("🔍");
    const res = await bot.Api.search.pinterestImages({ q: text });
    const arr = res.data;
    
    if (!arr || arr.length === 0) {
      return m.reply(`*❌ الـرادار مـلـقـطـش أي نـتـائـج لـلـهـدف ده يـا "دمـج"! 🚮*`);
    }
    
    // اختيار عينات عشوائية من ترسانة الصور
    const start = Math.floor(Math.random() * Math.max(0, arr.length - 10));
    const selectedImages = arr.slice(start, start + 10);

    const cards = selectedImages.map((item, index) => {
      const title = item.title && item.title !== 'No title' ? item.title : `Visual Target ~ ${index + 1}`;
      
      return {
        imageUrl: item.url,
        bodyText: `*亗 ${title} 亗*`,
        footerText: `🛰️ Source: Pinterest | System: ${devName}`,
        buttons: [
          { name: 'cta_url', params: { display_text: '👁️‍🗨️╎ مـعـايـنـة الـهـدف', url: item.pinUrl || item.url } },
          { name: 'cta_copy', params: { display_text: '📋╎ نـسـخ إحـداثـيـات الـصـورة', copy_code: item.url } }
        ]
      };
    });

    await conn.sendCarousel(m.chat, {
      headerText: `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *📸 رادار الـبـحـث الـبـصـري* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n🎯 الـهـدف: *[ ${text} ]*`,
      globalFooterText: 'اسـحـب لـمـعـايـنـة بـاقـي الأهداف يـا "نـرم" ➔',
      cards: cards,
      mentions: [m.sender],
      newsletter: {
        name: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗',
        jid: '120363225356834044@newsletter'
      },
    }, m);
    
    await m.react("✅");

  } catch (error) {
    console.error(error);
    m.react("❌");
    m.reply(`*❌ الـنظام كـرف.. الـمـطور ${devName} بـيـصلح الـرادار! 🚮*`);
  }
}

test.category = "search";
test.usage = ["بينترست"];
test.command = ["بين", "بينترست", "pinterest"];

export default test;
