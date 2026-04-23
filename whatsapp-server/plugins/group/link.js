/* =========== 亗 WEKA_7_BOT - ACCESS GATE 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Group Sovereignty ⚡
 * ======================================================== */

let handler = async (m, { conn }) => {
    const devName = "Ahmed_wek7";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    try {
        const groupName = (await conn.groupMetadata(m.chat)).subject;
        const inviteCode = await conn.groupInviteCode(m.chat);
        const link = `https://chat.whatsapp.com/${inviteCode}`;

        const linkMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🔗 رابـط الـسـيـادة الـرسمي* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح مـن الـقائد ${devName}:*
┃ ➲ الـمـجـموعة: ${groupName}
┃ ➲ الـرابـط: ${link}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *انـشر الـرابـط يـا "نـرم" بـالـجـزمة 👞*
   *تـحـت رقـابـة الـ Weka_7 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

        await conn.sendMessage(m.chat, { 
            text: linkMsg,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                    body: `Access Granted by: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

    } catch (e) {
        const botId = conn.user.id.split(":")[0] + "@s.whatsapp.net";
        const errorMsg = `╭─┈─┈─┈─⟞👞⟝─┈─┈─┈─╮\n  *❌ خـطأ فـي الـسـلـطـة* 🚮\n╰─┈─┈─┈─⟞🐍⟝─┈─┈─┈─╯\n\n⚠️ يـا "دمـج" لازم تـخلي الـبـوت @${botId.split('@')[0]} مـشرف عشان يـقدر يـجـيب الـلينك بـأمر ${devName}!`;
        
        conn.sendMessage(m.chat, { text: errorMsg, mentions: [botId] });
    }
}

handler.usage = ["لينك"];
handler.category = "group";
handler.command = ["لينك", "link"];
handler.group = true;

export default handler;
