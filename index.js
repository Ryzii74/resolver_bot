require('./libs/dictionaryArray');
require('./libs/dictionaryObject');
require('./libs/commandParser');
require('./libs/commandResolver');

const transport = process.env.TRANSPORT || 'telegram';
require(`./transports/${transport}`);
