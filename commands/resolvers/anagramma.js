const dictionary = require("../../libs/dictionary");

module.exports = (text) => {
    const wordsArray = dictionary.getArray(text);
    let isAnyLettersCount = text.includes('*');
    let minusCount = (text.match(/-/g) || []).length;
    const wordLength = text.length - minusCount * 2 - Number(isAnyLettersCount);
    text = text.replace(/[*?-]/g, '');

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
    const correctWords = wordsArray.filter((word) => {
        if (isAnyLettersCount) {
            if (word.length < wordLength) return false;
        } else {
            if (word.length !== wordLength) return false;
        }

        let lettersOmit = 0;
        for (let i = 0; i < lettersLength; i++) {
            const letter = letters[i];
            const lettersFoundInWord = (word.match(letter.test) || []).length;
            lettersOmit += Math.abs(letter.count - lettersFoundInWord);
            if (lettersOmit > minusCount) return false;
        }

        return true;
    });

    return correctWords;
};
