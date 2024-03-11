const publicIp = require('public-ip');

module.exports = async () => {
    return publicIp.v4();
};
