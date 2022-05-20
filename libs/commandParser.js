const {emitter, EVENTS} = require('./eventEmitter');

emitter.on(EVENTS.MESSAGE, (data) => {
    const text = data.text.toLowerCase().trim();
    const [firstWord, ...words] = text.split(' ');
    const command = firstWord.toLowerCase();

    if (words.length === 0) {
        emitter.emit(EVENTS.COMMANDS.ANAGRAMMA, {
            ...data,
            customData: {
                text,
            },
        });
    } else {
        if (command === 'маска') {
            emitter.emit(EVENTS.COMMANDS.MASK, {
                ...data,
                customData: {
                    text: words[0],
                },
            });
        } else if (command === 'член') {
            emitter.emit(EVENTS.COMMANDS.RASCHLENENKA, {
                ...data,
                customData: {
                    words,
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
