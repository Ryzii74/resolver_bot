const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('adj', () => {
    beforeAll(async () => {
        await sendCommand('/adj');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашлись результаты', async () => {
        const res = await sendCommand('цапля');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            "голубая",
            "серая",
            "большая",
        ]);
    });
});
