const fs = require('fs');
const core = require("@actions/core");

const _validateFileInput = (file, extension) => {
  return file;
  const fileTypeAllowList = ['.json'];
  const fileNameSubStr = file.substring(0,file.indexOf('.'));

  
  const rg = new RegExp(/^[\w,\s-]+\.[A-Za-z]{3,4}$/g);
  const isValidExtension = fileTypeAllowList.includes(extension);
  const isValidFileName = rg.test(fileNameSubStr);

  if (!(isValidExtension && isValidFileName)) {
    throw new Error("Invalid file input.");
  }
  return `${fileNameSubStr}.${extension}`;
}

const readReport = (file='horusec-scan.json', format='json') => {
  const validFile = _validateFileInput(file, format);
  const f = fs.readFileSync(validFile);
  try {
    switch(format) {
      case 'json':
        return JSON.parse(f);
      default:
        throw new Error("Invalid not implemented file format.");
    }
  } catch(err) {
    throw new Error("Failed to read the report file.");
  }
}

/**
 * Checks wether the use-summary is used.
 * @returns {boolean}
 */
const getSummaryInput = () => {
  return core.getBooleanInput('use-summary');
}

const buildTable = (file, format) => {
  switch (format) {
    case "json":
      return _buildTableFromJson(file);
    default:
      return _buildTableFromJson(file);
  }
}

const _buildTableFromJson = (report) => {
  const headers = [
    {data: "ID", header: true},
    {data: "Severity", header: true},
    {data: "Line/Column", header: true},
    {data: "File", header: true},
    {data: "Details", header: true},
    {data: "Type", header: true},
    {data: "Rule ID", header: true},
    {data: "Commit Author", header: true},
    {data: "Commit Date", header: true},
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
 * Builds the action summary with the results of the scan
 * @param {*} param0 
 */
const buildSummary = ({file='horusec-scan.json', format='json'}) => {
  core.debug(`Reading file: ${file}`);
  const report = readReport(file, format);
  core.debug(Object.keys(report));
  core.debug("Building summary table");
  const table = buildTable(file, format);

  core.summary
      .addHeading("Horusec Results")
      .addBreak()
      .addDetails(`
      List of vulnerabilities found by horusec in the current directory.
        - Scan ID: ${report.id};
        - Horusec Version: ${report.version};
        - Status: ${report.status};
        - Scan date: ${report.finishedAt};
      `)
      .addTable(table)
      .write();
}



module.exports = { getSummaryInput, buildSummary }
