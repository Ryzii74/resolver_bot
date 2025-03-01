const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('cross', () => {
    beforeAll(async () => {
        await sendCommand('/cross');
    });

    test('без результатов', async () => {
        const res = await sendCommand('дом монстр');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('с одним результатом', async () => {
        const res = await sendCommand('стер кроб');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['ми - МИстер МИкроб']);
    });

    test('c несколькими результатами', async () => {
        const res = await sendCommand('кот лоб');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'ок - котОК лобОК',
            'ик - котИК лобИК',
        ]);
    });
});
