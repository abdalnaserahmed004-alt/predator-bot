/* =========== 亗 WEKA_7_BOT - XO CONFLICT 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🎮 Component : Ultimate XO Sovereignty Protocol ⚡
 * ======================================================== */

const devName = "Ahmed_wek7";
const myChannel = "https://whatsapp.com/channel/0029Vb7KY1K0VycEfL11c12a";
const mySovereigntyPic = 'https://telegra.ph/file/0680061e89b456e70a7b4.jpg'; // صورتك الجاحدة

async function handler(m, { command, text, conn }) {
    global.xoGames ??= {};
    const game = global.xoGames[m.chat];
    const [cmd] = text.trim().toLowerCase().split(' ');
    const isDelete = cmd === 'delete' || cmd === 'حذف';
    const isJoin = cmd === 'join' || cmd === 'انضمام';
    
    if (isDelete) {
        if (!game) return m.reply(`*❌ مفيش لعبة أصلاً عشان تحذفها يا "نرم"! 🤡*`);
        if (game.player1 !== m.sender && game.player2 !== m.sender) return m.reply(`*❌ خليك في حالك يا "دمج" دي لعبة الكبار! 👞*`);
        delete global.xoGames[m.chat];
        return m.reply(`*🗑️ تم سحق اللعبة وإعدام الميدان بأمر ${devName}!*`);
    }
    
    if (!command || isJoin) {
        if (!game) return m.reply(`*❌ مفيش حد مستني.. اكتب .اكس عشان تعمل ساحة سيادة! 🦅*`);
        if (game.status === 'playing') return m.reply(`*❌ الساحة مشغولة بقتال "نرمات" تانية.. استنى! 🚮*`);
        if (game.player1 === m.sender) return m.reply(`*❌ بطل عبط يا "دمج" هتلعب ضد نفسك؟ 🤡*`);
        
        game.player2 = m.sender;
        game.status = 'playing';
        const startMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🎮 بـدأت مـلحـمة الـ XO* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n${drawBoard(game.board)}\n\n⚔️ *الـمـتـقـاتـلـون:*\n┃ ❌ ➪ @${game.player1.split('@')[0]}\n┃ ⭕ ➪ @${game.player2.split('@')[0]}\n\n👑 *الـبـدايـة عـند الـنـرم:* @${game.player1.split('@')[0]}\n> اخـتـار رقـم مـن 1 لـ 9 يـا "دمـج"!`;
        
        return conn.sendMessage(m.chat, { text: startMsg, mentions: [game.player1, game.player2] });
    }
    
    if (game) {
        return m.reply(game.status === 'waiting' 
            ? `*⚠️ @${game.player1.split('@')[0]} مـستـنـي "نـرم" يـلاعـبـه..*\n\nاكـتـب *.اكس انضمام* لـو قـلبـك جـايبـك! 🐍🚮`
            : `*❌ فـيـه خـنـاقـة شـغـالـة دلوقـت! 🤡*\nاكـتب *.اكس حذف* لـو عـايـز تـخرب عـلـيـهـم بـأمـر ${devName}.`, 
        null, game.status === 'waiting' ? { mentions: [game.player1] } : undefined);
    }
    
    global.xoGames[m.chat] = { player1: m.sender, player2: null, board: Array(9).fill(null), turn: 'X', status: 'waiting' };
    
    const waitMsg = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🎮 سـاحـة سـيادة الـ XO* ⚡\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n👑 *الـقائد @${m.sender.split('@')[0]} فـي انـتـظار ضـحـيـة..*\n\n> اكـتـب *.اكس انضمام* قـبـل مـا رادار ${devName} يـرصـدك! 🚮`;
    
    return conn.sendMessage(m.chat, { 
        text: waitMsg, 
        mentions: [m.sender],
        contextInfo: {
            externalAdReply: {
                title: "亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗",
                body: `Developed by: ${devName} 🦅`,
                thumbnailUrl: mySovereigntyPic,
                sourceUrl: myChannel,
                renderLargerThumbnail: true
            }
        }
    });
}

handler.before = async (m, { conn }) => {
    if (!m.text || !global.xoGames?.[m.chat]) return false;
    const game = global.xoGames[m.chat];
    if (game.status !== 'playing') return false;
    
    const currentPlayer = game.turn === 'X' ? game.player1 : game.player2;
    if (m.sender !== currentPlayer) return false;
    
    const move = parseInt(m.text.trim()) - 1;
    if (move < 0 || move > 8 || isNaN(move)) return false;
    if (game.board[move] !== null) return !await m.reply(`*❌ المربع ده محجوز يا "دمج"! ركز شوية! 🤡👞*`);
    
    game.board[move] = game.turn;
    const winner = checkWinner(game.board);
    
    if (winner || game.board.every(cell => cell)) {
        let text, winnerJid;
        if (winner) {
            winnerJid = winner === 'X' ? game.player1 : game.player2;
            text = `╭─┈─┈─┈─⟞亗⟝─┈─┈─┈─╮\n  *🏆 انـتـصـار سـيـادي مـطـلـق* 亗\n╰─┈─┈─┈─⟞亗⟝─┈─┈─┈─╯\n\n${drawBoard(game.board)}\n\n🎉 *الـمـنـبـطـح الـفـائز:* @${winnerJid.split('@')[0]}\n👑 *بـمـنّـيـة مـن الـمـطـور:* ${devName}`;
            
            if (global.db?.users[winnerJid]) {
                global.db.users[winnerJid].xp = (global.db.users[winnerJid].xp || 0) + 500;
                global.db.users[winnerJid].cookies = (global.db.users[winnerJid].cookies || 0) + 10;
                text += `\n🎁 *الـغـنـائـم:* +500 XP | 🍪 +10 كـوكـيـز`;
            }
        } else {
            text = `╭─┈─┈─┈─⟞👞⟝─┈─┈─┈─╮\n  *🤝 تـعادل الـنـرمـات* 🚮\n╰─┈─┈─⟞👞⟝─┈─┈─┈─╯\n\n${drawBoard(game.board)}\n\n*مـحـدش كـسب.. إنتـو الاتنين "دمـج" بـالنسبة لـ ${devName}! 🤡*`;
        }
        
        await conn.sendMessage(m.chat, { text, mentions: winnerJid ? [winnerJid] : undefined });
        delete global.xoGames[m.chat];
        return true;
    }
    
    game.turn = game.turn === 'X' ? 'O' : 'X';
    const nextPlayer = game.turn === 'X' ? game.player1 : game.player2;
    await conn.sendMessage(m.chat, { 
        text: `${drawBoard(game.board)}\n\n👑 *دورك يـا "نـرم":* @${nextPlayer.split('@')[0]} (${game.turn})\n> ركـز قـبل مـا ${devName} يـكـسر الـميدان! 👞`,
        mentions: [nextPlayer] 
    });
    return true;
};

handler.usage = ["اكس"];
handler.category = "games";
handler.command = ['اكس', 'xo'];
handler.usePrefix = true;
export default handler;

const drawBoard = b => [0,3,6].map(i => 
    b.slice(i,i+3).map((c,idx) => c ? (c==='X'?'❌':'⭕') : `${i+idx+1}️⃣`).join(' | ')
).join('\n');

const checkWinner = b => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a,c,d] of lines) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    return null;
};
