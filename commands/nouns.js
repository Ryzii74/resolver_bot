const nounsSource = require('../actions/sources/nouns');
const anythingAction = require('../actions/tasks/anything');
const equalAction = require('../actions/tasks/equal');
const resolverRunner = require('../actions/resolverRunner');
const resolverWithOneWordRunner = require('../actions/resolverWithOneWordRunner');
const firstWordFormatter = require('../actions/formatters/firstWord');

module.exports = async (msg) => {
    const {text} = msg;
    const words = text.split(' ');

    if (words.length === 1) {
        const [word] = words;
        await resolverWithOneWordRunner(msg, nounsSource(word), anythingAction);
    } else {
        const [word1, word2] = words;
        await resolverRunner(msg, nounsSource(word1), nounsSource(word2), equalAction, firstWordFormatter);
    }
};
