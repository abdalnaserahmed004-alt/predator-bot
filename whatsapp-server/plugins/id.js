/* =========== 亗 WEKA_7_BOT - IDENTITY SCANNER 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Advanced User Identity Extraction ⚡
 * ======================================================== */

let user = async (m, { args, conn }) => {
    const devName = "Ahmed_wek7";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    try {
        await m.react("🔍");
        
        // تحديد المستهدف (لو منشن، لو ريبلاي، أو الشخص نفسه)
        let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
        
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
        let participant = m.isGroup ? groupMetadata.participants.find(p => p.id === who) : { id: who };

        if (!participant) {
            return m.reply(`*❌ الـهدف ده مـش مـوجود فـي الـرادار يـا "نـرم"! 🤡*`);
        }

        // بروتوكول تجميع البيانات السيادي
        const userData = {
            status: "Success",
            dev: devName,
            user: {
                name: conn.getName(who) || "Unknown Target",
                jid: who,
                number: who.split('@')[0],
                role: participant.admin ? (participant.admin === 'superadmin' ? 'الـقائد الأعلى' : 'مـساعد سيـادي') : 'مـواطن عادي',
            }
        };

        const responseMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🪪 بـروتوكول كـشف الـهويـة* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *تـقـرير الـقـائد ${devName}:*\n┃ ➲ الاسـم: ${userData.user.name}\n┃ ➲ الـرقم: ${userData.user.number}\n┃ ➲ الـرتـبة: ${userData.user.role}\n┃ ➲ الـ JID: \`\`\`${userData.user.jid}\`\`\`\n\n> الـ Weka_7 يـخترق الـخـصوصية 🦅`;

        await conn.sendMessage(m.chat, { 
            text: responseMsg,
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                    body: `Identity Scan: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        await m.react("✅");

    } catch (err) {
        console.error(err);
        m.reply(`*❌ الـرادار كـرف.. الـمطور ${devName} بـيعيد تـوجيه الإشارة! 🚮*`);
    }
};

user.command = ['لمطور', 'id', 'هويته', 'اي_دي'];
export default user;
