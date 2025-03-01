const {RESPONSES: {NO_RESULT}} = require("../../constants");

module.exports = (answers) => {
    const answersByTask = {};
    answers.forEach(el => {
        answersByTask[el.task] = answersByTask[el.task] || [];
        answersByTask[el.task].push(el.answer);
    });

    if (Object.keys(answersByTask).length === 0) {
        return [
            {
                answers: [NO_RESULT],
                joiner: ' ',
            },
        ];
    }

    return Object.keys(answersByTask).map(taskName => ({
        header: taskName,
        answers: answersByTask[taskName],
        joiner: ' ',
    }));
};
