
const core = require('@actions/core');
const exec = require('@actions/exec');

/**
 * Builds a summary table out of json formatted results
 * @param {object} report 
 * @returns {Array[][]}
 */
const _buildTableFromJson = (report) => {
  const headers = [
    { data: "ID", header: true },
    { data: "Severity", header: true },
    { data: "Line/Column", header: true },
    { data: "File", header: true },
    { data: "Details", header: true },
    { data: "Type", header: true },
    { data: "Rule ID", header: true },
    { data: "Commit Author", header: true },
    { data: "Commit Date", header: true },
  ];

  const rows = [headers];
  for (let vuln of report.analysisVulnerabilities) {
    const v = vuln.vulnerabilities;
    rows.push([
      v.vulnerabilityID,
      v.severity,
      `${v.line}:${v.column}`,
      v.file,
      v.details,
      v.type,
      v.rule_id,
      v.commitEmail,
      v.commitDate,
    ]);
  }

  return rows;
}


/**
 * Checks wether the use-summary is used.
 * @returns {boolean}
 */
const getSummaryInput = () => {
  return core.getBooleanInput('use-summary');
}

const buildTable = (scanResults, format) => {
  switch (format) {
    case ".json":
      return _buildTableFromJson(scanResults);
    default:
      return _buildTableFromJson(scanResults);
  }
}

/**
 * Builds the action summary with the results of the scan
 * @param {object} - The file and format to build the summary.
 */
const buildSummary = async (content, format='json') => {
  core.debug("Building summary table");
  const table = buildTable(content, format);

  core.summary
    .addHeading("&#128737; Horusec Results &#128737;")
    .addDetails("Execution details.",
    `- Scan ID: ${content.id};
    - Horusec Version: ${content.version};
    - Status: ${content.status};
    - Errors: ${content.errors}
    - Scan date: ${content.finishedAt};`)
    .addRaw("List of vulnerabilities found by Horusec.")
    .addTable(table)
    .write();
}



module.exports = { getSummaryInput, buildSummary }

