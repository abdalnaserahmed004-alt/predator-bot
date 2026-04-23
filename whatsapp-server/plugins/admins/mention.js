const handler = async (m, { conn, bot, args }) => {
    const isOwner = m.sender.includes("201210155616");

    // حركة الالمطور احمد_wek7 (يا عم المجال) لو استخدم الأمر بره جروب
    if (!m.isGroup && isOwner) {
        return m.reply("يا عم المجال.. هو في حد في الشات الخاص غيري أنا وإنت؟ 😅 المنشن ده للجروبات يا دكتور! 🦅🩺");
    }

    try {
        const metadata = await conn.groupMetadata(m.chat);
        const participants = metadata.participants;
        const groupAdmins = participants.filter(p => p.admin).map(p => p.id);
        const groupMembers = participants.filter(p => !p.admin).map(p => p.id);

        // ترتيب عشوائي عشان التغيير
        const shuffledAdmins = [...groupAdmins].sort(() => Math.random() - 0.5);
        const shuffledMembers = [...groupMembers].sort(() => Math.random() - 0.5);

        let messageText = `*亗 WEKA_7 GROUP RADAR 亗*\n`;
        messageText += `*────────────────────*\n`;
        messageText += `*📁 الـاســم:* ${metadata.subject}\n`;
        messageText += `*📅 الـتـاريـخ:* ${new Date().toLocaleDateString('ar-EG')}\n`;
        messageText += `*👑 الـمـشـرفـيـن:* ${shuffledAdmins.length}\n`;
        messageText += `*👥 الأعـضـاء:* ${shuffledMembers.length}\n`;
        messageText += `*────────────────────*\n\n`;

        // قسم المشرفين (الأسياد)
        messageText += `*↓👑 قـائـمـة الـعـظـمـاء 👑↓*\n`;
        messageText += "```";
        shuffledAdmins.forEach((admin, index) => {
            messageText += `${index + 1}. 🦅 @${admin.split('@')[0]}\n`;
        });
        messageText += "```\n\n";

        // قسم الأعضاء (الرعية)
        messageText += `*↓👥 قـائـمـة الـرعـيـة (الضحايا) 👥↓*\n`;
        messageText += "```";
        shuffledMembers.forEach((member, index) => {
            messageText += `${index + 1}. 👤 @${member.split('@')[0]}\n`;
        });
        messageText += "```\n\n";

        messageText += `> *إجمالي المفترسين داخل القفص — ${participants.length}* 🦅\n`;
        messageText += `> _Dev: Ahmed_wek7_`;

        // إرسال الرسالة مع البصمة الإعلانية لقناتك
        return conn.sendMessage(m.chat, { 
            text: messageText, 
            mentions: participants.map(p => p.id),
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐖𝐄𝐊𝐀_𝟕_𝐁𝐎𝐓 亗",
                    body: "نظام السيطرة الموحد 2026",
                    thumbnailUrl: bot.config.info.images[0],
                    sourceUrl: bot.config.info.urls.channel,
                    mediaType: 1,
                    showAdAttribution: true
                }
            }
        });

    } catch (e) {
        m.reply("❌ حصل عطل في الرادار.. غالباً الجروب ده كبير زيادة عن اللزوم! 🚮");
    }
};

handler.usage = ["منشن"]
handler.category = "admin";
handler.command = ["منشن", "منشنز", "tagall"];
handler.admin = true;
handler.group = true;

export default handler;
