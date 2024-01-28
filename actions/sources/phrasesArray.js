const fs = require('fs');
const path = require('path');

const phrases = fs.readFileSync(path.join(__dirname, '../../data/phrases.txt')).toString().split('\r');

module.exports = () => phrases;
