const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('maskWord', () => {
    beforeAll(async () => {
        await sendCommand('/maskword');
    });

    test('без результатов', async () => {
        const res = await sendCommand('созданиеееее?');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('маска с одним результатом', async () => {
        const res = await sendCommand('создание?');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['создание']);
    });

    test('маска с несколькими результатами', async () => {
        const res = await sendCommand('со?ие');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            'соЦВЕТие',
            'соПЛОДие',
            'соГЛАСие',
            'соСАНие',
            'соЛЕНие',
            'соВАНие',
            'соБЫТие',
        ]);
    });
});
