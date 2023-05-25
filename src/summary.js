const core = require('@actions/core');



/**
 * Builds a summary table out of json formatted results
 * @param {object} report 
 * @returns {Array[][]}
 */
const _buildTableFromJson = (report, onlyCritAndHigh) => {
  const repository = process.env['GITHUB_REPOSITORY'];
  const ref = process.env['GITHUB_REF_NAME'];
  const shouldUseCommitAuthorFlag = global.EXECUTION_FLAGS.includes('--enable-commit-author');
  const defaultHeaders = [
    "Severity",
    "File",
    "Line/Column",
    "Rule ID",
    "Details",
    "Vuln ID",
  ];
  const rows = [];

  if (shouldUseCommitAuthorFlag) {
    defaultHeaders.push("Commit Author");
    defaultHeaders.push("Commit Date");
  }


  for (let vulnObject of report.analysisVulnerabilities) {
    const vuln = vulnObject.vulnerabilities;
    const fileLink = `<a href="https://github.com/${repository}/blob/${ref}/${vuln.file}">${vuln.file}</a>`;
    if (onlyCritAndHigh) {
      const isCritOrHigh = (vuln.severity === 'CRITICAL' || vuln.severity === 'HIGH')
      if (!isCritOrHigh) continue;
    }
    const newRow = [
      vuln.severity,
      fileLink,
      `${vuln.line}:${vuln.column}`,
      vuln.rule_id,
      `<details><summary>More...</summary>${vuln.details}</details>`,
      vuln.vulnerabilityID,
    ]

    if (shouldUseCommitAuthorFlag) {
      newRow.push(vuln.commitEmail);
      newRow.push(vuln.commitDate);
    }

    rows.push(newRow);
  }

  const htmlTable = _buildTable(defaultHeaders, rows);

  return htmlTable;
}

const _buildTable = (headers, rows) => {
  let table = `<table><tr>`;

  for (const header of headers) table += `<th>${header}</th>`

  table += "</tr>"

  for (const row of rows) {
    table += "<tr>";
    for (const cell of row) table += `<td>${cell}</td>`;
    table += "</tr>";
  }

  table += "</table>";

  return table;
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
 * Builds the action summary with the results of the scan
 * @param {object} - The file and format to build the summary.
 */
const buildSummary = async (content, rowsLimit=50) => {
  core.debug("Building summary table");
  const severities = _countSeverities(content.analysisVulnerabilities);
  
  let vulnTableDetails = "List of vulnerabilities found by Horusec.";
  let onlyCritAndHigh = false;
  if (rowsLimit < content.analysisVulnerabilities.length) {
    core.debug(`Findings number is over the maximum number of rows (${rowsLimit}) will only print the CRIT and HIGH ones.`);
    onlyCritAndHigh = true;
    vulnTableDetails = `List of CRIT and HIGH vulnerabilities found by Horusec.`;
  }
  
  const vulnTable = _buildTableFromJson(content, onlyCritAndHigh);
  core.summary
    .addHeading("Horusec")
    .addRaw(`<h3>Results Summary</h3>
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
      vulnTableDetails,
      vulnTable,
    )
  await core.summary.write();
}

module.exports = { buildSummary }