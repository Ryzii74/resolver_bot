module.exports = (answers) => {
    const answersLengths = {};
    answers.forEach(answer => {
        answersLengths[answer.length] = true;
    });

    return Object.keys(answersLengths).map(length => ({
        header: length,
        answers: answers.filter(answer => answer.length === Number(length)),
        joiner: ' ',
    }));
};
