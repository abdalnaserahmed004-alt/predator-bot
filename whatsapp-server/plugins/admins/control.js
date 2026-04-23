const handler = async (m, { conn, command, text, bot, participants }) => {
    try {
        const isOwner = m.sender.includes("201554582851");
        
        const isBotOwner = (userId) => {
            return userId.includes("201554582851") || userId.includes(conn.user.id.split(':')[0]);
        };

        const getUser = () => {
            if (m.quoted) return m.quoted.sender;
            if (m.mentionedJid && m.mentionedJid.length > 0) return m.mentionedJid[0];
            if (text && text.length > 5) return text.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
            return null;
        };

        // --- حركات المطور الساخرة ---
        if (!text && !m.quoted && isOwner) {
             return m.reply("يا عم المجال نسيت المنشن 😅.. شكلك محتاج كورس إسعافات أولية لبرمجتك! 🦅🩺");
        }

        // مصفوفة "الإهانات" عند الطرد
        const kickInsults = [
            "يلا يا كلب من هنا.. الجروب ده للسادة مش للأشكال دي! 🚮",
            "تم التنظيف.. واحد زبالة وخرجناه من الجروب. ✨",
            "أهو غار في داهية.. عقبال الباقي اللي زيه. 🥾",
            "باي باي يا بيبي.. روح العب بعيد عشان هنا في وحوش (Predator AI). 🦅",
            "تم طرد الكائن ده بنجاح.. الجروب بقى أنضف دلوقتي! 🧼"
        ];
        const randomKick = kickInsults[Math.floor(Math.random() * kickInsults.length)];

        if (command === "طرد") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن الضحية اللي هنمسح بكرامتها الأرض..");
            
            // حماية المطور (أحمد)
            if (isBotOwner(user)) {
                await m.reply("بتهزر؟ عايز تطرد أسيادك يا جربوع؟ طب خد إنت بقى عشان تتعلم الأدب.. 🚮");
                return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
            
            // الإهانة قبل الطرد
            await conn.sendMessage(m.chat, { text: `@${user.split('@')[0]} ${randomKick}`, mentions: [user] });
            
            // تنفيذ الطرد
            return await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
        }
        
        if (command === "رفع") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن الشخص اللي هنرقيه (حظه حلو).");
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
            return m.reply("✅ مبروك يا محظوظ.. بقيت أدمن بس خليك في حالك. 👑");
        }
        
        if (command === "خفض") {
            let user = getUser();
            if (!user) return m.reply("❌ منشن اللي هننزله لسابع أرض.");
            await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
            return m.reply("🚮 رجعت مواطن درجة تالتة.. التواضع لايق عليك! 😂");
        }

        if (command === "كتم") {
            await conn.groupSettingUpdate(m.chat, 'announcement');
            return m.reply("🤫 هشششش.. الجروب اتقفل. مسمعش صوت نملة، الأدمن بس اللي يتكلموا! 🔒");
        }

        if (command === "فتح") {
            await conn.groupSettingUpdate(m.chat, 'not_announcement');
            return m.reply("🔓 انطلقوا.. بس اللي هيرغي كتير هقصه بـ 'طرد' فوري! 😈");
        }

        if (command === "ضيف") {
            let user = getUser();
            if (!user) return m.reply("❌ حط الرقم يا دكتور.. مش هنخمن إحنا!");
            await conn.groupParticipantsUpdate(m.chat, [user], 'add');
            return m.reply("✅ تم حشر الكائن ده في الجروب بنجاح.");
        }
        
    } catch (error) {
        await m.reply("❌ حصل مشكلة يا ديف.. شكل الجروب مسكون: " + error.message);
    }
};

handler.usage = ['ضيف', 'طرد', 'رفع', 'خفض', 'كتم', 'فتح'];
handler.command = ['ضيف', 'طرد', 'رفع', 'خفض', 'كتم', 'فتح'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
