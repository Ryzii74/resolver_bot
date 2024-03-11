const Lists = require('./lists');
const repository = require('./repository');
const getIp = require('../../server/utils/getIp');

let listsByUsers = {};

const help = `*КОМАНДЫ*
список - количество листов
новый - добавить новый лист
очистить - удалить все списки
выбери 1 - выбрать список № 1
покажи 1 - показать список № 1

*РАБОТА С ТЕКУЩИМ ЛИСТОМ*
веб - вернет url для просмотра списка
покажи - показать текущий список
столбец 2 - выбрать все данные из столбец № 2
1 дом#56 - сохранить в 1ую строку значения "дом" и "56"
3 = 2 - установить 3ью строку на 2ое место
+ 2 - пометить строку № 2 как готовую
- 2 - пометить строку № 2 как неготовую
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
        case "веб": {
            const ip = await getIp();
            msg.addTextResponse(`http://${ip}/list/${userId}/${lists.current}`);
        }
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
        case "+": {
            const lineNumber = Number(text.split(' ')[1]);
            if (Number.isNaN(lineNumber)) {
                msg.addTextResponse("Неверный номер строки");
                return;
            }
            lists.setDone(lineNumber, true);

            const data = lists.show();
            msg.addTextResponse(data);
            break;
        }
        case "-": {
            const lineNumber = Number(text.split(' ')[1]);
            if (Number.isNaN(lineNumber)) {
                msg.addTextResponse("Неверный номер строки");
                return;
            }
            lists.setDone(lineNumber, false);

            const data = lists.show();
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
                case "=": {
                    const to = Number(words[2]);
                    if (Number.isNaN(to)) {
                        msg.addTextResponse("Неверный формат строки");
                        return;
                    }
                    lists.moveLine(line, to);

                    const data = lists.show();
                    msg.addTextResponse(data);
                    break;
                }
                default:
                    const cell = Number(words[1]);
                    if (Number.isNaN(cell)) {
                        lists.setLine(line, words.slice(1).join(' '));
                    } else {
                        lists.setCell(line, cell, words.slice(2).join(' '));
                    }

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

module.exports.getLists = (userId) => {
    return listsByUsers[userId];
};
