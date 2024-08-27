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

describe('brukva', () => {
    beforeAll(async () => {
        await sendCommand('/brukva');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        checkResult(res, '*ПОКОРОЧЕ*', ['Нет результатов'], '*ПОДЛИННЕЕ*', ['Нет результатов']);
    });

    test('нашлись только длинные', async () => {
        const res = await sendCommand('дм');
        checkResult(res, '*3*', ['бом бум вам гам гем дан дао дар два ддт дед дей дек дер див для днд днк дно дог дож док дол дом дон дот дпс дск дсо дсп дтп дуб дуо дур дух дух душ дым дых дэз дюк жим жом зам ком кум лом мим мом мэм нам ном оцм рем рим ром рым сам сем сом сум сям там том уем фшм хам хам цам цвм чем чум шум эвм']);
    });

    test('нашлись только короткие', async () => {
        const res = await sendCommand('джлина');
        checkResult(res,'*5*', ['глина длина']);
    });

    test('нашлись и короткие, и длинные', async () => {
        const res = await sendCommand('долина');
        checkResult(res,'*5*', ['глина длина дойна долма домна донна'], '*7*', ['дождина доливка долинка донщина']);
    });
});
