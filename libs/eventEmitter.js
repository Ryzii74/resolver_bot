const EventEmitter = require('events');

const emitter = new EventEmitter();

const EVENTS = {
    MESSAGE: 'MESSAGE',             // мы первично его проверили, можно на него отвечать
    RESPONSE: 'RESPONSE',           // ответ на запрос пользователя
    RESPONSE_COORDS: 'RESPONSE_COORDS',           // ответ в координатах
};

module.exports = {
    emitter,
    EVENTS,
};
