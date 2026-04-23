/* =========== 亗 PREDATOR AI - EVACUATION PROTOCOL 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : Strategic Withdrawal Logic ⚡
 * ============================================================ */

const handler = async (m, { conn }) => {
    const devName = "Ahmed Abdel Nasser";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    try {
        const leaveMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🚪 بـروتوكول إخـلاء الـمـيدان* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر مـبـاشر مـن الـقائد ${devName}:*
┃ ➲ تـم صـدور أوامـر الإنـسحاب الـفوري
┃ ➲ الـسبب: انـتـهاء الـمـهمـة الـسياديـة

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *الـمـكان مـبـقاش يـلـيق بـالـ Predator 👞*
   *وداعـاً يـا "نـرمـات" بـالـجـزمـة! 🚮*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

        await conn.sendMessage(m.chat, { 
            text: leaveMsg,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                    body: `Strategic Exit by: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        // تأخير بسيط عشان الرسالة توصل قبل الخروج
        await new Promise(r => setTimeout(r, 1000));
        await conn.groupLeave(m.chat);

    } catch (e) {
        console.log(e);
    }
};

handler.usage = ["اخرج"];
handler.category = "owner";
handler.command = ["اخرج", "غادر"];
handler.owner = true;

export default handler;
