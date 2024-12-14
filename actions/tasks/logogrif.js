function logogrif(word1, word2) {
    const isWord1Longer = word1.length > word2.length;
    let longWord = isWord1Longer ? word1 : word2;
    let shortWord = isWord1Longer ? word2 : word1;

    let isBreak = false;
    let diff = 0;
    let equal = 0;
    for (var i = 0; i < longWord.length; i++) {
        if (longWord[i] !== shortWord[i - diff]) {
            if (isBreak) return false;
            diff++;
        }
        if (longWord[i] === shortWord[i - diff]) {
            equal++;
            if (diff) isBreak = true;
        }
    }
    if (isBreak && shortWord.length > i - diff) return false;
    return Math.abs(equal - longWord.length) === 1;
}

logogrif.name = 'Логогриф';

module.exports = logogrif;
