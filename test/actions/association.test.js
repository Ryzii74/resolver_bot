const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('association', () => {
    beforeAll(async () => {
        await sendCommand('/association');
    });

    test('без результатов', async () => {
        const res = await sendCommand('хурма таджик');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('ассоциации на одно слово', async () => {
        const res = await sendCommand('любовь');
        expect(res).toHaveLength(1);
        expect(res[0]).toHaveLength(100);
        expect(res[0]).toContain('счастье');
    });

    test('ассоциации на два слова', async () => {
        const res = await sendCommand('любовь дом');
        expect(res).toHaveLength(1);
        expect(res[0].length).toBeGreaterThan(5);
        expect(res[0]).toContain('счастье');
    });
});
