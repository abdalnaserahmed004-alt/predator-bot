const h = async (m, { text, bot, conn }) => {
    try {
        const isOwner = m.sender.includes("201554582851");
        const { images, urls, nameBot } = bot.config.info;

        // إعداد البوستر (AdReply) ببيانات قناتك وصورتك
        const adReply = {
            title: nameBot || "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 亗",
            body: "Developed by Dev Ahmed 🦅",
            thumbnailUrl: images[0] || "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
            sourceUrl: urls.channel,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: true
        };

        // حركة المطور أحمد (يا عم المجال) لو نسي النص
        if (!text && !m.quoted && isOwner) {
            return m.reply("يا عم المجال نسيت تحط نص المنشن 😅.. شكلك عايز تمنشن الدبان؟ ركز يا دكتور! 🦅🩺");
        }

        const customText = text || "亗 انتباه للجميع.. Predator AI يناديكم! 🦅";
        
        // سحب كل أعضاء الجروب
        const groupMetadata = await conn.groupMetadata(m.chat);
        const participants = groupMetadata.participants.map(v => v.id);

        // الحالة الأولى: منشن مخفي لنص عادي
        if (!m.quoted) {
            return await conn.sendMessage(m.chat, { 
                text: customText, 
                mentions: participants,
                contextInfo: { 
                    externalAdReply: adReply,
                    forwardingScore: 999,
                    isForwarded: true
                }
            });
        }

        // الحالة الثانية: منشن مخفي لرسالة (صورة، ريكورد، فيديو)
        await conn.sendMessage(m.chat, { 
            forward: m.quoted.fakeObj(), 
            mentions: participants,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999, 
                externalAdReply: adReply
            }
        });

        // رياكت السيطرة بعد المنشن
        await m.react("📢");

    } catch (err) {
        await m.reply("❌ حصل مشكلة في الرادار: " + err.message);
    }
}

h.usage = ["مخفي"]
h.category = "admin";
h.command = ['مخفي', 'h', 'hidetag']
h.group = true;
h.admin = true;
h.usePrefix = false; // يشتغل بـ "مخفي" علطول من غير نقطة لو حبيت

export default h;
