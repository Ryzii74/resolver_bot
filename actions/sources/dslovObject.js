const dslovArray = require('./dslovArray');

const dslovObject = {};
dslovArray().forEach(word => { dslovObject[word.replaceAll(/[ !,--]/g, '').replaceAll('ё', 'e').toLowerCase()] = true; });

module.exports = dslovObject;
