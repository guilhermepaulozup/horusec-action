const process = require("process");
const { getFlags } = require("../src/flags.js");
const utils = require("./utils.js");

beforeEach(() => {
    utils.resetActionInputs();
})

test('should parse the flags and return an array of flag and values', () => {
    utils.setupActionInputsWithValues();
    const expected = utils.getMockedTestFlagsWithValues();
    expect(getFlags()).toStrictEqual(expected);
});

test('should not parse boolean flags set to false', () => {
    utils.setupActionInputsWithValues();
    process.env['INPUT_ENABLE-SHELLCHECK'] = "false";
    const expected = utils.getMockedTestFlagsWithValues();

    const flags = getFlags();

    expect(flags).toStrictEqual(expected);
    expect(flags.length).toBe(18)
});

test('default execution should only have start and project-path', () => {
    utils.setupActionInputsWithDefaultValues();
    const expected = ["start", "--project-path", "."];

    const flags = getFlags();
    
    expect(flags).toStrictEqual(expected);
    expect(flags.length).toBe(3);
});
