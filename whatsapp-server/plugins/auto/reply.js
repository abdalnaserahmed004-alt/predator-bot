/* =========== 亗 PREDATOR AI - THE ULTIMATE RADAR 亗 ===========
 * 🛠️ Developer : Ahmed Abdel Nasser (Dev Ahmed)
 * 🛰️ Mode      : Absolute Domination & Brand Awareness 🛡️💀
 * ======================================================== */

export default async function before(m, { conn, bot }) {
  if (!m.text || m.fromMe) return false;

  const text = m.text.toLowerCase();

  // 1. [ قـامـوس الـردود الإيـجـابـيـة ] - (تـطـبـيـل لـلـمـلك)
  const socialTriggers = {
    "السلام عليكم": [
        "*وعليكم السلام.. نورت مملكة المطور Ahmed Abdel Nasser! 👑*",
        "*وعليكم السلام.. صلي على النبي ﷺ في رحاب برمجيات أحمد! ❤️*"
    ],
    "تست": ["*البوت شغال طلقة بأوامر أحمد عبد الناصر.. متبوظش الكيبورد! 🔥*"],
    "منور": ["*النور نور المطور Ahmed Abdel Nasser ونورك يا برنس! 🦅*"],
    "عاش": ["*عاش لينا وليك المطور أحمد اللي برمج العظمة دي! 🚀*"],
    "شكرا": ["*الشكر للمطور Ahmed Abdel Nasser اللي سخرني لخدمتك! 😎*"],
    "يا عالمي": ["*العالمي هو أحمد عبد الناصر.. أنا مجرد ذكاء من صنعه! 🌍👑*"]
  };

  // 2. [ لـسـتـة الـشـتـائـم الـبـزيـئـة ] - (الرد بالمثل مع ذكر اسمك)
  const hardToxic = [
    "سكس", "طيز", "شرج", "لعق", "لحس", "مص", "تمص", "بيضان", "ثدي", "بز", "بزاز", 
    "حلمة", "مفلقسة", "بظر", "كس", "فرج", "شهوة", "شاذ", "مبادل", "عاهرة", "جماع", 
    "قضيب", "زب", "لوطي", "لواط", "سحاق", "سحاقية", "اغتصاب", "خنثي", "احتلام", 
    "نيك", "متناك", "متناكة", "شرموطة", "عرص", "خول", "قحبة", "لبوة", "عرث", "ابن العرص"
  ];

  // 3. [ لـسـتـة الـكـلام الـعـادى ] - (تهزيق باسم المطور)
  const lightToxic = [
    "حمار", "جزمة", "غبي", "كلب", "متخلف", "فاشل", "يا بوت", "نرم", "عبيط", "دمج", "منبطح"
  ];

  // --- 1. تنفيذ الردود الاجتماعية ---
  if (socialTriggers[m.text]) {
    await m.reply(socialTriggers[m.text].random());
    return false;
  }

  // --- 2. رادار الكلام البزيء (رد إبادة باسم أحمد) ---
  const foundHard = hardToxic.find(word => text.includes(word));
  if (foundHard) {
    const hardReplies = [
      `*إنت اللي ${foundHard} يا @${m.sender.split('@')[0]}.. المطور Ahmed Abdel Nasser مبيسمحش بالأشكال دي هنا! 👞*`,
      `*تفوووو على شكلك يا ${foundHard}.. المطور أحمد عبد الناصر هيطيرك من المجرة! 🚮*`,
      `*بص في المراية هتلاقي أكبر ${foundHard}.. اعدل لسانك في مملكة القيادة Ahmed Abdel Nasser! 🦅🔥*`
    ];
    await conn.sendMessage(m.chat, { text: hardReplies.random(), mentions: [m.sender] }, { quoted: m });
    return true;
  }

  // --- 3. رادار الكلام العادي (تهزيق قوي باسم أحمد) ---
  const foundLight = lightToxic.find(word => text.includes(word));
  if (foundLight) {
    const heavyInsults = [
      `*يا ${foundLight} يا منبطح.. المطور Ahmed Abdel Nasser قالي مديش قيمة لأشكالك! 🚮*`,
      `*إنت يا ابني ${foundLight} بالفطرة؟ روح اتعلم الأدب من مدرسة أحمد عبد الناصر الأول! 😂🔥*`,
      `*الـ Predator مبيتعاملش مع عيال ${foundLight}.. اعتذر للمطور أحمد حالا! 💀*`
    ];
    await conn.sendMessage(m.chat, { text: heavyInsults.random(), mentions: [m.sender] }, { quoted: m });
    return true;
  }

  // 4. [ رادارات خـاصـة بـاسـمـك ]
  if (text.includes("أحمد") || text.includes("ahmed")) {
    await m.react("👑"); // رياكت التاج فوراً
  }
  
  if (text.includes("مين المطور") || text.includes("صاحب البوت")) {
    await m.reply("*صاحب العرش ومطور الـ Predator هو الأسطورة Ahmed Abdel Nasser! 🦅👑*");
  }

  return false;
}
