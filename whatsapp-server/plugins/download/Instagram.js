/* =========== 亗 WEKA_7_BOT - IG DOWNLOADER 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🛰️ Component : High-Speed Instagram Hijacker 📸⚡
 * ======================================================== */

const insta = async (m, { text, Api, conn }) => {
  const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";

  if (!text) {
    return m.reply(`*⚠️ ركز يا "نرم"! فين رابط الإنستا؟ 🤨*\n\nاكتب: .انستا (الرابط)\n\n> *بـأمر الـقـيـادة: Ahmed_wek7* 🦅`);
  }

  // رياكت "جاري الاختراق"
  await m.react('📸');

  try {
    const { status, data } = await Api.download.instagram({ url: text });

    if (status !== 'success') {
      await m.react("❌");
      return m.reply(`*❌ السيرفر مش طايقك يا "دمج"! 🤡*\nالرابط غلط أو الفيديو خاص.. روح اتعلم إزاي تجيب روابط من الالمطور احمد_wek7! 🚮`);
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

👑 *بـأمر الـقائد Ahmed_wek7:*
┃ ➲ *الـمـخترق:* @${m.sender.split('@')[0]}
┃ ➲ *الـحالة:* تم الجلب بـنجاح ✅
┃ ➲ *الـقـناة:* Ahmed_wek7 TSHANAL

╭─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╮
   *خـد الـريلز يـا "نـرم" وطـير مـن هـنا* 🚮
   *مملكة الـ Weka_7 دايمـاً فـي الـصدارة!*
╰─┈─┈─⟞👞⟝─┈─┈─┈─╯
> Developed by Ahmed_wek7 🦅`;

      if (video) {
        await conn.sendMessage(m.chat, { 
          video: { url: video }, 
          caption: msg,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
              body: "تـم الـتـحـميل بـواسـطـة Ahmed_wek7",
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
    m.reply(`*❌ فشلت العملية يا "فاشل"! 🤡*\nده خطأ برمجي.. ابعت اسكرين للالمطور احمد_wek7 يصلح لك خيبتك! 🐍`);
  }
};

insta.usage = ["انستا"];
insta.category = "downloads";
insta.command = ["انستا", "instagram", "ig"];
insta.admin = false;

export default insta;
