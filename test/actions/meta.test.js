const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('metagramma', () => {
    beforeAll(async () => {
        await sendCommand('/meta');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашелся 1 результат', async () => {
        const res = await sendCommand('ломбырд');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['ломбард']);
    });

    test('нашлось несколько результатов', async () => {
        const res = await sendCommand('домна');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'донна',
            'домра',
            'дойна',
        ]);
    });
});
