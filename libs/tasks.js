module.exports = {
  isAnagramma(word1, word2) {
    if (word1.length !== word2.length) return false;
    return getLetters(word1).sort().join('') === getLetters(word2).sort().join('');
  },

  isMetagramma(word1, word2) {
    if (word1.length !== word2.length) return false;

    const letters1 = getLetters(word1);
    const letters2 = getLetters(word2);

    let equalLettersCount = 0;
    for (let i = 0; i < word1.length; i++) {
      if (letters1[i] === letters2[i]) equalLettersCount++;
    }

    return equalLettersCount === word1.length - 1;
  },

  isLogogrif(word1, word2) {
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
    return equal > Math.floor(longWord.length / 2) + 1;
  },
};

function getLetters(word) {
  return word.split('');
}
