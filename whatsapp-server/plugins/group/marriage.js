/* =========== 亗 PREDATOR AI - MARRIAGE RADAR 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Level Social Engineering Logic ⚡
 * ======================================================== */

const handler = async (m, { conn }) => {
    const devName = "Ahmed Abdel Nasser";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
    const jids = participants.map(p => p.id);

    if (jids.length < 2) {
        return m.reply(`*❌ الـجروب مـفـيـهـوش غـيـرك يـا "نـرم".. روح اتـجوز نـفسك! 🤡*`);
    }

    let index1 = Math.floor(Math.random() * jids.length);
    let index2;

    do {
        index2 = Math.floor(Math.random() * jids.length);
    } while (index2 === index1 && jids.length > 1);

    const user1 = jids[index1];
    const user2 = jids[index2];

    const content = {
        user1: user1,
        num1: (Math.floor(Math.random() * 100) + 1) + '%',
        user2: user2,
        num2: (Math.floor(Math.random() * 100) + 1) + '%'
    };

    const marriageMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *💍 بـروتوكول الـنـصـيب الـقـسـري* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح سـيـادي مـن ${devName}:*
┃ ➲ تـم إعـلان زواج الـنرم @${content.user1.split('@')[0]} 
┃ ➲ مـن الـمـنـبـطـحـة @${content.user2.split('@')[0]} 

📊 *تـقـريـر الـرصد الـعـاطـفـي:*
┃ ➲ نـسـبـة حبـه لـلـضحية: ${content.num1}
┃ ➲ نـسـبـة انـبـطـاحـها لـه: ${content.num2}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *مـبـروك لـبـستـوا فـي بـعـض يـا "دمـج" 👞*
   *تـحـت رقـابـة الـ Predator 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

    return conn.sendMessage(m.chat, { 
        text: marriageMsg, 
        mentions: [content.user1, content.user2],
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                body: `Marriage Authorized by: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.usage = ["زواج"];
handler.category = "group";
handler.command = ["زواج"];

export default handler;
