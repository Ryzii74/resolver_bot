const {emitter, EVENTS} = require("../libs/eventEmitter");
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);
rl.prompt();


rl.on('line', msg => {
  emitter.emit(EVENTS.MESSAGE, {
    text: msg,
    from: {
      id: 'terminal',
    },
  });
});

emitter.on(EVENTS.RESPONSE, (msg) => {
  console.log(msg.customData.response);
  rl.prompt();
});
