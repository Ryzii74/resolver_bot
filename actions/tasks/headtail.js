const words = require('../sources/dictionaryObject');

module.exports = (word1, word2) => {
    for (let i = 2; i < word1.length; i++) {
        for (let j = 2; j < word2.length; j++) {
            const newWord1 = `${word1.slice(-i)}${word2.slice(0, j)}`;
            const newWord2 = `${word2.slice(-j)}${word1.slice(0, i)}`;
            if (words[newWord1] && newWord1.length >= 5) {
                console.log(word1, word2, newWord1);
                return true;
            }
            if (words[newWord2] && newWord2.length >= 5) {
                console.log(word1, word2, newWord2);
                return true;
            }
        }
    }
    return false;
};
