const Resolver = require('./resolver');

module.exports = async (msg, source1, source2, tasks, formatter) => {
    const resolver = new Resolver(source1, source2, tasks, formatter);
    const answers = await resolver.resolve();
    msg.addAnswersResponse(answers);
};
