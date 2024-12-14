const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('subword', () => {
    beforeAll(async () => {
        await sendCommand('/subword');
    });

    test('без результатов', async () => {
        const res = await sendCommand('рыг');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('что-то нашлось', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['фаро про вар фо фа ар во по ро']);
    });
});
