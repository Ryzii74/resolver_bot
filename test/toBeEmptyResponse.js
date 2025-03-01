const { expect } = require('@jest/globals');
const {RESPONSES: {NO_RESULT}} = require("../constants");

function toBeEmptyResponse(received, expected) {
    const expectedResult = [NO_RESULT];

    if (Array.isArray(expectedResult) && received.length === 1 && received[0] === expectedResult[0]) {
        return {
            message: () =>
                `Expected: ${this.utils.printExpected(expectedResult)}\nReceived: ${this.utils.printReceived(received)}`,
            pass: true,
        };
    }
    return {
        message: () =>
            `Expected: ${this.utils.printExpected(expectedResult)}\nReceived: ${this.utils.printReceived(
                received,
            )}\n\n${this.utils.diff(expectedResult, received)}`,
        pass: false,
    };
}

expect.extend({
    toBeEmptyResponse,
});
