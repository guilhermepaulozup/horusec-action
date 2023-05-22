'use strict';

const core = require('@actions/core');
const inputs = {
  string: [
    "analysis-timeout",
    "log-level",
    "config-file-path",
    "certificate-path",
    "ignore-severity",
    "ignore",
  ],
  boolean: [
    "enable-commit-author",
    "enable-git-history",
    "enable-owasp-dependency-check",
    "enable-shellcheck",
  ]
};


/**
    Get the action flags.
*/
function getFlags() {
  const flags = [
    "start",
    "--project-path", core.getInput('project-path', { required: true }),
    "--return-error",
  ];

  // grabs all inputs based on "flags" array.
  core.debug("Reading string flags.");
  for (let input of inputs.string) {
    const value = core.getInput(input);
    if (value) {
      flags.push(`--${input}`);
      flags.push(value);
    }
  }
  core.debug("Reading boolean flags.");
  for (let input of inputs.boolean) {
    const value = core.getBooleanInput(input);
    if (value) {
      flags.push(`--${input}`)
    }
  }

  core.debug("Active flags:\n" + flags.slice(1));
  return flags;
}

module.exports = { getFlags };