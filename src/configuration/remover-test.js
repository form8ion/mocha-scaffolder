import * as td from 'testdouble';
import any from '@travi/any';

suite('mocha config remover', () => {
  let remove, fs;

  setup(async () => {
    fs = await td.replaceEsm('node:fs');

    ({default: remove} = (await import('./remover.js')));
  });

  teardown(() => td.reset());

  test('that the config file is removed', async () => {
    const projectRoot = any.simpleObject();

    await remove({projectRoot});

    td.verify(fs.promises.unlink(`${projectRoot}/.mocharc.json`));
  });
});
