function plusogramma(word1, word2) {
    if (word1.length === word2.length) return false;

    const wordSorted1 = getSortedLetters(word1);
    const wordSorted2 = getSortedLetters(word2);
    const shortWord = wordSorted1.length > wordSorted2.length ? wordSorted2 : wordSorted1;
    const longWord = wordSorted1.length > wordSorted2.length ? wordSorted1 : wordSorted2;

    let diffFound = false;
    for (let i = 0; i < longWord.length; i++) {
        const shortWordIndex = diffFound ? i  - 1 : i;
        if (shortWord[shortWordIndex] !== longWord[i]) {
            if (diffFound === true) {
                return false;
            } else {
                diffFound = true;
            }
        }
    }

    return true;
}

function getSortedLetters(word) {
    return word.split('').sort().join('');
}

module.exports = plusogramma;
