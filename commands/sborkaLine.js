const {getByNumbers} = require('./sborka');

module.exports = (msg) => {
    const {text} = msg;
    const rawLines = text.split('\n');

    const numbers = rawLines[rawLines.length - 1].split(' ').map(Number);

    const letters = rawLines.slice(0, rawLines.length - 1).join('').replaceAll(' ', '');
    const lines = numbers.map(_ => letters);
    msg.addTextResponse([`\`${getByNumbers(lines, numbers)}\``].join('\n'));
};
