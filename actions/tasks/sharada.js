const words = require('../sources/dictionaryObject');

module.exports = (word1, word2) => {
    return !!(words[`${word1}${word2}`] || words[`${word2}${word1}`]);
};
