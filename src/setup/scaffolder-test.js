import * as td from 'testdouble';
import any from '@travi/any';

suite('setup file scaffolder', () => {
  let scaffoldCanary, fs, templatePath;

  setup(async () => {
    fs = await td.replaceEsm('node:fs');
    templatePath = await td.replaceEsm('../template-path.js');

    ({default: scaffoldCanary} = (await import('./scaffolder.js')));
  });

  teardown(() => td.reset());

  test('that the setup file is created under the `test/` directory', async () => {
    const projectRoot = any.string();
    const pathToSetupTemplate = any.string();
    td.when(templatePath.default('mocha-setup.txt')).thenReturn(pathToSetupTemplate);

    await scaffoldCanary({projectRoot});

    td.verify(fs.promises.mkdir(`${projectRoot}/test`));
    td.verify(fs.promises.copyFile(pathToSetupTemplate, `${projectRoot}/test/mocha-setup.js`));
  });
});
