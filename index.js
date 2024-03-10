if (process.loadEnvFile) {
    process.loadEnvFile();
}

require('./actions/sources');
require('./transports');

process.on('uncaughtException', (err, origin) => {
    console.error('uncaughtException', origin, err);
});
