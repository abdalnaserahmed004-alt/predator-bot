/* =========== 亗 WEKA_7_BOT - EMOTION RADAR 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Social Surveillance Logic ⚡
 * ======================================================== */

const handler = async (m, { conn, command }) => {
    const devName = "Ahmed_wek7";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
    const jids = participants.map(p => p.id);

    if (jids.length < 2) {
        return m.reply(`*❌ الـجروب مـفـيـهـوش غـيـرك يـا "نـرم".. رادار ${devName} مـبيـرصـدش أشـباح! 🤡*`);
    }

    let randomIndex = Math.floor(Math.random() * jids.length);
    const randomUser = jids[randomIndex];
    const percentage = Math.floor(Math.random() * 100) + 1;

    let title = "";
    let bodyText = "";
    let footerIcon = "🦅";

    switch (command) {
        case "بيحبني":
            title = "❤️ رادار الـرصـد الـعـاطـفـي";
            bodyText = `┃ ➲ أكـثـر "نـرم" بـيـموت فـي دبـاديـبـك:\n┃ 🕵️‍♂️ الـمـنـبـطـح: @${randomUser.split('@')[0]}\n┃ 📈 نـسـبـة الـتـعـلـق: ${percentage}%`;
            footerIcon = "💖";
            break;
            
        case "بيكرهني":
            title = "😡 رادار رصـد الأحـقـاد";
            bodyText = `┃ ➲ أكـثـر "دمـج" بـيـكـره سـيـرتـك:\n┃ 🐍 الـكـاره: @${randomUser.split('@')[0]}\n┃ 📉 نـسـبـة الـغـل: ${percentage}%`;
            footerIcon = "👞";
            break;
            
        case "بيكراش":
            title = "💘 رادار كـشـف الـكـراشـات";
            bodyText = `┃ ➲ رادار ${devName} قـفـش الـمـعـجـب:\n┃ 😍 الـكـراش: @${randomUser.split('@')[0]}\n┃ 📈 نـسـبـة الـهـيـام: ${percentage}%`;
            footerIcon = "🦅";
            break;
    }

    const finalMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *${title}* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n${bodyText}\n\n╭─┈─┈─┈─⟞${footerIcon}⟝─┈─┈─┈─╮\n   *ركـز مـع الـرادار يـا "نـرم" بـالـجـزمة 👞*\n   *بـأمـر الـقـائد: ${devName}* 👑\n╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯\n> Power by Ahmed_wek7 🦅`;

    return conn.sendMessage(m.chat, { 
        text: finalMsg, 
        mentions: [randomUser],
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `Surveillance by: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.usage = ["بيحبني", "بيكرهني", "بيكراش"];
handler.category = "group";
handler.command = ["بيحبني", "بيكرهني", "بيكراش"];

export default handler;
