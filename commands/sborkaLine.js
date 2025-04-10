const {getByNumbers} = require('./sborka');
const {getWordsFromLine} = require('../utils/getWords');

module.exports = (msg) => {
    const {text} = msg;
    const rawLines = text.split('\n');

    const numbers = rawLines[rawLines.length - 1].split(' ').map(Number);

    const letters = rawLines.slice(0, rawLines.length - 1).join('').replaceAll(' ', '');
    const lines = numbers.map(_ => letters);
    const answers = [`По номеру буквы: ${getWordsFromLine(getByNumbers(lines, numbers))}`];

    const numbersWithoutZero = numbers.filter(Boolean);
    if (Math.min(...numbersWithoutZero) === 1 && Math.max(...numbersWithoutZero) === numbersWithoutZero.length) {
        let wordLetters = [];
        numbers.forEach((number, index) => {
            if (number === 0) return;
            wordLetters[number - 1] = letters[index];
        });

        const word = wordLetters.map(letter => letter || '?').join('');
        answers.push(`По позиции цифры: ${getWordsFromLine(word)}`);
    }

    msg.addAnswersResponse(answers);
};
