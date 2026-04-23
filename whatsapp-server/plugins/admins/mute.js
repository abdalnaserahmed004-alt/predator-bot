const isOwner = (userId, bot) => {
    return userId.includes("201554582851") || bot.config?.owners?.some(o => o.jid === userId || o.lid === userId);
};

const handler = async (m, { conn, command, bot, text }) => {
    let target = m.mentionedJid?.[0];
    const isBotDev = m.sender.includes("201554582851");
    
    if (target && typeof m.lid2jid === 'function') {
        target = await m.lid2jid(target);
    }
    
    if (!target && m.quoted) {
        target = m.quoted.sender;
    }
    
    // حركة المطور أحمد (يا عم المجال)
    if (!target && isBotDev) {
        return m.reply("يا عم المجال.. عايز تكتم مين؟ الهوا؟ 😅 حدد ضحية يا دكتور بدل ما أكتمك إنت! 🦅🩺");
    }

    if (!target) return m.reply(`*🔇 كتم/فك_كتم @user*\nاو رد على رسالته عشان نخرسه 🤫`);
    
    if (isOwner(target, bot)) {
        return m.reply(`*❌ بتهزر؟ عايز تكتم أسيادك يا جربوع؟ طب خد إنت بقى.. 🚮*`);
    }
    
    const group = global.db.groups[m.chat] ||= {};
    const muteList = group.mute ||= [];
    
    let isMuted = muteList.includes(target);
    
    if (command === "كتم") {
        if (isMuted) {
            return await conn.sendMessage(m.chat, { 
                text: `*❌ الكائن ده @${target.split('@')[0]} مكتوم أصلاً.. هو في حد يقدر يفتح بقه هنا؟ 🤡*`, 
                mentions: [target] 
            });
        }
        muteList.push(target);
        await m.react("🔇");
        await conn.sendMessage(m.chat, { 
            text: `*✅ تم خرس @${target.split('@')[0]} بنجاح! 🔒*\n\n> أي كلمة هيبعتها هتتمسح مع كرامته.. يلا يا كلب من هنا! 🥾`, 
            mentions: [target] 
        });
    } else if (command === "فك_كتم") {
        if (!isMuted) {
            return await conn.sendMessage(m.chat, { 
                text: `*❌ @${target.split('@')[0]} مش مكتوم.. سيبه يهوهو شوية مش مشكلة. 🐕*`, 
                mentions: [target] 
            });
        }
        group.mute = muteList.filter(u => u !== target);
        await m.react("🔊");
        await conn.sendMessage(m.chat, { 
            text: `*✅ تم فك خرس @${target.split('@')[0]}..*\n🔓 انطلق بس لو رغيت كتير هخرسك تاني يا فاشل! 🚮`, 
            mentions: [target] 
        });
    }
};

// --- نظام المسح التلقائي للرسايل (الرادار) ---
handler.before = async (m, { conn, bot }) => {
    if (!m.isGroup || m.fromMe) return;
    
    const isBotDev = m.sender.includes("201554582851");
    if (m.isAdmin || isBotDev) return;
    
    const muteList = global.db?.groups?.[m.chat]?.mute;
    if (!muteList || muteList.length === 0) return;
    
    if (muteList.includes(m.sender)) {
        // حذف الرسالة
        await conn.sendMessage(m.chat, { delete: m.key });
        
        // اختيار تهزيق عشوائي يتبعت كل ما يبعت رسالة
        const insults = [
            "مش قولتلك تخرس؟ يلا يا زبالة من هنا! 🚮",
            "صوتك عالي وأنا مبربش.. رسالتك اتمسحت يا شاطر. 🧹",
            "لسه بيحاول يتكلم؟ يا بني إنت كرامتك اتمسحت خلاص! 😂",
            "🔇 هشششش.. Predator AI مسح عكك ده."
        ];
        const randomInsult = insults[Math.floor(Math.random() * insults.length)];
        
        // إرسال الإهانة (اختياري عشان الشات ميتمليش تهزيق)
        // await conn.sendMessage(m.chat, { text: randomInsult }); 
        
        return true;
    }
};

handler.command = ["كتم", "فك_كتم"];
handler.admin = true;
handler.botAdmin = true;

export default handler;
