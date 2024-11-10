const books = require('../actions/sources/filmsArray')();

module.exports = async (msg) => {
    const {text} = msg;

    const foundBooks = books.filter(book => book.strToSearch.includes(text));
    if (foundBooks.length) {
        msg.addAnswersResponse(foundBooks.map(el => el.name));
    } else {
        msg.addTextResponse('Ничего не найдено!');
    }
};
