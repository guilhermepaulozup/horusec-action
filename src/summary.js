
const core = require('@actions/core');
const exec = require('@actions/exec');

/**
 * Builds a summary table out of json formatted results
 * @param {object} report 
 * @returns {Array[][]}
 */
const _buildTableFromJson = (report) => {
  const execFlags = global.EXECUTION_FLAGS;

//   const headers = [
//     { data: "ID", header: true },
//     { data: "Severity", header: true },
//     { data: "Line/Column", header: true },
//     { data: "File", header: true },
//     { data: "Details", header: true },
//     { data: "Type", header: true },
//     { data: "Rule ID", header: true },
//   ];
  
  const headers = [
    "ID",
    "Severity",
    "Line/Column",
    "File",
    "Details",
    "Type",
    "Rule ID",
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
    //   rows[0].push({ data: "Commit Author", header: true });
    //   rows[0].push({ data: "Commit Date", header: true });
      headers.push("Commit Author");
      headers.push("Commit Date");
      newRow.push(v.commitEmail);
      newRow.push(v.commitDate);
    }

    rows.push(newRow);
  }

  return _buildTable(headers, rows);
}

const _buildTable = (headers, rows) => {
  let table = `<table><tr>`;
  for (const h of headers) {
    table += `<th>${h}</th>`
  }
  table += "</tr>"

  for (const r of rows) {
    table+= "<tr>";
    for (const v of r) {
      table += `<td>${v}</td>`;
    }
    table += "</tr>";
  }

  table += "</table>"
}

const _buildSummaryTable = (scanResults, format) => {
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
  const table = _buildSummaryTable(content, format);
  const usedFlags = global.EXECUTION_FLAGS.filter((f) => f.startsWith('--'));
  core.summary
    .addHeading("&#128737; Horusec Results &#128737;")
    .addDetails("Execution details.", `
      <ul>\n
        <li>Scan ID: ${content.id}</li>\n
        <li>Horusec Version: ${content.version}</li>\n
        <li>Status: ${content.status}</li>\n
        <li>Errors: ${content.errors}</li>\n
        <li>Flags: ${usedFlags}</li>\n
      </ul>\n
    `)
    .addDetails(
        "List of vulnerabilities found by Horusec.",
        _buildSummaryTable(content, format)
    )
    core.summary.write();
}

module.exports = { getSummaryInput, buildSummary }