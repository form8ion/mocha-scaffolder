import {promises as fsPromises} from 'fs';
import path from 'path';
import {fileTypes} from '@form8ion/core';
import * as configFile from '@form8ion/config-file';

import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

import * as mkdir from '../thirdparty-wrappers/make-dir';
import scaffoldMocha from './mocha';

suite('mocha scaffolder', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(mkdir, 'default');
    sandbox.stub(fsPromises, 'copyFile');
    sandbox.stub(configFile, 'write');
  });

  teardown(() => sandbox.restore());

  test('that mocha is scaffolded', async () => {
    const pathToCreatedTestDirectory = any.string();
    const pathToCreatedSrcDirectory = any.string();
    const testFilenamePattern = 'src/**/*-test.js';
    mkdir.default.withArgs(`${projectRoot}/src`).resolves(pathToCreatedSrcDirectory);
    mkdir.default.withArgs(`${projectRoot}/test`).resolves(pathToCreatedTestDirectory);

    assert.deepEqual(
      await scaffoldMocha({projectRoot}),
      {
        testFilenamePattern,
        devDependencies: ['mocha', 'chai', 'sinon'],
        scripts: {'test:unit:base': `DEBUG=any mocha '${testFilenamePattern}'`},
        eslint: {configs: ['mocha']},
        nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
      }
    );
    assert.calledWith(
      fsPromises.copyFile,
      path.resolve(__dirname, '..', 'templates', 'canary-test.txt'),
      `${pathToCreatedSrcDirectory}/canary-test.js`
    );
    assert.calledWith(
      configFile.write,
      {
        format: fileTypes.JSON,
        path: projectRoot,
        name: 'mocha',
        config: {ui: 'tdd', require: ['@babel/register', './test/mocha-setup.js']}
      }
    );
    assert.calledWith(
      fsPromises.copyFile,
      path.resolve(__dirname, '..', 'templates', 'mocha-setup.txt'),
      `${pathToCreatedTestDirectory}/mocha-setup.js`
    );
  });
});
