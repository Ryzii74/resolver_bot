const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

function checkResult(res, longArray, shortArray) {
    expect(res).toHaveLength(2);
    const [longHeader, ...longRes] = res[0];
    expect(longHeader).toBe('*ДЛИННЫЕ*');
    expect(longRes).toEqual(longArray);

    const [shortHeader, ...shortRes] = res[1];
    expect(shortHeader).toEqual('*КОРОТКИЕ*');
    expect(shortRes).toEqual(shortArray);
}

describe('rebus', () => {
    beforeAll(async () => {
        await sendCommand('/rebus');
    });

    test('без результатов', async () => {
        const res = await sendCommand('цил ккк');
        checkResult(res, ['Нет результатов'], ['Нет результатов']);
    });

    test('нашлись только длинные', async () => {
        const res = await sendCommand('цит кл');
        checkResult(res, ['КЛавиЦИТериум'], ['Нет результатов']);
    });

    test('нашлись и длинные, и короткие', async () => {
        const res = await sendCommand('цик оп');
        checkResult(res, [
            'энЦИКлОПедический',
            'энЦИКлОПедичный',
            'ЦИКлОПарафины',
            'ЦИКлОПический',
            'энЦИКлОПедизм',
            'ЦИКлОПропан',
        ], ['ЦИКлОП']);
    });
});
