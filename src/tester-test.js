import {assert} from 'chai';

import any from '@travi/any';
import * as td from 'testdouble';

suite('mocha predicate', () => {
  let checkForMocha, core;
  const projectRoot = any.string();

  setup(async () => {
    core = await td.replaceEsm('@form8ion/core');

    ({default: checkForMocha} = (await import('./tester.js')));
  });

  teardown(() => td.reset());

  test('that `false` is returned if no evidence of mocha is detected', async () => {
    td.when(core.fileExists(`${projectRoot}/.mocharc.json`)).thenResolve(false);

    assert.isFalse(await checkForMocha({projectRoot}));
  });

  test('that `true` is returned if the `.mocharc.json` file is found in the project', async () => {
    td.when(core.fileExists(`${projectRoot}/.mocharc.json`)).thenResolve(true);

    assert.isTrue(await checkForMocha({projectRoot}));
  });
});
