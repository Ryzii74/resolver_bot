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
        this.data[line - 1] = this.data[line - 1] || [];
        this.data[line - 1][cell - 1] = text;
    }

    setDone(line, done) {
        this.done[line - 1] = done;
    }

    show() {
        return this.data.map((line, index) => {
            const done = this.done[index];
            let row = `${index + 1}. ${line.join(' ')}`;
            if (done) {
                row = `~${row}~`;
            }
            return row;
        }).join('\n');
    }

    getColumn(columnNumber) {
        return this.data.map((line) => line[columnNumber - 1]).join(' ');
    }
}

module.exports = CodeList;
