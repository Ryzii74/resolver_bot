const userModes = {};
const defaultMode = 'маска';

const modes = {
  анаграмма: require('../commands/anagramma'),
  ассоциации: require('../commands/association'),
  ассоциация: require('../commands/association'),
  фразеологизм: require('../commands/frazeologism'),
  маска: require('../commands/mask'),
  расчлененка: require('../commands/raschlenenka'),
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
