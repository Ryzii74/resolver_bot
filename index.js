require('./libs/rawMessageParser');
require('./libs/commandParser');
require('./libs/commandResolver');

const transport = process.env.TRANSPORT || 'telegram';
require(`./transports/${transport}`);
