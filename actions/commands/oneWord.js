const dictionaryArraySource = require('../sources/dictionaryArray');
const resolverWithOneWordRunner = require("../resolverWithOneWordRunner");

module.exports = (tasks) => {
    return async (msg) => {
        await resolverWithOneWordRunner(msg, dictionaryArraySource, tasks);
    };
};
