/* =========== 亗 WEKA_7_BOT - CYBER INFILTRATOR 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Cyber Security & Multi-Group Infiltration ⚡
 * ============================================================ */

const handler = async (m, { conn, text, bot }) => {
  const devName = "Ahmed_wek7";
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
  const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة
  
  // الرابط الأساسي (روم السايبر سكيورتي)
  const cyberGroup = "https://chat.whatsapp.com/IZ23IAu9s6i7FSLE9eR0B3";

  // تحديد الهدف: لو فيه نص بعد الأمر هياخده، لو مفيش هيروح للينك السايبر
  const targetGroup = text ? text.trim() : cyberGroup;

  // التحقق من صحة الرابط
  if (!targetGroup.includes("https://chat.whatsapp.com/")) {
    return m.reply(`*⚠️ يـا "نـرم" ابـعـت رابـط واتـساب صـح عـشان نـبـدأ الـغزو! 🤡*`);
  }

  // بروتوكول التعامل مع المستخدمين (النرمات)
  if (!m.isOwner) {
    const ownerJid = bot?.config?.owners[0]?.jid;
    m.reply(`*⚠️ يـا "نـرم" تـم إرسـال طـلـبـك لـلـقـائد ${devName}.. انـتـظر الـقـرار الـسيادي! ⏳*`);
    
    await conn.sendMessage(ownerJid, { 
      text: `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🚨 إخـطـار طـلـب غـزو* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *الـقائد ${devName}:*\n┃ ➲ مـن الـنـرم: @${m.sender.split("@")[0]}\n┃ ➲ الـمـيـدان: ${targetGroup}\n\n> قـرر مـصيـره دلوقـت يـا Weka_7 🦅`, 
      mentions: [m.sender] 
    });
    return;
  }

  // تنفيذ الاكتساح المباشر (للالمطور احمد_wek7 فقط)
  try {
    await m.react("🛰️");
    // استخراج كود الدعوة بذكاء
    const code = targetGroup.split("https://chat.whatsapp.com/")[1].split(/[^\w-]/i)[0];
    await conn.groupAcceptInvite(code);
    
    const isCyber = targetGroup === cyberGroup;
    const successMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *✅ تـم اكـتـسـاح الـمـيـدان* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *تـم الـدخـول بـأمـر الـقـائد: ${devName}*\n┃ ➲ الـهـدف: ${isCyber ? "روم الـسـايـبـر سـكـيـورتـي 🛡️" : "مـيـدان جـديـد 🛰️"}\n┃ ➲ الـحـالـة: تـحـت الـسيـطرة\n\n> الـ Weka_7 فـي الـمـكـان يـا نـرمـات 🦅`;

    await conn.sendMessage(m.chat, { 
        text: successMsg,
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `Cyber Operations by: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

  } catch (e) {
    m.reply(`*❌ الـمـيدان مـحصـن أو الـرابـط تـالـف يـا مطور ${devName}! 🚮*`);
  }
};

handler.usage = ["انضم"];
handler.category = "owner";
handler.command = ["انضم", "ادخل"];

export default handler;
