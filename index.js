const { Telegraf } = require('telegraf');
const http = require('http');

// የቦት ቶከንህ
const bot = new Telegraf('8519763447:AAGSYAcMY4z8NKCXu7MJjFW-3jB1_LrwCbY');

// Render ፖርት ፈልጎ ቦቱን እንዳይዘጋው (Status 1 እንዳይል) ይህ የግድ ያስፈልጋል
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bingo Bot is Live!');
}).listen(process.env.PORT || 3000);

bot.start((ctx) => {
  ctx.reply('እንኳን ወደ ተወዳጅ ቢንጎ ቦት በደህና መጡ! \n\nለመጫወት ከታች ያለውን አዝራር ይጫኑ።');
});

bot.launch();
console.log("Bot is running...");
