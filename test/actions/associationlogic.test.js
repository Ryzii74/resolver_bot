const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe.skip('association logic', () => {
    beforeAll(async () => {
        await sendCommand('/associationlogic');
    });

    test('без результатов', async () => {
        const res = await sendCommand('плов хищение');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашлись результаты', async () => {
        const res = await sendCommand('монарх плавание');
        expect(res).toHaveLength(1);
        expect(res[0]).toHaveLength(2);
        expect(res[0]).toEqual([
            'король корабль',
            'якоб якорь',
        ]);
    });
});
