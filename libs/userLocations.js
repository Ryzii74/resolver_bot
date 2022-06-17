const userLocations = {};

module.exports = {
    set: (userId, location) => {
        userLocations[userId] = location;
    },

    get: (userId) => {
        return userLocations[userId];
    },
};