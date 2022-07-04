const userModes = {};
const defaultMode = 'anagramma';

const modes = {
  anagramma: require('../commands/anagramma'),
  association: require('../commands/association'),
  associationlogic: require('../commands/associationLogic'),
  azimut: require('../commands/azimut'),
  dick: require('../commands/raschlenenka'),
  mask: require('../commands/mask'),
  phrase: require('../commands/frazeologism'),
  meta: require('../commands/metagramma'),
  logo: require('../commands/logogrif'),
  metalogo: require('../commands/metalogo'),
};

const MODE_NAMES = {
  anagramma: 'Анаграмма',
  association: 'Ассоциации',
  associationlogic: 'Ассоциации + Логика',
  azimut: 'Азимут',
  dick: 'Расчлененка',
  mask: 'Маска',
  phrase: 'Фразеологизмы',
  meta: 'Метаграммы',
  logo: 'Логогрифы',
  metalogo: 'Метаграммы/Логогрифы',
};

module.exports = {
  changeModeForUser: (userId, mode) => {
    if (!modes[mode]) {
      return `Неизвестный режим: ${mode}`;
    }

    userModes[userId] = mode;
    return `Установлен режим "${MODE_NAMES[mode] || mode}"`;
  },

  getModeForUser: (userId) => {
    return userModes[userId];
  },

  runMode: (msg) => {
    const mode = userModes[msg.userId] || defaultMode;
    return modes[mode](msg);
  },
};
