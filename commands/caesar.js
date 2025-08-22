const {getWordsFromLine} = require("../utils/getWords");
const {vigenereDecrypt} = require('./vigenere');
const {lettersRu} = require('../data/letters');

module.exports = async (msg) => {
  const {text} = msg;

  const response = [];
  for (let i = 1; i <= 32; i++) {
    const decoded = vigenereDecrypt(text, lettersRu[i]);
    response.push(`${i}: ${getWordsFromLine(decoded)}`);
  }
  msg.addTextResponse(response.join('\n'));
};
