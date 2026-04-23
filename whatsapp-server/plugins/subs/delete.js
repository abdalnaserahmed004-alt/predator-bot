/* =========== 亗 WEKA_7_BOT - LEGION TERMINATION 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Strategic Legion Deletion Logic ⚡
 * ============================================================ */

const run = async (m, { args, conn, bot }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  const sub = global.subBots;
  if (!sub) return m.reply(`*❌ نـظام الـفـيالـق مـعطل فـي رادار ${devName}! 🚮*`);

  if (!args[0]) {
    return m.reply(`╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🗑️ بـروتوكول الإبـادة* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *الـقائد ${devName}:*\n┃ ➲ اسـتخدم: .حذف_بوت [الرقم أو الاندكس]\n\n*مثال:* \n\`.حذف_بوت 1\`\n\`.حذف_بوت 201210155616\``);
  }

  const input = args[0];
  let deleted = false;
  await m.react("🔥");

  try {
    // الحذف عن طريق الاندكس (الترتيب)
    if (/^\d+$/.test(input) && input.length <= 2) {
      const idx = parseInt(input);
      await sub.removeByIndex(idx);
      deleted = true;
    } 
    // الحذف عن طريق رقم الهاتف
    else if (/^\d+$/.test(input)) {
      deleted = await sub.removeByPhone(input);
      if (!deleted) return m.reply(`*❌ الـرادار مـلـقـطـش بـوت بـالـرقم ده يـا "دمـج"! 👞*`);
    }

    if (deleted) {
      const successDel = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *💀 تـمـت الإبـادة الـنـهـائـية* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *تـم مـسح الـفـيـلـق بـأمـر الـقـائد: ${devName}*\n┃ ➲ الـهـدف: ${input}\n┃ ➲ الـحـالـة: مـسـح مـن الـرادار\n\n> لا مـكـان لـلـضـعـفاء فـي جـيـش الـ Weka_7 🦅`;

      await conn.sendMessage(m.chat, { 
          text: successDel,
          contextInfo: {
              externalAdReply: {
                  title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                  body: `System Cleanup by: ${devName} 🦅`,
                  thumbnailUrl: mySovereigntyPic,
                  sourceUrl: myChannel,
                  mediaType: 1,
                  renderLargerThumbnail: true
              }
          }
      }, { quoted: m });
      await m.react("✅");
    }

  } catch (e) {
    m.reply(`*❌ فـشـل فـي الإبـادة: ${e.message} يـا مطور ${devName}! 🚮*`);
  }
};

run.command = ["حذف_بوت", "ابادة_بوت"];
run.usage =  ["حذف_بوت"];
run.category = "sub";
run.noSub = true;
run.owner = true;

export default run;
