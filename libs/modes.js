const {isRomanNumerals} = require("../commands/romeNumerals");
const {isNotes} = require("../commands/notes");
const userModes = {};
const userDisableAutos = {};

const MODES = {
  anagramma: { exec: require('../commands/anagramma'), name: 'Анаграмма' },
  association: { exec: require('../commands/association'), name: 'Ассоциации' },
  associationlogic: { exec: require('../commands/associationLogic'), name: 'Ассоциации + Логика' },
  azimut: { exec: require('../commands/azimut'), name: 'Азимут' },
  dick: { exec: require('../commands/raschlenenka'), name: 'Расчлененка' },
  mask: { exec: require('../commands/mask'), name: 'Маска' },
  maskword: { exec: require('../commands/maskWord'), name: 'Маска + слово' },
  phrase: { exec: require('../commands/frazeologism'), name: 'Фразеологизмы' },
  meta: { exec: require('../commands/metagramma'), name: 'Метаграммы' },
  morze: { exec: require('../commands/morze'), name: 'Азбука Морзе' },
  logo: { exec: require('../commands/logogrif'), name: 'Логогрифы' },
  any: { exec: require('../commands/any'), name: 'Все форматы' },
  brukva: { exec: require('../commands/brukva'), name: 'Брюква' },
  matrix: { exec: require('../commands/matrix'), name: 'Матрицы' },
  subword: { exec: require('../commands/subword'), name: 'Подслова' },
  longword: { exec: require('../commands/longword'), name: 'Надслова' },
  alphabet: { exec: require('../commands/alphabet'), name: 'Цифры по алфавиту' },
  bacon: { exec: require('../commands/bacon'), name: 'Бэкон' },
  bodo: { exec: require('../commands/bodo'), name: 'Бодо' },
  binary: { exec: require('../commands/binary'), name: 'Двоичка' },
  tm: { exec: require('../commands/mendeleev'), name: 'Таблица Менделеева' },
  rebus: { exec: require('../commands/rebus'), name: 'Ребусы' },
  list: { exec: require('../commands/codesList'), name: 'Список кодов' },
  noize: { exec: require('../commands/noize'), name: 'Noize MC' },
  plus: { exec: require('../commands/plus'), name: 'Плюсограмма' },
  book: { exec: require('../commands/book'), name: 'Поиск по книгам' },
  film: { exec: require('../commands/film'), name: 'Поиск по фильмам' },
  painting: { exec: require('../commands/painting'), name: 'Поиск по картинам' },
  gapoifika: { exec: require('../commands/gapoifika'), name: 'ГаПоИФиКа' },
  adjectives: { exec: require('../commands/adjectives'), name: 'Прилагательные' },
  nouns: { exec: require('../commands/nouns'), name: 'Существительные' },
  cross: { exec: require('../commands/cross'), name: 'Общая часть' },
  brail: { exec: require('../commands/brail'), name: 'Азбука брайля' },
  roman: { exec: require('../commands/romeNumerals'), name: 'Римские числа' },
  sborka: { exec: require('../commands/sborka'), name: 'Сборка' },
  sborkaline: { exec: require('../commands/sborkaLine'), name: 'Сборка 1 строки' },
  ss: { exec: require('../commands/ss'), name: 'Системы счисления' },
  notes: { exec: require('../commands/notes'), name: 'Ноты' },
};
const defaultMode = MODES.noize;

const ALIASES = {
  anagramma: MODES.anagramma,
  ass: MODES.association,
  association: MODES.association,
  associationlogic: MODES.associationlogic,
  azimut: MODES.azimut,
  dick: MODES.dick,
  mask: MODES.mask,
  maskword: MODES.maskword,
  phrase: MODES.phrase,
  meta: MODES.meta,
  logo: MODES.logo,
  morze: MODES.morze,
  any: MODES.any,
  brukva: MODES.brukva,
  matrix: MODES.matrix,
  subword: MODES.subword,
  longword: MODES.longword,
  alf: MODES.alphabet,
  bacon: MODES.bacon,
  bodo: MODES.bodo,
  binary: MODES.binary,
  tm: MODES.tm,
  rebus: MODES.rebus,
  list: MODES.list,
  noize: MODES.noize,
  plus: MODES.plus,
  book: MODES.book,
  film: MODES.film,
  painting: MODES.painting,
  gapoifika: MODES.gapoifika,
  adj: MODES.adjectives,
  noun: MODES.nouns,
  cross: MODES.cross,
  brail: MODES.brail,
  roman: MODES.roman,
  sborka: MODES.sborka,
  ss: MODES.ss,
  notes: MODES.notes,
  sborkaline: MODES.sborkaline,
};

// не запускаем для них auto проверку
// они по определению конфликтуют с /auto
const forceModes = [
    MODES.roman,
    MODES.ss,
];

function isInForceModes(mode) {
  return forceModes.map(m => m.name).includes(mode.name);
}

module.exports = {
  changeModeForUser: (userId, alias) => {
    if (!ALIASES[alias]) {
      return `Неизвестный режим: ${alias}`;
    }

    userModes[userId] = ALIASES[alias];
    return `Установлен режим "${userModes[userId].name}"`;
  },

  runMode: async (msg, parsedMode) => {
    const mode = parsedMode || getModeForUser(msg.userId);
    const modes = Array.isArray(mode) ? mode : [mode];
    try {
      return await Promise.all(modes.map(mode => mode.exec(msg)));
    } catch (err) {
      console.log(err);
      msg.addTextResponse( `Ошибка: ${err.message}`);
    }
  },

  autoDetectMode: (msg) => {
    const mode = getModeForUser(msg.userId);
    if (userDisableAutos[msg.userId] || isInForceModes(mode)) {
      return null;
    }

    const {text} = msg;
    const symbols = text.split('');
    const specialSymbols = ['?', '*', ' '];
    if (symbols.every(symbol => ['.', '-', ...specialSymbols].includes(symbol))) {
      return MODES.morze;
    }

    if (symbols.every(symbol => ['1', '0', ...specialSymbols].includes(symbol))) {
      return [MODES.bacon, MODES.bodo, MODES.binary, MODES.brail];
    }

    if (symbols.every(symbol => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ...specialSymbols].includes(symbol))) {
      return [MODES.alphabet, MODES.tm];
    }

    if (isRomanNumerals(text)) {
      return [MODES.roman];
    }

    if (isNotes(text)) {
      return [MODES.notes];
    }

    return null;
  },

  switchAutoForUser(userId) {
    userDisableAutos[userId] = !userDisableAutos[userId];
    if (!!userDisableAutos[userId]) {
      return 'Автоматическое определение команд выключено!';
    } else {
      return 'Автоматическое определение команд включено!';
    }
  }
};

function getModeForUser(userId) {
  return userModes[userId] || defaultMode
}
