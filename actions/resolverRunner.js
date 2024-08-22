const Resolver = require('./resolver');

module.exports = async (msg, source1, source2, tasks, formatter, responsePreparer) => {
    const resolver = new Resolver(source1, source2, tasks, formatter);
    const answers = await resolver.resolve();
    if (!responsePreparer) {
        return msg.addAnswersResponse(answers);
    }

    const responseArray = responsePreparer(answers);
    responseArray.forEach(({ header, answers, joiner }) => {
        msg.addAnswersResponse(answers, joiner, header);
    });
};
