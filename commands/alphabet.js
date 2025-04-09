const { lettersEn, lettersRu } = require('../data/letters');
const {getWordsFromLine} = require('../utils/getWords');

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ');

    const enTranslation = words.map(word => lettersEn[Number(word) - 1] || '?').join('');
    const ruTranslation = words.map(word => lettersRu[Number(word) - 1] || '?').join('');

    msg.addTextResponse(`EN: ${getWordsFromLine(enTranslation)}`);
    msg.addTextResponse(`RU: ${getWordsFromLine(ruTranslation)}`);

    const enTranslationCycle = words.map(word => lettersEn[(Number(word) - 1) % lettersEn.length] || '?').join('');
    const ruTranslationCycle = words.map(word => lettersRu[(Number(word) - 1) % lettersRu.length] || '?').join('');
    if (enTranslationCycle !== enTranslation) msg.addTextResponse(`EN цикл: ${getWordsFromLine(enTranslationCycle)}`);
    if (ruTranslationCycle !== ruTranslation) msg.addTextResponse(`RU цикл: ${getWordsFromLine(ruTranslationCycle)}`);
};
