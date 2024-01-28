const severalWordsCommand = require('../actions/commands/severalWords');
const metagramma = require('../actions/tasks/metagramma');
const logogrif = require('../actions/tasks/logogrif');

module.exports = severalWordsCommand([metagramma, logogrif]);
