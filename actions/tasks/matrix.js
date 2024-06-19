const words = require('../sources/dictionaryObject');

module.exports = (word1, word2) => {
    return matrix(word1, word2, 3) || matrix(word1, word2, 4);
};

const matrix = (word1, word2, length) => {
    for (let i = 0; i < word1.length - length; i++) {
        const substring = word1.substring(i, i + length);
        if (!words[substring]) {
            continue;
        }

        if (word2.indexOf(substring) !== -1) {
            return true;
        }
    }

    return false;
}
