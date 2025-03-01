module.exports = async (msg) => {
    const {text} = msg;
    const {lines, numbers} = getLines(text);

    msg.addAnswersResponse([
        `Лесенка: \`${getLadder(lines)}\``,
        `Арбуз: \`${getWatermelon(lines)}\``,
        `Арбуз с конца: \`${getWatermelonBack(lines)}\``,
        `Лесенка с конца: \`${getLadderBack(lines)}\``,
    ]);
    if (numbers.length) {
        msg.addAnswersResponse([
            `Номера построчно: \`${getByNumbers(lines, numbers)}\``,
            `По номеру строки арбуз: \`${getByLineNumbersWatermelon(lines, numbers)}\``,
            `По номеру строки арбуз с конца: \`${getByLineNumbersWatermelonBack(lines, numbers)}\``,
            `По номеру строки лесенкой: \`${getByLineNumbersLadder(lines, numbers)}\``,
            `По номеру строки лесенкой наоборот: \`${getByLineNumbersLadderBack(lines, numbers)}\``,
        ], undefined, 'С ЧИСЛАМИ');
    }
};

function getLadder(lines) {
    return lines.map((line, index) => line[index] || '?').join('');
}

function getLadderBack(lines) {
    return lines.map((line, index) => line[line.length - 1 - index] || '?').join('');
}

function getWatermelonBack(lines) {
    return lines.map((line) => line[line.length - 1] || '?').join('');
}

function getWatermelon(lines) {
    return lines.map(line => line[0]).join('');
}

function getByLineNumbersWatermelon(lines, numbers) {
    return numbers
        .map(number => lines[number - 1] && lines[number - 1][0] || '?')
        .join('');
}

function getByLineNumbersWatermelonBack(lines, numbers) {
    return numbers
        .map(number => {
            const line = lines[number - 1];
            return line && line[line.length - 1] || '?'
        })
        .join('');
}

function getByLineNumbersLadder(lines, numbers) {
    return numbers
        .map((number, index) => {
            const line = lines[number - 1];
            return line && line[index] || '?'
        })
        .join('');
}

function getByLineNumbersLadderBack(lines, numbers) {
    return numbers
        .map((number, index) => {
            const line = lines[number - 1];
            return line && line[line.length - 1 - index] || '?'
        })
        .join('');
}

function getByNumbers(lines, numbers) {
    return lines.map((line, index) => line[[numbers[index] - 1]] || '?').join('');
}

function getLines(text) {
    const isSeveralLines = text.includes('\n');
    if (!isSeveralLines) {
        return {
            lines: getLineWords(text),
            numbers: [],
        };
    }

    let lines = prepareLines(text.split('\n'));
    const lastLineWords = lines[lines.length - 1].split(' ');
    const isLastLineNumbers = lastLineWords.every(word => /[0-9]+/.test(word));
    if (lines.length === 2 && isLastLineNumbers) {
        return {
            lines: getLineWords(lines[0]),
            numbers: lastLineWords.map(Number),
        };
    }

    if (isLastLineNumbers) {
        return {
            lines: lines.slice(0, lines.length - 1),
            numbers: lastLineWords.map(Number),
        };
    }

    return {
        lines,
        numbers: [],
    }
}

function prepareLines(line) {
    return line.map(el => el.trim()).filter(Boolean);
}
function getLineWords(line) {
    return prepareLines(line.split(' '));
}
