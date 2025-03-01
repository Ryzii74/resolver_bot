const {RESPONSES: {NO_RESULT}} = require("../../constants");

module.exports = (answers) => {
    const answersLengths = {};
    answers.forEach(el => {
        answersLengths[el.answer.length] = true;
    });

    if (Object.keys(answersLengths).length === 0) {
        return [
            {
                header: 'ПОКОРОЧЕ',
                answers: [NO_RESULT],
                joiner: ' ',
            },
            {
                header: 'ПОДЛИННЕЕ',
                answers: [NO_RESULT],
                joiner: ' ',
            }
        ]
    }

    return Object.keys(answersLengths).map(length => ({
        header: length,
        answers: answers
            .filter(el => el.answer.length === Number(length))
            .map(el => el.answer),
        joiner: ' ',
    }));
};
