const {emitter, EVENTS} = require('./eventEmitter');
const {changeModeForUser, runMode} = require('./modes');

emitter.on(EVENTS.MESSAGE, async (data) => {
    const text = data.text.toLowerCase().trim();
    const userId = data.from.id;

    if (text.startsWith('/')) {
        const result = changeModeForUser(userId, text.replace('/', ''));
        return sendResponse(data, result);
    }

    sendResponse(data, await runMode(userId, text));
});

function sendResponse(data, text) {
    data.customData = data.customData || {};
    data.customData.response = text;
    emitter.emit(EVENTS.RESPONSE, data);
}
