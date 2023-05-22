// Mocking the @actions/github library
jest.mock('@actions/github');

const { getOctokit } = require("@actions/github");

const originalPlatform = process.platform;
const originalArch = process.arch;

const { getAllReleases } = require("../src/download.js");


describe('getAllReleases', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return the data property from octokit request object.', async () => {
    const mockedResponse = {
      status: 200,
      data: { assets: [{
        name: "binary_name",
        browser_download_url: "browser_download_url"}] },
    };
  
    const mockRest = { repos: { 
      getLatestRelease: jest.fn().mockResolvedValue(mockedResponse) } };
  
    const octokit = { rest: mockRest };
    getOctokit.mockReturnValue(octokit);
  
    process.env['RUNNER_TEMP'] = "tests/assets/";
    process.env['INPUT_GITHUB-TOKEN'] = "token";
    process.env['INPUT_HORUSEC-VERSION'] = "latest";
  
    const ret = await getAllReleases("latest");
    const { name, browser_download_url } = ret.assets[0];

    expect(name).toBe(mockedResponse.data.assets[0].name);
    expect(browser_download_url).toBe(mockedResponse.data.assets[0].browser_download_url);
  });
});

describe('findRequiredBinaryUrl', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get the required binary version based on platform and architecture', () => {
    const platform = {value: "linux"};
    const arch = {value: "x86"};
    const expected = {browser_download_url: 'horusec_linux_x86_download_url'};
    // necessary to mock process lib
    Object.defineProperty(process, 'platform', { value: 'linux', writable: true});
    Object.defineProperty(process, 'arch', { value: 'x86', writable: true});
    const {findRequiredBinaryUrl} = require('../src/download.js');

    const assets = [
      {name: "horusec_not_valid_platform_not_valid_arch", browser_download_url: "wrong_url"},
      {name: "horusec_linux_x86", browser_download_url: "horusec_linux_x86_download_url"},
      {name: "horusec_not_valid_platform_not_valid_arch", browser_download_url: "wrong_url"},
    ];

    const ret = findRequiredBinaryUrl(assets);
    expect(ret).toBe(expected.browser_download_url);
  });

  it('should get the amd64 arch when process arch is x64', () => {
    const platform = {value: "linux"};
    const arch = {value: "x64"};
    const expected = {browser_download_url: 'horusec_linux_amd64_download_url'};
    // necessary to mock process lib
    Object.defineProperty(process, 'platform', platform);
    Object.defineProperty(process, 'arch', arch);
    const {findRequiredBinaryUrl} = require('../src/download.js');

    const assets = [
      {name: "horusec_linux_x86", browser_download_url: "wrong_url"},
      {name: "horusec_linux_amd64", browser_download_url: "horusec_linux_amd64_download_url"},
    ];

    const ret = findRequiredBinaryUrl(assets);
    expect(ret).toBe(expected.browser_download_url);
  });

  it('should raise an error in case the required platform_arch is not on the list', () => {
    const platform = {value: "weirdOS"};
    const arch = {value: "imaginative_architecture"};
    const expectedErrorMsg = `Failed to find binary for: ${platform.value}_${arch.value}`;
    // necessary to mock process lib
    Object.defineProperty(process, 'platform', platform);
    Object.defineProperty(process, 'arch', arch);
    const {findRequiredBinaryUrl} = require('../src/download.js');

    const assets = [
      {name: "horusec_linux_x86", browser_download_url: "wrong_url"},
      {name: "horusec_linux_amd64", browser_download_url: "horusec_linux_amd64_download_url"},
    ];
    expect(() => findRequiredBinaryUrl(assets)).toThrow(expectedErrorMsg);
  });

})

Object.defineProperty(process, 'platform', { get: () => originalPlatform });
Object.defineProperty(process, 'arch', { get: () => originalArch });