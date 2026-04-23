/* =========== 亗 WEKA_7_BOT - IDENTITY ENGINE 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 🛰️ Component : Global Reply Status Identity 🛡️💀
 * ======================================================== */

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

export default async function before(m, { conn, bot }) {

  // إعداد الهوية العالمية للردود (Fake Contact / Status)
  if (!global.reply_status) {
    global.reply_status = {
      key: {
        participant: `0@s.whatsapp.net`, // رقم وهمي للسيستم
        remoteJid: 'status@broadcast',   // يظهر كأنه رد على حالة
        fromMe: false,
      },
      message: {
        contactMessage: {
          // هنا الكبرياء كله.. الاسم اللي بيظهر في الرد
          displayName: `亗 𝐀𝐡𝐦𝐞𝐝 𝐀𝐛𝐝𝐞𝐥 𝐍𝐚𝐬𝐬𝐞𝐫 🦅`, 
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Ahmed_wek7\nORG:Weka_7_BOT Developer;\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:👑 عم المـجال\nEND:VCARD`,
        },
      },
    }
  };
  
  // تحديث التوقيع بشكل ديناميكي لو حابب يظهر اسم الشخص اللي بيكلمك في الرد
  // بس إحنا مثبتين اسمك إنت عشان الهيبة يا احمد_wek7
  
  return false;
}
