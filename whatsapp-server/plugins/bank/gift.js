/* =========== 亗 WEKA_7_BOT - TREASURY 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 🛰️ Component : Royal Rewards System 🎁💰
 * ======================================================== */

const rewards = {
    daily: { xp: 150, cookies: 10, cooldown: 86400000, name: 'يومية', icon: '🌅', border: '☀️' },
    weekly: { xp: 800, cookies: 50, cooldown: 604800000, name: 'أسبوعية', icon: '🗓️', border: '📅' },
    monthly: { xp: 3500, cookies: 200, cooldown: 2592000000, name: 'شهرية', icon: '🌟', border: '🌙' }
};

const getTimeRemaining = (lastClaim, cooldown) => {
    const now = Date.now();
    const diff = lastClaim + cooldown - now;
    if (diff <= 0) return null;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { hours, minutes, seconds };
};

const formatTime = (time) => {
    if (!time) return '';
    const parts = [];
    if (time.hours > 0) parts.push(`${time.hours} ساعة`);
    if (time.minutes > 0) parts.push(`${time.minutes} دقيقة`);
    if (time.seconds > 0) parts.push(`${time.seconds} ثانية`);
    return parts.join(' و ');
};

const handler = async (m, { conn, command }) => {
    const type = command === 'يومي' ? 'daily' : command === 'اسبوعي' ? 'weekly' : 'monthly';
    const reward = rewards[type];
    
    global.db.users[m.sender] ??= {};
    const user = global.db.users[m.sender];
    user.time ??= {};
    
    const lastClaim = user.time[type];
    const now = Date.now();
    
    // لو لسه الوقت مخلصش - تهزيق خفيف عشان الصبر 😂
    if (lastClaim && (now - lastClaim) < reward.cooldown) {
        const remaining = getTimeRemaining(lastClaim, reward.cooldown);
        const timeLeft = formatTime(remaining);
        await m.reply(`*⚠️ اتقل يا منبطح.. الجوع وحش!* \n\nباقي لك ${timeLeft} عشان تاخد الهدية الـ ${reward.name} الجاية. \n\n> *بـأمر الـقـيـادة: Ahmed_wek7* 🦅`);
        return;
    }
    
    // تحديث البيانات
    user.time[type] = now;
    user.xp = (user.xp || 0) + reward.xp;
    user.cookies = (user.cookies || 0) + reward.cookies;
    
    const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg');
    
    const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *🎁 مـكـرمـة ${reward.name} 🎁*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *تـحـية لـلـبـطل:* @${m.sender.split('@')[0]}
✨ *بـأمر الـمـطور أحـمـد، اسـتلم:*

🎉 *${reward.xp}* نقطة خبرة (XP)
🍪 *${reward.cookies}* كوكيز لذيذة

╭─┈─┈─┈─⟞✨⟝─┈─┈─┈─╮
   *اسـتـمـر فـي الـتـفاعل لـتـكـون*
   *مـن جـيـش الـ Weka_7 الـعـظـيم*
╰─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╯
> Developed by Ahmed_wek7 🦅`;

    await m.react("💰");

    await conn.sendMessage(m.chat, {
        image: { url: profilePic },
        caption: msg,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: `亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐑𝐄𝐖𝐀𝐑𝐃𝐒 亗`,
                body: `تـم مـنـح الـهـدية الـ ${reward.name} بـنـجـاح ✅`,
                mediaType: 1,
                renderLargerThumbnail: false,
                sourceUrl: 'https://whatsapp.com/channel/120363225356834044'
            }
        }
    }, { quoted: m });
};

handler.usage = ["يومي", "اسبوعي", "شهري"];
handler.category = "bank";
handler.command = ["يومي", "اسبوعي", "شهري"];

export default handler;
