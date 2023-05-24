
const core = require('@actions/core');
const exec = require('@actions/exec');

/**
 * Builds a summary table out of json formatted results
 * @param {object} report 
 * @returns {Array[][]}
 */
const _buildTableFromJson = (report) => {
  const execFlags = global.EXECUTION_FLAGS;

  const headers = [
    { data: "ID", header: true },
    { data: "Severity", header: true },
    { data: "Line/Column", header: true },
    { data: "File", header: true },
    { data: "Details", header: true },
    { data: "Type", header: true },
    { data: "Rule ID", header: true },
    
    
  ];

  const rows = [headers];

  for (let vuln of report.analysisVulnerabilities) {
    const v = vuln.vulnerabilities;
    const newRow = [
      v.vulnerabilityID,
      v.severity,
      `${v.line}:${v.column}`,
      v.file,
      v.details,
      v.type,
      v.rule_id
    ]

    if (execFlags.includes('--enable-commit-author')) {
      rows[0].push({ data: "Commit Author", header: true });
      rows[0].push({ data: "Commit Date", header: true });
      newRow.push(v.commitEmail);
      newRow.push(v.commitDate);
    }

    rows.push(newRow);
  }

  return rows;
}

const _buildTable = (scanResults, format) => {
  switch (format) {
    case ".json":
      return _buildTableFromJson(scanResults);
    default:
      return _buildTableFromJson(scanResults);
  }
}

/**
 * Checks wether the use-summary is used.
 * @returns {boolean}
 */
const getSummaryInput = () => {
  return core.getBooleanInput('use-summary');
}

/**
 * Builds the action summary with the results of the scan
 * @param {object} - The file and format to build the summary.
 */
const buildSummary = async (content, format='json') => {
  core.debug("Building summary table");
  const table = _buildTable(content, format);
  const usedFlags = global.EXECUTION_FLAGS.filter((f) => f.startsWith('--'));
  core.summary
    .addHeading("&#128737; Horusec Results &#128737;")
    .addRaw("Execution details.")
    .addList([
        `Scan ID: ${content.id}`,
        `Horusec Version: ${content.version}`,
        `Status: ${content.status}`,
        `Errors: ${content.errors}`,
        `Flags: ${usedFlags}`
      ])
    .addRaw("List of vulnerabilities found by Horusec.")
    .addTable(table);

    core.summary.write();
}

module.exports = { getSummaryInput, buildSummary }