const data = require('./hpm_data.json');
const dictionaryArray = require('../actions/sources/dictionaryArray');
const {isMetagramma} = require('./libs/tasks');
const fs = require('fs');

const result = [];
const resultBest = [];
data
    .map(el => el
        .trim()
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
            if (word.length < 3 ) continue;

            const metas = findMeta(word);
            const newWords = [...words];
            let inserted = false;
            metas.forEach(meta => {
                newWords[i] = meta.toUpperCase();
                const newRow = newWords.join(' ');
                if (newRow.toLowerCase() === row.toLowerCase()) return;
                inserted = true;

                const rowToSave = `${newWords.join(' ')} (${row})`;
                result.push(rowToSave);
                if (word.length > 3) resultBest.push(rowToSave);
            });
            if (inserted) {
                result.push('');
                if (word.length > 3) resultBest.push('');
            }
        }
    })
fs.writeFileSync('./resultHPM.json', JSON.stringify(resultBest));
fs.writeFileSync('./resultHPMAll.json', JSON.stringify(result));
console.log('FINISH!!!');


function findMeta(word) {
    return dictionaryArray.filter(el => isMetagramma(el, word));
}
