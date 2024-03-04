const userModes = {};

const MODES = {
  anagramma: { exec: require('../commands/anagramma'), name: 'Анаграмма' },
  association: { exec: require('../commands/association'), name: 'Ассоциации' },
  associationlogic: { exec: require('../commands/associationLogic'), name: 'Ассоциации + Логика' },
  azimut: { exec: require('../commands/azimut'), name: 'Азимут' },
  dick: { exec: require('../commands/raschlenenka'), name: 'Расчлененка' },
  mask: { exec: require('../commands/mask'), name: 'Маска' },
  phrase: { exec: require('../commands/frazeologism'), name: 'Фразеологизмы' },
  meta: { exec: require('../commands/metagramma'), name: 'Метаграммы' },
  morze: { exec: require('../commands/morze'), name: 'Азбука Морзе' },
  logo: { exec: require('../commands/logogrif'), name: 'Логогрифы' },
  metalogo: { exec: require('../commands/metalogo'), name: 'Метаграммы/Логогрифы' },
  brukva: { exec: require('../commands/brukva'), name: 'Брюква' },
  matrix: { exec: require('../commands/matrix'), name: 'Матрицы' },
  subword: { exec: require('../commands/subword'), name: 'Подслова' },
  longword: { exec: require('../commands/longword'), name: 'Надслова' },
};
const defaultMode = MODES.anagramma;

const ALIASES = {
  anagramma: MODES.anagramma,
  ass: MODES.association,
  association: MODES.association,
  associationlogic: MODES.associationlogic,
  azimut: MODES.azimut,
  dick: MODES.dick,
  mask: MODES.mask,
  phrase: MODES.phrase,
  meta: MODES.meta,
  logo: MODES.logo,
  morze: MODES.morze,
  metalogo: MODES.metalogo,
  brukva: MODES.brukva,
  matrix: MODES.matrix,
  subword: MODES.subword,
  longword: MODES.longword,
};

module.exports = {
  changeModeForUser: (userId, alias) => {
    if (!ALIASES[alias]) {
      return `Неизвестный режим: ${alias}`;
    }

    userModes[userId] = ALIASES[alias];
    return `Установлен режим "${userModes[userId].name}"`;
  },

  runMode: async (msg) => {
    const mode = getModeForUser(msg.userId);
    try {
      return await mode.exec(msg);
    } catch (err) {
      console.log(err);
      msg.addTextResponse( `Ошибка: ${err.message}`);
    }
  },
};

function getModeForUser(userId) {
  return userModes[userId] || defaultMode
}
