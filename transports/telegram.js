const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const {emitter, EVENTS} = require("../libs/eventEmitter");
const bot = new TelegramBot(config.bot.token, {polling: true});

bot.on('message', (msg) => {
  console.log(`Входящее сообщение от ${msg.from.username}: ${msg.text}`);

  if (!config.bot.accepted_users_list.includes(msg.from.id)) {
    console.log('Попытка связи от неразрешенного пользователя');
    console.log(msg);
    return;
  }

  emitter.emit(EVENTS.MESSAGE, msg);
});

emitter.on(EVENTS.RESPONSE, (msg) => {
  bot.sendMessage(msg.chat.id, msg.customData.response);
});

emitter.on(EVENTS.RESPONSE_COORDS, (msg) => {
  const [lat, lon] = msg.customData.response.split(' ');
  if (!isNaN(lat) && !isNaN(lon)) {
    bot.sendLocation(msg.chat.id, {
      latitude: lat,
      longitude: lon,
    });
  }
});
