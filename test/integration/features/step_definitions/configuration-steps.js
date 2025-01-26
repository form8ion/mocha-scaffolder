import {promises as fs} from 'node:fs';
import {fileExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('a mocharc file exists', async function () {
  await fs.writeFile(`${this.projectRoot}/.mocharc.json`, JSON.stringify(any.simpleObject()));
});

Given('a setup file exists', async function () {
  await fs.mkdir(`${this.projectRoot}/test`);
  await fs.writeFile(`${this.projectRoot}/test/mocha-setup.js`, any.string());
});

Then('the testing framework is configured', async function () {
  assert.isTrue(await fileExists(`${this.projectRoot}/.mocharc.json`));
  assert.isTrue(await fileExists(`${this.projectRoot}/test/mocha-setup.js`));
});

Then('configuration files are removed', async function () {
  assert.isFalse(await fileExists(`${this.projectRoot}/.mocharc.json`));
  assert.isFalse(await fileExists(`${this.projectRoot}/test/mocha-setup.js`));
});
