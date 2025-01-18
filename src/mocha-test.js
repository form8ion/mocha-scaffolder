import path from 'node:path';
import filedirname from 'filedirname';
import {fileTypes} from '@form8ion/core';

import {assert} from 'chai';
import any from '@travi/any';
import * as td from 'testdouble';

const [, __dirname] = filedirname();

suite('mocha scaffolder', () => {
  let mkdir, configFile, fs, scaffoldMocha;
  const projectRoot = any.string();

  setup(async () => {
    mkdir = await td.replaceEsm('../thirdparty-wrappers/make-dir.js');
    configFile = await td.replaceEsm('@form8ion/config-file');
    fs = await td.replaceEsm('node:fs');

    ({default: scaffoldMocha} = (await import('./mocha.js')));
  });

  teardown(() => td.reset());

  test('that mocha is scaffolded', async () => {
    const pathToCreatedTestDirectory = any.string();
    const pathToCreatedSrcDirectory = any.string();
    const testFilenamePattern = 'src/**/*-test.js';
    td.when(mkdir.default(`${projectRoot}/src`)).thenResolve(pathToCreatedSrcDirectory);
    td.when(mkdir.default(`${projectRoot}/test`)).thenResolve(pathToCreatedTestDirectory);

    assert.deepEqual(
      await scaffoldMocha({projectRoot}),
      {
        testFilenamePattern,
        dependencies: {javascript: {development: ['mocha', 'chai', 'sinon']}},
        scripts: {'test:unit:base': `DEBUG=any mocha '${testFilenamePattern}'`},
        eslint: {configs: ['mocha']},
        nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
      }
    );
    td.verify(
      configFile.write({
        format: fileTypes.JSON,
        path: projectRoot,
        name: 'mocha',
        config: {ui: 'tdd', require: ['@babel/register', './test/mocha-setup.js']}
      })
    );
    td.verify(
      fs.promises.copyFile(
        path.resolve(__dirname, '..', 'templates', 'mocha-setup.txt'),
        `${pathToCreatedTestDirectory}/mocha-setup.js`
      )
    );
    td.verify(
      fs.promises.copyFile(
        path.resolve(__dirname, '..', 'templates', 'canary-test.txt'),
        `${pathToCreatedSrcDirectory}/canary-test.js`
      )
    );
  });
});
