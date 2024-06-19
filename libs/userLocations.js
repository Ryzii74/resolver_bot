const userLocations = {};

module.exports = {
    set: (userId, location) => {
        console.log('Updated user location', userId, location);
        userLocations[userId] = location;
    },

    get: (userId) => {
        return userLocations[userId];
    },
};
