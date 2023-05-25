const { readFileSync, writeFile } = require('fs');
const core = require("@actions/core");
const {buildSummary} = require("../src/summary");
const ReportReader = require("../src/report-reader");

const TEST_SUMMARY_FILE = 'tests/assets/SUMMARY.md';
const EXAMPLE_FULL_SUMMARY = readFileSync(
  'tests/assets/EXAMPLE_FULL_SUMMARY.md', { encoding: 'utf-8' });
const EXAMPLE_NO_COMMIT_DATA_SUMMARY = readFileSync(
  'tests/assets/EXAMPLE_NO_COMMIT_DATA_SUMMARY.md', { encoding: 'utf-8' });

beforeAll(() => {
  process.env['GITHUB_STEP_SUMMARY'] = TEST_SUMMARY_FILE;
  process.env['SUMMARY_ENV_VAR'] = '';
});

beforeEach(() => {
  // reset execution flags;
  global.EXECUTION_FLAGS = [];
});

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

test('should build summary with horusec report', async () => {
  global.EXECUTION_FLAGS.push('--enable-commit-author');
  const rr = new ReportReader('tests/assets/fake_horusec_report.json');

  await buildSummary(rr.getContent(), 'json');

  const excSummary = readFileSync(TEST_SUMMARY_FILE, { encoding: 'utf-8' });
  expect(excSummary).toBe(EXAMPLE_FULL_SUMMARY);
});

test('should build summary with horusec report without commit author and commit date', async () => {
  const rr = new ReportReader('tests/assets/fake_horusec_report.json');

  await buildSummary(rr.getContent(), 'json');

  const excSummary = readFileSync(TEST_SUMMARY_FILE, { encoding: 'utf-8' });
  expect(excSummary).toBe(EXAMPLE_NO_COMMIT_DATA_SUMMARY);
});
