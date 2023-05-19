'use strict';

const core = require('@actions/core');
const inputs = {
    "analysis-timeout": {
        type: "number",
        value: "",
    },
    "certificate-path": {
        type: "string",
        value: "",
    },
    "ignore-severity": {
        type: "string",
        value: "",
    },
    "ignore": {
        type: "string",
        value: "",
    },
    "enable-commit-author": {
        type: "boolean",
        value: "",
    },
    "enable-git-history": {
        type: "boolean",
        value: "",
    },
    "enable-owasp-dependency-check": {
        type: "boolean",
        value: "",
    },
    "enable-shellcheck": {
        type: "boolean",
        value: "",
    },
};

function parseInputType(input, value) {
    if (!value) return;
    if (input.type !== typeof value) {
        throw new Error(`Invalid input for ${input}: ${value}`);
    }

    if (input.type === "boolean") return Boolean(value);
    else if (input.type === "number") return Number(value);
    else return String(value);
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