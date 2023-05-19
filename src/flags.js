'use strict';

const core = require('@actions/core');
const inputs = [
    "analysis-timeout",
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
    const flags = [];

    // grabs all inputs based on "flags" array.
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