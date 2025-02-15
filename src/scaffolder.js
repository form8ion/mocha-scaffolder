import {scaffold as scaffoldConfig} from './configuration/index.js';
import {scaffold as scaffoldCanary} from './canary/index.js';
import {scaffold as scaffoldSetup} from './setup/index.js';

export default async function ({projectRoot}) {
  const testFilenamePattern = 'src/**/*-test.js';

  await Promise.all([
    scaffoldCanary({projectRoot}),
    scaffoldConfig({projectRoot}),
    scaffoldSetup({projectRoot})
  ]);

  return {
    testFilenamePattern,
    dependencies: {javascript: {development: ['mocha', 'chai', 'sinon']}},
    scripts: {'test:unit:base': `DEBUG=any mocha '${testFilenamePattern}'`},
    eslint: {configs: ['mocha']},
    nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
  };
}
