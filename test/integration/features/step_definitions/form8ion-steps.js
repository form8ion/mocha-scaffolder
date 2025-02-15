import {validateOptions, optionsSchemas} from '@form8ion/core';

import assert from 'node:assert';
import {Then} from '@cucumber/cucumber';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import * as plugin from '@form8ion/mocha-scaffolder';

Then('the public interface is compatible with the plugin schema', async function () {
  validateOptions(optionsSchemas.form8ionPlugin, plugin);
});

Then('the output produced by the scaffolder is detectable by the predicate', async function () {
  assert.equal(await plugin.test({projectRoot: this.projectRoot}), true);
});
