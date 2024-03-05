const bodo = {
    '00100': 'A',
    '00110': 'É',
    '00010': 'E',
    '00011': 'I',
    '00111': 'O',
    '00101': 'U',
    '00001': 'Y',
    '01001': 'B',
    '01101': 'C',
    '01111': 'D',
    '01011': 'F',
    '01010': 'G',
    '01110': 'H',
    '01100': 'J',
    '11100': 'K',
    '11110': 'L',
    '11010': 'M',
    '11011': 'N',
    '11111': 'P',
    '11101': 'Q',
    '11001': 'R',
    '10001': 'S',
    '10101': 'T',
    '10111': 'V',
    '10011': 'W',
    '10010': 'X',
    '10110': 'Z',
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
    const words = text.split(' ');
    const backwardWords = words.map(word => word.replaceAll('1', '2').replaceAll('0', '1').replaceAll('2', '0'));
    const phrase1 = words.map(word => bodo[word] || '?').join('');
    const phrase2 = backwardWords.map(word => bodo[word] || '?').join('');
    const digits1 = words.map(word => bodoDigits[word] || '?').join('');
    const digits2 = backwardWords.map(word => bodoDigits[word] || '?').join('');
    msg.addTextResponse(`Bodo1: \`${phrase1}\``);
    msg.addTextResponse(`Bodo2: \`${phrase2}\``);
    msg.addTextResponse(`Bodo digits1: \`${digits1}\``);
    msg.addTextResponse(`Bodo digits2: \`${digits2}\``);
};
