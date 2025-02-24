const isValidAnswer = require('../utils/isValidAnswer');

const binaryRu = {
    '00001': 'А',
    '00010': 'Б',
    '00011': 'В',
    '00100': 'Г',
    '00101': 'Д',
    '00110': 'Е',
    '00111': 'Ё',
    '01000': 'Ж',
    '01001': 'З',
    '01010': 'И',
    '01011': 'Й',
    '01100': 'К',
    '01101': 'Л',
    '01110': 'М',
    '01111': 'Н',
    '10000': 'О',
    '10001': 'П',
    '10010': 'Р',
    '10011': 'С',
    '10100': 'Т',
    '10101': 'У',
    '10110': 'Ф',
    '10111': 'Х',
    '11000': 'Ц',
    '11001': 'Ч',
    '11010': 'Ш',
    '11011': 'Щ',
    '11100': 'Ъ',
    '11101': 'Ы',
    '11110': 'Ь',
    '11111': 'Э',
    '100000': 'Ю',
    '100001': 'Я',
};

const binaryEn = {
    '00001': 'A',
    '00010': 'B',
    '00011': 'C',
    '00100': 'D',
    '00101': 'E',
    '00110': 'F',
    '00111': 'G',
    '01000': 'H',
    '01001': 'I',
    '01010': 'J',
    '01011': 'K',
    '01100': 'L',
    '01101': 'M',
    '01110': 'N',
    '01111': 'O',
    '10000': 'P',
    '10001': 'Q',
    '10010': 'R',
    '10011': 'S',
    '10100': 'T',
    '10101': 'U',
    '10110': 'V',
    '10111': 'W',
    '11000': 'X',
    '11001': 'Y',
    '11010': 'Z',
};

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ').map(word => word.length >= 5 ? word : word.padStart(5, '0'));
    const backwardWords = words.map(word => word.replaceAll('1', '2').replaceAll('0', '1').replaceAll('2', '0'));
    const phraseRu1 = words.map(word => binaryRu[word] || '?').join('');
    const phraseRu2 = backwardWords.map(word => binaryRu[word] || '?').join('');
    const phraseEn1 = words.map(word => binaryEn[word] || '?').join('');
    const phraseEn2 = backwardWords.map(word => binaryEn[word] || '?').join('');
    isValidAnswer(phraseRu1) && msg.addTextResponse(`Binary RU1: \`${phraseRu1}\``);
    isValidAnswer(phraseRu2) && msg.addTextResponse(`Binary RU2: \`${phraseRu2}\``);
    isValidAnswer(phraseEn1) && msg.addTextResponse(`Binary EN1: \`${phraseEn1}\``);
    isValidAnswer(phraseEn2) && msg.addTextResponse(`Binary EN2: \`${phraseEn2}\``);
};
