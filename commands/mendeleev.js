const mendeleev = require('../data/mendeleev');

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ').map(el => el.toLowerCase());

    if (isTM(text)) {
        const elements = words.map(word => mendeleev.find(el => el.symbol.toLowerCase() === word));
        const namesEn = elements.map(element => element.name).join(' ');
        const namesRu = elements.map(element => element.nameRu);
        const numbers = elements.map(element => element.number).join(' ');
        msg.addTextResponse(`\`${numbers}\`\n${namesRu.join(' ')} (${namesRu.map(el => el[0]).join('')})\n${namesEn}`);
        return;
    }

    const phrase = words.map(word => (mendeleev[Number(word) - 1] || {}).symbol || '?').join('');
    msg.addTextResponse(`TM: \`${phrase}\``);
};

function isTM(text) {
    const words = text.split(' ');
    const elementsSymbols = mendeleev.map(el => el.symbol.toLowerCase());
    return words.every(word => elementsSymbols.includes(word));
};

module.exports.isTM = isTM;
