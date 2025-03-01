const task = require('../actions/tasks/subword');
const Resolver = require('../actions/resolver');
const wordSource = require('../actions/sources/word');
const dictionaryArraySource = require('../actions/sources/dictionaryArray');
const secondWordFormatter = require('../actions/formatters/secondWord');
const {RESPONSES: {NO_RESULT}} = require("../constants");

module.exports = async (msg) => {
    const { text } = msg;
    const resolver = new Resolver(wordSource(text), dictionaryArraySource, task, secondWordFormatter);
    const answersRaw = await resolver.resolve();
    const answers = answersRaw.filter(el => el && el.answer);

    if (!answers.length) {
        msg.addTextResponse(NO_RESULT);
        return;
    }

    msg.addAnswersResponse(answers.map(el => el.answer), ' ');
};
