const process = require("process");
const utils = require("./utils.js");
const { getFlags } = require("../src/flags.js");

const TOTAL_FLAG_NUM = 19;

beforeEach(() => {
  utils.resetActionInputs();
})

test('should be able to parse all the input values into an array', () => {
  utils.setupActionInputsWithValues();

  const expected = utils.getMockedTestFlagsWithValues();
  
  const flags = getFlags();
  
  expect(flags).toStrictEqual(expected);
  expect(flags.length).toBe(TOTAL_FLAG_NUM)
});

test('should not parse boolean flags set to false', () => {
  utils.setupActionInputsWithValues();

  process.env['INPUT_ENABLE-SHELLCHECK'] = "false";
  const expected = utils.getMockedTestFlagsWithValues();

  const flags = getFlags();

  expect(flags).toStrictEqual(expected);
  expect(flags.length).toBe(TOTAL_FLAG_NUM - 1)
});

test('default execution should only have start and project-path', () => {
  utils.setupActionInputsWithDefaultValues();

  const expected = ["start", "--project-path", "."];

  const flags = getFlags();

  expect(flags).toStrictEqual(expected);
  expect(flags.length).toBe(3);
});
