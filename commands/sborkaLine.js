const {getByNumbers} = require('./sborka');
const {getWordsFromLine} = require('../utils/getWords');

module.exports = (msg) => {
    const {text} = msg;
    const rawLines = text.split('\n');

    const numbers = rawLines[rawLines.length - 1].split(' ').map(Number);

    const letters = rawLines.slice(0, rawLines.length - 1).join('').replaceAll(' ', '');
    const lines = numbers.map(_ => letters);

    const result = getByNumbers(lines, numbers);

    msg.addTextResponse(getWordsFromLine(result));
};
