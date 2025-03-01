const films = require('../actions/sources/filmsArray')();
const books = require('../actions/sources/booksArray')();
const paintings = require('../actions/sources/paintingsArray')();

module.exports = async (msg) => {
    const {text} = msg;

    const foundBooks = books.filter(book => isGapoifika(text, book.name));
    const foundFilms = films.filter(film => isGapoifika(text, film.name));
    const foundPaintings = paintings.filter(painting => isGapoifika(text, painting.name));
    if (foundBooks.length || foundFilms.length || foundPaintings.length) {
        if (foundPaintings.length) {
            msg.addAnswersResponse(foundPaintings.map(el => el.name), '\n', 'Картины');
        }
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
        .split(' ');
    const oneLetter = preparedName.map(el => el[0]).join('');
    const twoLetters = preparedName.map(el => `${el[0]}${el[1] || ''}`).join('');

    return text === oneLetter.toLowerCase() || text === twoLetters.toLowerCase();
}
