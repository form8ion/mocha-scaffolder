import {promises as fs} from 'fs';
import path from 'path';
import {fileTypes} from '@form8ion/core';
import {write} from '@form8ion/config-file';

import mkdir from '../thirdparty-wrappers/make-dir';

export default async function ({projectRoot}) {
  const testFilenamePattern = 'src/**/*-test.js';
  const eslintConfigs = ['mocha'];
  const [createdTestDirectory, createdSrcDirectory] = await Promise.all([
    mkdir(`${projectRoot}/test`),
    mkdir(`${projectRoot}/src`)
  ]);

  await Promise.all([
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'canary-test.txt'), `${createdSrcDirectory}/canary-test.js`),
    write({
      format: fileTypes.JSON,
      path: projectRoot,
      name: 'mocha',
      config: {ui: 'tdd', require: ['@babel/register', './test/mocha-setup.js']}
    }),
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'mocha-setup.txt'), `${createdTestDirectory}/mocha-setup.js`)
  ]);

  return {
    testFilenamePattern,
    devDependencies: ['mocha', 'chai', 'sinon'],
    scripts: {'test:unit:base': `DEBUG=any mocha '${testFilenamePattern}'`},
    eslintConfigs,
    eslint: {configs: eslintConfigs},
    nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
  };
}
