const fs = require('fs');
const path = require('path');
const {emitter, EVENTS} = require('./eventEmitter');

const commands = {};
const commandsDir = path.join(__dirname, '../commands');
const files = fs.readdirSync(commandsDir);

files.forEach(file => {
   const commandName = file.replace('.js', '');
   commands[commandName] = require(path.join(commandsDir, commandName));
   emitter.on(commandName.toUpperCase(), async data => {
       data.customData.response = await commands[commandName](data.customData.text);
       emitter.emit(EVENTS.RESPONSE, data);
   });
});
