import {promises as fs} from 'node:fs';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

const expectedTestFilenamePattern = 'src/**/*-test.js';

Given('other mocha tests exist', async function () {
  await fs.mkdir(`${this.projectRoot}/src`, {recursive: true});
  await Promise.all([
    fs.writeFile(`${this.projectRoot}/src/foo-test.js`, any.string()),
    fs.writeFile(`${this.projectRoot}/src/bar-test.js`, any.string())
  ]);
});

Then('the filename pattern is reported', async function () {
  assert.equal(this.results.testFilenamePattern, expectedTestFilenamePattern);
});
