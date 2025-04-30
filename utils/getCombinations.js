function getCombinations(optionsArray) {
    const optionsSum = optionsArray.reduce((sum, el) => sum * el, 1);

    let start = 1;
    const dividers = optionsArray
        .map(option => {
            start *= option;
            return start;
        });

    const combinations = [];
    for (let i = 0; i < optionsSum; i++) {
        const combination = [i % dividers[0]];
        for (let j = 0; j < optionsArray.length - 1; j++) {
            combination.push(Math.floor(i / dividers[j]) % optionsArray[j + 1]);
        }
        combinations.push(combination);
    }

    return combinations;
}

module.exports = getCombinations;

module.exports.getGenerations = getGenerations;
function getGenerations(array) {
    const optionsSum = array.reduce((sum, el) => sum * array.length, 1);

    let start = 1;
    const dividers = array
        .map(_ => {
            start *= array.length;
            return start;
        });

    const combinations = [];
    for (let i = 0; i < optionsSum; i++) {
        const combination = [i % dividers[0]];
        for (let j = 0; j < optionsArray.length - 1; j++) {
            combination.push(Math.floor(i / dividers[j]) % optionsArray[j + 1]);
        }
        combinations.push(combination);
    }

    return combinations;
}

