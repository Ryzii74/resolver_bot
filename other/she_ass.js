const readline = require('readline');

const {isSubword} = require('./libs/tasks');
const getWordAssociations = require('../actions/sources/association');
const data = require('./she_data.json');

const rows = data.map(el => el
    .toLowerCase()
    .replaceAll('ё', 'е')
    .split(' ')
);

const rl = readline.createInterface(process.stdin, process.stdout);
rl.prompt();

rl.on('line', async (msg) => {
    const associations = await getWordAssociations(msg);
    let isFound = false;
    associations.forEach(ass => {
        if (ass.includes(' ')) return;

        const result = [];
        rows.forEach(words => {
            if (words.length < 2) return;

            words.forEach((word, index) => {
                if (word.length < 3) return;
                if (isSubword(ass, word)) {
                    const newWords = [...words];
                    newWords[index] = ass.toUpperCase();
                    result.push(`${newWords.join(' ')} (${words.join(' ')})`);
                }
            });
        });

        if (result.length) {
            console.log('');
            console.log (`!!!!! ${ass} !!!!!!`);
            console.log(result.join('\n'));
            isFound = true;
        }
    });
    if (!isFound) {
        console.log('Ничего не найдено!!!');
    }
});
