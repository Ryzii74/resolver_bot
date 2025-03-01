const paintings = require('../actions/sources/paintingsArray')();

module.exports = async (msg) => {
    const {text} = msg;
    const textToSearch = text.replaceAll(' ', '');

    const foundPaintings = paintings.filter(painting => painting.strToSearch.includes(textToSearch));
    msg.addAnswersResponse(foundPaintings.map(el => el.name));
};
