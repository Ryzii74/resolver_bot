const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('phrase', () => {
    beforeAll(async () => {
        await sendCommand('/phrase');
    });

    test('без результатов', async () => {
        const res = await sendCommand('хурма');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('только частичные совпадения', async () => {
        const res = await sendCommand('хромосо');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            '*ЧАСТИЧНЫЕ СОВПАДЕНИЯ СЛОВ*',
            'волосатая хромосома',
            'даунито хромосом',
            'жирная хромосома',
            'особь второго сорта с неполным набором хромосом',
            'товаристая хромосома',
            'хавать хромосомы',
        ]);
    });

    test('только полные совпадения', async () => {
        const res = await sendCommand('хромосома');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            '*ПОЛНЫЕ СОВПАДЕНИЯ СЛОВ*',
            'волосатая хромосома',
            'жирная хромосома',
            'товаристая хромосома',
        ]);
    });

    test('поговорка про курицу', async () => {
        const res = await sendCommand('курицу');
        expect(res).toHaveLength(2);
        expect(res[0]).toEqual([
            '*ПОЛНЫЕ СОВПАДЕНИЯ СЛОВ*',
            'мать твою (вашу его и пр) курицу',
            'резать курицу несущую золотые яйца',
        ]);
        expect(res[1]).toEqual([
            '*ПОГОВОРКИ*',
            'яйца курицу не учат',
        ]);
    });

    test('нашлось во всех словарях', async () => {
        const res = await sendCommand('деньги');
        expect(res).toHaveLength(5);

        expect(res[0]).toHaveLength(4);
        expect(res[0][0]).toBe('*ЧАСТИЧНЫЕ СОВПАДЕНИЯ СЛОВ*');

        expect(res[1]).toHaveLength(52);
        expect(res[1][0]).toBe('*ПОЛНЫЕ СОВПАДЕНИЯ СЛОВ*');

        expect(res[2]).toHaveLength(3);
        expect(res[2][0]).toBe('*ЕЩЕ КАКИЕ-ТО*');

        expect(res[3]).toHaveLength(7);
        expect(res[3][0]).toBe('*ВИКИСЛОВАРЬ*');

        expect(res[4]).toHaveLength(4);
        expect(res[4][0]).toBe('*ПОГОВОРКИ*');
    });
});
