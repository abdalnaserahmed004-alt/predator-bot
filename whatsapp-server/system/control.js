import fs from "fs";
import path from "path";

const group = async (ctx, event, eventType) => {
    try {
        if (!event?.participants) return null;
        const author = event.author;
        const participants = event.participants.map(p => p.phoneNumber || p.split('@')[0]);
        const users = participants.length ? participants.map(p => '@' + p.split('@')[0]).join(' و ') : 'مجهول';
        const authorTag = author ? '@' + author.split('@')[0] : 'القدر';

        const messages = {
            add: `*亗 نـورت مـمـلـكـة الـديف أحـمـد يـا ${users} 亗*\n\n> *ادخـل بـرجـلك الـيـمـيـن والـزم حـدودك عـشـان مـتـتـنـفـخـش!* 🦅🔥`,
            remove: `*亗 تـم دهـس الـكـلـب ${users} وطـرده لـلـجـحـيـم 亗*`,
            promote: `*亗 مـبـروك يـا ${users} بـقـيـت "خـدام" لـلأدُمـن 亗*`,
            demote: `*亗 تـم نـزع الـريـش مـن ${users} ورجـع عـبـد 亗*`
        };

        let txt = messages[eventType];
        if (!txt) return null;
        if (global.db.groups?.[event.chat]?.noWelcome) return 9999;

        await ctx.sock.msgUrl(event.chat, txt, {
            img: "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
            title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐒𝐘𝐒𝐓𝐄𝐌 亗",
            body: "𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐀𝐁𝐃𝐄𝐋 𝐍𝐀𝐒𝐒𝐄𝐑 🦅",
            mentions: author ? [author, ...event.participants] : event.participants,
            sourceUrl: "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a",
            newsletter: { name: '亗 𝐃𝐯. 𝐀𝐇𝐌𝐄𝐃 𝐓𝐒𝐇𝐀𝐍𝐀𝐋 亗', jid: '120363225356834044@newsletter' }
        });
    } catch (e) { console.error(e); }
    return null;
};

const access = async (msg, checkType, time) => {
    const conn = await msg.client();
    
    // 👑 السطر ده هو اللي هيرجعلك هيبتك: لو الرسالة منك أو إنت المطور، عدي أي حاجة!
    if (msg.fromMe || msg.isOwner) return true;
    
    // لو مفيش فحص، الأعضاء يستخدموا البوت عادي
    if (!checkType) return true;

    const messages = {
        cooldown: `*亗 اهـدى يـا مـهـووس ${time || 'شوية'} ثانية 亗*`,
        owner: `*亗 هـذا الأمـر لـعـمـك أحـمـد الـسـوهـاجـي بـس! 🇩🇪*`,
        group: `*亗 خـش جـروب الأول يـا تـايـه 亗*`,
        admin: `*亗 انـت مـجـرد عـضـو هـفـيـة يـالا 亗*`,
        botAdmin: `*亗 ارفـعـنـي أدُمـن الأول يـا مـغـفـل 亗*`
    };

    if (messages[checkType]) {
        await conn.msgUrl(msg.chat, messages[checkType], {
            img: "https://i.pinimg.com/originals/02/c3/51/02c351dfd4eb72a62f225ce964dc510d.jpg",
            title: "亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐖𝐀𝐑𝐍𝐈𝐍𝐆 亗",
            sourceUrl: "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a",
            newsletter: { name: '亗 𝐏𝐑𝐄𝐃𝐀𝐓𝐎𝐑 𝐔𝐏𝐃𝐀𝐓𝐄𝐒 亗', jid: '120363225356834044@newsletter' }
        });
        return false;
    }
    return true; 
};

export { access, group };
