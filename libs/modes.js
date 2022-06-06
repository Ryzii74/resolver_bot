const userModes = {};
const defaultMode = 'маска';

const modes = {
  anagramma: require('../commands/anagramma'),
  association: require('../commands/association'),
  dick: require('../commands/raschlenenka'),
  mask: require('../commands/mask'),
  phrase: require('../commands/frazeologism'),
};

module.exports = {
  changeModeForUser: (userId, mode) => {
    if (!modes[mode]) {
      return `Неизвестный режим: ${mode}`;
    }

    userModes[userId] = mode;
    return `Установлен режим "${mode}"`;
  },

  runMode: (userId, text) => {
    const mode = userModes[userId] || defaultMode;
    return modes[mode](text);
  },
};
