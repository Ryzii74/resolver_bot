const {emitter, EVENTS} = require("./utils/eventEmitter");
const readline = require('readline');
const {Message, RESPONSE_TYPES} = require("./utils/message");

const rl = readline.createInterface(process.stdin, process.stdout);
rl.prompt();

rl.on('line', msg => {
  emitter.emit(EVENTS.MESSAGE, new Message({
    text: msg,
    from: {
      id: 'terminal',
    },
  }));
});

emitter.on(EVENTS.RESPONSE, (msg) => {
  for (let type in RESPONSE_TYPES) {
    const responseType = RESPONSE_TYPES[type];

    const response = msg.response[responseType];
    if (!response || !response.length) continue;

    switch (responseType) {
      case RESPONSE_TYPES.TEXT:
        response.forEach(text => console.log(text));
        break;
      case RESPONSE_TYPES.LOCATION:
        response.forEach(location => {
          console.log('Отправлены координаты:');
          console.log(location.lat, location.lon);
        });
        break;
    }
  }
  rl.prompt();
});
