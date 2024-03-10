const resolver = require('./resolvers/mask');

module.exports = async (msg) => {
    const words = msg.text.split(' ');

    const correctWords = [];
    const permutations = getAllPermutations(words);
    permutations.forEach(array => {
        let maskStr = `*${array.join('*')}*`;
        correctWords.push(...resolver(maskStr));
    })

    const correctWordsLong = [];
    const correctWordsShort = [];
    const length = words.join('').length;
    correctWords.forEach(word => {
       let wordPrepared = word;
       words.sort((a,b) => b.length - a.length)
           .forEach(el => { wordPrepared = wordPrepared.replace(el, el.toUpperCase()); });
       if (wordPrepared.length > length + 5) {
           correctWordsLong.push(wordPrepared);
       } else {
           correctWordsShort.push(wordPrepared);
       }
    });

    correctWordsLong.sort((a,b) => b.length - a.length);
    correctWordsShort.sort((a,b) => b.length - a.length);
    msg.addAnswersResponse(correctWordsLong, '\n', 'ДЛИННЫЕ');
    msg.addAnswersResponse(correctWordsShort, '\n', 'КОРОТКИЕ');
};

function getAllPermutations(array) {
    const results = [];

    if (array.length === 1) {
        results.push(array);
        return results;
    }

    for (let i = 0; i < array.length; i++) {
        const firstEl = array[i];
        const elementsLeft = [...array.slice(0, i), ...array.slice(i + 1)];
        const innerPermutations = getAllPermutations(elementsLeft);
        for (let j = 0; j < innerPermutations.length; j++) {
            results.push([firstEl, ...innerPermutations[j]]);
        }
    }
    return results;
}
