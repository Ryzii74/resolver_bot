function anagramma(word1, word2) {
    return getSortedLetters(word1) === getSortedLetters(word2);
}

function getSortedLetters(word) {
    return word.split('').sort().join('');
}

module.exports = anagramma;
