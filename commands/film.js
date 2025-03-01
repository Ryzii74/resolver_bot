const films = require('../actions/sources/filmsArray')();

module.exports = async (msg) => {
    const {text} = msg;
    const textToSearch = text.replaceAll(' ', '');

    const foundFilms = films.filter(film => film.strToSearch.includes(textToSearch));
    msg.addAnswersResponse(foundFilms.map(el => el.name));
};
