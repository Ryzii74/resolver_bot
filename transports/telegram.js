const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const {emitter, EVENTS} = require("../libs/eventEmitter");
const bot = new TelegramBot(config.bot.token, {polling: true});
const {Message, RESPONSE_TYPES} = require('../models/message');

bot.on('message', (msg) => {
  if (!config.bot.accepted_users_list.includes(msg.from.id)) {
    console.log('Попытка связи от неразрешенного пользователя');
    console.log(msg);
    return;
  }

  if (msg.text) {
    console.log(`Входящее сообщение от ${msg.from.username}: ${msg.text}`);
    emitter.emit(EVENTS.MESSAGE, msg);
  }

  if (msg.location) {
    console.log(`Входящие координаты от ${msg.from.username}: ${msg.location.latitude} ${msg.location.longitude}`);
    emitter.emit(EVENTS.LOCATION, new Message(msg));
  }
});

emitter.on(EVENTS.RESPONSE, (msg) => {
  for (let type in RESPONSE_TYPES) {
    const responseType = RESPONSE_TYPES[type];

    const response = msg.response[responseType];
    if (!response && !response.length) continue;

    switch (responseType) {
      case RESPONSE_TYPES.TEXT:
        response.forEach(text => bot.sendMessage(msg.userId, text));
        break;
      case RESPONSE_TYPES.LOCATION:
        response.forEach(location => {
          bot.sendMessage(msg.userId,`\`${location.lat}, ${location.lon}\``);
          bot.sendLocation(msg.userId, location.lat, location.lon)
        });
        break;
    }
  }
});
