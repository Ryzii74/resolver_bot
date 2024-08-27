const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('mask', () => {
    beforeAll(async () => {
        await sendCommand('/mask');
    });

    test('без результатов', async () => {
        const res = await sendCommand('циллк?');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('маска с одним результатом', async () => {
        const res = await sendCommand('цинк');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['цинк']);
    });

    test('маска с ?', async () => {
        const res = await sendCommand('д?м');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['дом','дым']);
    });

    test('маска с *', async () => {
        const res = await sendCommand('день*и');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'деньги',
            'деньжишки',
            'деньжонки',
        ]);
    });

    test('большая сложная маска', async () => {
        const res = await sendCommand('ден?*и');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'денди',
            'денежки',
            'деньги',
            'деньжишки',
            'деньжонки',
        ]);
    });
});
