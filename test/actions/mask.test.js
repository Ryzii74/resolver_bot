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
        expect(res[0]).toEqual(['дым','дом','дим','дем']);
    });

    test('маска с *', async () => {
        const res = await sendCommand('день*и');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'деньжонки',
            'деньжишки',
            'деньжищи',
            'деньги',
        ]);
    });

    test('большая сложная маска', async () => {
        const res = await sendCommand('ден?*и');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'деньжонки',
            'деньжишки',
            'деньжищи',
            'денежки',
            'деньги',
            'денди',
        ]);
    });

    test('маска с числами', async () => {
        const res = await sendCommand('к1212?');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'катать',
            'кинины',
        ]);
    });
});
