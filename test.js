const words = require('./libs/dictionaryArray');
words.forEach(word => {
	if (word.length === 8 && word[0] === 'c') {
		console.log(word);
	}
});