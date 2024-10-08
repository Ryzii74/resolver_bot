const dictionaryArray = require('../actions/sources/dictionaryArray')();
const dictionaryArrayEn = require('../actions/sources/dictionaryArrayEn')();

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

    const enTranslation = translate(text, dictionaryArrayEn, letters.en);
    const ruTranslation = translate(text, dictionaryArray, letters.ru);

    msg.addAnswersResponse(enTranslation, '\n', 'АНГЛИЙСКИЙ');
    msg.addAnswersResponse(ruTranslation, '\n', 'РУССКИЙ');
};

function translate(text, dictionary, symbols) {
    if (text.includes(' ')) {
        return translateBySymbols(text, dictionary, symbols);
    } else {
        return translateFullText(text, dictionary, symbols);
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
    const oneSymbol = translateGroup(text, symbols);
    if (oneSymbol) {
        return [oneSymbol];
    }

    const response = [];
    const length = text.length;
    for (let i = 0; i < 2 ** length; i++) {
        let textWithSpaces = '';
        for (let j = 0; j < length; j++) {
            textWithSpaces += text[j];
            const power = 2**j;
            if ((i & power) === power) {
                textWithSpaces += ' ';
            }
        }
        if (textWithSpaces.split(' ').some(word => word.length > MAX_WORD_LENGTH)) {
            continue;
        }

        const result = textWithSpaces
            .split(' ')
            .map(word => translateGroup(word, symbols) || '?')
            .join('');
        if (dictionary.some(word => word === result)) {
            response.push(result);
        }
    }
    return response;
}
