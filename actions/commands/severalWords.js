const dictionaryArraySource = require('../sources/dictionaryArray');
const { getArrayGetter } = require('../../libs/dictionary');
const bothWordsFormatter = require('../formatters/bothWords');
const secondWordFormatter = require('../formatters/secondWord');
const resolverWithOneWordRunner = require("../resolverWithOneWordRunner");
const associationsSource = require("../sources/association");
const wordSource = require("../sources/word");
const resolverRunner = require("../resolverRunner");

module.exports = (tasks, responsePreparer) => {
    return async (msg) => {
        const {text} = msg;
        const words = text.split(' ');

        if (words.length === 1) {
            return await resolverWithOneWordRunner(msg, getArrayGetter(text), tasks, responsePreparer);
        }

        const [word1, word2] = words;
        if (word1[word1.length - 1] === '!') {
            return await resolverRunner(msg, wordSource(word1.replace('!', '')), associationsSource(word2), tasks, secondWordFormatter, responsePreparer);
        }

        await resolverRunner(msg, associationsSource(word1), associationsSource(word2), tasks, bothWordsFormatter, responsePreparer);
    };
};
