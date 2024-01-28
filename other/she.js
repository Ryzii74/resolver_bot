const readline = require('readline');

const {isSubword} = require('./libs/tasks');
const data = require('./she_data.json');

const rows = data.map(el => el
    .toLowerCase()
    .replaceAll('ё', 'е')
    .split(' ')
);

const rl = readline.createInterface(process.stdin, process.stdout);
rl.prompt();

rl.on('line', async (msg) => {
    const result = [];
    const resultLong = [];
    rows.forEach(words => {
        if (words.length < 2) return;

        words.forEach((word, index) => {
            if (word.length < 2) return;

            if (isSubword(msg, word)) {
                const newWords = [...words];
                newWords[index] = msg.toUpperCase();
                result.push(`${newWords.join(' ')} (${words.join(' ')})`);
                if (word.length > 2) {
                    resultLong.push(`${newWords.join(' ')} (${words.join(' ')})`);
                }
            }
        });
    });

    if (result.length || resultLong.length) {
        console.log(result.join('\n'));
        console.log('');
        console.log('======');
        console.log('');
        console.log(resultLong.join('\n'));
    } else {
        console.log("Не найдено!");
    }
});
