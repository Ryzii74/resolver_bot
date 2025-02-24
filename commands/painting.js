const paintings = require('../actions/sources/paintingsArray')();

module.exports = async (msg) => {
    const {text} = msg;

    const foundPaintings = paintings.filter(painting => painting.strToSearch.includes(text));
    if (foundPaintings.length) {
        msg.addAnswersResponse(foundPaintings.map(el => el.name));
    } else {
        msg.addTextResponse('Ничего не найдено!');
    }
};
