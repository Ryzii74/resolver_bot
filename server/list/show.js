const { getLists } = require('../../commands/codesList');

module.exports = (userId, listNumber) => {
    const lists = getLists(userId);
    if (!lists) {
        return "Пользователь не найден";
    }

    const list = lists.getList(listNumber);
    if (!list) {
        return "Список не найден";
    }

    return list;
};
