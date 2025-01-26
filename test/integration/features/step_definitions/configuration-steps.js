import {promises as fs} from 'node:fs';
import {fileExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('a mocharc file exists', async function () {
  await fs.writeFile(`${this.projectRoot}/.mocharc.json`, JSON.stringify(any.simpleObject()));
});

Then('the testing framework is configured', async function () {
  assert.isTrue(await fileExists(`${this.projectRoot}/.mocharc.json`));
  assert.isTrue(await fileExists(`${this.projectRoot}/test/mocha-setup.js`));
});
