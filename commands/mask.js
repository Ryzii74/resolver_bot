const resolver = require('./resolvers/mask');

module.exports = function (msg) {
    msg.addAnswersResponse(resolver(msg.text));
};
