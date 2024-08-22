const severalWordsCommand = require('../actions/commands/severalWords');
const metagramma = require('../actions/tasks/metagramma');
const logogrif = require('../actions/tasks/logogrif');
const plus = require('../actions/tasks/plus');
const anagramma = require('../actions/tasks/anagramma');
const brukva = require('../actions/tasks/brukva');

module.exports = severalWordsCommand([metagramma, logogrif, plus, anagramma, brukva]);
