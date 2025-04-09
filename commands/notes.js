const { lettersEn, lettersRu } = require('../data/letters');
const dictionaryArrayEn = require('../actions/sources/dictionaryArrayEn')();
const dictionaryObject = require('../actions/sources/dictionaryObject');
const dictionaryObjectEn = require('../actions/sources/dictionaryObjectEn');

const notes = {
    'до': {
        letter: 'c',
        number: 1,
    },
    'ре': {
        letter: 'd',
        number: 2,
    },
    'ми': {
        letter: 'e',
        number: 3,
    },
    'фа': {
        letter: 'f',
        number: 4,
    },
    'соль': {
        letter: 'g',
        number: 5,
    },
    'ля': {
        letter: 'a',
        number: 6,
    },
    'си': {
        letter: '[hb]',
        number: 7,
    },
};

function isNotes(text) {
    return text.split(' ').every(word => Object.keys(notes).includes(word));
}

module.exports = function (msg) {
    const {text} = msg;
    if (!isNotes(text)) {
        msg.addTextResponse('Должны быть ноты через пробел');
        return;
    }

    const words = text.split(' ');

    const notesFromWords = words.map(word => notes[word]);
    const letters = notesFromWords.map(note => note.letter).join('');
    const lettersRegExp = new RegExp(`^${letters}$`);
    const wordsFromLetters = dictionaryArrayEn.filter(word => lettersRegExp.test(word));

    const numbers = notesFromWords.map(note => note.number);
    const wordRu = numbers.map(number => lettersRu[number - 1]).join('');
    const wordEn = numbers.map(number => lettersEn[number - 1]).join('');

    msg.addAnswersResponse([
        `буквы: ${letters} ${wordsFromLetters.length ? `(${wordsFromLetters.join(' ')})` : ''}`,
        `Числа: ${numbers.join(' ')}`,
        `RU Буквы по числам: ${wordRu}${dictionaryObject[wordRu] ? ' (!!!)' : ''}`,
        `EN Буквы по числам: ${wordEn}${dictionaryObjectEn[wordEn] ? ' (!!!)' : ''}`,
    ])
};

module.exports.isNotes = isNotes;
