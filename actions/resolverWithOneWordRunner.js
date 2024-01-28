const Resolver = require('./resolver');
const wordSource = require('./sources/word');
const firstWordFormatter = require('./formatters/firstWord');

module.exports = async (msg, source, tasks) => {
    const {text} = msg;
    const resolver = new Resolver(source, wordSource(text), tasks, firstWordFormatter);
    const answers = await resolver.resolve();
    msg.addAnswersResponse(answers, ' ');
};
