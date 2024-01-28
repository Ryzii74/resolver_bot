const {emitter, EVENTS} = require('./eventEmitter');
const {changeModeForUser, runMode} = require('../../libs/modes');
const {set: setUserLocation} = require('../../libs/userLocations');

emitter.on(EVENTS.MESSAGE, async (msg) => {
    if (msg.isCommand()) {
        const result = changeModeForUser(msg.userId, msg.command);
        msg.addTextResponse(result);
        return sendResponse(msg);
    }

    await runMode(msg);
    sendResponse(msg);
});

emitter.on(EVENTS.LOCATION, async (msg) => {
    const {location} = msg;
    setUserLocation(msg.userId, location);
    msg.addTextResponse(`Сохранены координаты ${location.latitude} ${location.longitude}`)
    sendResponse(msg);
});

function sendResponse(msg) {
    emitter.emit(EVENTS.RESPONSE, msg);
}
