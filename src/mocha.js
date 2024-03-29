import {promises as fs} from 'node:fs';
import path from 'node:path';
import filedirname from 'filedirname';
import {fileTypes} from '@form8ion/core';
import {write} from '@form8ion/config-file';

import mkdir from '../thirdparty-wrappers/make-dir.js';

const [, __dirname] = filedirname();

export default async function ({projectRoot}) {
  const testFilenamePattern = 'src/**/*-test.js';
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
    eslint: {configs: ['mocha']},
    nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
  };
}
