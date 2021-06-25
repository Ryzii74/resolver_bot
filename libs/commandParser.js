const {emitter, EVENTS} = require('./eventEmitter');

emitter.on(EVENTS.MESSAGE, (data) => {
    const text = data.text.toLowerCase();
    const words = text.split(' ');

    if (words.length === 1) {
        emitter.emit(EVENTS.COMMANDS.ANAGRAMMA, {
            ...data,
            customData: {
                text,
            },
        });
    } else {
        if (words[0].toLowerCase() === 'маска') {
            emitter.emit(EVENTS.COMMANDS.MASK, {
                ...data,
                customData: {
                    text: words[1],
                },
            });
        } else {
            emitter.emit(EVENTS.COMMANDS.ASSOCIATION, {
                ...data,
                customData: {
                    text,
                },
            });
        }
    }
});