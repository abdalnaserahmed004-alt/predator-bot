/* =========== 亗 PREDATOR AI - USER IDENTITY 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 🛰️ Component : Advanced Profile System 🛡️👤
 * ======================================================== */

async function handler(m, { conn, bot }) {
    const user = global.db?.users[m.sender] || {};
    const xp = user.xp || 0;
    const level = user.level || 0;
    const nameLevel = user.nameLevel || '🛡️ ضحية بريئة';
    const cookies = user.cookies || 0;
    const warnings = user.warnings || 0;
    const banned = user.banned || false;
    const premium = user.premium || false;
    const name = user.name || 'غير مسجل';
    const age = user.age || 'غير مسجل';
    
    const pushName = m.pushName || m.sender.split('@')[0];
    const phoneNumber = m.sender.split('@')[0];
    
    // مصفوفة الـ XP المطلوبة لكل ليفل (متوافقة مع سيستم الرتب اللي عملناه)
    const nextLevelXp = (() => {
        const levels = [200, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000, 20000, 26000, 33000, 41000, 50000, 65000, 80000, 100000];
        return levels[level] || levels[levels.length - 1];
    })();
    
    const xpProgress = Math.min(100, Math.floor((xp / nextLevelXp) * 100));
    const status = banned ? '🚫 مـحـظـور' : (premium ? '👑 بـريـمـيـوم' : '🟢 عـادي');
    
    // شريط تقدم سيبراني 🟦⬛
    const progressBar = '🟦'.repeat(Math.floor(xpProgress / 10)) + '⬛'.repeat(10 - Math.floor(xpProgress / 10));
    
    const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg');
    
    const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *👤 هـويـة الـمـسـتـخـدم 👤*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *تـحـيـة مـن Ahmed Abdel Nasser لـ:*
┃ ➲ ✨ *${pushName}* ✨

┃ 📱 *الـرقـم:* ${phoneNumber}
┃ 📝 *الاسـم الـمـسـجـل:* ${name}
┃ 📅 *الـعـمـر:* ${age}
┃ 🎭 *الـلـقـب:* ${nameLevel}
┃ 📊 *الـمـسـتـوى:* [ ${level} ]
┃ ⭐ *الـخـبـرة:* ${xp} / ${nextLevelXp}
┃ 📈 *الـتـقـدم:* [ ${progressBar} ] ${xpProgress}%
┃ 🍪 *الـكـوكـيـز:* ${cookies}
┃ ⚠️ *الـتـحـذيـرات:* ${warnings}
┃ 🏷️ *الـحـالـة:* ${status}

╭─┈─┈─┈─⟞🛡️⟝─┈─┈─┈─╮
   *بـأمر الـمـطور أحمد عبد الناصر*
   *اسـتمر فـي الـتـفاعل لـتـرتقي!*
╰─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╯
> Developed by Ahmed Abdel Nasser 🦅`;
    
    const cfg = bot.config.info;
    await conn.sendMessage(m.chat, {
        image: { url: profilePic },
        caption: msg,
        contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardingScore: 1,
            forwardedNewsletterMessageInfo: {
                newsletterJid: cfg.idChannel,
                newsletterName: cfg.nameChannel,
                serverMessageId: 0
            },
            externalAdReply: {
                title: `亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐈𝐃𝐄𝐍𝐓𝐈𝐓𝐘 亗`,
                body: `Developer: Ahmed Abdel Nasser`,
                thumbnailUrl: profilePic,
                sourceUrl: '',
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: reply_status });
}

handler.usage = ["بروفايل"];
handler.category = "bank";
handler.command = ["بروفايل", "profile", "my"];

export default handler;
