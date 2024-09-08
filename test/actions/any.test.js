const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('anagramma', () => {
    beforeAll(async () => {
        await sendCommand('/any');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('что-то нашлось', async () => {
        const res = await sendCommand('хурма');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'амур',
            'мархур',
            'муар',
            'мура',
            'муха',
            'ухма',
            'фурма',
            'храм',
            'хула',
            'хурма',
            'шаурма',
        ]);
    })
});
