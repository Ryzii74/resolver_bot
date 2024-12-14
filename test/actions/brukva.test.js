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
        checkResult(res, '*3*', ['шум шем чум цам хум хам уём тям том тем сум сом сим сам рям рюм рым ром пом пим нум ном ним мум мим мем лом кум ком кам илм изм зум зам жом жим дюк дэф дых дым душ дух дур дуо дун дук дуб дош доу дот дон дом дол док дож дог дно дип дин дим дик диг див дзе дёр дер дем дек дей дед два даф дар дао дан дал даг гем гам бум аям арм аам бом вам ддт для днд днк дпс дск дсо дсп дтп дэз мом мэм нам оцм рем рим сем сям там уем фшм цвм чем эвм']);
    });

    test('нашлись только короткие', async () => {
        const res = await sendCommand('джлина');
        checkResult(res,'*5*', ['юлина елина длина даина глина алина']);
    });

    test('нашлись и короткие, и длинные', async () => {
        const res = await sendCommand('долина');
        checkResult(res,'*5*', ['юлина елина донна домна долма долих долив дойна длина даина глина алина'], '*7*', ['долинка долинец доливка дождина донщина']);
    });
});
