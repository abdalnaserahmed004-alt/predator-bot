/* =========== 亗 WEKA_7_BOT - SPEED QUIZ 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * ⚡ Component : Ultimate Speed Typing Protocol ⚡
 * ======================================================== */

const devName = "Ahmed_wek7";
const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

handler.before = async (m, { conn }) => {
    if (!m.text || !global.quiz?.games[m.chat] || !global.quiz?.scores[m.chat]) return;

    const game = global.quiz.games[m.chat];
    const player = m.sender;
    
    if (m.text.trim() !== game.answer) return;

    clearTimeout(game.timeout);
    delete global.quiz.games[m.chat];

    if (!global.quiz.scores[m.chat][player]) global.quiz.scores[m.chat][player] = 0;
    global.quiz.scores[m.chat][player]++;
    
    let total = 0;
    for (let id in global.quiz.scores[m.chat]) {
        total += global.quiz.scores[m.chat][id];
    }
    
    // إعلان نهاية "المجزرة" وتوزيع الغنائم
    if (total >= 20) {
        const entries = Object.entries(global.quiz.scores[m.chat])
            .sort((a, b) => b[1] - a[1]);
        
        const sorted = entries.map(([id, score], i) => 
            `┃ ${i+1}. @${id.split('@')[0]} ➪ ${score} نـقـطة`
        );
        
        const mentions = entries.map(([id]) => id);
        const winner = entries[0][0];

        if (global.db?.users[winner]) {
            global.db.users[winner].xp = (global.db.users[winner].xp || 0) + 500;
            global.db.users[winner].cookies = (global.db.users[winner].cookies || 0) + 10;
        }
        
        const winMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🏆 انـتـهاء اخـتـبار الـسرعة* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـقائد الـمـطلق ${devName}:*
${sorted.join('\n')}

🦅 *الـمـنـبـطـح الأسـرع:* @${winner.split('@')[0]}
🎁 *الـغـنائم:* +500 XP | 🍪 +10 كـوكـيـز

> تـم نـزع الـصـدارة بـواسطة الـ Weka_7 👑`;

        await conn.sendMessage(m.chat, { text: winMsg, mentions });
        delete global.quiz.scores[m.chat];
        return;
    }

    await m.reply(`*✅ مـاشـي يـا "نـرم" إيـدك سـريـعـة..* 👞\nمـعـاك دلوقت: ${global.quiz.scores[m.chat][player]} نـقـطـة بـأمـر ${devName}.`);
    handler(m, { conn });
};

async function handler(m, { conn }) {
    if (!global.quiz) global.quiz = { games: {}, scores: {} };

    if (global.quiz.games[m.chat]) {
        clearTimeout(global.quiz.games[m.chat].timeout);
        delete global.quiz.games[m.chat];
    }

    // سحب الداتا الخاصة بالتحدي
    const data = await (await fetch("https://raw.githubusercontent.com/Xov445447533/Xov11111/master/src/JSON/venom-كتابه.json")).json();
    const q = data[Math.floor(Math.random() * data.length)];
    
    const gameMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚡ اخـتـبار الـسرعة الـسيادي 亗*
╰─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╯

┃ *⌯︙ اكـتـب الـجـمـلـة دي يـا "نـرم":*
┃ ➲ *${q.question}*

╭─┈─┈─┈─⟞👞⟝─┈─┈─┈─╮
   *اكـتب بـسرعة قـبل مـا ${devName} يـطردك* 🚮
   *الـوقت: 30 ثـانية يـا "دمـج"!* ╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

    await conn.sendMessage(m.chat, { 
        text: gameMsg,
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: "تـحدي الـكـتابـة الـسريعـة ⚡",
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
    
    if (!global.quiz.scores[m.chat]) global.quiz.scores[m.chat] = {};
    
    global.quiz.games[m.chat] = {
        answer: q.response,
        timeout: setTimeout(() => {
            if (global.quiz.games[m.chat]) {
                delete global.quiz.games[m.chat];
                delete global.quiz.scores[m.chat];
                m.reply(`*⏰ انـتهى الـوقت يـا بـطيء! 🤡*\nالـمـطور ${devName} مـبيحبش الـنرمات الـكسلانة.. 🚮`);
            }
        }, 30000)
    };
}

handler.usage = ["مسابقه"];
handler.category = "games";
handler.command = ['مسابقه', 'quiz'];

export default handler;
