const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');


function checkResult(res, wordsArray, severalWordsArray) {
    expect(res).toHaveLength(2);

    const [wordsHeader, ...words] = res[0];
    expect(wordsHeader).toBe('*ЦЕЛЫЕ СЛОВА*')
    expect(words).toEqual(wordsArray);

    const [severalWordsHeader, ...severalWords] = res[1];
    expect(severalWordsHeader).toBe('*НЕСКОЛЬКО СЛОВ*')
    expect(severalWords).toEqual(severalWordsArray);
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
                'Нет результатов',
            ],
            [
                'про во',
                'про ос',
            ],
        );
    });

    test('нашлись только целые слова', async () => {
        const res = await sendCommand('сдом3 баы2');
        checkResult(
            res,
            [
                'сдоба',
            ],
            [
                'Нет результатов',
            ],
        );
    });

    test('нашлись и целые слова, и несколько слов', async () => {
        const res = await sendCommand('картуз3 слом2');
        checkResult(
            res,
            [
                'карло',
            ],
            [
                'ту зло',
                'кар ом',
                'ар том',
                'туз ом',
            ],
        );
    });
});
