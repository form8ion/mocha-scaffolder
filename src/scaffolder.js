import {promises as fs} from 'node:fs';
import path from 'node:path';
import filedirname from 'filedirname';

import mkdir from '../thirdparty-wrappers/make-dir.js';

import {scaffold as scaffoldConfig} from './configuration/index.js';

const [, __dirname] = filedirname();

export default async function ({projectRoot}) {
  const testFilenamePattern = 'src/**/*-test.js';
  const [createdTestDirectory, createdSrcDirectory] = await Promise.all([
    mkdir(`${projectRoot}/test`),
    mkdir(`${projectRoot}/src`)
  ]);

  await Promise.all([
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'canary-test.txt'), `${createdSrcDirectory}/canary-test.js`),
    scaffoldConfig({projectRoot}),
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'mocha-setup.txt'), `${createdTestDirectory}/mocha-setup.js`)
  ]);

  return {
    testFilenamePattern,
    dependencies: {javascript: {development: ['mocha', 'chai', 'sinon']}},
    scripts: {'test:unit:base': `DEBUG=any mocha '${testFilenamePattern}'`},
    eslint: {configs: ['mocha']},
    nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
  };
}
