const fs = require("fs");
const {platform, arch} = require("process");
const core = require('@actions/core');
const tc = require("@actions/tool-cache");

module.exports = async function () {
    const version = core.getInput("horusec-version");
    // const version = "v2.8.0"
    const url = `https://github.com/ZupIT/horusec/releases/download/${version}/horusec_linux_amd64`;
    const horusecPath = await tc.downloadTool(url);
    fs.chmodSync(horusecPath, 0o755);
    return horusecPath;
}