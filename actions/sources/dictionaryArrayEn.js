const fs = require('fs');
const path = require('path');
const os = require('os');

const sanstv = fs.readFileSync(path.join(__dirname, '../../data/sanstv-en.txt')).toString().split(os.EOL).map(el => el.toLowerCase());
const words = fs.readFileSync(path.join(__dirname, '../../data/enwords.txt')).toString().split(os.EOL).map(el => el.toLowerCase());

const wordsSet = new Set();
sanstv.forEach(word => wordsSet.add(word));
words.forEach(word => wordsSet.add(word));
const result = [...wordsSet].sort((a, b) => b.length - a.length);

module.exports = () => result;
