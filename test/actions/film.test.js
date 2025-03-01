const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('film', () => {
    beforeAll(async () => {
        await sendCommand('/film');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашелся 1 результат', async () => {
        const res = await sendCommand('ступеньками');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['Под ступеньками']);
    });

    test('нашелся 1 результат в запросе с пробелом', async () => {
        const res = await sendCommand('од ступеньками');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['Под ступеньками']);
    });

    test('нашлось несколько результатов', async () => {
        const res = await sendCommand('пест');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            "Дело пёстрых",
            "Лепестки надежды",
            "Пёстрые сумерки",
        ]);
    });
});
