import {assert} from 'chai';

import * as td from 'testdouble';
import any from '@travi/any';

suite('mocha remover', () => {
  let remove, canaryExists, removeCanary, configExists, removeConfig;
  const projectRoot = any.string();

  setup(async () => {
    ({remove: removeCanary, test: canaryExists} = await td.replaceEsm('./canary/index.js'));
    ({remove: removeConfig, test: configExists} = await td.replaceEsm('./configuration/index.js'));

    ({default: remove} = (await import('./remover.js')));
  });

  teardown(() => td.reset());

  test('that mocha details are removed from the project', async () => {
    td.when(canaryExists({projectRoot})).thenResolve(true);
    td.when(configExists({projectRoot})).thenResolve(true);

    const {dependencies} = await remove({projectRoot});

    td.verify(removeCanary({projectRoot}));
    td.verify(removeConfig({projectRoot}));
    assert.deepEqual(dependencies.javascript.remove, ['mocha', 'chai', 'sinon']);
  });

  test('that removing the canary test is not attempted if it does not exist', async () => {
    td.when(canaryExists({projectRoot})).thenResolve(false);

    await remove({projectRoot});

    td.verify(removeCanary({projectRoot}), {times: 0});
  });

  test('that removing the config file is not attempted if it does not exist', async () => {
    td.when(configExists({projectRoot})).thenResolve(false);

    await remove({projectRoot});

    td.verify(removeConfig({projectRoot}), {times: 0});
  });
});
