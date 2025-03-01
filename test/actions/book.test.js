const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('book', () => {
    beforeAll(async () => {
        await sendCommand('/book');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашелся 1 результат', async () => {
        const res = await sendCommand('ступен');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['Ложится мгла на старые ступени']);
    });

    test('нашелся 1 результат в запросе с пробелами', async () => {
        const res = await sendCommand('старые ступени');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['Ложится мгла на старые ступени']);
    });

    test('нашлось несколько результатов', async () => {
        const res = await sendCommand('пест');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            "Дело «пёстрых»",
            "Дело «пёстрых»",
            "Как часто, пёстрою толпою окружён",
            "Конфетнораскрашенная апельсиннолепестковая обтекаемая малютка",
            "Лепестки на ветру",
            "Пёстрая лента",
            "Пёстрые рассказы (Чехов)",
            "Пёстрые рассказы (Элиан)",
            "Рыцарь Пламенеющего Пестика",
        ]);
    });
});
