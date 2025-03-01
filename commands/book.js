const {RESPONSES: {NO_RESULT}} = require("../constants");
const books = require('../actions/sources/booksArray')();

module.exports = async (msg) => {
    const {text} = msg;
    const textToSearch = text.replaceAll(' ', '');

    const foundBooks = books.filter(book => book.strToSearch.includes(textToSearch));
    if (foundBooks.length) {
        msg.addAnswersResponse(foundBooks.map(el => el.name));
    } else {
        msg.addTextResponse(NO_RESULT);
    }
};
