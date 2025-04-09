const {isValidAnswer, getInvalidSymbol} = require('../utils/isValidAnswer');
const {getWordsFromLine} = require('../utils/getWords');

const binaryRu = {
    '00001': 'а',
    '00010': 'б',
    '00011': 'в',
    '00100': 'г',
    '00101': 'д',
    '00110': 'е',
    '00111': 'ё',
    '01000': 'ж',
    '01001': 'з',
    '01010': 'и',
    '01011': 'й',
    '01100': 'к',
    '01101': 'л',
    '01110': 'м',
    '01111': 'н',
    '10000': 'о',
    '10001': 'п',
    '10010': 'р',
    '10011': 'с',
    '10100': 'т',
    '10101': 'у',
    '10110': 'ф',
    '10111': 'х',
    '11000': 'ц',
    '11001': 'ч',
    '11010': 'ш',
    '11011': 'щ',
    '11100': 'ъ',
    '11101': 'ы',
    '11110': 'ь',
    '11111': 'э',
    '100000': 'ю',
    '100001': 'я',
};

const binaryEn = {
    '00001': 'a',
    '00010': 'b',
    '00011': 'c',
    '00100': 'd',
    '00101': 'e',
    '00110': 'f',
    '00111': 'g',
    '01000': 'h',
    '01001': 'i',
    '01010': 'j',
    '01011': 'k',
    '01100': 'l',
    '01101': 'm',
    '01110': 'n',
    '01111': 'o',
    '10000': 'p',
    '10001': 'q',
    '10010': 'r',
    '10011': 's',
    '10100': 't',
    '10101': 'u',
    '10110': 'v',
    '10111': 'w',
    '11000': 'x',
    '11001': 'y',
    '11010': 'z',
};

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ').map(word => word.length >= 5 ? word : word.padStart(5, '0'));
    const backwardWords = words.map(word => word.replaceAll('1', '2').replaceAll('0', '1').replaceAll('2', '0'));
    const phraseRu1 = words.map(word => binaryRu[word] || getInvalidSymbol(word)).join('');
    const phraseRu2 = backwardWords.map(word => binaryRu[word] || getInvalidSymbol(word)).join('');
    const phraseEn1 = words.map(word => binaryEn[word] || getInvalidSymbol(word)).join('');
    const phraseEn2 = backwardWords.map(word => binaryEn[word] || getInvalidSymbol(word)).join('');
    isValidAnswer(phraseRu1) && msg.addTextResponse(`Binary RU1: ${getWordsFromLine(phraseRu1)}`);
    isValidAnswer(phraseRu2) && msg.addTextResponse(`Binary RU2: ${getWordsFromLine(phraseRu2)}`);
    isValidAnswer(phraseEn1) && msg.addTextResponse(`Binary EN1: ${getWordsFromLine(phraseEn1)}`);
    isValidAnswer(phraseEn2) && msg.addTextResponse(`Binary EN2: ${getWordsFromLine(phraseEn2)}`);
};
