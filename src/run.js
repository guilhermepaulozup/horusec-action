const fs = require("fs");
const core = require("@actions/core");
const exec = require("@actions/exec");

const { getFlags } = require("./flags");
const { download } = require("./download");
const { buildSummary, getSummaryFlag } = require("./summary");

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
  const execFlags = getFlags();

  const useSummary = getSummaryFlag();
  if (useSummary) {
    flags.push(...["-o", "json", "-O", "horusec-report.json"]);
  }
  try {
    const code = await exec.exec(executable, execFlags);
    core.debug("Horusec execution end.");
    // TODO: Should read the useSummary flag and print the horusec report to Github Summary.
    if (useSummary) {
      buildSummary(report);
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
