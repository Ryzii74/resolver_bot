const severalWordsCommand = require('../actions/commands/severalWords');
const task = require('../actions/tasks/plus');
const splitterByLength = require('../actions/utils/splitterByLength');

module.exports = severalWordsCommand(task, splitterByLength);
