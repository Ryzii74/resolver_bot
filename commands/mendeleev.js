const elements = require('../data/mendeleev');

module.exports = function (msg) {
    const {text} = msg;
    const words = text.split(' ');
    const phrase = words.map(word => elements[Number(word) - 1].symbol).join('');
    msg.addTextResponse(`TM: \`${phrase}\``);
};
