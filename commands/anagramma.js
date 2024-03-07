const resolver = require('./resolvers/anagramma');

module.exports = async (msg) => {
    let {text} = msg;
    const correctWords = resolver(text);
    msg.addAnswersResponse(correctWords);
};
