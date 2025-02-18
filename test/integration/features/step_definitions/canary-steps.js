import {promises as fs} from 'node:fs';
import {fileExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('the canary test still exists', async function () {
  await fs.mkdir(`${this.projectRoot}/src`, {recursive: true});
  await fs.writeFile(`${this.projectRoot}/src/canary-test.js`, any.string());
});

Then('a canary test exists to ensure the framework configuration works', async function () {
  assert.isTrue(await fileExists(`${this.projectRoot}/src/canary-test.js`));
});

Then('the canary test is removed', async function () {
  assert.isFalse(await fileExists(`${this.projectRoot}/src/canary-test.js`));
});

Then('the canary test is not removed', async function () {
  assert.isTrue(await fileExists(`${this.projectRoot}/src/canary-test.js`));
});
