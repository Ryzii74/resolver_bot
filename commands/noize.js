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

	msg.addAnswersResponse(['Тестовый ответ'], '\n', 'ВИКИСЛОВАРЬ');
};
