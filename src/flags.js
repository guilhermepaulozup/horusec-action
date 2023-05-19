'use strict';

const core = require('@actions/core');
const extraFlags = [
    "analysis-timeout",
    "certificate-path",
    "enable-commit-author",
    "enable-git-history",
    "enable-owasp-dependency-check",
    "enable-shellcheck",
    "ignore-severity",
    "ignore",
]

/**
    Get the action flags.
*/
function getFlags() {
    const flags = [];

    // grabs all inputs based on "flags" array.
    for (let input of extraFlags) {
        const value = core.getInput(input);
        core.debug(`--${input}="${value}"`);
        if (value) flags.push(`--${input}=${value}`);
    }

    return flags;
}
module.exports = getFlags;