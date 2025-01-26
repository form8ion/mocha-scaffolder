import {Then} from '@cucumber/cucumber';
import {fileExists} from '@form8ion/core';

import {assert} from 'chai';

Then('the testing framework is configured', async function () {
  assert.isTrue(await fileExists(`${this.projectRoot}/.mocharc.json`));
  assert.isTrue(await fileExists(`${this.projectRoot}/test/mocha-setup.js`));
});

Then('a canary test exists to ensure the framework configuration works', async function () {
  assert.isTrue(await fileExists(`${this.projectRoot}/src/canary-test.js`));
});
