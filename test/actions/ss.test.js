const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('ss', () => {
    beforeAll(async () => {
        await sendCommand('/ss');
    });

    test('без результатов', async () => {
        const res = await sendCommand('zxc');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('двоичка', async () => {
        const res = await sendCommand('1101010');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            '2 -> 10: 106',
            '2 -> 16: 6a',
            '10 -> 2: 100001100110011010010',
            '10 -> 16: 10ccd2',
            '16 -> 10: 17829904',
            '16 -> 2: 1000100000001000000010000',
        ]);
    });
});
