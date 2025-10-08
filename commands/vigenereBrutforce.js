const {vigenereDecrypt} = require('./vigenere');
const {lettersRu} = require('../data/letters');
const dictionary = require("../libs/dictionary");

const brutforce = async (msg) => {
  const {text} = msg;

  const words = dictionary.getObject(text);

  const all = generateAll(16, true);
  const response = [];
  for (let i = 0; i < all.length; i++) {
    const key = all[i];
    const decoded = vigenereDecrypt(text, key);
    if (words[decoded]) {
      response.push(`${decoded} (${key})`);
    }
  }

  msg.addAnswersResponse(response);
};

function generateAll(maxLength, checkWords = true) {
  if (checkWords) {
    const words = dictionary.getArray('привет');
    return words.filter(word => word.length && word.length <= maxLength);
  }

  const results = [];

  function backtrack(current) {
    if (current.length > 0 && current.length <= maxLength) {
      results.push(current);
    }
    if (current.length === maxLength) return;

    for (const letter of lettersRu) {
      backtrack(current + letter);
    }
  }

  backtrack("");
  return results;
}

module.exports = brutforce;

brutforce({ text: 'гчэдэ', addAnswersResponse: console.log });
