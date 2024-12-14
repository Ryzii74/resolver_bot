function brukva(word1, word2) {
    if (Math.abs(word1.length - word2.length) !== 1) {
        return false;
    }

    let longWord = word1.length > word2.length ? word1 : word2;
    const shortWord = word1.length > word2.length ? word2 : word1;

    let diffFound = false;
    for (let i = 0; i < shortWord.length; i++) {
        if (longWord[i] !== shortWord[i]) {
            if (diffFound) {
                return false;
            }

            longWord = longWord.substring(0, i) + longWord.substring(i + 1, longWord.length);
            diffFound = true;
        }
    }

    return diffFound;
}

brukva.name = 'Брюква';

module.exports = brukva;
