const CodeList = require('./list');

class CodeLists {
    constructor(lists) {
        const data = lists || { data: [], done: [] };
        this.lists = data.map(list => new CodeList(list.data, list.done));
        this.current = data.length;
    }

    add() {
       this.lists.push(new CodeList());
       this.current = this.lists.length;
    }

    getState() {
        return `Всего списков - ${this.lists.length}\nТекущий - ${this.current}`;
    }

    getData() {
        return this.lists.map(list => list.getData());
    }

    moveLine() {
        // TODO
    }

    show(listNumber) {
        const numberToShow = listNumber ? listNumber - 1 : this.current - 1;
        return this.lists[numberToShow].show();
    }

    setCurrent(listNumber) {
        if (!this.lists[listNumber - 1]) {
            this.current = this.lists.length;
        } else {
            this.current = listNumber;
        }
    }

    getColumn(columnNumber) {
        const list = this.lists[this.current - 1];
        return list.getColumn(columnNumber);
    }

    setCell(line, cell, text) {
        const list = this.lists[this.current - 1];
        list.setCell(line, cell, text);
    }

    setDone(line, done) {
        const list = this.lists[this.current - 1];
        list.setDone(line, done);
    }
}

module.exports = CodeLists;
