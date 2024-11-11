const fs = require('fs');
const path = require('path');
const os = require('os');

const books = fs.readFileSync(path.join(__dirname, '../../data/books.txt'))
    .toString()
    .split(os.EOL)
    .map(el =>
        ({
            name: el,
            strToSearch: el
                .toLowerCase()
                .replaceAll(',', '')
                .replaceAll(':', '')
                .replaceAll('.', '')
                .replaceAll(' ', '')
        })
    );

module.exports = () => books;
