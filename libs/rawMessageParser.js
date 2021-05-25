const {emitter, EVENTS} = require('./eventEmitter');
const config = require('../config');

emitter.on(EVENTS.RAW_MESSAGE, (data) => {
    console.log(`Входящее сообщение от ${data.from.username}: ${data.text}`);

    if (!config.bot.accepted_users_list.includes(data.from.id)) {
        console.log('Попытка связи от неразрешенного пользователя');
        console.log(data);
        return;
    }

    emitter.emit(EVENTS.MESSAGE, data);
});