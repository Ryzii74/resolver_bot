const films = require('../actions/sources/filmsArray')();

module.exports = async (msg) => {
    const {text} = msg;

    const foundFilms = films.filter(book => book.strToSearch.includes(text));
    if (foundFilms.length) {
        msg.addAnswersResponse(foundFilms.map(el => el.name));
    } else {
        msg.addTextResponse('Ничего не найдено!');
    }
};
