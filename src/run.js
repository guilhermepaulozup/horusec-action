const fs = require("fs");
const core = require("@actions/core");
const exec = require("@actions/exec");

const { getFlags } = require("./flags");
const { download } = require("./download");
const { buildSummary, getSummaryInput } = require("./summary");
const ReportReader = require("./report-reader");


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

  const useSummary = getSummaryInput();
  if (useSummary) {
    execFlags.push(...["-o", "json", "-O", "horusec-report.json"]);
  }
  try {
    const output = await exec.getExecOutput(executable, execFlags);
    core.debug("Horusec execution end.");
    
    if (useSummary) {
      core.debug("Building results summary.");
      const reader = new ReportReader("horusec-report.json");
      buildSummary(reader.getContent(), "json");
    }

    if (output.exitCode === 1) {
      core.setFailed("analysis finished with blocking vulnerabilities");
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
