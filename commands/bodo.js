const {isValidAnswer, getInvalidSymbol} = require('../utils/isValidAnswer');
const {getWordsFromLine} = require('../utils/getWords');

const bodo = {
    '00100': 'a',
    '00110': 'e',
    '00010': 'e',
    '00011': 'i',
    '00111': 'o',
    '00101': 'u',
    '00001': 'y',
    '01001': 'b',
    '01101': 'c',
    '01111': 'd',
    '01011': 'f',
    '01010': 'g',
    '01110': 'h',
    '01100': 'j',
    '11100': 'k',
    '11110': 'l',
    '11010': 'm',
    '11011': 'n',
    '11111': 'p',
    '11101': 'q',
    '11001': 'r',
    '10001': 's',
    '10101': 't',
    '10111': 'v',
    '10011': 'w',
    '10010': 'x',
    '10110': 'z',
    '10100': '-',
    '10000': ' ',
    '01000': ' ',
};

const bodoDigits = {
    '00100': '1',
    '00010': '2',
    '00001': '3',
    '00101': '4',
    '00111': '5',
    '00110': '1/',
    '00011': '3/',
    '01100': '6',
    '01010': '7',
    '01001': '8',
    '01101': '9',
    '01111': '0',
    '01110': '4/',
    '01011': '5/',
    '10100': '.',
    '10010': '9/',
    '10001': '7/',
    '10101': '2/',
    '10111': '\'',
    '10110': ':',
    '10011': '?',
    '11100': '(',
    '11010': ')',
    '11001': '-',
    '11101': '/',
    '11111': '+',
    '11110': '=',
    '11011': '£',
    '10000': ' ',
    '01000': ' ',
};

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ').map(word => word.length >= 5 ? word : word.padStart(5, '0'));
    const backwardWords = words.map(word => word.replaceAll('1', '2').replaceAll('0', '1').replaceAll('2', '0'));
    const phrase1 = words.map(word => bodo[word] || getInvalidSymbol(word)).join('');
    const phrase2 = backwardWords.map(word => bodo[word] || getInvalidSymbol(word)).join('');
    const digits1 = words.map(word => bodoDigits[word] || getInvalidSymbol(word)).join('');
    const digits2 = backwardWords.map(word => bodoDigits[word] || getInvalidSymbol(word)).join('');
    isValidAnswer(phrase1) && msg.addTextResponse(`Bodo1: ${getWordsFromLine(phrase1)}`);
    isValidAnswer(phrase2) && msg.addTextResponse(`Bodo2: ${getWordsFromLine(phrase2)}`);
    isValidAnswer(digits1) && msg.addTextResponse(`Bodo digits1: \`${digits1}\``);
    isValidAnswer(digits2) && msg.addTextResponse(`Bodo digits2: \`${digits2}\``);
};
