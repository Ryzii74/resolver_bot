module.exports = (word1, word2) => {
    const length = 3;
    for (let i = 0; i < word1.length - length; i++) {
        const substring = word1.substring(i, i + length);
        if (word2.indexOf(substring) !== -1) {
            return true;
        }
    }

    return false;
}
