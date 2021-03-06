const EventEmitter = require('events');

const emitter = new EventEmitter();

const EVENTS = {
    LOCATION: 'LOCATION',           // отправка текущей позиции
    MESSAGE: 'MESSAGE',             // мы первично его проверили, можно на него отвечать
    RESPONSE: 'RESPONSE',           // ответ на запрос пользователя
};

module.exports = {
    emitter,
    EVENTS,
};
