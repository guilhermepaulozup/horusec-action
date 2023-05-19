'use strict';

const core = require('@actions/core');
const inputs = [
    "analysis-timeout",
    "certificate-path",
    "enable-commit-author",
    "enable-git-history",
    "enable-owasp-dependency-check",
    "enable-shellcheck",
    "ignore-severity",
    "project-path",
    "ignore",
    "config-file-path"
]

/**
    Get the action flags.
*/
module.exports = function () {
    const flags = [];

    // grabs all inputs based on "flags" array.
    for (let input of inputs) {
        const value = core.getInput(input);
        core.debug(`--${input}="${value}"`);
        if (value) flags.push(`--${input}=${value}`)
    }

    return flags;
}
