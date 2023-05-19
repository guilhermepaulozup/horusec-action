const { getOctokit } = require("@actions/github");
const { download, getReleases, getRequiredVersion } = require("../src/download.js");

// Mocking the @actions/github library
jest.mock('@actions/github', () => ({
  getOctokit: jest.fn()
}));
test('should return the data property from octokit request object.', async () => {
  const mockedResponse = {
    data: {
      assets: [{
        name: "binary_name",
        browser_download_url: "browser_download_url"
      }]
    }
  };

  const mockRest = {
    repos: { getLatestRelease: jest.fn().mockResolvedValue(mockedResponse) }
  };

  const octokit = { rest: mockRest };
  getOctokit.mockReturnValue(octokit);

  process.env['RUNNER_TEMP'] = "tests/assets/";
  process.env['INPUT_GITHUB-TOKEN'] = "token";
  process.env['INPUT_HORUSEC-VERSION'] = "latest";

  const ret = await getReleases("latest");
  const { name, browser_download_url } = ret.assets[0];
  expect(name).toBe(mockedResponse.data.assets[0].name);
  expect(browser_download_url).toBe(mockedResponse.data.assets[0].browser_download_url);
});
