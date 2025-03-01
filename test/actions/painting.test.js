const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('painting', () => {
    beforeAll(async () => {
        await sendCommand('/painting');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашелся 1 результат', async () => {
        const res = await sendCommand('мопс');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['Мопс в кресле']);
    });

    test('нашелся 1 результат в запросе с пробелами', async () => {
        const res = await sendCommand('мопс в');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['Мопс в кресле']);
    });

    test('нашлось несколько результатов', async () => {
        const res = await sendCommand('кресл');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            "Большая обнажённая в красном кресле",
            "Женщина в красном кресле",
            "Кресло Гогена",
            "Мадонна в кресле",
            "Мопс в кресле",
            "Обнажённая в чёрном кресле",
            "Портрет Карла V в кресле",
        ]);
    });
});
