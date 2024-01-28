const data = require('./hpm_data.json');
const dictionaryArray = require('../actions/sources/dictionaryArray');
const {isMetagramma} = require('./libs/tasks');
const fs = require('fs');
const natural = require('natural');

const result = [];
data
    .map(el => el
        .toLowerCase()
        .replaceAll("»","")
        .replaceAll("«","")
        .replaceAll("?","")
        .replaceAll(",","")
        .replaceAll(".","")
        .replaceAll("!","")
        .replaceAll("…","")
        .replaceAll("ё","е")
    )
    .forEach(row => {
        const words = row.split(' ');
        if (words.length < 2) return;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (word.length < 4 ) continue;
            if (word[word.length - 2] === 'т' && word[word.length - 1] === 'ь') continue;

            const stemminged = natural.PorterStemmerRu.stem(word);
            if (word === stemminged || word.length - stemminged.length > 1) continue;

            const metas = findMeta(stemminged);
            const newWords = [...words];
            let inserted = false;
            metas.forEach(meta => {
                newWords[i] = meta.toUpperCase();
                const newRow = newWords.join(' ');
                if (newRow.toLowerCase() === row.toLowerCase()) return;
                inserted = true;

                const rowToSave = `${newWords.join(' ')} (${row})`;
                result.push(rowToSave);
            });
            if (inserted) {
                result.push('');
            }
        }
    })
fs.writeFileSync('./resultHPMStemminged.json', JSON.stringify(result));
console.log('FINISH!!!');


function findMeta(word) {
    return dictionaryArray.filter(el => isMetagramma(el, word));
}
