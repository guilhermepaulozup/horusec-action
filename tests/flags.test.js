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
    console.log(flags);
    expect(flags).toStrictEqual(expected);
    expect(flags.length).toBe(19)
});

test('expected flags should be only start, project-path and return error if no flag is informed', () => {
    utils.setupActionInputsWithDefaultValues();
    const expected = ["start", "--project-path", ".", "--return-error"];
    const flags = getFlags();
    expect(flags).toStrictEqual(expected);
    expect(flags.length).toBe(4);
});