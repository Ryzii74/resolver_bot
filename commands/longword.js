const severalWordsCommand = require('../actions/commands/severalWords');
const task = require('../actions/tasks/subword');

module.exports = severalWordsCommand(task);
