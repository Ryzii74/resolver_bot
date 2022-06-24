const getWordAssociations = require('../libs/association');

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
            if (isEqual(associations[1][i], word)) {
                isFound = true;
                break;
            }
        }

        if (isFound) repeats.push(`${word} ${associations[1][i]}`);
    });

    return repeats;
}

function isEqual(word1, word2) {
    const letters1 = getLetters(word1);
    const letters2 = getLetters(word2);
    return Math.abs(letters1.length - letters2.length) <= 1
        && (letters1.every(el => letters2.includes(el))
        || letters2.every(el => letters1.includes(el)));
}

function getLetters(word) {
    return word
      .split('')
      .filter((item, pos, self) => {
        return self.indexOf(item) === pos;
      });
}
