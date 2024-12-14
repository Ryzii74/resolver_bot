const Resolver = require('./resolver');
const wordSource = require('./sources/word');
const firstWordFormatter = require('./formatters/firstWord');

module.exports = async (msg, source, tasks, responsePreparer) => {
    const {text} = msg;
    const resolver = new Resolver(source, wordSource(text), tasks, firstWordFormatter);
    const answers = await resolver.resolve();
    if (!responsePreparer) {
        return msg.addAnswersResponse(answers.map(el => el.answer));
    }

    const responseArray = responsePreparer(answers);
    responseArray.forEach(({ header, answers, joiner }) => {
        msg.addAnswersResponse(answers, joiner, header);
    });
};
