/* =========== 亗 WEKA_7_BOT - EVACUATION PROTOCOL 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Strategic Withdrawal Logic ⚡
 * ============================================================ */

const handler = async (m, { conn }) => {
    const devName = "Ahmed_wek7";
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
   *الـمـكان مـبـقاش يـلـيق بـالـ Weka_7 👞*
   *وداعـاً يـا "نـرمـات" بـالـجـزمـة! 🚮*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

        await conn.sendMessage(m.chat, { 
            text: leaveMsg,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
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
