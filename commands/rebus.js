const resolver = require('./resolvers/mask');

module.exports = async (msg) => {
    const words = msg.text.split(' ');

    const correctWords1 = resolver(`*${words[0]}*${words[1]}*`);
    const correctWords2 = resolver(`*${words[1]}*${words[0]}*`);

    const correctWordsLong = [];
    const correctWordsShort = [];
    const length = words.join('').length;
    [...correctWords1, ...correctWords2].forEach(word => {
       let wordPrepared = word;
       words.sort((a,b) => b.length - a.length)
           .forEach(el => { wordPrepared = wordPrepared.replace(el, el.toUpperCase()); });
       if (wordPrepared.length > length + 5) {
           correctWordsLong.push(wordPrepared);
       } else {
           correctWordsShort.push(wordPrepared);
       }
    });
    correctWordsLong.sort((a,b) => a.length - b.length);
    correctWordsShort.sort((a,b) => a.length - b.length);
    msg.addAnswersResponse(correctWordsLong, '\n', 'ДЛИННЫЕ');
    msg.addAnswersResponse(correctWordsShort, '\n', 'КОРОТКИЕ');
};
