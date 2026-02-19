const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// የቦት ቶከን
const bot = new Telegraf('8519763447:AAGSYAcMY4z8NKCXu7MJjFW-3jB1_LrwCbY');

// Render ስህተት እንዳያሳይ
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bingo Bot is Live!');
}).listen(process.env.PORT || 3000);

// ጊዜያዊ የዳታቤዝ ማከማቻ (ለሙከራ ያህል)
const userBalances = {};

// የቢንጎ ካርቴላ መፍጠሪያ
function generateBingoCard() {
  const card = [];
  const ranges = [[1, 15], [16, 30], [31, 45], [46, 60], [61, 75]];
  for (let i = 0; i < 5; i++) {
    const column = [];
    const [min, max] = ranges[i];
    while (column.length < 5) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!column.includes(num)) column.push(num);
    }
    card.push(column);
  }
  card[2][2] = "FREE";
  return card;
}

function formatCard(card) {
  let text = "<b>🎭 የእርስዎ ቢንጎ ካርቴላ</b>\n\n";
  text += "<code> B | I | N | G | O </code>\n";
  for (let r = 0; r < 5; r++) {
    let row = "";
    for (let c = 0; c < 5; c++) {
      let v = card[c][r];
      row += ` ${v < 10 ? '0'+v : v} |`;
    }
    text += `<code>${row.slice(0, -1)}</code>\n`;
  }
  return text;
}

// ዋና ማውጫ
bot.start((ctx) => {
  const userId = ctx.from.id;
  if (!userBalances[userId]) userBalances[userId] = 0;
  
  ctx.replyWithHTML(
    `<b>እንኳን ወደ ተወዳጅ ቢንጎ በደህና መጡ! 🎰</b>\n\n💰 <b>የእርስዎ ሂሳብ:</b> ${userBalances[userId]} ETB`,
    Markup.keyboard([
      ['🎮 ካርቴላ ቁረጥ (10 ETB)', '💰 ገንዘብ አስገባ'],
      ['💳 ብር አውጣ', '👤 ፕሮፋይል'],
      ['📜 ህጎች']
    ]).resize()
  );
});

// ካርቴላ መቁረጥ (ከሂሳብ ላይ ቀንሶ)
bot.hears('🎮 ካርቴላ ቁረጥ (10 ETB)', (ctx) => {
  const userId = ctx.from.id;
  if (userBalances[userId] >= 10) {
    userBalances[userId] -= 10;
    const card = generateBingoCard();
    ctx.replyWithHTML(`${formatCard(card)}\n\n✅ 10 ETB ተቀንሷል። ቀሪ ሂሳብ: ${userBalances[userId]} ETB`);
  } else {
    ctx.reply('❌ ይቅርታ፣ በቂ ሂሳብ የሎትም። እባክዎ መጀመሪያ ገንዘብ ያስገቡ።');
  }
});

// ገንዘብ ማስገቢያ (Deposit)
bot.hears('💰 ገንዘብ አስገባ', (ctx) => {
  ctx.replyWithHTML(
    `<b>የገንዘብ ማስገቢያ አማራጮች፡</b>\n\n1. በቴሌብር (0979596741)\n2. በንግድ cbe (0979596741)\n\nገንዘብ ካስገቡ በኋላ የደረሰኝ ፎቶ እዚህ ይላኩ። አድሚኑ አይቶ ሂሳብዎን ይጨምራል።`
  );
});

// የደረሰኝ ፎቶ መቀበያ
bot.on('photo', (ctx) => {
  ctx.reply('✅ የደረሰኝ ፎቶ ደርሶናል። አድሚኑ እስኪያረጋግጥ ድረስ እባክዎ በትዕግስት ይጠብቁ።');
  // እዚህ ጋር ለአድሚኑ እንዲደርሰው ማድረግ ይቻላል
});

// ገንዘብ ማውጫ (Withdraw)
bot.hears('💳 ብር አውጣ', (ctx) => {
  ctx.reply(`ማውጣት የሚፈልጉትን መጠን እና የባንክ አካውንትዎን ይላኩ። (ምሳሌ፡ 200 ETB, Telebirr 09...)`);
});

bot.launch();
console.log("Bingo Bot with Wallet is running...");
