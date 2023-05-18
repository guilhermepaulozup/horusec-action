'use strict';

const core = require('@actions/core');
const flags = [
    "ignore",
    "project_path",
    "config_file_path",
]

module.exports = class Flags {
    constructor() {
        this.flags = []
        // grabs all inputs based on "flags" array.
        for (let flag of flags) {
            const value = core.getInput(flag);
            core.info(`${flag}="${value}`);
            if (value) this.flags.push(`--${flag}="${value}"`)
        }
    }

    toString() {
        return this.flags.join(' ');
    }
}