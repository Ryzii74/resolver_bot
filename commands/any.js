const severalWordsCommand = require('../actions/commands/severalWords');
const metagramma = require('../actions/tasks/metagramma');
const metagramma2 = require('../actions/tasks/metagramma2');
const logogrif = require('../actions/tasks/logogrif');
const plus = require('../actions/tasks/plus');
const plus2 = require('../actions/tasks/plus2');
const anagramma = require('../actions/tasks/anagramma');
const brukva = require('../actions/tasks/brukva');
const splitterByTask = require("../actions/utils/splitterByTask");

module.exports = severalWordsCommand([metagramma, metagramma2, logogrif, plus, plus2, anagramma, brukva], splitterByTask);
