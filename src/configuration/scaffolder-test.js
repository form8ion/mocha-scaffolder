import {fileTypes} from '@form8ion/core';

import * as td from 'testdouble';
import any from '@travi/any';
import {assert} from 'chai';

suite('configuration scaffolder', () => {
  let scaffoldConfig, configFile;

  setup(async () => {
    configFile = await td.replaceEsm('@form8ion/config-file');

    ({default: scaffoldConfig} = (await import('./scaffolder.js')));
  });

  teardown(() => td.reset());
  test('that the configuration file is created', async () => {
    const projectRoot = any.string();

    assert.deepEqual(await scaffoldConfig({projectRoot}), {});

    td.verify(
      configFile.write({
        format: fileTypes.JSON,
        path: projectRoot,
        name: 'mocha',
        config: {ui: 'tdd', require: ['@babel/register', './test/mocha-setup.js']}
      })
    );
  });
});
