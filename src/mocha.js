import {promises as fs} from 'fs';
import path from 'path';
import mkdir from '../thirdparty-wrappers/make-dir';

export default async function ({projectRoot}) {
  const eslintConfigs = ['mocha'];
  const [createdTestDirectory, createdSrcDirectory] = await Promise.all([
    mkdir(`${projectRoot}/test`),
    mkdir(`${projectRoot}/src`)
  ]);

  await Promise.all([
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'canary-test.txt'), `${createdSrcDirectory}/canary-test.js`),
    fs.writeFile(
      `${projectRoot}/.mocharc.json`,
      JSON.stringify({ui: 'tdd', require: ['@babel/register', './test/mocha-setup.js']})
    ),
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'mocha-setup.txt'), `${createdTestDirectory}/mocha-setup.js`)
  ]);

  return {
    devDependencies: ['mocha', 'chai', 'sinon'],
    scripts: {'test:unit:base': "DEBUG=any mocha 'src/**/*-test.js'"},
    eslintConfigs,
    eslint: {configs: eslintConfigs},
    nextSteps: [{summary: 'Remove the canary test for mocha once more valuable tests exist'}]
  };
}
