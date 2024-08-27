const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

function checkResult(res, firstHeader, firstArray, secondHeader = undefined, secondArray = []) {
    const length = Number(!!firstHeader) + Number(!!secondHeader);
    expect(res).toHaveLength(length);

    const [shortHeaderResult, ...shortRes] = res[0] || [];
    expect(shortHeaderResult).toBe(firstHeader);
    expect(shortRes).toEqual(firstArray);

    const [longHeaderResult, ...longRes] = res[1] || [];
    expect(longHeaderResult).toBe(secondHeader);
    expect(longRes).toEqual(secondArray);
}

describe('plusogramma', () => {
    beforeAll(async () => {
        await sendCommand('/plus');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        checkResult(res, '*ПОКОРОЧЕ*', ['Нет результатов'], '*ПОДЛИННЕЕ*', ['Нет результатов']);
    });

    test('нашлись только длинные', async () => {
        const res = await sendCommand('дм');
        checkResult(res, '*3*', ['дом дым мвд мгд мед мед мид']);
    });

    test('нашлись только короткие', async () => {
        const res = await sendCommand('ломбард');
        checkResult(res,'*6*', ['домбра']);
    });

    test('нашлись и короткие, и длинные', async () => {
        const res = await sendCommand('домбра');
        checkResult(res,'*5*', ['даром домра морда'], '*7*', ['ломбард']);
    });
});
