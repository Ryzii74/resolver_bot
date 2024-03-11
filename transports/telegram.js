const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const {emitter, EVENTS} = require("./utils/eventEmitter");
const bot = new TelegramBot(config.bot.token, {polling: true});
const {Message, RESPONSE_TYPES} = require('./utils/message');

bot.on('message', (data) => {
  const msg = new Message(data);
  if (!config.bot.accepted_users_list.includes(msg.userId)) {
    console.log('Попытка связи от неразрешенного пользователя');
    console.log(data);
    return;
  }

  if (msg.text) {
    console.log(`Входящее сообщение от ${msg.username}(${msg.userId}): ${msg.text}`);
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
          await sendTextMessage(msg.userId, text);
        }
        break;
      case RESPONSE_TYPES.LOCATION:
        response.forEach(location => {
          sendTextMessage(msg.userId,`${location.lat}, ${location.lon}`);
          bot.sendLocation(msg.userId, location.lat, location.lon);
        });
        break;
    }
  }
});

async function sendTextMessage(userId, text, isRepeated) {
  try {
    const preparedText = text.replaceAll(/[!#\.\-\+\=_\[\]\(\)~\{\}\!>#\|]/g, '\\$&');
    console.log(`Отправка сообщения пользователю ${userId}: ${preparedText}`)
    await bot.sendMessage(userId, preparedText, { parse_mode: 'MarkdownV2' });
  } catch (err) {
    console.log(err.code, err.response.body);
    if (!isRepeated) await sendTextMessage(userId, err.response.body.description, true);
  }
}
