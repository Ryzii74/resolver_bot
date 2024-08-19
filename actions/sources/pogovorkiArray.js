const fs = require('fs');
const path = require('path');
const os = require('os');

const words = fs.readFileSync(path.join(__dirname, '../../data/pogovorki.txt'))
    .toString()
    .replaceAll(',', '')
    .replaceAll('!', '')
    .replaceAll('?', '')
    .split(os.EOL)
    .map(el => el.toLowerCase()
);

module.exports = () => words;
