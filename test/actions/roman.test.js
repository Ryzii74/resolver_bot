const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('roman', () => {
    beforeAll(async () => {
        await sendCommand('/roman');
    });

    test('без результатов', async () => {
        const res = await sendCommand('zxc');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    describe('из римских', () => {
        test('1', async () => {
            const res = await sendCommand('DC');
            expect(res).toHaveLength(1);
            expect(res[0]).toEqual(["600"]);
        });

        test('2', async () => {
            const res = await sendCommand('LXXXIV');
            expect(res).toHaveLength(1);
            expect(res[0]).toEqual(["84"]);
        });
    });

    describe('в римские', () => {
        test('1', async () => {
            const res = await sendCommand('600');
            expect(res).toHaveLength(1);
            expect(res[0]).toEqual(["DC"]);
        });

        test('1', async () => {
            const res = await sendCommand('84');
            expect(res).toHaveLength(1);
            expect(res[0]).toEqual(["LXXXIV"]);
        });
    });
});
