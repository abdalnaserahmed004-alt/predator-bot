/* =========== 亗 PREDATOR AI - SOVEREIGNTY RECOVERY 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Level Administrative Authority ⚡
 * ============================================================ */

const handler = async (m, { conn }) => {
    const devName = "Ahmed Abdel Nasser";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    try {
        await m.react('👑');
        
        const promoteMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚡ بـروتوكول الـسـيـادة الـعـلـيا* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح سـيـادي مـن ${devName}:*
┃ ➲ تـم اسـتـرداد رتـبـة "الـقائد" مـيـدانـياً
┃ ➲ الـمـنـصـب: الـمـطور الـمـطـلـق لـلـنظام

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *الـمـلك رجـع لـمـكـانـه يـا "نـرمـات" 👞*
   *تـحـت سـيـطرة الـ Predator 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');

        await conn.sendMessage(m.chat, { 
            text: promoteMsg,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                    body: `Sovereign Authority: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        await m.react('✅');

    } catch (e) {
        await m.react('❌');
        m.reply(`*❌ يـا "دمـج" لازم الـبـوت يـكـون مـشرف عـشان يـنفـذ أوامـر الـقائد ${devName}! 🚮*`);
    }
};

handler.usage = ["ارفعني"];
handler.category = "owner";
handler.command = ["ارفعني"];
handler.owner = true;
handler.botAdmin = true;

export default handler;
