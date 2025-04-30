const {isRomanNumerals} = require("../../commands/romeNumerals");
const {isNotes} = require("../../commands/notes");
const {isRaschlenenka} = require('../../commands/raschlenenka')
const userModes = {};
const userDisableAutos = {};
const {Index, ALIASES} = require('./constants');

const defaultMode = Index.anagramma;

// не запускаем для них auto проверку
// они по определению конфликтуют с /auto
const forceModes = [
    Index.roman,
    Index.ss,
];

function isInForceModes(mode) {
  return forceModes.map(m => m.name).includes(mode.name);
}

module.exports = {
  getUserMode: (userId) => {
    return userModes[userId];
  },

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
      return Index.morze;
    }

    if (symbols.every(symbol => ['1', '0', ...specialSymbols].includes(symbol))) {
      return [Index.bacon, Index.bodo, Index.binary, Index.brail];
    }

    if (symbols.every(symbol => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ...specialSymbols].includes(symbol))) {
      return [Index.alphabet, Index.tm];
    }

    if (isRaschlenenka(text)) {
      return [Index.dick];
    }

    if (isRomanNumerals(text)) {
      return [Index.roman];
    }

    if (isNotes(text)) {
      return [Index.notes];
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
