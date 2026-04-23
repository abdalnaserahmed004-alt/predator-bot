async function handler(m, { conn, command, args, bot }) {
    const chatId = m.chat;
    const subCmd = args[0]?.toLowerCase();
    const isOwner = m.sender.includes("201554582851");
    
    // بيانات القناة والصورة من الـ Config بتاعك يا أحمد
    const channelJid = '120363225356834044@newsletter';
    const channelName = '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐒𝐘𝐒𝐓𝐄𝐌 亗 🦅';

    // حركة المطور أحمد (يا عم المجال)
    if (!subCmd && isOwner) {
        return m.reply("يا عم المجال.. داخل تفتح لوحة التحكم وناسي تختار هتفعل إيه؟ 😅 ركز يا دكتور بدل ما الجروب يضرب منك! 🦅🩺");
    }

    const menu = `
╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
│ *亗 لـوحـة تـحـكـم الـمـفـتـرس 亗*
│
│ *.تفعيل ايقاف_الترحيب*
│ > البوت هيبطل يرحب بالاعضاء
│
│ *.تفعيل تشغيل_الترحيب*
│ > البوت يرحب بالاعضاء
│
│ *.تفعيل تشغيل_الادمن*
│ > البوت يرد على المشرفين فقط
│
│ *.تفعيل ايقاف_الادمن*
│ > البوت يرد على الجميع
│
│ *.تفعيل مطور_فقط*
│ > البوت يتفاعل مع المطورين فقط
│
│ *.تفعيل مطور_عام*
│ > البوت يتفاعل مع الجميع
│
│ *.تفعيل تشغيل_مضاد_الروابط*
│ > البوت يحذف أي رابط
│
│ *.تفعيل ايقاف_مضاد_الروابط*
│ > البوت مايحذفش الروابط
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯
`;

    if (!subCmd) {
        await conn.sendButton(m.chat, {
            bodyText: menu,
            footerText: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 亗",
            buttons: [
                { name: "quick_reply", params: { display_text: "🔇 ايقاف الترحيب", id: ".تفعيل ايقاف_الترحيب" } },
                { name: "quick_reply", params: { display_text: "🔊 تشغيل الترحيب", id: ".تفعيل تشغيل_الترحيب" } },
                { name: "quick_reply", params: { display_text: "👑 تشغيل الادمن", id: ".تفعيل تشغيل_الادمن" } },
                { name: "quick_reply", params: { display_text: "👥 ايقاف الادمن", id: ".تفعيل ايقاف_الادمن" } },
                { name: "quick_reply", params: { display_text: "🚫 تشغيل مضاد الروابط", id: ".تفعيل تشغيل_مضاد_الروابط" } },
                { name: "quick_reply", params: { display_text: "✅ ايقاف مضاد الروابط", id: ".تفعيل ايقاف_مضاد_الروابط" } }
            ],
            mentions: [m.sender],
            newsletter: {
                name: channelName,
                jid: channelJid
            },
            interactiveConfig: {
                buttons_limits: 1,
                list_title: "Predator Settings",
                button_title: "إخـتـر الإعـداد",
            }
        }, m);
        return;
    }

    let result;
    
    switch (subCmd) {
        case 'ايقاف_الترحيب':
            if (!m.isOwner && !m.isAdmin) return m.reply("*❌ للمشرفين بس يا شاطر..*");
            global.db.groups[chatId].noWelcome = true;
            result = '*✅ تم إخراس الترحيب.. مفيش أهلاً بحد تاني! 🚮*';
            break;
            
        case 'تشغيل_الترحيب':
            if (!m.isOwner && !m.isAdmin) return m.reply("*❌ للمشرفين بس يا شاطر..*");
            global.db.groups[chatId].noWelcome = false;
            result = '*✅ تم تشغيل الترحيب.. هنرحب بالرعية عادي. ✨*';
            break;
            
        case 'تشغيل_الادمن':
            if (!m.isOwner && !m.isAdmin) return m.reply("*❌ للمشرفين بس يا شاطر..*");
            global.db.groups[chatId].adminOnly = true;
            result = '*✅ تم تفعيل وضع الأسياد (المشرفين فقط).. البوت مش هيرد على العوام! 👑*';
            break;
            
        case 'ايقاف_الادمن':
            if (!m.isOwner && !m.isAdmin) return m.reply("*❌ للمشرفين بس يا شاطر..*");
            global.db.groups[chatId].adminOnly = false;
            result = '*✅ تم تفعيل وضع العوام.. البوت متاح للجميع دلوقتي. 👥*';
            break;
            
        case 'مطور_فقط':
            if (!isOwner) return m.reply("*❌ بتهزر؟ إنت فاكر نفسك أحمد عبدالناصر؟ للمطور بس! 🚮*");
            global.db.ownerOnly = true;
            result = '*✅ البوت دلوقت بقى "خادم" للمطور فقط.. محدش يلمس حاجة! 🛡️*';
            break;
            
        case 'مطور_عام':
            if (!isOwner) return m.reply("*❌ للمطور بس يا حبيبي..*");
            global.db.ownerOnly = false;
            result = '*✅ البوت رجع يخدم البشرية كلها تاني.. 🌍*';
            break;
            
        case 'تشغيل_مضاد_الروابط':
            if (!m.isOwner && !m.isAdmin) return m.reply("*❌ للمشرفين بس يا شاطر..*");
            global.db.groups[chatId].antiLink = true;
            result = '*✅ مضاد الروابط اشتغل.. أي لينك هينزل صاحبه كرامته هتتمسح! 🚫*';
            break;
            
        case 'ايقاف_مضاد_الروابط':
            if (!m.isOwner && !m.isAdmin) return m.reply("*❌ للمشرفين بس يا شاطر..*");
            global.db.groups[chatId].antiLink = false;
            result = '*✅ تم إيقاف مضاد الروابط.. انشروا اللي انتم عايزينه (مؤقتاً). ✅*';
            break;

        default:
            return m.reply("*❌ خيار غلط.. ركز في الأوامر المكتوبة في القائمة يا ذكي! 🤡*");
    }
    
    if (result) {
        await m.react("⚙️");
        m.reply(result);
    }
};

handler.usage = ['تفعيل'];
handler.category = 'admin';
handler.command = ['تفعيل'];

export default handler;
