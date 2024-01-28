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
  brukva: require('../commands/brukva'),
  matrix: require('../commands/matrix'),
  subword: require('../commands/subword'),
  longword: require('../commands/longword'),
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
  brukva: 'Брюква',
  matrix: 'Матрицы',
  subword: 'Подслова',
  longword: 'Надслова',
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

  runMode: async (msg) => {
    const mode = userModes[msg.userId] || defaultMode;
    try {
      return await modes[mode](msg);
    } catch (err) {
      console.log(err);
      msg.addTextResponse( `Ошибка: ${err.message}`);
    }
  },
};
