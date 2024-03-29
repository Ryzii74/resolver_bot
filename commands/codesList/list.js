const { table } = require('table');

class CodeList {
    constructor(data, done) {
        this.data = data || [];
        this.done = done || [];
    }

    getData() {
        return {
            data: this.data,
            done: this.done,
        };
    }

    setCell(line, cell, text) {
        if (!text.trim()) return;
        this.data[line - 1] = this.data[line - 1] || [];
        this.data[line - 1][cell - 1] = text;
    }

    setLine(line, text) {
        if (!text.trim()) return;
        this.data[line - 1] = this.data[line - 1] || [];
        const cells = text.split('#');
        cells.forEach((cell, index) => {
            this.data[line - 1][index] = cell;
        });
    }

    setDone(line, done) {
        this.done[line - 1] = done;
    }

    getLines() {
        return [...this.data].map(line => (line || []).map(el => el || ''));
    }

    show() {
        const maxLength = this.getLines().reduce((max, line) => Math.max(max, line.length), 0);
        const formattedData = this.getLines().map((line, index) => {
            return [`${index + 1}${this.done[index] ? '+' : ''}`, ...line, ...Array(maxLength - line.length).fill('')];
        });
        return '```\n' + table(formattedData) + '\n```';
    }

    getColumn(columnNumber) {
        return this.getLines().map((line) => line[columnNumber - 1] || '?').join(' ');
    }

    moveLine(line, to) {
        const element = this.data[line - 1];
        this.data.splice(line - 1, 1);
        this.data.splice(to - 1, 0, element);
    }
}

module.exports = CodeList;
