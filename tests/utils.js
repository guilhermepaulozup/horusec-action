/**
 * Return an array of flags and values.
 * @returns 
 */
const getMockedTestFlagsWithValues = () => {
  // sets the string inputs into the array
  const flags = [
    "start",
    "--project-path", process.env["INPUT_PROJECT-PATH"],
    "--analysis-timeout", process.env["INPUT_ANALYSIS-TIMEOUT"],
    "--log-level", process.env["INPUT_LOG-LEVEL"],
    "--config-file-path", process.env["INPUT_CONFIG-FILE-PATH"],
    "--certificate-path", process.env["INPUT_CERTIFICATE-PATH"],
    "--ignore-severity", process.env["INPUT_IGNORE-SEVERITY"],
    "--ignore", process.env["INPUT_IGNORE"],
  ];
  
  // sets the bool inputs values
  const boolFlags = [
    process.env["INPUT_ENABLE-COMMIT-AUTHOR"] === "true" ? "--enable-commit-author" : null,
    process.env["INPUT_ENABLE-GIT-HISTORY"] === "true" ? "--enable-git-history" : null,
    process.env["INPUT_ENABLE-OWASP-DEPENDENCY-CHECK"] === "true" ? "--enable-owasp-dependency-check" : null,
    process.env["INPUT_ENABLE-SHELLCHECK"] === "true" ? "--enable-shellcheck" : null,
  ];

  // adds the bool flags into the flags array
  for (const f of boolFlags) if (f) flags.push(f);

  return flags;
}

/**
 * Clear env of all action inputs.
 */
const resetActionInputs = () => {
  const inputs = Object.keys(process.env);
  inputs.forEach((i) => {
    i.startsWith('INPUT_')
    delete process.env[i]
  });
}

/**
 * Sets the action inputs as env vars with the default values defined in action.yml
 */
const setupActionInputsWithDefaultValues = () => {
  process.env["INPUT_PROJECT-PATH"] = ".";
  process.env["INPUT_HORUSEC-VERSION"] = "latest";
  process.env["INPUT_USE-SUMMARY"] = "false";
  process.env["INPUT_ENABLE-COMMIT-AUTHOR"] = "false";
  process.env["INPUT_ENABLE-GIT-HISTORY"] = "false";
  process.env["INPUT_ENABLE-OWASP-DEPENDENCY-CHECK"] = "false";
  process.env["INPUT_ENABLE-SHELLCHECK"] = "false";
}

/**
 * Sets the action inputs as env vars with the mocked values
 */
const setupActionInputsWithValues = () => {
  process.env["INPUT_PROJECT-PATH"] = "/src";
  process.env["INPUT_RETURN-ERROR"] = "true"
  process.env["INPUT_GITHUB-TOKEN"] = "123456";
  process.env["INPUT_HORUSEC-VERSION"] = "v2.8.0";
  process.env["INPUT_USE-SUMMARY"] = "true";
  process.env["INPUT_ANALYSIS-TIMEOUT"] = "600";
  process.env["INPUT_LOG-LEVEL"] = "info";
  process.env["INPUT_CERTIFICATE-PATH"] = ".";
  process.env["INPUT_CONFIG-FILE-PATH"] = ".";
  process.env["INPUT_IGNORE-SEVERITY"] = "INFO";
  process.env["INPUT_IGNORE"] = "**/ignore_path/**,**/ignore_path_2/**";
  process.env["INPUT_ENABLE-COMMIT-AUTHOR"] = "true";
  process.env["INPUT_ENABLE-GIT-HISTORY"] = "true";
  process.env["INPUT_ENABLE-OWASP-DEPENDENCY-CHECK"] = "true";
  process.env["INPUT_ENABLE-SHELLCHECK"] = "true";
}

module.exports = {
  getMockedTestFlagsWithValues,
  resetActionInputs,
  setupActionInputsWithDefaultValues,
  setupActionInputsWithValues,
};