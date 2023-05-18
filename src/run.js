const { spawn } = require("child_process");
const core = require("@actions/core");
const exec = require("@actions/exec");
const Flags = require("./flags");
const download = require("./download");


async function run() {
    // grabs all action inputs.
    core.info("Getting action inputs.");
    const fl = new Flags();
    core.info("Downloading required Horusec binary.")
    core.info(fl);
    const executable = await download();
    core.info("Executing Horusec...");
    try {
        await exec.exec(executable, ["start", "-p", ".", "-O", "./report.json", "-o", "json"]);
    } catch (err) {
        core.setFailed(err.message);
    }
    core.info("Horusec finished the analysis in your code..");
};


run();