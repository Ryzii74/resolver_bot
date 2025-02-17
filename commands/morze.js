const dictionaryArray = require('../actions/sources/dictionaryArray')();
const dictionaryArrayEn = require('../actions/sources/dictionaryArrayEn')();
const dictionaryObject = require('../actions/sources/dictionaryObject');
const dictionaryObjectEn = require('../actions/sources/dictionaryObjectEn');

const digits = {
    '.----': 1,
    '..---': 2,
    '...--': 3,
    '....-': 4,
    '.....': 5,
    '-....': 6,
    '--...': 7,
    '---..': 8,
    '----.': 9,
    '-----': 0,
};

const letters = {
    ru: {
        '.-': 'а',
        '-...': 'б',
        '.--': 'в',
        '--.': 'г',
        '-..': 'д',
        '.': 'е',
        '...-': 'ж',
        '--..': 'з',
        '..': 'и',
        '.---': 'й',
        '-.-': 'к',
        '.-..': 'л',
        '--': 'м',
        '-.': 'н',
        '---': 'о',
        '.--.': 'п',
        '.-.': 'р',
        '...': 'с',
        '-': 'т',
        '..-': 'у',
        '..-.': 'ф',
        '....': 'х',
        '-.-.': 'ц',
        '---.': 'ч',
        '----': 'ш',
        '--.-': 'щ',
        '--.--': 'ъ',
        '-.--': 'ы',
        '-..-': 'ь',
        '..-..': 'э',
        '..--': 'ю',
        '.-.-': 'я',
        ...digits,
    },
    en: {
        '.-': 'a',
        '-...': 'b',
        '-.-.': 'c',
        '-..': 'd',
        '.': 'e',
        '..-.': 'f',
        '--.': 'g',
        '....': 'h',
        '..': 'i',
        '.---': 'j',
        '-.-': 'k',
        '.-..': 'l',
        '--': 'm',
        '-.': 'n',
        '---': 'o',
        '.--.': 'p',
        '--.-': 'q',
        '.-.': 'r',
        '...': 's',
        '-': 't',
        '..-': 'u',
        '...-': 'v',
        '.--': 'w',
        '-..-': 'x',
        '-.--': 'y',
        '--..': 'z',
        ...digits,
    }
};


module.exports = async (msg) => {
    let {text} = msg;

    const enTranslation = translate(text, dictionaryArrayEn, dictionaryObjectEn, letters.en);
    const ruTranslation = translate(text, dictionaryArray, dictionaryObject, letters.ru);

    msg.addAnswersResponse(enTranslation, '\n', 'АНГЛИЙСКИЙ');
    msg.addAnswersResponse(ruTranslation, '\n', 'РУССКИЙ');
    checkDigits(msg);
};

function translate(text, dictionaryArray, dictionaryObject, symbols) {
    if (text.includes(' ')) {
        return translateBySymbols(text, dictionaryArray, symbols);
    } else {
        return translateFullText(text, dictionaryObject, symbols);
    }
}

function translateBySymbols(text, dictionary, symbols) {
    const translation = text
        .split(' ')
        .map(word => translateGroup(word, symbols) || '?')
        .join('');

    const regExp = new RegExp(`^${translation.replaceAll('?', '\\S?')}$`);
    const resultWords = dictionary.filter(word => regExp.test(word));
    return [translation, ...resultWords];
}

function translateGroup(word, symbols) {
    if (symbols[word]) {
        return symbols[word];
    }

    const questionMarksCount = (word.match(/\?/g) || []).length;
    if (!questionMarksCount) {
        return null;
    }

    const letters = [];
    for (let i = 0; i < 2**questionMarksCount; i++) {
        const newWordArray = word.split('');
        for (let j = 0; j < questionMarksCount; j++) {
            const questionMarkIndex = newWordArray.findIndex(el => el === '?');
            const power = 2**j;
            newWordArray[questionMarkIndex] = (i & power) === power ? '.' : '-';
        }

        const newWord = newWordArray.join('');
        if (symbols[newWord]) {
            letters.push(symbols[newWord]);
        }
    }
    if (letters.length) {
        return `[${letters.join('')}]`;
    }

    return null;
}

const MAX_WORD_LENGTH = 5;
function translateFullText(text, dictionary, symbols) {
    if (text.length > 24) {
        return ['Не проверяю больше 13 символов'];
    }

    const oneSymbol = translateGroup(text, symbols);
    if (oneSymbol) {
        return [oneSymbol];
    }

    const response = [];
    makeFullTextRecursiveCheck(response, '', text, dictionary, symbols);

    return response;
}

function makeFullTextRecursiveCheck(response, word, text, dictionary, symbols) {
    for (let i = 0; i < 5; i++) {
        const morzeGroup = text.slice(0, i);
        const symbol = symbols[morzeGroup];
        if (!!symbol) {
            const newWord = word + symbol;
            const newText = text.slice(i);

            if (newText === '') {
                if (dictionary[newWord] && !response.includes(newWord)) {
                    response.push(newWord);
                }
            } else {
                makeFullTextRecursiveCheck(response, newWord, newText, dictionary, symbols);
            }
        }
    }
}

function checkDigits(msg) {
    const {text} = msg;
    const textWithoutSpaces = text.replace(' ', '');
    if (textWithoutSpaces.length % 5 !== 0) {
        return;
    }

    const digits = [];
    for (let i = 0; i < textWithoutSpaces.length; i+=5) {
        digits.push(textWithoutSpaces.slice(i, i+5));
    }

    const [answer] = translateBySymbols(digits.join(' '), [], digits);
    if (answer.split('').every(symbol => symbol === '?')) {
        return;
    }

    msg.addAnswersResponse([answer], '\n', 'ЦИФРЫ');
}
