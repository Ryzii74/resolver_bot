const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const {emitter, EVENTS} = require("./utils/eventEmitter");
const bot = new TelegramBot(config.bot.token, {polling: true});
const {Message, RESPONSE_TYPES} = require('./utils/message');

function isUserAllowed(msg) {
  return config.bot.accepted_users_list.includes(msg.userId);
}

const userMessages = new Map();
const baseMessageOptions = { parse_mode: 'MarkdownV2' };

const getPaginationKeyboard = (messages, currentIndex) => {
  const buttons = [
    currentIndex > 0 ? [{ text: "⬅️", callback_data: "prev" }] : [],
    currentIndex < messages.length - 1 ? [{ text: "➡️", callback_data: "next" }] : []
  ].filter(row => row.length > 0).flat();
  return {
    inline_keyboard: [buttons],
  };
};

bot.on('message', (data) => {
  const msg = new Message(data);
  if (!isUserAllowed(msg)) {
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

bot.on('edited_message', (data) => {
  const msg = new Message(data);
  if (!isUserAllowed(msg)) {
    console.log('Попытка связи от неразрешенного пользователя');
    console.log(data);
    return;
  }

  if (msg.text) {
    console.log(`Входящее сообщение от ${msg.username}(${msg.userId}): ${msg.text}`);
    emitter.emit(EVENTS.MESSAGE, msg);
  }
});

bot.on("callback_query", async (data) => {
  const userId = data.from.id;
  const userData = userMessages.get(userId);
  if (!userData) return;

  let { currentIndex, messages } = userData;
  if (data.data === "next" && currentIndex < messages.length - 1) {
    currentIndex++;
  } else if (data.data === "prev" && currentIndex > 0) {
    currentIndex--;
  }

  userMessages.set(userId, { messages, currentIndex });
  await bot.editMessageText(messages[currentIndex], {
    chat_id: data.message.chat.id,
    message_id: data.message.message_id,
    ...baseMessageOptions,
    reply_markup: getPaginationKeyboard(messages, currentIndex),
  });
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
    const messages = splitMessageByLines(preparedText);

    if (messages.length === 1) {
      console.log(`Отправка сообщения пользователю ${userId}: ${preparedText}`)
      await bot.sendMessage(userId, preparedText, baseMessageOptions);
      return;
    }

    const lastIndex = messages.length - 1;
    userMessages.set(userId, { messages, currentIndex: lastIndex });
    await sendPaginatedMessage(userId, lastIndex);
  } catch (err) {
    console.log(err.code, err.response.body);
    if (!isRepeated) await sendTextMessage(userId, err.response.body.description, true);
  }
}

async function sendPaginatedMessage(chatId, index) {
  const userData = userMessages.get(chatId);
  if (!userData) return;

  const { messages } = userData;
  const text = messages[index];

  const keyboard = getPaginationKeyboard(messages, index);
  await bot.sendMessage(chatId, text, { ...baseMessageOptions, reply_markup: keyboard });
}

function splitMessage(text, limit = 4096) {
  if (text.length < limit) {
    return [text];
  }

  let messages = [];
  while (text.length > 0) {
    let chunk = text.slice(0, limit);
    let lastSpace = chunk.lastIndexOf("\n");
    if (lastSpace === -1 || lastSpace  < limit - 500) {
      lastSpace = chunk.lastIndexOf(" ");
    }
    if (lastSpace > 0) {
      messages.push(chunk.slice(0, lastSpace));
      text = text.slice(lastSpace + 1);
    } else {
      messages.push(chunk);
      text = text.slice(limit);
    }
  }
  return messages;
}


function splitMessageByLines(text, limit = 40) {
  let lines = text.split('\n');
  if (lines.length <= limit) {
    return [text];
  }

  let messages = [];
  while (lines.length > 0) {
    let chunk = lines.slice(0, limit);
    messages.push(chunk);
    lines = lines.slice(limit);
  }
  return messages;
}
