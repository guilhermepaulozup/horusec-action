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
  const horusecStart = await download(version);
  // adds needed project-path to the execution flag.
  core.debug("Horusec execution start.");
  // sets global.EXECUTION_FLAGS
  global.EXECUTION_FLAGS = getFlags();

  const useSummary = getSummaryInput();
  if (useSummary) {
    global.EXECUTION_FLAGS.push(...["-o", "json", "-O", "horusec-report.json"]);
  }

  try {
    const output = await exec.getExecOutput(horusecStart, global.EXECUTION_FLAGS);
    core.debug("Horusec execution end.");
    
    if (useSummary) {
      core.debug("Building results summary.");
      const reader = new ReportReader("horusec-report.json");
      buildSummary(reader.getContent(), "json");
    }
    const returnError = core.getBooleanInput('return-error');
    if (returnError) {
      if (!output.stdout.includes("YOUR ANALYSIS HAD FINISHED WITHOUT ANY VULNERABILITY!")) {
        core.setFailed("analysis finished with blocking vulnerabilities");
      }
    }

  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
