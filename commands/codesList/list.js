class CodeList {
    constructor(data) {
        this.data = data || [];
    }

    getData() {
        return this.data;
    }

    setCell(line, cell, text) {
        this.data[line - 1] = this.data[line - 1] || [];
        this.data[line - 1][cell - 1] = text;
    }

    show() {
        return this.data.map((line, index) => `${index + 1}. ${line.join(' ')}`).join('\n');
    }

    getColumn(columnNumber) {
        return this.data.map((line) => line[columnNumber - 1]).join(' ');
    }
}

module.exports = CodeList;
