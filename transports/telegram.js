const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const {emitter, EVENTS} = require("../libs/eventEmitter");
const bot = new TelegramBot(config.bot.token, {polling: true});
const {Message, RESPONSE_TYPES} = require('../models/message');

bot.on('message', (data) => {
  const msg = new Message(data);
  if (!config.bot.accepted_users_list.includes(msg.userId)) {
    console.log('Попытка связи от неразрешенного пользователя');
    console.log(data);
    return;
  }

  if (msg.text) {
    console.log(`Входящее сообщение от ${msg.username}: ${msg.text}`);
    emitter.emit(EVENTS.MESSAGE, msg);
  }

  if (msg.location) {
    console.log(`Входящие координаты от ${msg.username}: ${msg.location.latitude} ${msg.location.longitude}`);
    emitter.emit(EVENTS.LOCATION, msg);
  }
});

emitter.on(EVENTS.RESPONSE, async (msg) => {
  for (let type in RESPONSE_TYPES) {
    const responseType = RESPONSE_TYPES[type];

    const response = msg.response[responseType];
    if (!response || !response.length) continue;

    switch (responseType) {
      case RESPONSE_TYPES.TEXT:
        for (const text of response) {
          await bot.sendMessage(msg.userId, text);
        }
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
