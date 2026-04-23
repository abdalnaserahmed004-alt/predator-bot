/* =========== 亗 WEKA_7_BOT - SYSTEM MONITOR 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Level Infrastructure Metrics ⚡
 * ======================================================== */

import os from 'os';

const handler = async (m, { conn, bot }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

  const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
  const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
  const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);
  const cpuCores = os.cpus().length;
  const cpuModel = os.cpus()[0].model;
  const cpuSpeed = (os.cpus()[0].speed / 1000).toFixed(1);
  const cpuUsage = (os.loadavg()[0] * 100).toFixed(1);
  const uptime = process.uptime();
  const uptimeHours = Math.floor(uptime / 3600);
  const uptimeMins = Math.floor((uptime % 3600) / 60);
  const uptimeSecs = Math.floor(uptime % 60);
  
  const groups = await conn.groupFetchAllParticipating();
  const groupCount = Object.values(groups).length;
  
  const subBots = global.subBots;
  const subCount = subBots?.list().length || 0;
  const subConnected = subBots?.list().filter(b => b.connected).length || 0;

  const infoMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📊 رادار رصـد الـنـظـام الـسـيـادي* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح تـقـنـي مـن ${devName}:*

🖥️ *حـالـة الـخـادم (Server):*
┃ ➲ الـنـظام: \`${os.platform()} ${os.arch()}\`
┃ ➲ الـمـعـالـج: \`${cpuModel.split(' ')[0]}\`
┃ ➲ الـقـوة: \`${cpuCores} Cores @ ${cpuSpeed}GHz\`
┃ ➲ الـحـمـل: \`${cpuUsage}%\`

🧠 *تـقـريـر الـذاكـرة (RAM):*
┃ ➲ الـمـستـهـلك: \`${usedRam}MB\`
┃ ➲ الـمـتاح: \`${freeRam}GB / ${totalRam}GB\`

🛰️ *إحـصـائـيـات الـسـيـطرة:*
┃ ➲ الـمـجـموعات: \`${groupCount}\`
┃ ➲ الـبـوتـات الـفـرعـيـة: \`${subConnected}/${subCount}\`
┃ ➲ وقـت الـتـشغيل: \`${uptimeHours}h ${uptimeMins}m ${uptimeSecs}s\`

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *الـنـظـام تـحـت كـامـل الـسيطـرة يـا "نـرم" 👞*
   *بـقـيـادة الـ Weka_7: ${devName}* 👑
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed_wek7 🦅`;

  await conn.sendMessage(m.chat, {
    text: infoMsg,
    contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363225356834044@newsletter',
            newsletterName: '亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗',
            serverMessageId: 100
        },
        externalAdReply: {
            title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 亗 | 𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐧𝐟𝐨",
            body: `Monitoring Infrastructure: ${devName} 🦅`,
            thumbnailUrl: mySovereigntyPic,
            sourceUrl: myChannel,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
  }, { quoted: m });
};

handler.command = ["معلومات", "info", "botinfo", "حالة"];
handler.category = "info";
handler.usage = ["معلومات"];
export default handler;
