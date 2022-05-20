const EventEmitter = require('events');

const emitter = new EventEmitter();

const EVENTS = {
    MESSAGE: 'MESSAGE',                 // мы первично его проверили, можно на него отвечать
    COMMANDS: {                         // разрешенные команды
        ASSOCIATION: 'ASSOCIATION',     // ассоциации
        ANAGRAMMA: 'ANAGRAMMA',         // анаграмма
        MASK: 'MASK',                   // маска
        RASCHLENENKA: 'RASCHLENENKA',   // расчлененка
    },
    RESPONSE: 'RESPONSE',           // ответ на запрос пользователя
};

module.exports = {
    emitter,
    EVENTS,
};
