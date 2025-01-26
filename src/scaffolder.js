import {promises as fs} from 'node:fs';
import path from 'node:path';
import filedirname from 'filedirname';

import mkdir from '../thirdparty-wrappers/make-dir.js';

import {scaffold as scaffoldConfig} from './configuration/index.js';
import {scaffold as scaffoldCanary} from './canary/index.js';

const [, __dirname] = filedirname();

export default async function ({projectRoot}) {
  const testFilenamePattern = 'src/**/*-test.js';

  await Promise.all([
    scaffoldCanary({projectRoot}),
    scaffoldConfig({projectRoot}),
    fs.copyFile(
      path.resolve(__dirname, '..', 'templates', 'mocha-setup.txt'),
      `${(await mkdir(`${projectRoot}/test`))}/mocha-setup.js`
    )
  ]);

  return {
    testFilenamePattern,
    dependencies: {javascript: {development: ['mocha', 'chai', 'sinon']}},
    scripts: {'test:unit:base': `DEBUG=any mocha '${testFilenamePattern}'`},
    eslint: {configs: ['mocha']},
    nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
  };
}
