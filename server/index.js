const express = require('express');
const app = express();
const list = require('./list');

list(app);

app.listen(80, () => {
    console.log('Server is running on port 80');
});
