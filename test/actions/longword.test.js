const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('longword', () => {
    beforeAll(async () => {
        await sendCommand('/longword');
    });

    test('без результатов', async () => {
        const res = await sendCommand('противостояние');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('что-то нашлось', async () => {
        const res = await sendCommand('кровля');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'кардиоревматология',
            'книготорговля',
            'кровоизлияние',
            'макроэволюция',
            'микроэволюция',
            'микроявления',
            'обескровливаться',
            'окровавливаться',
            'плакировальня',
            'теплоэлектровентилятор',
            'электровентилятор',
        ]);
    });
});
