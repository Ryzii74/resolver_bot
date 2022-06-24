const getWordAssociations = require('../libs/association');

module.exports = async (msg) => {
    const {text} = msg;
    const words = text.split(' ');

    const associations = [];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        try {
            const wordAssociations = await getWordAssociations(word);
            associations.push(wordAssociations);
        } catch (err) {
            console.error('association', err);
            msg.addTextResponse( 'Ошибка получения данных от сервера!');
            return;
        }
    }

    if (words.length === 1) {
        msg.addTextResponse(associations.join('\n'));
        return;
    }

    const repeats = getRepeats(associations);
    msg.addTextResponse(repeats.join('\n') || "Нет результатов");
};

function getRepeats(associations) {
    const repeats = [];

    associations[0].forEach(word => {
        let isNotFound = false;
        for (let i = 1; i < associations.length; i++) {
            if (!associations[i].includes(word)) {
                isNotFound = true;
                break;
            }
        }

        if (!isNotFound) repeats.push(word);
    });

    return repeats;
}
