const {RESPONSES: {NO_RESULT}} = require("../constants");

const romanNumerals = {
    'i': 1,
    'v': 5,
    'x': 10,
    'l': 50,
    'c': 100,
    'd': 500,
    'm': 1000,
};
const romanNumeralsArray = Object.keys(romanNumerals);

function isRomanNumerals(text) {
    return text.split('').every(letter => romanNumeralsArray.includes(letter));
}

module.exports = function (msg) {
    const {text} = msg;
    const response = isRomanNumerals(text) ? romanToArabic(text) : arabicToRoman(text);
    if (!response) {
        return msg.addTextResponse(NO_RESULT);
    }

    msg.addTextResponse(response.toString());
}

function romanToArabic(roman) {
    let arabic = 0;
    for (let i = 0; i < roman.length; i++) {
        let current = romanNumerals[roman[i]];
        if (!current) return;

        let next = romanNumerals[roman[i + 1]];
        if (next && current < next) {
            arabic -= current;
        } else {
            arabic += current;
        }
    }

    return arabic;
}

function arabicToRoman(num) {
    const romanNumerals = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];

    let roman = '';
    for (let [value, symbol] of romanNumerals) {
        while (num >= value) {
            roman += symbol;
            num -= value;
        }
    }

    return roman;
}

module.exports.isRomanNumerals = isRomanNumerals;
