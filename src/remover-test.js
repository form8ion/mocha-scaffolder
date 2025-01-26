import {assert} from 'chai';

import * as td from 'testdouble';
import any from '@travi/any';

suite('mocha remover', () => {
  let remove, canaryExists, removeCanary;
  const projectRoot = any.string();

  setup(async () => {
    ({remove: removeCanary, test: canaryExists} = await td.replaceEsm('./canary/index.js'));

    ({default: remove} = (await import('./remover.js')));
  });

  teardown(() => td.reset());

  test('that mocha details are removed from the project', async () => {
    td.when(canaryExists({projectRoot})).thenResolve(true);

    const {dependencies} = await remove({projectRoot});

    td.verify(removeCanary({projectRoot}));
    assert.deepEqual(dependencies.javascript.remove, ['mocha', 'chai', 'sinon']);
  });

  test('that removing the canary test is not attempted if it does not exist', async () => {
    td.when(canaryExists({projectRoot})).thenResolve(false);

    await remove({projectRoot});

    td.verify(removeCanary({projectRoot}), {times: 0});
  });
});
