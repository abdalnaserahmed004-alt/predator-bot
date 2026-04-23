/* =========== 亗 WEKA_7_BOT - BROADCAST PROTOCOL 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Global Penetration & Broadcast Logic ⚡
 * ============================================================ */

const run = async (m, { conn, bot }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  if (bot.isSubBot) return;
  if (!m.quoted) return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ رد على الرسالة اللي عايز تكتسح بيها الجروبات! 🤡*`);
  
  const groups = await conn.groupFetchAllParticipating();
  const groupList = Object.values(groups);
  
  if (groupList.length === 0) return m.reply(`*❌ مـفـيـش سـاحـات لـلـغزو.. الـرادار فـاضـي يـا "نـرم"! 👞*`);
  
  await m.react('🛰️');
  let success = 0;
  
  m.reply(`*🚀 بـدء بـروتوكول الـغزو الـشامل لـعدد [ ${groupList.length} ] مـيدان.. ركـز مـع الـ Weka_7! ⚡*`);

  for (const group of groupList) {
    try {
      const metadata = await conn.groupMetadata(group.id);
      const mentions = metadata.participants.map(p => p.id);
      
      await conn.sendMessage(group.id, {
        forward: m.quoted.fakeObj(),
        mentions: mentions,
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `Global Broadcast by: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
      });
      success++;
      // تأخير 2 ثانية عشان الحظر (Protocol Protection)
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.log(`Error in group ${group.id}: ${e}`);
    }
  }
  
  const finalMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🏁 إتـمـام بـروتوكول الـغـزو* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *تـقـريـر الـقائد ${devName}:*
┃ ➲ تـم اكـتـساح: [ ${success} ] مـجـمـوعة
┃ ➲ الـحـالـة: تـم الـتـسـلـيـم بـنـجـاح

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *الـكـل عـرف مـقامـه دلوقت يـا "نـرم" 👞*
   *Power by Ahmed_wek7 🦅*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯`;

  await m.reply(finalMsg);
  await m.react('✅');
};

run.command = ["اذاعه"];
run.usage = ["اذاعه"];
run.category = "owner";
run.owner = true;

export default run;
;