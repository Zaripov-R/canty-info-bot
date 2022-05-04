require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply(`Welcome, ${ctx.message.from.first_name}
I will send you your telegram user ID, current chat ID and sender ID or chat ID of forwarded message.
My comands here /help 
`))

bot.help(ctx => {
    ctx.reply(`
my id - i will send you your telegram user ID
chat id - i will send you current chat ID
send me a message and i will send you sender ID or chat ID of forwarded message
    `)
})
bot.hears('my id', (ctx) => ctx.reply(`Your user ID: ${ctx.message.from.id}`))
bot.hears('chat id', (ctx) => ctx.reply(`Current chat ID: ${ctx.message.chat.id}`))

bot.on('message', ctx => {
    try {
        if (ctx.message.forward_from_chat != 'undefined') {
            ctx.reply(`Forwarded from chat: ${ctx.message.forward_from_chat.id}`)
        }
    } catch (error) {
        ctx.reply(`Forwarded from user ID: ${ctx.message.forward_from.id}`)
    }
})
bot.launch()
console.log('Bot start')

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))