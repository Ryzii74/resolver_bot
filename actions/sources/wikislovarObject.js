const wikislovarArray = require('./wikislovarArray');

const wikislovarObject = {};
wikislovarArray().forEach(word => { wikislovarObject[word.replaceAll(/[ !,--]/g, '').toLowerCase()] = true; });

module.exports = wikislovarObject;
