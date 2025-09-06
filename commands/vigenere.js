const {getWordsFromLine} = require("../utils/getWords");
const {lettersRu} = require('../data/letters');
const ALPHABET_SIZE = lettersRu.length;

function charIndex(ch) {
  return lettersRu.indexOf(ch.toLowerCase());
}

function vigenereEncrypt(plaintext, key) {
  if (!key) {
    return plaintext;
  }

  let result = "";
  let keyIndex = 0;

  for (let i = 0; i < plaintext.length; i++) {
    const c = plaintext[i];
    const ci = charIndex(c);

    if (ci === -1) {
      result += c; // не из алфавита
      continue;
    }

    const ki = charIndex(key[keyIndex % key.length]);
    const ei = (ci + ki) % ALPHABET_SIZE;

    const encChar = c === c.toLowerCase()
      ? lettersRu[ei].toLowerCase()
      : lettersRu[ei];

    result += encChar;
    keyIndex++;
  }

  return result;
}

function vigenereDecrypt(ciphertext, key) {
  if (!key) {
    return ciphertext;
  }

  let result = "";
  let keyIndex = 0;

  for (let i = 0; i < ciphertext.length; i++) {
    const c = ciphertext[i];
    const ci = charIndex(c);

    if (ci === -1) {
      result += c;
      continue;
    }

    const ki = charIndex(key[keyIndex % key.length]);
    const pi = (ci - ki + ALPHABET_SIZE) % ALPHABET_SIZE;

    const decChar = c === c.toLowerCase()
      ? lettersRu[pi].toLowerCase()
      : lettersRu[pi];

    result += decChar;
    keyIndex++;
  }

  return result;
}

module.exports = async (msg) => {
  const {text} = msg;
  const words = text.split(' ');

  if (words.length < 2) {
    msg.addTextResponse('Нужно указать хотя бы 2 слова через пробел');
    return;
  }

  const key = words[words.length - 1];
  const input = words.slice(0, -1).join(' ');
  const encrypted = vigenereEncrypt(input, key);
  const decrypted = vigenereDecrypt(input, key);

  msg.addTextResponse(`Encode: ${getWordsFromLine(encrypted)}\nDecode: ${getWordsFromLine(decrypted)}`);
};
module.exports.vigenereDecrypt = vigenereDecrypt;
