const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('anagramma', () => {
    beforeAll(async () => {
        await sendCommand('/any');
    });

    test('без результатов', async () => {
        const res = await sendCommand('фывапро');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('что-то нашлось', async () => {
        const res = await sendCommand('хурма');
        expect(res).toEqual([
            ["*brukva*", "шаурма хула"],
            ["*plusogramma*", "мархур макрух храм раху муха мура муар махр арум амур ухма"],
            ["*anagramma*", "хурма"],
            ["*metagramma*", "хурда фурма турма сурма курма гурма бурма"]
        ]);
    })
});
