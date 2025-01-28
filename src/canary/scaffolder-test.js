import * as td from 'testdouble';
import any from '@travi/any';

suite('canary test scaffolder', () => {
  let scaffoldCanary, fs, templatePath;

  setup(async () => {
    fs = await td.replaceEsm('node:fs');
    templatePath = await td.replaceEsm('../template-path.js');

    ({default: scaffoldCanary} = (await import('./scaffolder.js')));
  });

  teardown(() => td.reset());

  test('that the canary test is created under the `src/` directory', async () => {
    const projectRoot = any.string();
    const pathToCanaryTemplate = any.string();
    td.when(templatePath.default('canary-test.txt')).thenReturn(pathToCanaryTemplate);

    await scaffoldCanary({projectRoot});

    td.verify(fs.promises.mkdir(`${projectRoot}/src`));
    td.verify(fs.promises.copyFile(pathToCanaryTemplate, `${projectRoot}/src/canary-test.js`));
  });
});
