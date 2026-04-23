/* =========== 亗 PREDATOR AI - IG DOWNLOADER 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗
 * 🛰️ Component : High-Speed Instagram Hijacker 📸⚡
 * ======================================================== */

const insta = async (m, { text, Api, conn }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";

  if (!text) {
    return m.reply(`*⚠️ ركز يا "نرم"! فين رابط الإنستا؟ 🤨*\n\nاكتب: .انستا (الرابط)\n\n> *بـأمر الـقـيـادة: Ahmed Abdel Nasser* 🦅`);
  }

  // رياكت "جاري الاختراق"
  await m.react('📸');

  try {
    const { status, data } = await Api.download.instagram({ url: text });

    if (status !== 'success') {
      await m.react("❌");
      return m.reply(`*❌ السيرفر مش طايقك يا "دمج"! 🤡*\nالرابط غلط أو الفيديو خاص.. روح اتعلم إزاي تجيب روابط من المطور أحمد! 🚮`);
    }

    if (Array.isArray(data)) {
      let thumbnail, video;
      
      for (let item of data) {
        if (item.type === "thumbnail") thumbnail = item.url;
        else if (item.type === "video") video = item.url;
      }
      
      const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *📥 تـم سـحب بـيانات الإنـستا*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *بـأمر الـقائد Ahmed Abdel Nasser:*
┃ ➲ *الـمـخترق:* @${m.sender.split('@')[0]}
┃ ➲ *الـحالة:* تم الجلب بـنجاح ✅
┃ ➲ *الـقـناة:* Dv. AHMED TSHANAL

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *خـد الـريلز يـا "نـرم" وطـير مـن هـنا* 🚮
   *مملكة الـ Predator دايمـاً فـي الـصدارة!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Developed by Ahmed Abdel Nasser 🦅`;

      if (video) {
        await conn.sendMessage(m.chat, { 
          video: { url: video }, 
          caption: msg,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: "亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗",
              body: "تـم الـتـحـميل بـواسـطـة Ahmed Abdel Nasser",
              thumbnailUrl: thumbnail || "https://telegra.ph/file/0680061e89b456e70a7b4.jpg",
              sourceUrl: myChannel,
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m });
        await m.react('✅');
      } else {
        m.reply("*❌ مفيش فيديو في الرابط ده يا ذكي! ده أكيد بوست صور.. روح نام! 😴🚮*");
      }
    }
  } catch (error) {
    console.error(error.message);
    await m.react("❌");
    m.reply(`*❌ فشلت العملية يا "فاشل"! 🤡*\nده خطأ برمجي.. ابعت اسكرين للمطور أحمد يصلح لك خيبتك! 🐍`);
  }
};

insta.usage = ["انستا"];
insta.category = "downloads";
insta.command = ["انستا", "instagram", "ig"];
insta.admin = false;

export default insta;
