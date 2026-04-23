/* =========== 亗 PREDATOR AI - AUTHORITY PROTOCOL 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🐍 Component : High-Level Access Control Logic ⚡
 * ======================================================== */

const handler = async (m, { conn, bot }) => {
    const devName = "Ahmed Abdel Nasser";
    const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
    const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الفخمة

    try {
        let targetLid = m.mentionedJid?.[0] || m.quoted?.sender;
        let targetJid = m.lid2jid(targetLid);

        if (!targetJid || !targetLid) {
            return m.reply(`*⚠️ إنت عبيط يا "نرم"؟ منشن الضحية اللي هتاخد الرتبة! 🤡*`);
        }

        const participants = (await conn.groupMetadata(m.chat)).participants;
        const user = participants.find(p => p.id === targetLid);

        if (!user) return m.reply(`*❌ الـ "دمج" ده مش موجود في الرادار أصلاً! 👞*`);

        // إضافة المطور الجديد بختم السيادة
        await bot.config.owners.push({
            name: "亗 𝐃𝐯. 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 亗",
            jid: user.phoneNumber || targetJid,
            lid: user.id
        });

        const successMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📂 بـروتوكول تـعـيـيـن الـنـخـبـة* 亗
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـتـصريـح سـيـادي مـن ${devName}:*
┃ ➲ تـم مـنـح رتـبـة "مـطـور" لـلـعـضـو:
┃ ➲ @${targetLid.split('@')[0]}

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *مـبـروك الـشـرف ده يـا "نـرم" بـالـجـزمة 👞*
   *رادار الـ Predator بـيـراقـبـك! 🛰️*
╰─┈─┈─⟞🐍⟝─┈─┈─┈─╯
> Power by Ahmed Abdel Nasser 🦅`;

        await conn.sendMessage(m.chat, { 
            text: successMsg, 
            mentions: [targetLid],
            contextInfo: {
                externalAdReply: {
                    title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
                    body: `Authority Granted by: ${devName} 🦅`,
                    thumbnailUrl: mySovereigntyPic,
                    sourceUrl: myChannel,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        await m.react('✅');

    } catch (e) {
        await m.react('❌');
        m.reply(`*❌ السيرفر كرف للصلاحية دي.. المطور ${devName} بيصلح الرتب! 🚮*`);
    }
};

handler.usage = ["اضافه-مطور"];
handler.category = "owner";
handler.command = ["ضيف_مطور", "اضافه_مطور"];
handler.owner = true;

export default handler;
