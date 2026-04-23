/* =========== 亗 PREDATOR AI - THE SAVAGE ENROLLMENT 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * ======================================================== */

const handler = async (m, { conn, text, command }) => {
    const dev = "Ahmed Abdel Nasser";
    
    if (command === "تسجيل") {
        if (!text) return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ ركز مع المطور ${dev} واكتب بياناتك! 🤡*\n\n> مثال: .تسجيل منبطح|20`);
        
        const [name, age] = text.split('|').map(s => s.trim());
        if (!name || !age) return m.reply(`*❌ ركز يا "دمج" فين العلامة | ؟ شكل ذكائك محدود زي الرامات عندك! 🤨*`);

        const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *✅ تـم حـشـرك في الـقـاعدة* 🚮
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـجزار ${dev}:*
┃ ➲ *الاسـم:* ${name} (اسم منبطحين أوي 🤣)
┃ ➲ *الـعـمـر:* ${age} (لسه بتلبس بامبرز يا بيبي؟ 👶)
┃ ➲ *الـرتبة:* "نـرم مـستجد" في جيش أحمد

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *مبروك.. بقيت مجرد رقم عند ${dev}*
   *متحاولش تتنطط عشان متتنفخش! 💨*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Developed by Ahmed Abdel Nasser 🦅`;

        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg' }, caption: msg }, { quoted: m });
    }
};
