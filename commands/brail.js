const {isValidAnswer, getInvalidSymbol} = require('../utils/isValidAnswer');
const {getWordsFromLine} = require('../utils/getWords');

const brailDigits = {
    '100000': '1',
    '101000': '2',
    '110000': '3',
    '110100': '4',
    '100100': '5',
    '111000': '6',
    '111100': '7',
    '101100': '8',
    '011000': '9',
    '011100': '0',
};

const brailRu = {
    '100000': 'а',
    '101000': 'б',
    '011101': 'в',
    '111100': 'г',
    '110100': 'д',
    '100100': 'е',
    '100001': 'ё',
    '011100': 'ж',
    '100111': 'з',
    '011000': 'и',
    '111011': 'й',
    '100010': 'к',
    '101010': 'л',
    '110010': 'м',
    '110110': 'н',
    '100110': 'о',
    '111010': 'п',
    '101110': 'р',
    '011010': 'с',
    '011110': 'т',
    '100011': 'у',
    '111000': 'ф',
    '101100': 'х',
    '110000': 'ц',
    '111110': 'ч',
    '100101': 'ш',
    '110011': 'щ',
    '101111': 'ъ',
    '011011': 'ы',
    '011111': 'ь',
    '011001': 'э',
    '101101': 'ю',
    '111001': 'я',
};

const brailEn = {
    '100000': 'a',
    '101000': 'b',
    '110000': 'c',
    '110100': 'd',
    '100100': 'e',
    '111000': 'f',
    '111100': 'g',
    '101100': 'h',
    '011000': 'i',
    '011100': 'j',
    '100010': 'k',
    '101010': 'l',
    '110010': 'm',
    '110110': 'n',
    '100110': 'o',
    '111010': 'p',
    '111110': 'q',
    '101110': 'r',
    '011010': 's',
    '011110': 't',
    '100011': 'u',
    '101011': 'v',
    '011101': 'w',
    '110011': 'x',
    '110111': 'y',
    '100111': 'z',
};

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ');
    if (words.some(word => word.length !== 6 && word !== '?')) {
        return;
    }

    let ru = '';
    let ruBack = '';
    let en = '';
    let enBack = '';
    let digits = '';
    let digitsBack = '';
    words.forEach(word => {
        const wordBack = word
            .replaceAll('1', '2')
            .replaceAll('0', '1')
            .replaceAll('2', '0');
        ru += brailRu[word] || getInvalidSymbol(word);
        ruBack += brailRu[wordBack] || getInvalidSymbol(word);
        en += brailEn[word] || getInvalidSymbol(word);
        enBack += brailEn[wordBack] || getInvalidSymbol(word);
        digits += brailDigits[word] || getInvalidSymbol(word);
        digitsBack += brailDigits[wordBack] || getInvalidSymbol(word);
    });

    isValidAnswer(ru) && msg.addTextResponse(`Brail RU 1: ${getWordsFromLine(ru)}`);
    isValidAnswer(ruBack) && msg.addTextResponse(`Brail RU 2: ${getWordsFromLine(ruBack)}`);
    isValidAnswer(en) && msg.addTextResponse(`Brail EN 1: ${getWordsFromLine(en)}`);
    isValidAnswer(enBack) && msg.addTextResponse(`Brail EN 2: ${getWordsFromLine(enBack)}`);
    isValidAnswer(digits) && msg.addTextResponse(`Brail Digits 1: \`${digits}\``);
    isValidAnswer(digitsBack) && msg.addTextResponse(`Brail Digits 2: \`${digitsBack}\``);
};
