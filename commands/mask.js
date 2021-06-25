const fs = require('fs');
const path = require('path');

const words = fs.readFileSync(path.join(__dirname, '../config/words.txt')).toString().split('\n');

module.exports = function (text) {
    var reg = new RegExp('^' + text.replace(/\*/g, '\\S*').replace(/\?/g, '\\S') + '$', 'gi');

    return words.filter(function (word) {
        return reg.exec(word);
    }).join('\n') || "Слов не найдено";
};
