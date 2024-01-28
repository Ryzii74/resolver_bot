require('./actions/sources/dictionaryArray');
require('./actions/sources/dictionaryObject');
require('./actions/sources/phrasesArray');
require('./libs/modes');
require('./transports/utils/messageParser');

const transport = process.env.TRANSPORT || 'telegram';
require(`./transports/${transport}`);
