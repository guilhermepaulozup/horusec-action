const core = require("@actions/core");
const exec = require("@actions/exec");
const { getFlags } = require("./flags");
const { download } = require("./download");

/**
    Run function setup the required flags, horusec version and execute.
*/
async function run() {
  // gets the horusec-version input value.
  const version = core.getInput("horusec-version");
  core.info(`INFO: Required horusec version: ${version}.`);
  // downloads the horusec binary.
  const executable = await download(version);
  // adds needed project-path to the execution flag.
  core.debug("Horusec execution start.");
  try {
    const code = await exec.exec(executable, getFlags());
    core.debug("Horusec execution end.")
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
