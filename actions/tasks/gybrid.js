module.exports = (word1, word2) => {
    const length = 3;
    return word1.substring(word1.length - length) === word2.substring(0, length)
        || word2.substring(word2.length - length) === word1.substring(0, length);
}
