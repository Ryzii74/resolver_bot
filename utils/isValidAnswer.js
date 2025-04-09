module.exports.isValidAnswer = (answer) => {
    return answer.split('').some(s => s !== invalidSymbol && s !== '?');
};

const invalidSymbol = '&';
module.exports.invalidSymbol = invalidSymbol;

const acceptedSymbols = [
    '0000?',
    '1111?',
    '?',
];
module.exports.getInvalidSymbol = (word) => {
    return acceptedSymbols.includes(word) ? '?' : invalidSymbol;
};
