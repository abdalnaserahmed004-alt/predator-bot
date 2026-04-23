/* =========== 亗 WEKA_7_BOT - SUB-BOT LEGION 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Global Legion Broadcast Logic ⚡
 * ======================================================== */

const run = async (m, { conn, bot }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  const sub = global.subBots;
  if (!sub) return m.reply(`*❌ نـظام الـفـيـالـق الـفـرعـية مـعطل فـي رادار ${devName}! 🚮*`);
  
  if (!m.quoted) return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ رد عـلى الرسـالة اللي هتحـرك بيها الـجيوش! 🤡*`);
  
  const bots = sub.list();
  const activeBots = bots.filter(b => b.connected && b.phone && b.id !== bot.id);
  
  if (activeBots.length === 0) return m.reply(`*📭 مـفيش فـيالـق مـتصلة دلوقت.. الـ Weka_7 لـوحده فـي الـميدان! 🦅*`);
  
  await m.react("🚀");
  m.reply(`*🛰️ بـدء تـحريـك [ ${activeBots.length} ] فـيـلـق لاكـتـساح جـميع الـمـياديـن بـأمـر الـقائد ${devName}...*`);

  let success = 0;
  let fail = 0;
  let groupCount = 0;
  
  for (const b of activeBots) {
    try {
      const botConn = sub.get(b.id);
      const sock = botConn?.sock;
      if (!sock) continue;
      
      const groups = await sock.groupFetchAllParticipating();
      const groupList = Object.values(groups);
      groupCount += groupList.length;
      
      for (const group of groupList) {
        try {
          const groupMetadata = await sock.groupMetadata(group.id);
          const participants = groupMetadata.participants.map(p => p.id);
          
          await sock.sendMessage(group.id, {
            forward: m.quoted.fakeObj(),
            mentions: participants,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                    body: `Legion Operation by: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
          });
          success++;
          await new Promise(r => setTimeout(r, 2000)); // حماية من الحظر
        } catch (e) {
          fail++;
        }
      }
    } catch (e) {
      fail++;
    }
  }
  
  const finalMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🏁 إتـمام غـزو الـفـيالـق* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *تـقـريـر الـقائد ${devName}:*
┃ ➲ تـم الاكـتساح بـواسطة: [ ${activeBots.length} ] فـيـلـق
┃ ➲ إجـمـالي الـجـروبات: [ ${groupCount} ] مـيـدان
┃ ➲ نـجـاح الـتـسلـل: [ ${success} ]
┃ ➲ الـخـسائـر (فـشل): [ ${fail} ]

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *الـعالـم كـله تـحـت سـيطرة الـ Weka_7 🛰️*
   *Power by Ahmed_wek7 🦅*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯`;

  await m.reply(finalMsg);
  await m.react("✅");
};

run.command = ["اذاعة_فرعي", "اذاعه_فرعي"];
run.usage =  ["اذاعة_فرعي"];
run.category = "sub";
run.noSub = true;
run.owner = true;

export default run;
