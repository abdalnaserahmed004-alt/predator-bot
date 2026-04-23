/* =========== 亗 WEKA_7_BOT - FLAG RADAR 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🌍 Component : Global Flag Recognition (Savage Mode) ⚡
 * ======================================================== */

const devName = "Ahmed_wek7";
const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
const myPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الجاحدة مع اللوجو

async function handler(m, { conn }) {
    if (!global.gameActive) global.gameActive = {};
    
    if (global.gameActive[m.chat]) {
        clearTimeout(global.gameActive[m.chat].timeout);
        delete global.gameActive[m.chat];
    }
    
    // سحب الداتا من السيرفر
    const res = await fetch("https://gist.githubusercontent.com/Kyutaka101/799d5646ceed992bf862026847473852/raw/dcbecff259b1d94615d7c48079ed1396ed42ef67/gistfile1.txt");
    const data = await res.json();
    const country = data[Math.floor(Math.random() * data.length)];
    
    const caption = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🌍 رادارم رصـد الأعلام 亗*
╰─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╯

┃ *⌯︙ خـمـن الـعـلـم ده يـا "نـرم":*
┃ ➲ قـدامـك 30 ثـانـيـة تـثـبـت فـيـهـم إنـك مـش "دمـج"

╭─┈─┈─┈─⟞👞⟝─┈─┈─┈─╮
   *رُد عـلـى الـصـورة بـاسـم الـدولـة* 🚮
   *تـحـت إشـراف الـقـائد: ${devName}*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

    const msg = await conn.sendMessage(m.chat, {
        image: { url: country.img },
        caption: caption,
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: "لـعـبة تـخمـيـن الـأعـلام الـسيادية 🌍",
                thumbnailUrl: myPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
    
    global.gameActive[m.chat] = {
        answer: country.name.toLowerCase(),
        image: country.img,
        msgId: msg.key.id,
        timeout: setTimeout(() => {
            if (global.gameActive[m.chat]) {
                const answer = global.gameActive[m.chat].answer;
                delete global.gameActive[m.chat];
                conn.sendMessage(m.chat, { text: `*⏰ انـتـهى الـوقـت يـا فـاشـل! 🤡*\nالاجابة كانت: *${answer}*.. كالعادة المطور ${devName} كاسر عينك! 🚮` });
            }
        }, 30000)
    };
}

handler.before = async (m, { conn }) => {
    if (!m.quoted || !m.text) return;
    if (!global.gameActive?.[m.chat]) return;
    
    const game = global.gameActive[m.chat];
    if (m.quoted.id !== game.msgId) return;
    
    if (m.text.toLowerCase().trim() === game.answer) {
        clearTimeout(game.timeout);
        delete global.gameActive[m.chat];
        
        if (global.db?.users[m.sender]) {
            global.db.users[m.sender].xp = (global.db.users[m.sender].xp || 0) + 100;
            global.db.users[m.sender].cookies = (global.db.users[m.sender].cookies  || 0) + 2;
        }
        
        const winMsg = `*✅ مـاشـي يـا "نـرم" طـلـعـت عـارفـه..* 👞\n\nبـأمـر الـمـطـور ${devName} خـدت:\n🎁 *+100 XP | 🍪 +2 كـوكـيـز*\n\n> اكـتـب .علم لـو عـايز تـهـزأ نـفـسـك تـانـي 🦅`;
        
        await conn.sendMessage(m.chat, {
            image: { url: game.image },
            caption: winMsg
        }, { quoted: m });
        return true;
    }
    
    await m.reply(`*❌ إجـابـة غـلـط يـا "دمـج"! 🤡*\nركـز قـبـل مـا رادار ${devName} يـطـردك! 🚮👞`);
    return true;
};

handler.usage = ["علم"];
handler.category = "games";
handler.command = ['علم', 'country'];

export default handler;
