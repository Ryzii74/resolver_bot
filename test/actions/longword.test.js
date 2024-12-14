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
            "микровселенная",
            "макровселенная",
            "плакировальня",
            "наркоторговля",
            "микроэволюция",
            "микроволюмния",
            "макроэволюция",
            "кровоизлияние",
            "книготорговля",
            "фальшкровля",
            "кардиоревматология",
            "микроявления",
            "обескровливаться",
            "окровавливаться",
            "теплоэлектровентилятор",
            "электровентилятор",
        ]);
    });
});
