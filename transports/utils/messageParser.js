const {emitter, EVENTS} = require('./eventEmitter');
const {changeModeForUser, runMode, autoDetectMode, switchAutoForUser} = require('../../libs/modes');
const {set: setUserLocation} = require('../../libs/userLocations');

const SPECIAL_COMMANDS = {
    SWITCH_AUTH_MODE: 'auto',
};

async function messageProcessor(msg) {
    if (msg.isCommand()) {
        if (msg.command === SPECIAL_COMMANDS.SWITCH_AUTH_MODE) {
            msg.addTextResponse(switchAutoForUser(msg.userId));
            return sendResponse(msg);
        }

        const result = changeModeForUser(msg.userId, msg.command);
        msg.addTextResponse(result);
        sendResponse(msg);

        return msg;
    }

    const parsedMode = autoDetectMode(msg);
    await runMode(msg, parsedMode);
    sendResponse(msg);

    return msg;
}

emitter.on(EVENTS.MESSAGE, messageProcessor);

emitter.on(EVENTS.LOCATION, async (msg) => {
    const {location} = msg;
    setUserLocation(msg.userId, location);
    msg.addTextResponse(`Сохранены координаты ${location.latitude} ${location.longitude}`)
    sendResponse(msg);
});

function sendResponse(msg) {
    emitter.emit(EVENTS.RESPONSE, msg);
}

module.exports = { messageProcessor };
