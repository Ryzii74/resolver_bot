const {lettersRu} = require('../data/letters');

const vigenereKey = (phraseRaw, codeRaw) => {
  const phrase = phraseRaw.toLowerCase().replaceAll(' ', '');
  const code = codeRaw.toLowerCase().replaceAll(' ', '');

  let key = '';
  for (let i = 0; i < phrase.length; i++) {
    const letterPhrase = phrase[i];
    const letterCode = code[i];

    const phraseNumber = lettersRu.indexOf(letterPhrase);
    const codeNumber = lettersRu.indexOf(letterCode);

    let diff = codeNumber - phraseNumber;
    if (diff < 0) {
      diff += 33;
    }
    key += lettersRu[diff];
  }

  return key;
}

module.exports = vigenereKey;

console.log(vigenereKey('кататься на скейте', 'скоколаьгьикъасм'));

// Пример:
// console.log(vigenereKey('Карл у Клары украл кораллы', 'хлрь б пюкьы дшхтц цобнрюё'));
