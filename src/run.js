const core = require("@actions/core");
const exec = require("@actions/exec");
const getFlags = require("./flags");
const download = require("./download");

/**
    Run function setup the required flags, horusec version and execute.
*/
async function run() {
    // grabs all action inputs.
    core.info("Getting action inputs.");
    // downloads the horusec binary.
    core.info("Downloading required Horusec binary.")
    const executable = await download();
    // adds needed project-path to the execution flag.
    const flags = [
        "--project-path", core.getInput('project-path', {required: true}),
        ...getFlags()
    ]
    // execute the horusec cli using the flags.
    try {
        const code = await exec.exec(executable, ["start", ...flags]);
        core.ExitCode = code;
    } catch (err) {
        core.setFailed(err.message);
    }
};


run();
