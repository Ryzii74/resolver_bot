module.exports = (answers) => {
    const answersLengths = {};
    answers.forEach(answer => {
        answersLengths[answer.length] = true;
    });

    if (Object.keys(answersLengths).length === 0) {
        return [
            {
                header: 'ПОКОРОЧЕ',
                answers: ['Нет результатов'],
                joiner: ' ',
            },
            {
                header: 'ПОДЛИННЕЕ',
                answers: ['Нет результатов'],
                joiner: ' ',
            }
        ]
    }

    return Object.keys(answersLengths).map(length => ({
        header: length,
        answers: answers.filter(answer => answer.length === Number(length)),
        joiner: ' ',
    }));
};
