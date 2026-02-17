const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('ቦቱ እየሰራ ነው!'));
app.listen(process.env.PORT || 3000);

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`እንኳን ወደ ቢንጎ በሰላም መጡ!`, 
    Markup.inlineKeyboard([
      [Markup.button.webApp('ጨዋታ ጀምር 🎮', 'https://your-mini-app-url.vercel.app')],
      [Markup.button.callback('ገንዘብ አስገባ 💰', 'deposit')]
    ])
  );
});

bot.action('deposit', (ctx) => {
  ctx.reply('ገንዘብ ለማስገባት በ @Admin_User በኩል የደረሰኝ ፎቶ ይላኩ።');
});

bot.launch();
