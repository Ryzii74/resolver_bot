const getLetters = require('./utils/getLetters');

module.exports = (word1, word2) => {
    if (word1.length !== word2.length) return false;
    return getLetters(word1).sort().join('') === getLetters(word2).sort().join('');
};
