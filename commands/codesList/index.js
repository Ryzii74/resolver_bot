const Lists = require('./lists');
const repository = require('./repository');

let listsByUsers = {};

const help = `*КОМАНДЫ*
список - количество листов
новый - добавить новый лист
очистить - удалить все списки
выбери 1 - выбрать список № 1
покажи 1 - показать список № 1
столбец 2 - выбрать все данные из столбец № 2

1 дом 32 - добавить строку с номером 1 и 2 ячейками дом и 32
3 = 2 - установить 3ью строку на 2ое место
`;

module.exports = async (msg) => {
    const { text, userId } = msg;
    listsByUsers[userId] = listsByUsers[userId] || new Lists();
    const lists = listsByUsers[userId];
    const words = text.split(' ');

    switch (words[0]) {
        case "помощь":
            msg.addTextResponse(help);
            break;
        case "список":
            msg.addTextResponse(lists.getState());
            break;
        case "новый":
            lists.add();
            msg.addTextResponse("Новый список добавлен!");
            break;
        case "выбери": {
            const listNumber = Number(text.split(' ')[1]);
            if (Number.isNaN(listNumber)) {
                msg.addTextResponse("Неверный номер списка");
                return;
            }

            lists.setCurrent(listNumber);
            msg.addTextResponse("Список выбран!");
            break;
        }
        case "столбец": {
            const columnNumber = Number(text.split(' ')[1]);
            if (Number.isNaN(columnNumber)) {
                msg.addTextResponse("Неверный номер столбца");
                return;
            }

            const data = lists.getColumn(columnNumber);
            msg.addTextResponse(data);
            break;
        }
        case "покажи": {
            const listNumber = Number(text.split(' ')[1]) || lists.current;
            const data = lists.show(listNumber);
            msg.addTextResponse(data);
            break;
        }
        case "очистить":
            listsByUsers = {};
            msg.addTextResponse("Все списки очищены");
            break;
        default:
            const line = Number(words[0]);
            if (Number.isNaN(line)) {
                msg.addTextResponse("Неверный формат строки");
                return;
            }

            const command = words[1];
            switch (command) {
                case "=":
                    const to = Number(words[2]);
                    if (Number.isNaN(to)) {
                        msg.addTextResponse("Неверный формат строки");
                        return;
                    }
                    lists.moveLine(line, to);
                    msg.addTextResponse("Строка перемещена!");
                    break;
                default:
                    const cell = Number(command);
                    if (Number.isNaN(cell)) {
                        msg.addTextResponse("Неверный формат ячейки");
                        return;
                    }
                    lists.setCell(line, cell, words.slice(2).join(' '));

                    const data = lists.show();
                    msg.addTextResponse(data);
                    break;
            }
            break;
    }

    await repository.save(listsByUsers);
};

module.exports.Init = async () => {
    const lists = await repository.load();
    Object.keys(lists).forEach(userId => {
        listsByUsers[userId] = new Lists(lists[userId]);
    });
}
