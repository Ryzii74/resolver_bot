const sendCommand = require('../utils/sendCommand');

require('../toBeEmptyResponse');

describe('sborka', () => {
    beforeAll(async () => {
        await sendCommand('/sborka');
    });

    describe('без чисел', () => {
        test('c пробелами', async () => {
            const res = await sendCommand('каждый лом отбивает подножие');
            expect(res).toHaveLength(1);
            expect(res[0]).toEqual([
                'Лесенка: кобн',
                'Арбуз: клоп',
                'Арбуз с конца: ймте',
                'Лесенка с конца: йоао',
            ]);
        });

        test('c переносами строк', async () => {
            const res = await sendCommand(`
                каждый
                лом
                отбивает
                подножие
            `);
            expect(res).toHaveLength(1);
            expect(res[0]).toEqual([
                'Лесенка: кобн',
                'Арбуз: клоп',
                'Арбуз с конца: ймте',
                'Лесенка с конца: йоао',
            ]);
        });
    });

    describe('с числами', () => {
        test('c пробелами', async () => {
            const res = await sendCommand(`
                каждый лом отбивает подножие
                4 2 3 7
            `);
            expect(res).toHaveLength(2);
            expect(res[0]).toEqual([
                'Лесенка: кобн',
                'Арбуз: клоп',
                'Арбуз с конца: ймте',
                'Лесенка с конца: йоао',
            ]);
            expect(res[1]).toEqual([
                '*С ЧИСЛАМИ*',
                'Номера построчно: доби',
                'По номеру строки арбуз: пло?',
                'По номеру строки арбуз с конца: емт?',
                'По номеру строки лесенкой: поб?',
                'По номеру строки лесенкой наоборот: еоа?',
            ]);
        });

        test('c переносами', async () => {
            const res = await sendCommand(`
                каждый
                лом
                отбивает
                подножие

                4 2 3 7
            `);
            expect(res).toHaveLength(2);
            expect(res[0]).toEqual([
                'Лесенка: кобн',
                'Арбуз: клоп',
                'Арбуз с конца: ймте',
                'Лесенка с конца: йоао',
            ]);
            expect(res[1]).toEqual([
                '*С ЧИСЛАМИ*',
                'Номера построчно: доби',
                'По номеру строки арбуз: пло?',
                'По номеру строки арбуз с конца: емт?',
                'По номеру строки лесенкой: поб?',
                'По номеру строки лесенкой наоборот: еоа?',
            ]);
        });
    });
});
