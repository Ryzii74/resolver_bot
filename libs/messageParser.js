const {emitter, EVENTS} = require('./eventEmitter');
const {changeModeForUser, getModeForUser, runMode} = require('./modes');

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
    if (getModeForUser(data.from.id) === 'azimut') {
        emitter.emit(EVENTS.RESPONSE_COORDS, data);
    }
    emitter.emit(EVENTS.RESPONSE, data);
}
