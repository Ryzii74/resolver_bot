'use strict';
const songs = require('../data/noizeSongs');

const songsPrepared = songs.map(song => ({
	...song,
	textPrepared: song.text
		.replaceAll('\n\n', ' ')
		.replaceAll('\n', ' ')
}));

module.exports = async (msg) => {
	const {text} = msg;

	const songByName = songsPrepared.find(song => song.name.toLowerCase() === text.toLowerCase());
	if (songByName) {
		msg.addAnswersResponse(songByName.text.split('\n'), '\n', songByName.name);
	}

	msg.addAnswersResponse(['Тестовый ответ'], '\n', 'ВИКИСЛОВАРЬ');
};
