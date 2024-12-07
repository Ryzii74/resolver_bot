const wikislovarArray = require('./wikislovarArray');

const wikislovarObject = {};
wikislovarArray().forEach(word => { wikislovarObject[word.replaceAll(/[ !,--]/g, '').replaceAll('ё', 'e').toLowerCase()] = true; });

module.exports = wikislovarObject;
