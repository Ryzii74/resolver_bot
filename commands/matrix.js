const dictionaryArray = require('../actions/sources/dictionaryArray')();

module.exports = async (msg) => {
    let {text} = msg;
    const words = text.split(' ');
    const correctWords = dictionaryArray.filter(word => {
        for (let i = 0; i < 2; i++) {
            const wordToMatch = words[i];
            let isMatch = false;
            for (let j = 0; j < wordToMatch.length - 3; j++) {
                const substr = wordToMatch.substring(j, j + 3);
                if (word.includes(substr)) {
                    isMatch = true;
                }
            }

            if (!isMatch) {
                return false;
            }
        }

        return true;
    });

    msg.addAnswersResponse(correctWords);
};
