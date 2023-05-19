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
    // TODO: Exec function isnt parsing the project path correctly in pipeline.
    const flags = [
        "--project-path", core.getInput('project-path', {required: true}),
        ...getFlags()
    ]
    core.debug("Flags: " + flags);

    // execute the horusec cli using the flags.
    core.info("Executing Horusec...");
    try {
        const code = await exec.exec(executable, ["start", ...flags]);
        core.info("Horusec finished the analysis in your code..");    
        core.ExitCode = code;
    } catch (err) {
        core.setFailed(err.message);
    }
};


run();
