const { platform, arch } = require("process");
const fs = require("fs");
const core = require('@actions/core');
const tc = require("@actions/tool-cache");
const gh = require("@actions/github");

const getRequiredVersion = ( {assets} ) => {
    const asset = assets
        .find(({ name }) => name.includes(`${platform}_${arch}`));
    if (!asset) { throw new Error(`Failed to find binary for: ${platform}_${arch}`); }
    return asset.browser_download_url;
}

/**
    Retr.
    @param {string} version The version of the binary to download.
    @returns {string} The binary download url.
*/
const getReleases = async (version = "latest") => {
    const octokit = gh.getOctokit(core.getInput('github-token'));
    const fullName = {
        owner: "ZupIT",
        repo: "horusec"
    };
    
    let data = {}
    core.debug("Version: " + version);
    if (version !== "latest") {
        const resp = await octokit.rest.repos.getReleaseByTag(
            { tag: version, ...fullName }
        );
        data = resp.data;
    } else {
        const resp = await octokit.rest.repos.getLatestRelease(fullName);
        data = resp.data;
    }
    const platform = "linux"
    const arch = "x86"
    return data;
}

/**
    Download the required horusec binary and returns it path.
*/
module.exports = async function () {
    const version = core.getInput("horusec-version");
    core.debug("Testing..");
    const data = await getReleases(version);
    const horusecUrl = getRequiredVersion(data);
    core.debug(horusecUrl);
    const horusecPath = await tc.downloadTool(horusecUrl);
    // gives binary permission to execute.
    fs.chmodSync(horusecPath, 0o755);

    return horusecPath;
}
