import * as td from 'testdouble';
import any from '@travi/any';

suite('mocha setup remover', () => {
  let remove, fs;

  setup(async () => {
    fs = await td.replaceEsm('node:fs');

    ({default: remove} = (await import('./remover.js')));
  });

  teardown(() => td.reset());

  test('that the canary test is removed', async () => {
    const projectRoot = any.simpleObject();

    await remove({projectRoot});

    td.verify(fs.promises.unlink(`${projectRoot}/test/mocha-setup.js`));
  });
});
