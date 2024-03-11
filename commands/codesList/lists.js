const CodeList = require('./list');

class CodeLists {
    constructor(lists) {
        const data = lists || [{ data: [], done: [] }];
        this.lists = data.map(list => new CodeList(list.data, list.done));
        this.current = data.length;
    }

    get currentList() {
        return this.lists[this.current - 1];
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

    getList(listNumber) {
        const list = this.lists[listNumber - 1];
        return list && list.getData();
    }

    moveLine(line, to) {
        return this.currentList.moveLine(line, to);
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
        return this.currentList.getColumn(columnNumber);
    }

    setCell(line, cell, text) {
        this.currentList.setCell(line, cell, text);
    }

    setLine(line, text) {
        this.currentList.setLine(line, text);
    }

    setDone(line, done) {
        this.currentList.setDone(line, done);
    }
}

module.exports = CodeLists;
