const pogovorkiArray = require('./pogovorkiArray');

const pogovorkiObject = {};
pogovorkiArray().forEach(word => { pogovorkiObject[word.replaceAll(/[ !,--]/g, '').replaceAll('ё', 'e').toLowerCase()] = true; });

module.exports = pogovorkiObject;
