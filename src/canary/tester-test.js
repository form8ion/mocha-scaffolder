import * as td from 'testdouble';
import {assert} from 'chai';
import any from '@travi/any';

suite('canary predicate', () => {
  let canaryExists, core;
  const projectRoot = any.string();

  setup(async () => {
    core = await td.replaceEsm('@form8ion/core');

    ({default: canaryExists} = (await import('./tester.js')));
  });

  teardown(() => td.reset());

  test('that `false` is returned if the canary test does not exist', async () => {
    td.when(core.fileExists(`${projectRoot}/src/canary-test.js`)).thenResolve(false);

    assert.isFalse(await canaryExists({projectRoot}));
  });

  test('that `true` is returned if the canary test does not exist', async () => {
    td.when(core.fileExists(`${projectRoot}/src/canary-test.js`)).thenResolve(true);

    assert.isTrue(await canaryExists({projectRoot}));
  });
});
