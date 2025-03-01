const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('noun', () => {
    beforeAll(async () => {
        await sendCommand('/noun');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашлись результаты', async () => {
        const res = await sendCommand('седовласая');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            "старушка",
            "дама",
            "женщина",
            "голова",
        ]);
    });
});
