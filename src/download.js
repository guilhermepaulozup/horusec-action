const fs = require("fs");
const {platform, arch} = require("process");
const core = require('@actions/core');
const tc = require("@actions/tool-cache");
const https = require("https");

/**
    Parses the container OS.
*/
const getVersion = () => {
    return "horusec_linux_amd64";
}

/**
    Download the required horusec binary.
*/
module.exports = async function () {
    const version = core.getInput("horusec-version");
    const osVersion = getVersion();
    // TODO: Needs to request the Get Release.
    const url = `https://github.com/ZupIT/horusec/releases/download/v.2.8.0/${osVersion}`;

    // downloads the binary into the temp directory.
    const horusecPath = await tc.downloadTool(url);
    // gives binary permission to execute.
    fs.chmodSync(horusecPath, 0o755);
    
    return horusecPath;
}