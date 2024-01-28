require('./utils/messageParser');

const transport = process.env.TRANSPORT || 'terminal';
require(`./${transport}`);
