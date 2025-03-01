const sendCommand = require('../utils/sendCommand');
const {RESPONSES: {TOO_LONG}} = require('../../constants');

require('../toBeEmptyResponse');
const {test} = require("@jest/globals");

describe('auto', () => {
    describe('числа', () => {
        test('перевод чисел', async () => {
            const res = await sendCommand('10 3 1');
            expect(res).toHaveLength(3);
            expect(res[0]).toEqual(["EN: jca"]);
            expect(res[1]).toEqual(["RU: ива"]);
            expect(res[2]).toEqual(["TM: NeLiH"]);
        });
    });

    describe('морзе', () => {
        test('с пробелами', async () => {
            const res = await sendCommand('... --- ...');
            expect(res).toHaveLength(2);
            expect(res[0]).toEqual(["*АНГЛИЙСКИЙ*", "sos", "sos"]); // 2 "sos" потому что нашел слово
            expect(res[1]).toEqual(["*РУССКИЙ*", "сос"]);
        });

        test('с пробелами и вопросом', async () => {
            const res = await sendCommand('... -?- ...');
            expect(res).toHaveLength(2);
            expect(res[0]).toEqual(["*АНГЛИЙСКИЙ*", "s[ok]s", "sos"]);
            expect(res[1]).toEqual(["*РУССКИЙ*", "с[ок]с"]);
        });

        test('без пробелов', async () => {
            const res = await sendCommand('---....-');
            expect(res).toHaveLength(2);
            expect(res[0]).toEqual([
                "*АНГЛИЙСКИЙ*",
                "mdu",
                "mba",
                "oiu",
                "osa",
            ]);
            expect(res[1]).toEqual(["*РУССКИЙ*", "мба", "оса"]);
        });

        test('без пробелов очень длинное', async () => {
            const res = await sendCommand('---....----....----....----....----....----....-');
            expect(res).toHaveLength(2);
            expect(res[0]).toEqual(["*АНГЛИЙСКИЙ*", TOO_LONG]);
            expect(res[1]).toEqual(["*РУССКИЙ*", TOO_LONG]);
        });
    });

    describe('10', () => {
        test('последовательность', async () => {
            const res = await sendCommand('110 1010 1 11');
            expect(res).toHaveLength(10);
            expect(res[0]).toEqual(["Bacon1: glbd"]);
            expect(res[1]).toEqual(["Bacon2: ?x??"]);
            expect(res[2]).toEqual(["Bodo1: ÉGYI"]);
            expect(res[3]).toEqual(["Bodo2: RTLK"]);
            expect(res[4]).toEqual(["Bodo digits1: 1/733/"]);
            expect(res[5]).toEqual(["Bodo digits2: -2/=("]);
            expect(res[6]).toEqual(["Binary RU1: ЕИАВ"]);
            expect(res[7]).toEqual(["Binary RU2: ЧУЬЪ"]);
            expect(res[8]).toEqual(["Binary EN1: FJAC"]);
            expect(res[9]).toEqual(["Binary EN2: YU??"]);
        });
    });

    describe('римские числа', () => {
        test('DC', async () => {
            const res = await sendCommand('DC');
            expect(res).toHaveLength(1);
            expect(res[0]).toEqual(["600"]);
        });
    });
});
