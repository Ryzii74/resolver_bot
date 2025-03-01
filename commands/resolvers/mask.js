const dictionary = require("../../libs/dictionary");

module.exports = (text) => {
    const isCheckDigits = /[1-9]/.test(text);
    const digitsToCheck = isCheckDigits ? prepareDigitsToCheck(text) : [];

    const wordsArray = dictionary.getArray(text);
    const reg = new RegExp('^' + text.replace(/\*/g, '\\S*').replace(/[?1-9]/g, '\\S') + '$', 'i');
    return wordsArray.filter(word => {
        if (!reg.test(word)) {
            return false;
        }

        return digitsToCheck.every(symbols => {
            const letter = word[symbols[0]];
            return symbols.map(symbol => word[symbol]).every(s => s === letter);
        });
    });
};

function prepareDigitsToCheck(text) {
    const sameSymbols = {};
    text.split('').forEach((letter, index) => {
        if (/[1-9]/.test(letter)) {
            sameSymbols[letter] = sameSymbols[letter] || [];
            sameSymbols[letter].push(index);
        }
    });
    return Object.keys(sameSymbols)
        .map(letter => {
            const symbols = sameSymbols[letter];
            if (symbols.length < 2) {
                return;
            }

            return symbols;
        })
        .filter(Boolean);
}
