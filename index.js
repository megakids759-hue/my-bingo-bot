const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('የአንተ_Bot_Token_እዚህ_ይግባ');

bot.start((ctx) => {
  const name = ctx.from.first_name;
  
  // ለተጫዋቹ የሚላክ ደህና መጣህ መልእክት
  const welcomeText = `እንኳን ወደ **ተወዳጅ ቢንጎ** በደህና መጡ! 🎰\n\nውድ ${name} በዚህ ቦት ተዝናንተው ያሸንፉ።`;

  // ልክ እንደ ቤተሰብ ቢንጎ አዝራሮችን መደርደር
  return ctx.replyWithMarkdown(welcomeText, 
    Markup.inlineKeyboard([
      [Markup.button.callback('🎮 ጨዋታ ጀምር', 'play_now')],
      [Markup.button.callback('💰 ገንዘብ አስገባ', 'deposit_now'), Markup.button.callback('💳 ሂሳብ እይ', 'check_balance')],
      [Markup.button.callback('💸 ብር አውጣ', 'withdraw_now'), Markup.button.callback('📖 መመሪያ', 'show_rules')],
      [Markup.button.callback('📞 እርዳታ', 'contact_admin')]
    ])
  );
});

// አዝራሮቹ ሲነኩ የሚሰጡት መልስ
bot.action('deposit_now', (ctx) => {
  ctx.reply(`💰 **ገንዘብ ለማስገባት፡**\n\n📱 ቴሌብር፡ 0979596741\n👤 ስም፡ [wasihun]\n\nደረሰኝዎን እዚህ ይላኩ።`);
});

bot.action('show_rules', (ctx) => {
  ctx.reply('📖 **መመሪያ፦**\n1. ብር ያስገቡ\n2. ካርታ ይቁረጡ\n3. በLive ቁጥሮችን ይከታተሉ!');
});

bot.launch();
