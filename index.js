const TelegramApi = require("node-telegram-bot-api")
const {gameOptions} = require("./options")
const token = '1871160679:AAGtgtHOlPaVuc8jL8cueOzRNc8awlURXvw'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Информация о себе'},
        {command: '/game', description: 'Сыграть  в игру'},
    ])
    bot.on('message', async msg => {
        console.log(msg)
        const text = msg.text
        const chatId = msg.chat.id
        const helloSticker = 'https://tlgrm.ru/_/stickers/9a5/3d6/9a53d66b-53c8-3ccb-a3dd-75fa64c18322/42.webp'
        switch (text) {
            case '/start':
                msg.from.first_name
                    ? await bot.sendMessage(chatId, `Приветствую, ${msg.from.first_name}👋! \nЧем могу быть полезен?`)
                    : await bot.sendMessage(chatId, `Добро пожаловать в телеграм бота от автора Breazzz \nЧем могу быть полезен?`)
                await bot.sendSticker(chatId, helloSticker)
                break
            case '/info':
                await bot.sendMessage(chatId, `Ваши данные👀\n\nИмя: ${msg.from.first_name ? msg.from.first_name : 'Хз'}\nФамилия: ${msg.from.last_name ? msg.from.last_name : 'Хз'}\nНикНейм: ${msg.from.username ? msg.from.username : 'Хз'}`)
                break
            case '/game':
                await bot.sendMessage(chatId, `Я загадал цифру от 0 до 9.`)
                const randomNumber = Math.floor(Math.random() * 10)
                chats[chatId] = randomNumber
                await bot.sendMessage(chatId, 'Угадай!', gameOptions)
                break
            default:
                await bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз)')
                break
        }
    })
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `${data}? Хм, Красава! Возьми с полки пирожок`)
        } else {
            return bot.sendMessage(chatId, `${data}? Иди поспи.\nМоя цифра: ${chats[chatId]}`)
        }
    })
}

start()