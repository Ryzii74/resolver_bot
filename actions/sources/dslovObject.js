const dslovArray = require('./dslovArray');

const dslovObject = {};
dslovArray().forEach(word => { dslovObject[word.replaceAll(/[ !,--]/g, '').toLowerCase()] = true; });
console.log(dslovObject);
module.exports = dslovObject;
