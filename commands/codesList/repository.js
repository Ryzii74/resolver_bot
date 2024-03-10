const fs = require('fs').promises;

module.exports = {
    async load() {
        const json = await fs.readFile('data/lists.json');
        return JSON.parse(json);
    },
    async save(userLists) {
        const fullData = {};
        Object.keys(userLists).forEach(userId => {
            fullData[userId] = userLists[userId].getData();
        });
        await fs.writeFile('data/lists.json', JSON.stringify(fullData));
    },
};
