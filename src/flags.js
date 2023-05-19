'use strict';

const core = require('@actions/core');
const inputs = {
    "analysis-timeout": {
        type: "number",
    },
    "config-file-path": {
        type: "string",
    },
    "certificate-path": {
        type: "string",
    },
    "ignore-severity": {
        type: "string",
    },
    "ignore": {
        type: "string",
    },
    "enable-commit-author": {
        type: "boolean",
    },
    "enable-git-history": {
        type: "boolean",
    },
    "enable-owasp-dependency-check": {
        type: "boolean",
    },
    "enable-shellcheck": {
        type: "boolean",
    },
};

function parseInputType(input, value) {
    if (!value) return;
    try {
        if (input.type === "boolean") return Boolean(value);
        else if (input.type === "number") return Number(value);
        else return String(value);
    } catch (err) {
        core.error(err);
        throw new Error(`Invalid value for ${input}: ${value}`);
    }
}

/**
    Get the action flags.
*/
function getFlags() {
    const flags = [];

    // grabs all inputs based on "flags" array.
    for (let input of Object.keys(inputs)) {
        const value = parseInputType(input, core.getInput(input));
        if (value) {
            flags.push(`--${input}`);
            flags.push(value);
        }
    }

    return flags;
}
module.exports = getFlags;