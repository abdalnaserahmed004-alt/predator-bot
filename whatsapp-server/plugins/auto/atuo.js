/* =========== 亗 WEKA_7_BOT - BLOCK DEFENSE 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 🛰️ Mode      : Post-Block Humiliation 💀👞
 * ======================================================== */

export default async function before(m, { conn }) {
    // التأكد إن الشخص ده واخد بلوك فعلياً
    const userJid = m.sender;
    const blockList = await conn.fetchBlocklist().catch(() => []);
    const isBlocked = blockList.includes(userJid);

    if (isBlocked && !m.isOwner) {
        // --- 📝 قائمة كلمات "الوداع المذل" ---
        const goodbyeInsults = [
            `عمك "Ahmed_wek7" عملك بلوك يا نكرة.. هبقى أرد عليك في أحلامك! 😂`,
            `خـد الـبـلوك ده وتـعـال بـكـرة.. مـحـدش فـاضـي لـلـعـيـال! 👞`,
            `بما إن المطور بلكك، فـ إنت كدة بقيت رسمي من "المنبطحين".. باي باي! 🚮`,
            `إنت لسه بتحاول تبعت؟ ده إنت بجد معندكش دم! المطور رماك في الزبالة خلاص. 🗑️`,
            `هرد عليك المرة الجاية لما تتعلم إزاي تتعامل مع الأسياد.. تشاو يا منبطح! 🐍🔥`,
            `تفوووو.. حتى البلوك مش مالي عينك؟ المطور بلكك عشان ريحتك طلعت! 💦💩`
        ];

        // اختيار إهانة عشوائية
        const finalDiss = goodbyeInsults[Math.floor(Math.random() * goodbyeInsults.length)];

        // إرسال الإهانة مرة واحدة فقط (عشان ميعملش سبام)
        // بنستخدم db عشان نتأكد إننا بعتنا له الرسالة دي مرة واحدة بس بعد البلوك
        global.db.users[m.sender] ??= {};
        if (!global.db.users[m.sender].lastBlockMsg || Date.now() - global.db.users[m.sender].lastBlockMsg > 600000) { 
            await m.reply(finalDiss);
            global.db.users[m.sender].lastBlockMsg = Date.now(); // يسجل الوقت عشان ميبعتش كل ثانية
        }

        return true; // وقف معالجة أي أوامر تانية
    }

    return false;
}
