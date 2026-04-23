/* =========== 亗 WEKA_7_BOT - YT SEARCH 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🔗 Link      : https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a
 * ======================================================== */

const handler = async (m, { conn, text }) => {
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const devName = "Ahmed_wek7";

    if (!text) {
        return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ اكتب اسم الحاجة اللي عايز تبحث عنها! 🤨*\n\n> *بـأمر الـقـائد: ${devName}* 🦅`);
    }

    // رياكت "جاري رصد الأهداف"
    await m.react('🛰️');

    try {
        const res = await fetch(`https://emam-api.web.id/home/sections/Search/api/YouTube/search?q=${encodeURIComponent(text)}`);
        const { data } = await res.json();
        
        if (!data || data.length === 0) {
            await m.react('❌');
            return m.reply(`*❌ ملقتش حاجة بالاسم ده يا "فاشل"! 🤡*\nجرب تبحث عن حاجة عدلة زي الالمطور احمد_wek7! 🐍🚮`);
        }

        const { title, image, timestamp: time, url } = data[0];

        const body = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🎯 تـم رصـد الـهـدف بـنـجـاح*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـمـطور ${devName}:*
┃ ➲ *الـعـنوان:* ${title}
┃ ➲ *الـمـدة:* ${time}
┃ ➲ *الـطـلـب:* @${m.sender.split('@')[0]}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *اختار عايز تسحب البيانات إزاي يا "نرم"* 🚮
   *مملكة الـ Weka_7 تـسيطر!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯`;

        await conn.sendButton(m.chat, {
            imageUrl: image,
            bodyText: body,
            footerText: `© Developed by Ahmed_wek7 🦅`,
            buttons: [
                { name: "quick_reply", params: { display_text: "🎼 ╎ سـحـب الـصـوت", id: `.يوت_اغنيه ${url}` } },
                { name: "quick_reply", params: { display_text: "🎬 ╎ اخـتـراق الـفـيـديـو", id: `.يوتيوب ${url}` } }
            ],
            mentions: [m.sender],
            newsletter: { 
                name: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗", 
                jid: "120363225356834044@newsletter" 
            },
            interactiveConfig: { 
                buttons_limits: 10, 
                list_title: "", 
                button_title: "", 
                canonical_url: myChannel 
            }
        }, m);

        await m.react('✅');

    } catch (e) {
        console.error(e);
        await m.react('❌');
        m.reply(`*❌ الرادار عطلان يا "دمج"! 🤡*\nده أكيد بسبب ذكائك المحدود.. ارجع للالمطور احمد_wek7! 🐍🚮`);
    }
};

handler.usage = ["فيديو", "اغنيه", "شغل"];
handler.category = "downloads";
handler.command = ["اغنيه", "فيديو", "اغنية", "play", "video"];

export default handler;
