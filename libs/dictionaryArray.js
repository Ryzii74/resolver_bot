const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = fs.readFileSync(path.join(__dirname, '../config/words.txt')).toString().split(os.EOL);
