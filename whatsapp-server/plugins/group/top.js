/* =========== 亗 WEKA_7_BOT - TOP RADAR 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Group Ranking Logic ⚡
 * ======================================================== */

const handler = async (m, { conn, args }) => {
    const devName = "Ahmed_wek7";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الجاحدة

    const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
    const jids = participants.map(p => p.id);

    if (jids.length < 2) {
        return m.reply(`*❌ الـجروب مـفـيـهـوش غـيـرك يـا "نـرم".. رادار ${devName} مـبيـصنـفـش أشـباح! 🤡*`);
    }

    const shuffledJids = [...jids].sort(() => Math.random() - 0.5);
    const topUsers = shuffledJids.slice(0, Math.min(10, jids.length));

    const emojis = ["👑", "🐍", "🛰️", "🦅"];
    let em = emojis[Math.floor(Math.random() * emojis.length)];
    const topName = args.length > 0 ? args.join(' ') : "الـمـنـبـطـحـيـن";

    let messageText = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *📊 رادار رصـد الـتـوب 10* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n*${em} تـصـنـيف أكـثـر 10 > ${topName} ${em}*\n\n`;

    topUsers.forEach((user, index) => {
        let percentage;
        if (index === 0) percentage = Math.floor(Math.random() * 15) + 90;
        else if (index === 1) percentage = Math.floor(Math.random() * 15) + 80;
        else if (index === 2) percentage = Math.floor(Math.random() * 15) + 70;
        else percentage = Math.floor(Math.random() * 40) + 30;
        
        const medal = index === 0 ? "👑" : index === 1 ? "🥈" : index === 2 ? "🥉" : "👤";
        messageText += `${medal} *${index + 1}.* @${user.split('@')[0]} ➪ *${percentage}%*\n`;
    });

    messageText += `\n╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮\n   *ركـزوا فـي الـتـرتـيـب يـا "نـرمـات" 👞*\n   *بـأمـر الـقـائد: ${devName}* 👑\n╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯\n> Power by Ahmed_wek7 🦅`;

    return conn.sendMessage(m.chat, { 
        text: messageText, 
        mentions: topUsers,
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `Ranked by Weka_7: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.usage =  ["توب"];
handler.category = "group";
handler.command = ["توب"];

export default handler;
