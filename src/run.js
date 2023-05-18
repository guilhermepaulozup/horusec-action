const core = require("@actions/core");
const exec = require("@actions/exec");
const flags = require("./flags");
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

    // execute the horusec.
    core.info("Executing Horusec...");

    try {
        await exec.exec(executable, flags);
    } catch (err) {
        core.setFailed(err.message);
    }

    core.info("Horusec finished the analysis in your code..");
};


run();
