const {isValidAnswer, getInvalidSymbol} = require('../utils/isValidAnswer');
const {getWordsFromLine} = require('../utils/getWords');

const bacon = {
    '00000': 'a',
    '00001': 'b',
    '00010': 'c',
    '00011': 'd',
    '00100': 'e',
    '00101': 'f',
    '00110': 'g',
    '00111': 'h',
    '01000': '[ij]',
    '01001': 'k',
    '01010': 'l',
    '01011': 'm',
    '01100': 'n',
    '01101': 'o',
    '01110': 'p',
    '01111': 'q',
    '10000': 'r',
    '10001': 's',
    '10010': 't',
    '10011': '[uv]',
    '10100': 'w',
    '10101': 'x',
    '10111': 'z',
};

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ').map(word => word.length >= 5 ? word : word.padStart(5, '0'));
    const phrase1 = words.map(word => bacon[word] || getInvalidSymbol(word)).join('');
    const phrase2 = words
        .map(word => word.replaceAll('1', '2').replaceAll('0', '1').replaceAll('2', '0'))
        .map(word => bacon[word] || getInvalidSymbol(word)).join('');
    isValidAnswer(phrase1) && msg.addTextResponse(`Bacon1: ${getWordsFromLine(phrase1)}`);
    isValidAnswer(phrase2) && msg.addTextResponse(`Bacon2: ${getWordsFromLine(phrase2)}`);
};
