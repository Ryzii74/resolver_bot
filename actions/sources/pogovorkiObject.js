const pogovorkiArray = require('./pogovorkiArray');

const pogovorkiObject = {};
pogovorkiArray().forEach(word => { pogovorkiObject[word.replaceAll(/[ !,--]/g, '').toLowerCase()] = true; });

module.exports = pogovorkiObject;
