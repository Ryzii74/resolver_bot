if (process.loadEnvFile) {
    process.loadEnvFile();
}

require('./actions/sources');
require('./transports');
require('./server');

(async function Init() {
    await require('./commands/codesList').Init();
})();

process.on('uncaughtException', (err, origin) => {
    console.error('uncaughtException', origin, err);
});
