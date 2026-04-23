/* =========== 亗 WEKA_7_BOT - SOVEREIGNTY RECOVERY 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Administrative Authority ⚡
 * ============================================================ */

const handler = async (m, { conn }) => {
    const devName = "Ahmed_wek7";
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
   *تـحـت سـيـطرة الـ Weka_7 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');

        await conn.sendMessage(m.chat, { 
            text: promoteMsg,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
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
