const fs = require('fs');
const core = require("@actions/core");

const _validateFileInput = (file, extension) => {
  const fileTypeAllowList = ['.json'];
  const fileNameSubStr = file.substring(0,file.index('.'));

  
  const rg = new RegExp(/^[\w,\s-]+\.[A-Za-z]{3,4}$/g);
  const isValidExtension = fileTypeAllowList.includes(extension);
  const isValidFileName = rg.test(fileNameSubStr);

  if (isValidExtension && isValidFileName) {
    return `${fileNameSubStr}.${extension}`;
  }
  throw new Error("Invalid file input.")
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
  const useSummary = core.getInput('use-summary');
  return useSummary && useSummary === "true";
}

const buildSummary = ({file='horusec-scan.json', format='json'}) => {
  const report = readReport(file, format);
  
  // core.summary.addHeading("Horusec Results");
  
  throw new Error("Not implemented yet")
}

module.exports = { getSummaryInput, buildSummary }