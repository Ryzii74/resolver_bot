const {emitter, EVENTS} = require('./eventEmitter');

emitter.on(EVENTS.MESSAGE, (data) => {
    emitter.emit(EVENTS.COMMANDS.ASSOCIATION, {
        ...data,
        customData: {
            text: data.text,
        },
    });
});