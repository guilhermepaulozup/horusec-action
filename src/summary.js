
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
    const fileLink = `<a href="https://github.com/${['GITHUB_REPOSITORY']}/blob/${process.env['GITHUB_REF_NAME']}/${v.file}">${v.file}</a>`; 
    const newRow = [
      v.vulnerabilityID,
      v.severity,
      `${v.line}:${v.column}`,
      fileLink,
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
  return table;
}

const _buildSummaryTable = (scanResults, format) => {
  switch (format) {
    case ".json":
      return _buildTableFromJson(scanResults);
    default:
      return _buildTableFromJson(scanResults);
  }
}

const _countSeverities = (vulns) => {
  const sev = {
    CRITICAL: 0,
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
    INFO: 0,
    UNKNOWN: 0,
  };
  const severities = Object.keys(sev);
  for (const vuln of vulns) {
    const v = vuln.vulnerabilities;
    if (severities.includes(v.severity)) {
      sev[v.severity] += 1;
    } else {
      sev.UNKNOWN++;
    }
  }
  return sev;
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
  const severities = _countSeverities(content.analysisVulnerabilities);
  core.summary
    .addHeading("&#128737; Horusec Results &#128737;")
    .addRaw(`<h3>Summary results</h3>
    <span title="Critical" style="color:red">C</span>: ${severities.CRITICAL}
    <span title="High" style="color:orange">H</span>: ${severities.HIGH} 
    <span title="Medium" style="color:yellow">M</span>: ${severities.MEDIUM} 
    <span title="Low" style="color:green">L</span>: ${severities.LOW} 
    <span title="Info" style="color:blue">I</span>: ${severities.INFO} 
    <span title="Unknown" style="color:red">U</span>: ${severities.UNKNOWN}`)
    .addBreak()
    .addDetails("Execution details.",
`<ul><li><strong>Scan ID</strong>: ${content.id}</li>
<li><strong>Horusec Version</strong>: ${content.version}</li>
<li><strong>Status</strong>: ${content.status}</li>
<li><strong>Errors</strong>: ${content.errors}</li></ul>`)
    .addBreak()
    .addDetails(
        "List of vulnerabilities found by Horusec.",
        _buildSummaryTable(content, format)
    )
    await core.summary.write();
}

module.exports = { getSummaryInput, buildSummary }