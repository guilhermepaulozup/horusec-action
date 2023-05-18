const { platform, arch } = require("process");
const fs = require("fs");
const core = require('@actions/core');
const tc = require("@actions/tool-cache");
const gh = require("@actions/github");

/**
    Parses the container OS.
    @param {string} version The version of the binary to download.
    @returns {string} The binary download url.
*/
const getVersion = async (version = "latest") => {
    const octokit = gh.getOctokit(core.getInput('github-token'));

    const { data } = await octokit.rest.repos.getReleaseByTag(
        { owner: "ZupIT", repo: "horusec", tag: version }
    );

    const asset = data
        .assets
        .find(({ name }) => name.includes(`${platform}_${arch}`));
    if (!asset) { throw new Error(`Failed to find binary for: ${platform}_${arch}`); }

    return asset.browser_download_url;
}

/**
    Download the required horusec binary and returns it path.
*/
module.exports = async function () {
    const version = core.getInput("horusec-version");
    core.info("Testing..");
    const horusecUrl = getVersion(version);
    const horusecPath = await tc.downloadTool(horusecUrl);
    // gives binary permission to execute.
    fs.chmodSync(horusecPath, 0o755);

    return horusecPath;
}
