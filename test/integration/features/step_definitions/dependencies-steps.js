import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('dependencies are defined', async function () {
  assert.deepEqual(this.results.dependencies.javascript.development, ['mocha', 'chai', 'sinon']);
});

Then('mocha dependencies are removed', async function () {
  assert.deepEqual(this.results.dependencies.javascript.remove, ['mocha', 'chai', 'sinon']);
});
