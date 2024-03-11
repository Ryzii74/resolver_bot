const express = require('express');
const app = express();
const list = require('./list');
const config = require('../config');

list(app);

app.listen(config.port, () => {
    console.log('Server is running on port 80');
});
