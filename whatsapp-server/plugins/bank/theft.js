/* =========== 亗 PREDATOR AI - CYBER THEFT 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🛰️ Component : XP Hijacker System 💰🏴‍☠️
 * ======================================================== */

const cooldown = new Map();

const handler = async (m, { conn }) => {
    const target = await m.lid2jid(m.quoted?.sender) || m.mentionedJid?.[0];
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    
    if (!target) return m.reply(`*⚠️ منشن الفريسة اللي عايز تسرقها يا بطل!*\nمثال: .سرقة @user`);
    if (target === m.sender) return m.reply(`*❌ إنت عبيط؟ عايز تسرق نفسك؟*`);
    
    const userTarget = global.db?.users[target];
    if (!userTarget?.xp) return m.reply(`*❌ الفريسة دي "فلات" معندهاش ولا نقطة!*`);
    if (userTarget.xp < 100) return m.reply(`*🤲 حرام ده "منبطح" كفاية! عنده بس ${userTarget.xp} نقطة*\n> سيبه يجمع شوية للمطور أحمد!`);
    
    const now = Date.now();
    const lastSteal = cooldown.get(m.sender) || 0;
    if (now - lastSteal < 3600000) {
        const remaining = Math.ceil((3600000 - (now - lastSteal)) / 60000);
        return m.reply(`*⏳ الرادار كاشفك! انتظر ${remaining} دقيقة عشان تعمل هجوم تاني.*`);
    }
    
    const userSender = global.db.users[m.sender] || {};
    const stealAmount = Math.floor(Math.random() * 501) + 150; 
    const success = Math.random() < 0.6; 
    
    cooldown.set(m.sender, now);
    const pic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg');
    
    // --- [ حالة الفشل: تم كشف التسلل ] ---
    if (!success) {
        const penalty = Math.floor(stealAmount / 2);
        userSender.xp = Math.max(0, (userSender.xp || 0) - penalty);
        
        await conn.sendMessage(m.chat, {
            image: { url: pic },
            caption: `╭─┈─┈─⟞🚨⟝─┈─┈─╮
  *❌ تـم كـشـف الـتـسلل*
╰─┈─┈─⟞🚨⟝─┈─┈─╯

👑 *بـأمر Ahmed Abdel Nasser:*
┃ ➲ @${m.sender.split('@')[0]}
┃ 😭 الـحماية كشفتك يا "نرم"!
┃ 💸 تـم خـصم ${penalty} نقطة لقلة مهاراتك.

╭─┈─┈─⟞💀⟝─┈─┈─╮
   *اتعلم البرمجة من أحمد*
   *عشان تعرف تسرق صح!* 🛠️
╰─┈─┈─⟞🦅⟝─┈─┈─╯`,
            contextInfo: { 
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                    body: "تـم إحـبـاط مـحـاولة الـسـرقة",
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: m });
        return;
    }
    
    // --- [ حالة النجاح: تمت القرصنة ] ---
    const finalAmount = userTarget.xp < stealAmount ? userTarget.xp : stealAmount;
    userTarget.xp -= finalAmount;
    userSender.xp = (userSender.xp || 0) + finalAmount;
    
    await conn.sendMessage(m.chat, {
        image: { url: pic },
        caption: `╭─┈─┈─⟞💰⟝─┈─┈─╮
  *✅ نـجـحـت الـقـرصـنة*
╰─┈─┈─⟞💰⟝─┈─┈─╯

👑 *بـأمر Ahmed Abdel Nasser:*
┃ 🏴‍☠️ الـمخترق: @${m.sender.split('@')[0]}
┃ 🎯 الـضحية: @${target.split('@')[0]}
┃ 💰 الـغـنيمة: +${finalAmount} نقطة XP

╭─┈─┈─⟞⚡⟝─┈─┈─╮
   *استمر في نهب البيانات*
   *مملكة الـ Predator تفتخر بك!*
╰─┈─┈─⟞🦅⟝─┈─┈─╯
> Developed by Ahmed Abdel Nasser 🦅`,
        contextInfo: { 
            mentionedJid: [m.sender, target],
            externalAdReply: {
                title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                body: "تـم نـهـب الـبـيـانات بـنـجـاح ✅",
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });
};

handler.usage = ["سرقة"];
handler.category = "games";
handler.command = ["سرقة", "steal"];

export default handler;
