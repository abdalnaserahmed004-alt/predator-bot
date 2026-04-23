const run = async (m, { args, conn, bot }) => {
  // رسالة قصف الجبهة للالمطور احمد_wek7 عبد الناصر
  const roast = "⚠️ جـاي تـشـغـل بـوت عـمـك *أحـمـد عـبـد الـنـاصـر* يـا كـلـب؟ 😂🐕\n\n*الـسـيـطـرة لـلـمـفـتـرس فـقـط.. مـلـوك الـمـجـال مـش بـتـوع عـيـال!* 🦅🔥";

  if (global.db.noSub) return m.reply("❌ عـمـك أحـمـد قـافـل الـتـنـصـيب عـشـان مـحـدش يـهـرتـل!");

  try {
    const num = m.sender.split("@")[0].replace(/[+\s-]/g, '');
    if (!/^\d+$/.test(num)) return m.reply("⚠️ رقـمـك مـعـاق يـا صـاحـبـي.. اتـأكـد مـنـه!");

    const sub = global.subBots;
    if (!sub) return m.reply("❌ نـظـام الـتـدمـيـر مـش جـاهـز لـلـكـلاب حـالـيـاً");

    // الرد الأول بـ السخرية اللي طلبتها
    const init = await m.reply(roast + `\n\n⏳ جـاري سـحـب بـيـانـات الـرقـم *${num}*...`);

    const state = { uid: null, pairDone: false, resolved: false, pending: null };
    const { images: img } = bot.config.info;

    const cleanup = () => {
      sub.off('pair', handlers.pair);
      sub.off('ready', handlers.ready);
      sub.off('error', handlers.error);
    };

    const handlers = {
      pair: (id, code) => {
        if (state.pairDone) return;
        if (!state.uid) { state.pending = { id, code }; return; }
        if (id !== state.uid) return;
        state.pairDone = true;
        Func.pair(conn, code, num, m, init, roast);
      },
      ready: (id) => {
        if (id !== state.uid || state.resolved) return;
        state.resolved = true;
        Func.ready(conn, num, m, img[Math.floor(Math.random() * img.length)]);
        cleanup();
      },
      error: (id, err) => {
        if (id !== state.uid || state.resolved) return;
        state.resolved = true;
        Func.error(conn, num, err, m);
        cleanup();
      },
    };

    sub.on('pair', handlers.pair);
    sub.on('ready', handlers.ready);
    sub.on('error', handlers.error);

    state.uid = await sub.add(num);

    if (state.pending?.id === state.uid && !state.pairDone) {
      state.pairDone = true;
      Func.pair(conn, state.pending.code, num, m, init, roast);
    }

    setTimeout(() => {
      if (state.resolved) return;
      state.resolved = true;
      Func.timeout(conn, m, state.pairDone);
      cleanup();
    }, 120000);

  } catch (error) {
    await m.reply("⚠️ حـصـل تـصـادم فـي الـسـيـسـتـم: " + error.message);
  }
};

run.command = ["تنصيب"];
run.noSub = true;
run.usage =  ["تنصيب"];
run.category = "sub";
export default run;

const Func = {
  pair: async (conn, code, num, m, reply_status, roast) => {
    await conn.sendButton(m.chat, {
      imageUrl: "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
      bodyText: `
${roast}
*╭───────────────╮*
*│  亗 𝐖𝐄𝐊𝐀_𝟕 𝐒𝐘𝐒𝐓𝐄𝐌 亗 │*
*╰───────────────╯*

📱 الرقم: ${num}
🔑 الكود: ${code}

> *_افتح واتساب > الأجهزة المرتبطة > ربط جهاز برقم الهاتف > أدخل الكود يا بطل_*`,
      footerText: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 亗",
      buttons: [
        { name: "cta_copy", params: { display_text: "🛡️ نسخ الكود", copy_code: code } },
        { name: "cta_url", params: { display_text: "🦅 قناة الدمار", url: "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a" } },
      ],
      mentions: [m.sender],
      newsletter: {
        name: '亗 𝐖𝐄𝐊𝐀_𝟕 𝐔𝐏𝐃𝐀𝐓𝐄𝐒 亗',
        jid: '120363225356834044@newsletter'
      }
    }, global.reply_status);
  },

  ready: async (conn, num, m, img) => {
    await m.react("🔥");
    await conn.sendMessage(m.chat, {
      text: `✅ *تـم الـتـنـصـيـب بـنـجـاح يـا تـابـع!*\n\n📱 الـرقـم: ${num}\n\n*الآن أنـت تـحـت سـيـطـرة الـ Weka_7 وجـاهـز لـلـتدمـيـر!* 🦅🏴‍☠️`,
      contextInfo: {
        externalAdReply: {
          title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃 亗",
          body: "🦅 Power by Ahmed_wek7",
          thumbnailUrl: img,
          sourceUrl: 'https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  },

  error: async (conn, num, err, m) => {
    await m.reply(`❌ *فـشـل الـقـبـض عـلـى الـرقـم!*\n\n📱 الـرقـم: ${num}\n⚠️ الـسـبـب: ${err?.message || 'الـخـوف مـن عـمـك أحـمـد!'}`);
  },

  timeout: async (conn, m, pairDone) => {
    await m.reply(pairDone
      ? `⏰ الـكـود وصـل لـكـنـك بـطـيء.. انـجـز يـا كـلـب وحـطـه فـي الـواتـس!`
      : `⏰ الـسـيـسـتـم مـل مـن انـتـظـارك.. حـاول تـانـي بـسـرعـة!`
    );
  }
};
