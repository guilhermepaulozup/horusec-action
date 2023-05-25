
const getMockedTestFlagsWithValues = () => {
  const flags = [
    "start",
    "--project-path", process.env["INPUT_PROJECT-PATH"],
    // "--return-error",
    "--analysis-timeout", process.env["INPUT_ANALYSIS-TIMEOUT"],
    "--log-level", process.env["INPUT_LOG-LEVEL"],
    "--config-file-path", process.env["INPUT_CONFIG-FILE-PATH"],
    "--certificate-path", process.env["INPUT_CERTIFICATE-PATH"],
    "--ignore-severity", process.env["INPUT_IGNORE-SEVERITY"],
    "--ignore", process.env["INPUT_IGNORE"],
  ];

  const boolFlags = [
    process.env["INPUT_ENABLE-COMMIT-AUTHOR"] === "true" ? "--enable-commit-author" : null,
    process.env["INPUT_ENABLE-GIT-HISTORY"] === "true" ? "--enable-git-history" : null,
    process.env["INPUT_ENABLE-OWASP-DEPENDENCY-CHECK"] === "true" ? "--enable-owasp-dependency-check" : null,
    process.env["INPUT_ENABLE-SHELLCHECK"] === "true" ? "--enable-shellcheck" : null,
  ];

  for (const f of boolFlags) if (f) flags.push(f);
  return flags;
}

const resetActionInputs = () => {
  delete process.env["INPUT_PROJECT-PATH"]
  delete process.env["INPUT_GITHUB-TOKEN"]
  delete process.env["INPUT_HORUSEC-VERSION"]
  delete process.env["INPUT_USE-SUMMARY"]
  delete process.env["INPUT_ANALYSIS-TIMEOUT"]
  delete process.env["INPUT_LOG-LEVEL"]
  delete process.env["INPUT_CERTIFICATE-PATH"]
  delete process.env["INPUT_CONFIG-FILE-PATH"]
  delete process.env["INPUT_IGNORE-SEVERITY"]
  delete process.env["INPUT_IGNORE"]
  delete process.env["INPUT_ENABLE-COMMIT-AUTHOR"]
  delete process.env["INPUT_ENABLE-GIT-HISTORY"]
  delete process.env["INPUT_ENABLE-OWASP-DEPENDENCY-CHECK"]
  delete process.env["INPUT_ENABLE-SHELLCHECK"]
}

const setupActionInputsWithDefaultValues = () => {
  process.env["INPUT_PROJECT-PATH"] = ".";
  process.env["INPUT_HORUSEC-VERSION"] = "latest";
  process.env["INPUT_USE-SUMMARY"] = "false";
  process.env["INPUT_ENABLE-COMMIT-AUTHOR"] = "false";
  process.env["INPUT_ENABLE-GIT-HISTORY"] = "false";
  process.env["INPUT_ENABLE-OWASP-DEPENDENCY-CHECK"] = "false";
  process.env["INPUT_ENABLE-SHELLCHECK"] = "false";
}

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

const deleteStringInputsWithNoDefaultValueFromEnv = () => {
  delete process.env["INPUT_GITHUB-TOKEN"];
  delete process.env["INPUT_HORUSEC-VERSION"];
  delete process.env["INPUT_ANALYSIS-TIMEOUT"];
  delete process.env["INPUT_LOG-LEVEL"];
  delete process.env["INPUT_CERTIFICATE-PATH"];
  delete process.env["INPUT_CONFIG-FILE-PATH"];
  delete process.env["INPUT_IGNORE-SEVERITY"];
  delete process.env["INPUT_IGNORE"];
}

module.exports = {
  getMockedTestFlagsWithValues,
  resetActionInputs,
  setupActionInputsWithDefaultValues,
  setupActionInputsWithValues,
  deleteStringInputsWithNoDefaultValueFromEnv,
};