const userModes = {};
const defaultMode = 'mask';

const modes = {
  anagramma: require('../commands/anagramma'),
  association: require('../commands/association'),
  azimut: require('../commands/azimut'),
  dick: require('../commands/raschlenenka'),
  mask: require('../commands/mask'),
  phrase: require('../commands/frazeologism'),
};

const MODE_NAMES = {
  anagramma: 'Анаграмма',
  association: 'Ассоциации',
  azimut: 'Азимут',
  dick: 'Расчлененка',
  mask: 'Маска',
  phrase: 'Фразеологизмы',
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

  runMode: (userId, text) => {
    const mode = userModes[userId] || defaultMode;
    return modes[mode](text);
  },
};
