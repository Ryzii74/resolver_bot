const dictionary = require("../libs/dictionary");

module.exports = async (msg) => {
    let {text} = msg;
    const wordsArray = dictionary.getArray(text);
    const wordPairs = isAnagramCombo(text, wordsArray)
    msg.addAnswersResponse(wordPairs.map(([w1, w2]) => `${w1} ${w2}`));
};

function isAnagramCombo(text, wordsArray) {
    const lettersCount = countLetters(text);

    // Подсчёт букв в строке
    function countLetters(word) {
        const count = {};
        for (let char of word) {
            count[char] = (count[char] || 0) + 1;
        }
        return count;
    }

    // Проверка, можно ли из lettersCount составить wordCount
    function canForm(wordCount, lettersCount) {
        for (let char in wordCount) {
            if ((lettersCount[char] || 0) < wordCount[char]) {
                return false;
            }
        }
        return true;
    }

    // Вычитание одного словаря частот из другого
    function subtractCounts(count1, count2) {
        const result = {};
        for (let char in count1) {
            if (!count1[char]) return null;

            result[char] = count1[char] - (count2[char] || 0);
            if (result[char] < 0) return null; // Нельзя вычитать больше, чем есть
            if (result[char] === 0) delete result[char];
        }
        return result;
    }

    // Проверка на полное совпадение частот
    function isEqualCount(count1, count2) {
        const keys1 = Object.keys(count1);
        const keys2 = Object.keys(count2);
        if (keys1.length !== keys2.length) return false;
        for (let key of keys1) {
            if (count1[key] !== count2[key]) return false;
        }
        return true;
    }

    // Предварительно фильтруем слова, которые вообще можно собрать
    const validWords = wordsArray.filter(word => canForm(countLetters(word), lettersCount));

    // Перебор подходящих пар слов
    const pairs = [];
    for (let i = 0; i < validWords.length; i++) {
        const word1 = validWords[i];
        const count1 = countLetters(word1);

        const remainingLetters = subtractCounts(lettersCount, count1);
        if (!remainingLetters) continue;

        for (let j = i + 1; j < validWords.length; j++) {
            const word2 = validWords[j];
            const count2 = countLetters(word2);

            if (isEqualCount(remainingLetters, count2)) {
                pairs.push([word1, word2]);
            }
        }
    }

    return pairs;
}
