const { Telegraf, Markup } = require('telegraf');

// የእርስዎ Bot Token
const bot = new Telegraf('8519763447:AAGSYAcMY4z8NKCXu7MJjFW-3jB1_LrwCbY');

bot.start((ctx) => {
  const name = ctx.from.first_name;
  const welcomeText = `እንኳን ወደ **ተወዳጅ ቢንጎ** በደህና መጡ! 🎰\n\nውድ ${name} በዚህ ቦት ተዝናንተው ያሸንፉ።`;

  // ልክ እንደ ቤተሰብ ቢንጎ አዝራሮችን መደርደር
  return ctx.replyWithMarkdown(welcomeText, 
    Markup.inlineKeyboard([
      [Markup.button.webApp('🎮 ቢንጎ ተጫወት', 'https://megakids759-hue.github.io/bingo-app/')],
      [Markup.button.callback('💰 ገንዘብ አስገባ', 'deposit'), Markup.button.callback('💳 ሂሳብ እይ', 'balance')],
      [Markup.button.callback('💸 ብር አውጣ', 'withdraw'), Markup.button.callback('📖 መመሪያ', 'rules')],
      [Markup.button.callback('📞 እርዳታ', 'support')]
    ])
  );
});

// አዝራሮቹ ሲነኩ የሚሰጡት መልስ
bot.action('deposit', (ctx) => {
  ctx.reply(`💰 **ገንዘብ ለማስገባት፡**\n\n📱 ቴሌብር፡ 0979596741\n👤 ስም፡ [Wasihun]\n\nደረሰኝዎን እዚህ ይላኩ።`);
});

bot.launch();
