const { messageProcessor } = require('../../transports/utils/messageParser');
const { Message } = require('../../transports/utils/message');

async function wait(ms){
    return new Promise((resolve) => {
       setTimeout(resolve, ms);
    });
}

module.exports = async (message) => {
    const command = new Message({
        from: {
            username: 'test',
            id: 'test',
        },
        text: message,
    });
    const responseMessage = await messageProcessor(command);
    return responseMessage.response.text.map(res => res.replaceAll('`', '').split('\n'));
};
