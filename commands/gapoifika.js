const films = require('../actions/sources/filmsArray')();
const books = require('../actions/sources/booksArray')();

module.exports = async (msg) => {
    const {text} = msg;

    const foundBooks = books.filter(book => isGapoifika(text, book.name));
    const foundFilms = films.filter(film => isGapoifika(text, film.name));
    if (foundBooks.length || foundFilms.length) {
        if (foundBooks.length) {
            msg.addAnswersResponse(foundBooks.map(el => el.name), '\n', 'Книги');
        }
        if (foundFilms.length) {
            msg.addAnswersResponse(foundFilms.map(el => el.name), '\n', 'Фильмы');
        }
    } else {
        msg.addTextResponse('Ничего не найдено!');
    }
};

function isGapoifika(text, words) {
    const preparedName = words
        .toLowerCase()
        .replaceAll('ё', 'е')
        .replaceAll(',', '')
        .replaceAll(':', '')
        .replaceAll('.', '')
        .replaceAll('!', '')
        .split(' ')
        .map(el => `${el[0]}${el[1] || ''}`).join('');
    console.log(preparedName, words);
    return text === preparedName.toLowerCase();
}
