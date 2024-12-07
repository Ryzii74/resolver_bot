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
            combination.push(Math.floor(i / dividers[j]) % optionsArray[j]);
        }
        combinations.push(combination);
    }

    return combinations;
};

module.exports = getCombinations;
