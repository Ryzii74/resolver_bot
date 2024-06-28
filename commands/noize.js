'use strict';
const songs = require('../data/noizeSongs');

const songsPrepared = songs.map(song => ({
	...song,
	textPrepared: song.text
		.replaceAll('\n\n', ' ')
		.replaceAll('\n', ' ')
		.split(' ')
		.map(word => word.toLowerCase())
		.join(' '),
}));

module.exports = async (msg) => {
	const {text} = msg;

	const songByName = songsPrepared.find(song => song.name.toLowerCase() === text.toLowerCase());
	if (songByName) {
		msg.addTextResponse(songByName.text);
		return;
	}

	const songsByText = songsPrepared.filter(song => song.textPrepared.includes(text));
	if (songsByText.length) {
		const regExp = new RegExp(text, 'gi');
		songsByText.forEach(songByText => {
			const songBlocks = songByText.text.split('\n\n');
			const blocksWithText = songBlocks.filter(block =>
				block
					.replaceAll('\n', ' ')
					.split(' ')
					.map(word => word.toLowerCase())
					.join(' ')
					.includes(text)
			);
			const alreadySent = [];
			blocksWithText.forEach(block => {
				if (alreadySent.includes(block)) {
					return;
				}

				msg.addTextResponse(`\`${songByText.name}\`\n${block.replace(regExp, `*${text.toUpperCase()}*`)}`);
				alreadySent.push(block);
			});
		});
		return;
	}

	msg.addTextResponse('Ничего не найдено!');
};
