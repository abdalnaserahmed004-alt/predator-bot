/* =========== 亗 WEKA_7_BOT - DIVORCE RADAR 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Social Toxicity Logic ⚡
 * ======================================================== */

const handler = async (m, { conn }) => {
    const devName = "Ahmed_wek7";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
    const jids = participants.map(p => p.id);

    if (jids.length < 2) {
        return m.reply(`*❌ الـجروب مـفـيـهـوش غـيـرك يـا "نـرم".. روح اتـطلـق مـع نـفسك! 🤡*`);
    }

    let index1 = Math.floor(Math.random() * jids.length);
    let index2;

    do {
        index2 = Math.floor(Math.random() * jids.length);
    } while (index2 === index1 && jids.length > 1);

    const user1 = jids[index1];
    const user2 = jids[index2];

    const divorceMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚖️ بـروتوكول فـك الـارتبـاط* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح سـيـادي مـن ${devName}:*
┃ ➲ تـم إعـلان طـلاق الـنرم @${user1.split('@')[0]} 
┃ ➲ مـن الـمـنـبـطـحـة @${user2.split('@')[0]} 

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *ادفع الـنـفقة بـالـجـزمة يـا "دمـج" 👞*
   *رادار ${devName} بـيـراقبـك! 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

    return conn.sendMessage(m.chat, { 
        text: divorceMsg, 
        mentions: [user1, user2],
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `Divorce Protocol by: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.usage = ["طلاق"];
handler.category = "group";
handler.command = ["طلاق"];

export default handler;
