const elements = require('../data/mendeleev');

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ');

    if (isTM(text)) {
        const res = words
            .map(word => elements.find(el => el.symbol.toLowerCase() === word).number)
            .join(' ');
        msg.addTextResponse(`\`${res}\``);
        return;
    }

    const phrase = words.map(word => (elements[Number(word) - 1] || {}).symbol || '?').join('');
    msg.addTextResponse(`TM: \`${phrase}\``);
};

function isTM(text) {
    const words = text.split(' ');
    const elementsSymbols = elements.map(el => el.symbol.toLowerCase());
    return words.every(word => elementsSymbols.includes(word));
};

module.exports.isTM = isTM;
