menu.before = async (m, { conn, bot }) => {
    clean();
    const isOwner = m.sender.includes("201554582851");
    const menuData = global.menus[m.quoted?.id];
    if (!menuData) return false;
    
    // سخرية "يا عم المجال" للمطور
    if (isNaN(m.text) && isOwner) {
        return m.reply("يا عم المجال ركز.. قولتلك رد بـ *رقم* القسم مش بـ طلاسم! 😅🩺");
    }

    const selection = parseInt(m.text);
    const cat = getCat(selection);
    if (!cat) return false;

    // --- نظام التهزيق لغير المشرفين في قسم الإدارة (رقم 8) ---
    const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
    const isAdmin = m.isGroup ? groupMetadata.participants.find(p => p.id === m.sender)?.admin : false;

    if (selection === 8 && !isAdmin && !isOwner) {
        await m.react("❌");
        const insults = [
            "إنت فاكر نفسك أدمن يا جربوع؟ القسم ده للأسياد بس! 🚮",
            "بتبص على أوامر الإدارة ليه؟ ناوي تتطرد قريب ولا إيه؟ 🥾",
            "القسم ده محتاج شنب.. وإنت لسه بتشرب لبن نيدو. اخلع يا شاطر! 🍼",
            "ممنوع دخول العوام.. روح العب في قسم الألعاب بعيد عن هنا. 🕹️"
        ];
        return m.reply(`*⚠️ عـفـواً أيـهـا الـمـواطـن الـفـاشـل..*\n\n> _${insults[Math.floor(Math.random() * insults.length)]}_`);
    }
    // -------------------------------------------------------

    const cmds = menuData.cats[cat[2]];
    if (!cmds?.length) {
        await conn.sendMessage(m.chat, { text: '🚮 *القسم ده فاضي زي دماغ اللي صنع السورس القديم!*' }, { quoted: m });
        return true;
    }
    
    const cmdsList = cmds.map(c => `*┃ ◈* /${c.usage.join(`\n*┃ ◈* /`)}`).join('\n');
    
    await conn.sendMessage(m.chat, { 
        text: `
*───〔 亗 قـسـم ${cat[1]} 亗 〕───*

${cmdsList}

*───〔 ᴘʀᴇᴅᴀᴛᴏ𝐑 ᴇᴅɪᴛɪᴏɴ 〕───*
> *🦅 السيطرة الكاملة أو الدمار الشامل*`.trim(),
        contextInfo: context(m.sender, getImg(bot), bot)
    }, { quoted: m });
    
    await m.react("🔥");
    return true;
};
 