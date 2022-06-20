const dictionaryArray = require('../libs/dictionaryArray');

module.exports = async (msg) => {
    let {text} = msg;
    const wordLength = text.length;
    let isAnyLettersCount = text.includes('*');
    text = text.replace(/[*?]/g, '');

    const letters = [];
    for (var i = 0; i < text.length; i++) {
        const letter = letters.find((el) => el.letter === text[i]);
        if (!letter) {
            letters.push({
                letter : text[i],
                count : 1,
                test : new RegExp(text[i], 'g')
            });
        } else {
            letter.count++;
        }
    }

    const lettersLength = letters.length;
    const correctWords = dictionaryArray.filter((word) => {
        if (isAnyLettersCount) {
            if (word.length < wordLength) return false;
        } else {
            if (word.length !== wordLength) return false;
        }

        for (let i = 0; i < lettersLength; i++) {
            const letter = letters[i];
            if ((word.match(letter.test) || []).length < letter.count) return false;
        }

        return true;
    });
    if (correctWords.length > 100) return "Слишком много слов найдено";

    msg.addTextResponse(correctWords.join('\n') || "Слов не найдено");
};
