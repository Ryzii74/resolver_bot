const { lettersEn, lettersRu } = require('../data/letters');
const dictionaryObject = require('../actions/sources/dictionaryObject');
const dictionaryObjectEn = require('../actions/sources/dictionaryObjectEn');

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ');

    const enTranslation = words.map(word => lettersEn[Number(word) - 1] || '?').join('');
    const ruTranslation = words.map(word => lettersRu[Number(word) - 1] || '?').join('');

    msg.addTextResponse(`EN: \`${enTranslation}\`${dictionaryObjectEn[enTranslation] ? ' (!!!)' : ''}`);
    msg.addTextResponse(`RU: \`${ruTranslation}\`${dictionaryObject[ruTranslation] ? ' (!!!)' : ''}`);

    const enTranslationCycle = words.map(word => lettersEn[(Number(word) - 1) % lettersEn.length] || '?').join('');
    const ruTranslationCycle = words.map(word => lettersRu[(Number(word) - 1) % lettersRu.length] || '?').join('');
    if (enTranslationCycle !== enTranslation) msg.addTextResponse(`EN цикл: \`${enTranslationCycle}\`${dictionaryObjectEn[enTranslationCycle] ? ' (!!!)' : ''}`);
    if (ruTranslationCycle !== ruTranslation) msg.addTextResponse(`RU цикл: \`${ruTranslationCycle}\`${dictionaryObject[ruTranslationCycle] ? ' (!!!)' : ''}`);
};
