/* =========== 亗 WEKA_7_BOT - RANKING SYSTEM 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 🛰️ Component : Cyber Evolution Engine 🛡️💀
 * ======================================================== */

export default async function before(m, { conn }) {
    if (!global.db?.users[m.sender]) return false;
    
    const user = global.db.users[m.sender];
    let xp = user.xp || 0;
    let level = user.level || 0;
    let nameLevel = user.nameLevel || '🛡️ ضحية بريئة';
    
    // رتب الـ Weka_7 الجديدة (هيبة وتقنية)
    const levels = [
        { min: 0, max: 199, name: '🛡️ ضحية بريئة' },
        { min: 200, max: 499, name: '🖱️ مستخدم عادي' },
        { min: 500, max: 999, name: '📟 كودر مبتدئ' },
        { min: 1000, max: 1999, name: '🌐 متسلل شبكات' },
        { min: 2000, max: 3499, name: '👾 صائد ثغرات' },
        { min: 3500, max: 5499, name: '🛰️ مهندس أنظمة' },
        { min: 5500, max: 7999, name: '🛡️ جدار حماية بشري' },
        { min: 8000, max: 10999, name: '💀 قرصان أسود' },
        { min: 11000, max: 14999, name: '🧠 ذكاء اصطناعي محاكي' },
        { min: 15000, max: 19999, name: '⚡ سيد الأكواد' },
        { min: 20000, max: 25999, name: '⚔️ مقاتل سيبراني' },
        { min: 26000, max: 32999, name: '🦅 صقر البريديتور' },
        { min: 33000, max: 40999, name: '🔥 مدمر السيرفرات' },
        { min: 41000, max: 49999, name: '🔱 جنرال التقنية' },
        { min: 50000, max: 64999, name: '💎 نـخبة الـ Weka_7' },
        { min: 65000, max: 79999, name: '🛰️ مـتحكم الأقمار' },
        { min: 80000, max: 99999, name: '🌌 حـاكم البيانات' },
        { min: 100000, max: Infinity, name: '亗 الـرقمـي الأوحـد 亗' }
    ];
    
    let newLevel = level;
    let newNameLevel = nameLevel;
    let levelUp = false;
    let oldLevelNum = level;
    
    for (const lvl of levels) {
        if (xp >= lvl.min && xp <= lvl.max) {
            const currentLevelNum = levels.findIndex(l => l.min === lvl.min);
            if (currentLevelNum !== level) {
                newLevel = currentLevelNum;
                newNameLevel = lvl.name;
                levelUp = true;
            }
            break;
        }
    }
    
    if (levelUp) {
        user.level = newLevel;
        user.nameLevel = newNameLevel;
        
        const msg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮
  *⚡ تـرقـية بـريـديـتـور جـديـدة ⚡*
╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯

👑 *تـحـية لـلـوحـش:* @${m.sender.split('@')[0]}
✨ *بـأمر الـمـطور Ahmed_wek7:*

┃ 📊 الـمستوى الـسابق: *[ ${oldLevelNum} ]*
┃ 📈 الـمستوى الـجديد: *[ ${newLevel} ]*

┃ 🏷️ *لـقـبك الـسيبراني الـجديد:*
┃ ➲ ✨ ${newNameLevel} ✨

╭─┈─┈─┈─⟞🛡️⟝─┈─┈─┈─╮
   *قـوتك بـتزيد.. كـمل تـفاعل*
   *عـشان تـوصل لـقـمة الـهـرم!*
╰─┈─┈─┈─⟞🦅⟝─┈─┈─┈─╯
> Developed by Ahmed_wek7 🦅`;
        
        await m.react("🆙");

        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 1,
                externalAdReply: {
                    title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑-𝐀𝐈 | لـيـفل أب",
                    body: `تـم تـرقـية الـعضو بـواسـطة Ahmed_wek7`,
                    thumbnailUrl: "https://telegra.ph/file/0680061e89b456e70a7b4.jpg", // حط صورة فخمة هنا
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }
    
    return false;
}
