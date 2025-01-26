import {assert} from 'chai';
import any from '@travi/any';
import * as td from 'testdouble';

suite('mocha scaffolder', () => {
  let mkdir, config, scaffoldMocha, canary, setupFile;
  const projectRoot = any.string();

  setup(async () => {
    mkdir = await td.replaceEsm('../thirdparty-wrappers/make-dir.js');
    config = await td.replaceEsm('./configuration/index.js');
    canary = await td.replaceEsm('./canary/index.js');
    setupFile = await td.replaceEsm('./setup/index.js');

    ({default: scaffoldMocha} = (await import('./scaffolder.js')));
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
    td.verify(config.scaffold({projectRoot}));
    td.verify(canary.scaffold({projectRoot}));
    td.verify(setupFile.scaffold({projectRoot}));
  });
});
