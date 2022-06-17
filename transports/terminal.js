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

emitter.on(EVENTS.RESPONSE_COORDS, (msg) => {
  const [lat, lon] = msg.customData.response.split(' ');
  if (!isNaN(lat) && !isNaN(lon)) {
    console.log('Отправлены координаты:');
    console.log(msg.customData.response);
    rl.prompt();
  } else {
    console.log('Попытка отправки ошибочных координат');
    rl.prompt();
  }
});