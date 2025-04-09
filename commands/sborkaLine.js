const {getByNumbers} = require('./sborka');
const dictionary = require("../libs/dictionary");

module.exports = (msg) => {
    const {text} = msg;
    const rawLines = text.split('\n');

    const numbers = rawLines[rawLines.length - 1].split(' ').map(Number);

    const letters = rawLines.slice(0, rawLines.length - 1).join('').replaceAll(' ', '');
    const lines = numbers.map(_ => letters);

    const result = getByNumbers(lines, numbers);
    const arrayWords = dictionary.getArray(letters);
    const resultRegExp = new RegExp(`^${result.replaceAll('?', '\\S')}$`);
    const words = arrayWords.filter(word => resultRegExp.test(word));

    msg.addTextResponse([`\`${result}\` ${words.length ? `(${words.join(' ')})` : ''}`].join('\n'));
};
