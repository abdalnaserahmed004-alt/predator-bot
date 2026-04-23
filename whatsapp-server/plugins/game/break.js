/* =========== 亗 WEKA_7_BOT - BREAK GAME 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🎮 Component : Hardcore Break Logic (Savage Mode) ⚡
 * ======================================================== */

const devName = "Ahmed_wek7";

handler.before = async (m, { conn }) => {
    if (!m.text || !global.break?.games[m.chat] || !global.break?.scores[m.chat]) return;

    const game = global.break.games[m.chat];
    const player = m.sender;
    
    if (m.text.trim() !== game.answer) return;

    clearTimeout(game.timeout);
    delete global.break.games[m.chat];

    if (!global.break.scores[m.chat][player]) global.break.scores[m.chat][player] = 0;
    global.break.scores[m.chat][player]++;
    
    let total = 0;
    for (let id in global.break.scores[m.chat]) {
        total += global.break.scores[m.chat][id];
    }
    
    // نهاية الجولة وإعلان المنبطحين الفائزين
    if (total >= 20) {
        const entries = Object.entries(global.break.scores[m.chat])
            .sort((a, b) => b[1] - a[1]);
        
        const sorted = entries.map(([id, score], i) => 
            `┃ ${i+1}. @${id.split('@')[0]} ➪ ${score} نـقـطـة`
        );
        
        const mentions = entries.map(([id]) => id);
        const winner = entries[0][0];

        if (global.db?.users[winner]) {
            global.db.users[winner].xp = (global.db.users[winner].xp || 0) + 500;
            global.db.users[winner].cookies = (global.db.users[winner].cookies || 0) + 10;
        }
        
        const winMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🏆 مـجـزرة الـتـفـكـيـك انـتـهـت*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصـريـح مـن الـقـائد ${devName}:*
${sorted.join('\n')}

🦅 *الـمـنـبـطـح الأقـوى:* @${winner.split('@')[0]}
🎁 *الـجـائزة:* +500 XP | 🍪 +10 كـوكـيـز

> تـم نـزع الـنقاط بـنجاح بـواسطة الـ Weka_7 👑`;

        await conn.sendMessage(m.chat, { text: winMsg, mentions });
        delete global.break.scores[m.chat];
        return;
    }

    await m.reply(`*✅ مـاشي يـا "نـرم" خـدت نـقـطـة.. مـعـاك دلوقت: ${global.break.scores[m.chat][player]}* 👞`);
    handler(m, { conn });
};

async function handler(m, { conn }) {
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    if (!global.break) global.break = { games: {}, scores: {} };

    if (global.break.games[m.chat]) {
        clearTimeout(global.break.games[m.chat].timeout);
        delete global.break.games[m.chat];
    }

    const data = await (await fetch("https://raw.githubusercontent.com/Xov445447533/Xov11111/master/src/JSON/venom-تفكيك.json")).json();
    const q = data[Math.floor(Math.random() * data.length)];
    
    const gameMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🔨 بـروتوكول الـتـفـكـيـك 亗*
╰─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╯

┃ *⌯︙ فـكـك الـجـمـلـة يـا "نـرم":*
┃ ➲ *${q.question}*

╭─┈─┈─┈─⟞👞⟝─┈─┈─┈─╮
   *اكتب بسرعة قبل ما رادار ${devName} يطردك* 🚮
   *الـوقت: 30 ثانية.. ابـهرنـا بـذكـائك الـمحدود!*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

    await conn.sendMessage(m.chat, { 
        text: gameMsg,
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: "لـعبة الـتـفـكـيـك الـسيادية 🔨",
                thumbnailUrl: "https://telegra.ph/file/0680061e89b456e70a7b4.jpg",
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
    
    if (!global.break.scores[m.chat]) global.break.scores[m.chat] = {};
    
    global.break.games[m.chat] = {
        answer: q.response,
        timeout: setTimeout(() => {
            if (global.break.games[m.chat]) {
                delete global.break.games[m.chat];
                delete global.break.scores[m.chat];
                m.reply(`*⏰ انـتـهى الـوقـت يـا فـاشـل! 🤡*\nالـمـطور ${devName} كـان عـارف إنك بـطـيء.. 🚮`);
            }
        }, 30000)
    };
}

handler.usage = ["تفكيك"];
handler.category = "games";
handler.command = ['تفكيك'];

export default handler;
