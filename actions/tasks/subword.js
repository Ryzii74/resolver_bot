module.exports = (word1, word2) => {
    if (word1 === word2) return false;

    let matchedLettersCount = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] === word2[matchedLettersCount]) {
            matchedLettersCount++;
        }
    }
    return matchedLettersCount === word2.length;
};
