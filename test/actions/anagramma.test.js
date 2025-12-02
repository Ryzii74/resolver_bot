const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('anagramma', () => {
    beforeAll(async () => {
        await sendCommand('/anagramma');
    });

    test('без результатов', async () => {
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
        expect(res[0]).toEqual(['мода','дома']);
    });

    test('анаграмма с ?', async () => {
        const res = await sendCommand('жз?');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['жуз']);
    });

    test('анаграмма с *', async () => {
        const res = await sendCommand('ывопрыи*зй');
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(['высокопроизводительный','сымпровизированный','допризывный']);
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
            "шест",
            "цест",
            "утес",
            "туес",
            "тест",
            "текс",
            "счет",
            "стер",
            "степ",
            "стен",
            "стем",
            "стек",
            "соте",
            "снет",
            "слет",
            "скет",
            "сите",
            "сеть",
            "сету",
            "сета",
            "септ",
            "сект",
            "свет",
            "рест",
            "пест",
            "мест",
            "лест",
            "жест",
            "есть",
            "гест",
            "вест",
            "бест",
            "сент",
            "стеб",
        ]);
    });
});
