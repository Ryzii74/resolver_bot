const {RESPONSES: {NO_RESULT}} = require("../constants");
const paintings = require('../actions/sources/paintingsArray')();

module.exports = async (msg) => {
    const {text} = msg;
    const textToSearch = text.replaceAll(' ', '');

    const foundPaintings = paintings.filter(painting => painting.strToSearch.includes(textToSearch));
    if (foundPaintings.length) {
        msg.addAnswersResponse(foundPaintings.map(el => el.name));
    } else {
        msg.addTextResponse(NO_RESULT);
    }
};
