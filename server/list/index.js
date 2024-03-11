const showList = require('./show');

module.exports = (app) => {
    app.get('/list/:userId/:listNumber', (req, res) => {
        const { userId, listNumber } = req.params;

        res.send(showList(userId, listNumber));
    });
};
