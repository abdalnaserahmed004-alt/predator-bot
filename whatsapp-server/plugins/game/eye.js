/* =========== 亗 WEKA_7_BOT - EYE RADAR 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 👁️ Component : Anime Eye Recognition Protocol ⚡
 * ======================================================== */

const MAX_ROUNDS = 10;
const devName = "Ahmed_wek7";
const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
const myPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

const NAMES = [
  "ايرين","نيزوكو","سوكونا","موازن","كيلوا","غون","ايتاتشي","ساسكي","دابي","اوبيتو",
  "نوبارا","ليفاي","يوتا","فريدا","شيده","ياماتو","نامي","ايمو","انيا","جينبي",
  "بوروتو","شانكس","لاو","لوفي","زورو","اكازا","ميكاسا","رين","دوما","كانيكي",
  "غوجو","ساي","نيجي","انمي","ساكورا","اوريتشمارو","ماهيتو","جيرايا","روبين",
  "سانجي","ميهوك","كايدو","مايكي","كورابيكا","شيغاراكي","تينغن","تانجيرو",
  "ميدوريا","كونان","الكيورا","شوتو","غاتارو","بارو","غارا","باكوغو","ماكيما",
  "توجا","باين","كوراما"
];

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const getPrize = (rank) => {
  if (rank === 0) return { xp: 500, cookies: 10, emoji: "🏆" };
  if (rank === 1) return { xp: 300, cookies: 5, emoji: "🥈" };
  return { xp: 100, cookies: 2, emoji: "🥉" };
};

const handler = async (m, { conn }) => {
  const chatId = m.chat;
  if (!global.gameEye) global.gameEye = {};
  
  const g = global.gameEye[chatId];
  if (g?.current) return await conn.sendMessage(chatId, {
    image: { url: g.current.img },
    caption: g.current.caption
  });

  if (!g || g.round >= MAX_ROUNDS) {
    if (g && Object.keys(g.scores).length > 0) {
      const sorted = Object.entries(g.scores).sort((a,b) => b[1] - a[1]);
      const prizes = sorted.map(([id, score], i) => {
        const prize = getPrize(i);
        if (global.db?.users[id]) {
          global.db.users[id].xp = (global.db.users[id].xp || 0) + prize.xp;
          global.db.users[id].cookies = (global.db.users[id].cookies || 0) + prize.cookies;
        }
        return `┃ ${prize.emoji} @${id.split('@')[0]} ➪ ${score} نـقـطة (+${prize.xp}xp)`;
      });
      
      const winMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🏆 مـجـزرة الـعـيـون انـتـهـت*\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *بـتـصـريـح مـن الـقـائد ${devName}:*\n${prizes.join('\n')}\n\n╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮\n   *تـم تـوزيع الـغـنائم بـنجاح* 🚮\n   *مملكة الـ Weka_7 تـسيطر!*\n╰─┈─┈─⟞👞⟝─┈─┈─┈─╯`;

      await conn.sendMessage(chatId, { text: winMsg, mentions: sorted.map(s => s[0]) });
    }
    global.gameEye[chatId] = { round: 0, scores: {}, current: null };
  }

  const g2 = global.gameEye[chatId];
  g2.round++;
  
  const data = await fetch("https://raw.githubusercontent.com/fjfilhfjjg-boop/Pomni-AI/refs/heads/main/%D8%B9%D9%8A%D9%86.md").then(r => r.json());
  const char = data[Math.floor(Math.random() * data.length)];
  
  const wrong = shuffle([...NAMES]).filter(n => n !== char.name).slice(0, 3);
  const opts = shuffle([char.name, ...wrong]);
  
  const caption = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *👁️ رادار الـرصـد الـبـصـري (${g2.round}/${MAX_ROUNDS})*\n╰─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╯\n\n┃ *خـمـن الـعـيـن دي يـا "نـرم":*\n┃ 1️⃣ ${opts[0]}\n┃ 2️⃣ ${opts[1]}\n┃ 3️⃣ ${opts[2]}\n┃ 4️⃣ ${opts[3]}\n\n╭─┈─┈─┈─⟞👞⟝─┈─┈─┈─╮\n   *ركـز قـبل مـا رادار ${devName} يـكـشفك* 🚮\n   *الـوقت: 30 ثـانية يـا "دمـج"* \n╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯\n> Power by Ahmed_wek7 🦅`;
  
  const msg = await conn.sendMessage(chatId, {
    image: { url: char.img },
    caption,
    contextInfo: {
        externalAdReply: {
            title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
            body: "لـعـبة تـخميـن الـعيـون الـسيادية 👁️",
            thumbnailUrl: myPic,
            sourceUrl: myChannel,
            renderLargerThumbnail: true
        }
    }
  });
  
  g2.current = {
    answer: char.name.toLowerCase(),
    opts: opts.map(o => o.toLowerCase()),
    img: char.img,
    caption,
    id: msg.key.id,
    timer: setTimeout(async () => {
      if (global.gameEye[chatId]?.current) {
        const ans = global.gameEye[chatId].current.answer;
        global.gameEye[chatId].current = null;
        await conn.sendMessage(chatId, { text: `*⏰ انـتهى الـوقت يـا فـاشـل! 🤡*\nالاجابة كانت: *${ans}*.. المطور ${devName} بـيـحييك! 🚮` });
      }
    }, 30000)
  };
};

handler.before = async (m, { conn }) => {
  const g = global.gameEye?.[m.chat];
  if (!g?.current) return;
  
  const cur = g.current;
  if (m.quoted?.id !== cur.id) return;
  
  const answer = m.text.toLowerCase().trim();
  
  if (answer === cur.answer) {
    clearTimeout(cur.timer);
    g.current = null;
    g.scores[m.sender] = (g.scores[m.sender] || 0) + 1;
    await conn.sendMessage(m.chat, {
      text: `*✅ مـاشـي يـا "نـرم" خـدت نـقـطـة..* 👞\nمـعـاك دلوقت: ${g.scores[m.sender]} نـقـطـة بـأمـر ${devName}.`,
      mentions: [m.sender]
    }, { quoted: m });
    setTimeout(() => handler(m, { conn }), 500);
  } else if (cur.opts.includes(answer)) {
    await m.reply(`*❌ غـلط يـا "دمـج"! 🤡*\nركـز قـبل مـا ${devName} يـطـردك بـالـجـزمة! 🚮👞`);
  }
  return true;
};

handler.command = ['عين', 'eye'];
handler.category = "games";

export default handler;
