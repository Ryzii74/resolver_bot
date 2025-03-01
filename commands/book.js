const books = require('../actions/sources/booksArray')();

module.exports = async (msg) => {
    const {text} = msg;
    const textToSearch = text.replaceAll(' ', '');

    const foundBooks = books.filter(book => book.strToSearch.includes(textToSearch));
    msg.addAnswersResponse(foundBooks.map(el => el.name));
};
