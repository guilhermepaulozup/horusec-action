'use strict';

const core = require('@actions/core');
const inputs = [
  "analysis-timeout",
  "log-level",
  "config-file-path",
  "certificate-path",
  "ignore-severity",
  "ignore",
  "enable-commit-author",
  "enable-git-history",
  "enable-owasp-dependency-check",
  "enable-shellcheck",
];

/**
    Get the action flags.
*/
function getFlags() {
  const flags = [
    "start",
    "-o", "json",
    "-O", "horusec.json",
    "--project-path", core.getInput('project-path', { required: true })
  ];
  // grabs all inputs based on "flags" array.
  core.debug("Reading all flags from the flags array.");
  for (let input of inputs) {
    const value = core.getInput(input);
    if (value) {
      flags.push(`--${input}`);
      flags.push(value);
    }
  }

  return flags;
}

module.exports = { getFlags };