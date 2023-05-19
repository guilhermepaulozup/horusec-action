const core = require("@actions/core");

/**
 * Checks wether the use-summary is used.
 * @returns {boolean}
 */
const getSummaryFlag = () => {
  const useSummary = core.getInput('use-summary');
  if (useSummary && useSummary === "true") {
    return true; 
  }
  return false;
}

const buildSummary = (file = 'horusec-report.json') => {
  // const report = JSON.parse(fs.readFileSync('horusec-report.json'));
  throw new Error("Not implemented yet")
}

module.exports = { getSummaryFlag, buildSummary }