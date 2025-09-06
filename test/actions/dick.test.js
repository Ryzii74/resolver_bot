const sendCommand = require('../utils/sendCommand');
const {RESPONSES: {NO_RESULT}} = require("../../constants");

require('../toBeEmptyResponse');


function checkResult(res, wordsArray, severalWordsArray) {
    expect(res).toHaveLength(2);

    const [severalWordsHeader, ...severalWords] = res[0];
    expect(severalWordsHeader).toBe('*НЕСКОЛЬКО СЛОВ*')
    expect(severalWords).toEqual(wordsArray);

    const [wordsHeader, ...words] = res[1];
    expect(wordsHeader).toBe('*ЦЕЛЫЕ СЛОВА*');
    expect(words).toEqual(severalWordsArray);
}


describe('raschlen', () => {
    beforeAll(async () => {
        await sendCommand('/dick');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро5 хвост4');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('нашлись только несколько слов', async () => {
        const res = await sendCommand('фывапро3 хвост2');
        checkResult(
            res,
            [
                "вап хв",
                "апр хв",
                "пр охв",
                "ва пво",
                "апр во",
                "пр ово",
                "ва пос",
                "а прос",
                "про ос",
                "вап ст",
                "апр ст",
                "п рост",
            ],
            [
                NO_RESULT,
            ],
        );
    });

    test('нашлись только целые слова', async () => {
        const res = await sendCommand('сдом3 баы2');
        console.log(res);
        checkResult(
            res,
            [
                'сд оба',
                'дом ба',
                'дома ы',
            ],
            [
                'сдоба',
            ],
        );
    });

    test('нашлись и целые слова, и несколько слов', async () => {
        const res = await sendCommand('картуз3 слом2');
        checkResult(
            res,
            [
                "кар сл",
                "арт сл",
                "рт усл",
                "туз сл",
                "кар ло",
                "арт ло",
                "рту ло",
                "т узло",
                "к аром",
                "а ртом",
                "рту ом",
                "туз ом",
            ],
            [
                'карло',
            ],
        );
    });
});
