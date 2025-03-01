const translators = {
    '2 -> 10': {
        check: isBinary,
        action: (text) => parseInt(text, 2),
    },
    '2 -> 16': {
        check: isBinary,
        action: (text) => parseInt(text, 2).toString(16),
    },
    '10 -> 2': {
        check: isNumber,
        action: (text) => Number(text).toString(2),
    },
    '10 -> 16': {
        check: isNumber,
        action: (text) => Number(text).toString(16),
    },
    '16 -> 10': {
        check: isHEXNumber,
        action: (text) => parseInt(text, 16),
    },
    '16 -> 2': {
        check: isHEXNumber,
        action: (text) => parseInt(text, 16).toString(2),
    },
};

module.exports = function (msg) {
    const {text} = msg;
    const answers = Object.keys(translators)
        .map(key => {
            const translator = translators[key];
            if (!translator.check(text)) {
                return;
            }

            return `${key}: ${translator.action(text)}`;
        })
        .filter(Boolean);
    msg.addAnswersResponse(answers);
}

function isBinary(text) {
    return /^[01]+$/.test(text);
}
function isNumber(text) {
    return /^[0-9]+$/.test(text);
}
function isHEXNumber(text) {
    return /^[0-9abcdef]+$/.test(text);
}
