const { platform, arch } = require("process");
const fs = require("fs");
const core = require('@actions/core');
const tc = require("@actions/tool-cache");
const gh = require("@actions/github");



/* 
    Get the required 
*/
const findRequiredBinaryUrl = (data) => {
  let arq = arch;
  if (arq === "x64") arq = 'amd64'; // parses process.arch from x64 to amd64

  const asset = data.assets
    .find(({ name }) => name.includes(`${platform}_${arq}`));
  if (!asset) { throw new Error(`Failed to find binary for: ${platform}_${arq}`); }
  return asset.browser_download_url;
}

/**
    Retr.
    @param {string} version The version of the binary to download.
    @returns {string} The binary download url.
*/
const getAllReleases = async (version = "latest") => {
  core.debug("Trying to get the github-token from inputs.");
  let token = core.getInput('github-token');
  if (!token) {
    core.debug("Github token input not informed. Using environment variables.");
    token = process.env.GITHUB_TOKEN;
  }

  const octokit = gh.getOctokit(process.env.GITHUB_TOKEN);
  const fullName = { owner: "ZupIT", repo: "horusec" };
  let data = {}
  if (version === "latest") {
    core.debug(`GET /repos/${owner}/${repo}/releases/latest/`);
    const resp = await octokit.rest.repos.getLatestRelease(fullName);
    data = resp.data;
  } else {
    core.debug(`GET /repos/${owner}/${repo}/releases/tags/${version}`);
    const resp = await octokit.rest.repos.getReleaseByTag(
      { tag: version, ...fullName }
    );
    data = resp.data;
  }
  return data;
}

/**
    Download the required horusec binary and returns it path.
*/
async function download(version) {
  // retrieve the rest api repos.releases endpoint data
  core.debug("Requesting the Github REST API.");
  const data = await getAllReleases(version);
  // finds the required release for the currently runner architecture
  core.debug("Searching the correct binary for the currently runner architecture.");
  const horusecUrl = findRequiredBinaryUrl(data);
  // download the binary into the runner tmp folder (RUNNER_TEMP)
  core.debug("Binary found, downloading...");
  const horusecPath = await tc.downloadTool(horusecUrl);
  // gives binary permission to execute.
  core.debug("Giving binary execution permission.");
  fs.chmodSync(horusecPath, 0o755);
  return horusecPath;
}

module.exports = { download, getReleases: getAllReleases, getRequiredVersion: findRequiredBinaryUrl }
