const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const {emitter, EVENTS} = require("../libs/eventEmitter");
const bot = new TelegramBot(config.bot.token, {polling: true});

bot.on('message', (msg) => {
  emitter.emit(EVENTS.RAW_MESSAGE, msg);
});

emitter.on(EVENTS.RESPONSE, (msg) => {
  bot.sendMessage(msg.chat.id, msg.customData.response);
});
