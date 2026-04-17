module.exports = (input, word) => {
    if (Math.abs(input.length - word.length) !== 2) return false;

    const [shorter, longer] =
        input.length < word.length ? [input, word] : [word, input];

    let i = 0;
    let j = 0;

    while (i < shorter.length && j < longer.length) {
        if (shorter[i] === longer[j]) i++;
        j++;
    }

    return i === shorter.length;
}