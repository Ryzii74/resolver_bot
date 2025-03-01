const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('logo', () => {
    beforeAll(async () => {
        await sendCommand('/logo');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашелся 1 результат', async () => {
        const res = await sendCommand('ступен');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['ступень']);
    });

    test('нашлось несколько результатов', async () => {
        const res = await sendCommand('пест');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'песто',
            'перст',
            'пес',
        ]);
    });
});
