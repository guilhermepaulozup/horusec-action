const { readFileSync, writeFile } = require('fs');
const core = require("@actions/core");
const {buildSummary} = require("../src/summary");
const ReportReader = require("../src/report-reader");
const examples = require("./assets/summary-examples");

const TEST_SUMMARY_FILE = 'tests/assets/SUMMARY.md';

beforeAll(() => {
  process.env['GITHUB_STEP_SUMMARY'] = TEST_SUMMARY_FILE;
  process.env['SUMMARY_ENV_VAR'] = '';
  process.env['GITHUB_REPOSITORY'] = 'test-owner/test-repo';
  process.env['GITHUB_REF_NAME'] = 'test-ref'
});

beforeEach(() => {
  // reset execution flags;
  global.EXECUTION_FLAGS = [];
});

// clears tests/assets/SUMMARY.md content after each test.
afterEach(async () => {
  await clearTestSummaryContent();
});

const clearTestSummaryContent = async () => {
  await writeFile(TEST_SUMMARY_FILE, "", (err) => {
    if (err) {
      console.log("Unable to clear test summary file: " + err);
    }
  });
};

test('should build summary with commit author and commit date', async () => {
  global.EXECUTION_FLAGS.push('--enable-commit-author');
  const rr = new ReportReader('tests/assets/fake_horusec_report.json');

  await buildSummary(rr.getContent());

  const excSummary = readFileSync(TEST_SUMMARY_FILE, { encoding: 'utf-8' });
  expect(excSummary).toBe(examples.FULL_SUMMARY());
});

test('should build summary with horusec report without commit author and commit date columns', async () => {
  const rr = new ReportReader('tests/assets/fake_horusec_report.json');

  await buildSummary(rr.getContent());

  const excSummary = readFileSync(TEST_SUMMARY_FILE, { encoding: 'utf-8' });
  expect(excSummary).toBe(examples.DEFAULT_SUMMARY());
});

test('should not print low and medium severities if limit is under total number of vulns', async () => {
  global.EXECUTION_FLAGS.push('--enable-commit-author');
  const rr = new ReportReader('tests/assets/fake_horusec_report.json');

  await buildSummary(rr.getContent(), 2);

  const excSummary = readFileSync(TEST_SUMMARY_FILE, { encoding: 'utf-8' });
  expect(excSummary).toBe(examples.SEVERITY_FILTERED_SUMMARY());
});
