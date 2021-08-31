require('dotenv').config()
const { BOT_TOKEN } = process.env
const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')

const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome'))



bot.help((ctx) => ctx.reply('Send me a sticker'))


bot.on('sticker', (ctx) => ctx.reply('👍'))



bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('weather', async (ctx) => {
  const { text } = ctx.update.message
  const userText = text.split(' ')[1]
  ctx.deleteMessage()
  const weather = await getWeaterByCityName(userText)
  ctx.reply(weather)
})


bot.command('animals', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, 'Hello with animals', {
    reply_markup: {
      inline_keyboard: [
        [
          {text: "Cat", callback_data: 'cat'}
        ],[
          {text: "Dog", callback_data: 'dog'}
        ]
      ]
    }
  })
})

bot.action('cat', ctx => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: './res/cat.jpeg'
  })
})

bot.action('dog', ctx => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: './res/dog.jpeg'
  })
})


const getWeaterByCityName = async (cityName) => {
  const result = await fetch(`https://wttr.in/${cityName}?format=4`)
  const resultParsed = await result.text()
  return resultParsed
}

bot.launch()