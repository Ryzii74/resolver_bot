const severalWordsCommand = require('../actions/commands/severalWords');
const task = require('../actions/tasks/metagramma');

module.exports = severalWordsCommand(task);
