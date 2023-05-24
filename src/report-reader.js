const fs = require('fs');
const path = require('path');

class ReportReader {
  _allowedExtensions = [".json"];
  constructor(file) {
    this._content = this._readScanResults(file);
  }

  /**
   * File name to validate
   * @param {string} file 
   * @returns {boolean}
   */
  _isValidFileName(file) {
    if (!file) return false;
    if (file.includes('../') || file.includes('..\\')) {
      return false;
    }

    const rg = new RegExp(/[A-Za-z0-9-_]{0,255}.[a-zA-Z]{0,5}/gi);
    return rg.test(file);
  }

  /**
   * 
   * @param {string} ext 
   * @returns 
   */
  _isValidFileExtension(ext) {
    if (!ext) return false;
    return this._allowedExtensions.includes(ext);
  }

  _validateFileInput(file) {
    const { name, ext } = path.parse(file);

    if (!this._isValidFileName(name) || !this._isValidFileExtension(ext)) {
      throw new Error("Invalid report file input.");
    }

    return {file, ext}
  }

  _readScanResults(filePath = 'horusec-scan.json') {
    const {file, ext} = this._validateFileInput(filePath);
    const f = fs.readFileSync(file);
    
    try {
      switch (ext) {
        case '.json':
          return JSON.parse(f);
        default:
          throw new Error("Invalid not implemented file format.");
      }
    } catch (err) {
      throw new Error("Failed to read the report file.");
    }
  }

  getContent() { return this._content; }
}

module.exports = ReportReader;