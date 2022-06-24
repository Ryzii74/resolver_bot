const getWordAssociations = require('../libs/association');
const {isAnagramma, isMetagramma, isLogogrif} = require('../libs/tasks');

module.exports = async (msg) => {
    const {text} = msg;
    const words = text.split(' ');
    if (words.length !== 2) {
        msg.addTextResponse('Нужно указать 2 слова через пробел');
        return;
    }

    const associations = {};
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        try {
            associations[i] = await getWordAssociations(word);
        } catch (err) {
            console.error('associationLogic', err);
            msg.addTextResponse( 'Ошибка получения данных от сервера!');
            return;
        }
    }

    const repeats = getRepeats(associations);
    msg.addTextResponse(repeats.join('\n') || "Нет результатов");
};

function getRepeats(associations) {
    const repeats = [];

    associations[0].forEach(word => {
        let isFound = false;
        for (var i = 0; i < associations[1].length; i++) {
            const word2 = associations[1][i];
            if (isAnagramma(word, word2) || isMetagramma(word, word2) || isLogogrif(word, word2)) {
                isFound = true;
                break;
            }
        }

        if (isFound) repeats.push(`${word} ${associations[1][i]}`);
    });

    return repeats;
}
