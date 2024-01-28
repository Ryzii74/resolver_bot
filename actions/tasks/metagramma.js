const getLetters = require('./utils/getLetters');

module.exports = (word1, word2) => {
    if (word1.length !== word2.length) return false;

    const letters1 = getLetters(word1);
    const letters2 = getLetters(word2);

    let equalLettersCount = 0;
    for (let i = 0; i < word1.length; i++) {
        if (letters1[i] === letters2[i]) equalLettersCount++;
    }

    return equalLettersCount === word1.length - 1;
};
