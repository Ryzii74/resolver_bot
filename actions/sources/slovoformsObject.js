const slovoformsArray = require('./slovoformsArray');

const slovoformsObject = {};
slovoformsArray().forEach(word => { slovoformsObject[word] = true; });

module.exports = slovoformsObject;
