let handler = async (m, { conn, bot }) => {
  // اسمك اللي هيرجّع الهيبة ⚔️
  let watermark = '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 亗'; 
  
  let quoted = {
    key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
    message: { conversation: '⚠️ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐔𝐍𝐃𝐄𝐑 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 ⚠️' } 
  };

  // الرقم اللي البوت شافه في اللوجات (ID الحقيقي)
  const num = '276711958704275'; 
  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${watermark}
TEL;type=CELL;waid=${num}:${num}
END:VCARD`;

  let img = 'https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg'; 

  await conn.sendMessage(m.chat, {
    contacts: { displayName: watermark, contacts: [{ vcard }] },
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: '🦅 𝐓𝐇𝐄 𝐌𝐀𝐒𝐓𝐄𝐑𝐌𝐈𝐍𝐃: 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 🦅',
        body: '☢️ 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐀𝐈 : 𝐃𝐄𝐒𝐓𝐑𝐔𝐂𝐓𝐈𝐎𝐍 𝐌𝐎𝐃𝐄 ☢️',
        sourceUrl: 'https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a', 
        thumbnailUrl: img,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted });

  await conn.sendMessage(m.chat, { text: '⚡ *نظام الـ Predator تحت سيطرة المطور أحمد عبد الناصر.. ملوك المجال مش بتوع عيال!* 🏴‍☠️🔥' }, { quoted: m });
};

handler.command = /^(owner|المطور|مطور)$/i;

export default handler;
