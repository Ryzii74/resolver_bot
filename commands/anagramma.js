const fs = require('fs');
const path = require('path');

const words = fs.readFileSync(path.join(__dirname, '../config/words.txt')).toString().split('\n');

module.exports = async (text) => {
    text = text.replace(/[*?]/g, '');

    const letters = [];
    for (var i = 0; i < text.length; i++) {
        const letter = letters.find((el) => el.letter === text[i]);
        if (!letter) {
            letters.push({
                letter : text[i],
                count : 1,
                test : new RegExp(text[i], 'g')
            });
        } else {
            letter.count++;
        }
    }

    const lettersLength = letters.length;
    return words.filter((word) => {
        if (word.length !== text.length) return false;
        for (let i = 0; i < lettersLength; i++) {
            const letter = letters[i];
            if ((word.match(letter.test) || []).length < letter.count) return false;
        }

        return true;
    }).join('\n') || "Слов не найдено";
};
