const dictionary = require("../libs/dictionary");

module.exports = async (msg) => {
    const {text} = msg;
    const wordsObject = dictionary.getObject(text);

    let {lines, numbers} = getLines(text);
    if (lines.length === 1 && numbers.length > 1) {
        lines = numbers.map(_ => lines[0]);
        msg.addTextResponse([`\`${getByNumbers(lines, numbers)}\``]
            .map(highlightWords(wordsObject))
            .join('\n')
        );
        return;
    }

    msg.addTextResponse([
        `Лесенка: \`${getLadder(lines)}\``,
        `Арбуз: \`${getWatermelon(lines)}\``,
        `Арбуз с конца: \`${getWatermelonBack(lines)}\``,
        `Лесенка с конца: \`${getLadderBack(lines)}\``,
    ].map(highlightWords(wordsObject)).join('\n'));
    if (numbers.length) {
        msg.addTextResponse([
            '*С ЧИСЛАМИ*',
            `Номера построчно: \`${getByNumbers(lines, numbers)}\``,
            `По номеру строки арбуз: \`${getByLineNumbersWatermelon(lines, numbers)}\``,
            `По номеру строки арбуз с конца: \`${getByLineNumbersWatermelonBack(lines, numbers)}\``,
            `По номеру строки лесенкой: \`${getByLineNumbersLadder(lines, numbers)}\``,
            `По номеру строки лесенкой наоборот: \`${getByLineNumbersLadderBack(lines, numbers)}\``,
        ].map(highlightWords(wordsObject)).join('\n'));
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
    const rawLines = text.split('\n');
    if (rawLines.length === 1) {
        return {
            lines: getLineWords(text),
            numbers: [],
        };
    }

    const lastLine = rawLines[rawLines.length - 1];
    const lastLineWords = lastLine.trim().split(' ');
    const isLastLineNumbers = lastLineWords.every(word => /[0-9]+/.test(word));
    if (rawLines.length === 2 && isLastLineNumbers) {
        return {
            lines: getLineWords(rawLines[0]),
            numbers: lastLineWords.map(Number),
        };
    }

    return {
        lines: prepareLines(isLastLineNumbers ? rawLines.slice(0, rawLines.length - 1) : rawLines),
        numbers: isLastLineNumbers ? lastLineWords.map(Number) : [],
    };
}

function prepareLines(lines) {
    return lines
        .map(line => line.trim().replace(/[^а-яА-Яa-zA-ZёЁ]/g, ''))
        .filter(Boolean);
}

function getLineWords(line) {
    return prepareLines(line.split(' '));
}

function highlightWords(wordsObject) {
    return (answer) => {
        const word = (answer.split(': ')[1] || '').replaceAll('`', '');
        if (word && wordsObject[word]) {
            return `${answer.replace(word, word.toUpperCase())} (!!!)`;
        }

        return answer;
    };
}
