const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('anagramma', () => {
    beforeAll(async () => {
        await sendCommand('/anagramma');
    });

    test('анаграмма без результатов', async () => {
        const res = await sendCommand('циллк');
        expect(res).toHaveLength(1);
        expect(res[0]).toBeEmptyResponse();
    });

    test('анаграмма с одним результатом', async () => {
        const res = await sendCommand('цилк');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['цикл']);
    });

    test('анаграмма с несколькими результатами (порядок стабилен)', async () => {
        const res = await sendCommand('дома');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['дома','мода']);
    });

    test('анаграмма с ?', async () => {
        const res = await sendCommand('жз?');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['жуз']);
    });

    test('анаграмма с *', async () => {
        const res = await sendCommand('ывопрыи*зй');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['высокопроизводительный','допризывный','сымпровизированный']);
    });

    test('большая сложная анаграмма', async () => {
        const res = await sendCommand('????фыарравннйши*');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['разафишированный']);
    });

    test('анаграмма слова "пресс" (не работал поиск с удвоенными буквами)', async () => {
        const res = await sendCommand('прес?');
        expect(res).toHaveLength(1);
        expect(res[0]).toContain('пресс');
    });

    test('анаграмма "тес?" (множество ответов)', async () => {
        const res = await sendCommand('тес?');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual([
            `бест`,
            `вест`,
            `гест`,
            `есть`,
            `жест`,
            `пест`,
            `свет`,
            `сент`,
            `септ`,
            `сеть`,
            `скет`,
            `слет`,
            `соте`,
            `стеб`,
            `стек`,
            `стен`,
            `степ`,
            `счет`,
            `текс`,
            `тест`,
            `туес`,
            `утес`,
            `шест`,
        ]);
    });
});
