/* =========== 亗 WEKA_7_BOT - LEGION INTELLIGENCE 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Global Sub-Bot Intelligence Report ⚡
 * ============================================================ */

const run = async (m, { conn, bot }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  const sub = global.subBots;
  if (!sub) return m.reply(`*❌ نـظام الـفـيالـق مـعطل فـي رادار ${devName}! 🚮*`);

  const stats = sub.stats();
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  await m.react("📊");

  const intelReport = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📊 تـقـرير الاسـتـخـبارات* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *إحصـائـيات الـقائد ${devName}:*
┃ ➲ إجمالي الـفـيالـق: [ ${stats.total} ]
┃ ➲ فـيـالـق نـشـطـة: [ ${stats.connected} ] 🟢
┃ ➲ فـيـالـق مـعـطلة: [ ${stats.disconnected} ] 🔴
┃ ➲ مـعدل الاختـراق: [ ${stats.totalMessages} ] رسـالة

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *زمـن الـسـيطرة الـميدانـية:*
   *${days} يـوم | ${hours} سـاعـة | ${minutes} دقـيقـة*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯

👑 *الـقـائد الأعـلى:* ${bot.sock.user.id.split('@')[0]}
> Power by Ahmed_wek7 🦅`;

  await conn.sendMessage(m.chat, { 
    text: intelReport,
    contextInfo: {
        externalAdReply: {
            title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
            body: `Intelligence Ops by: ${devName} 🦅`,
            thumbnailUrl: mySovereigntyPic,
            sourceUrl: myChannel,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
  }, { quoted: m });

  await m.react("✅");
};

run.command = ["احصائيات_البوتات", "حالة_الفيالق"];
run.noSub = true;
run.usage =  ["احصائيات_البوتات"];
run.category = "sub";

export default run;
