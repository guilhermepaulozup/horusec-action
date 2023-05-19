const process = require("process");
const { getFlags } = require("../src/flags.js");

test('should parse the flags and return an array of flag and value', () => {
    const expected = [
        "--analysis-timeout", "300",
        "--ignore", "**/ignore_path/**,**/ignore_path_2/**",
        "--enable-commit-author", "true",
    ];
    process.env["INPUT_IGNORE"] = "**/ignore_path/**,**/ignore_path_2/**";
    process.env["INPUT_ENABLE-COMMIT-AUTHOR"] = "true";
    process.env["INPUT_ANALYSIS-TIMEOUT"] = "300";
    expect(getFlags()).toStrictEqual(expected);
});
