require('./libs/dictionaryArray');
require('./libs/dictionaryObject');
require('./libs/phrasesArray');
require('./libs/modes');
require('./libs/messageParser');

const transport = process.env.TRANSPORT || 'telegram';
require(`./transports/${transport}`);
