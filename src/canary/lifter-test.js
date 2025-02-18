import * as td from 'testdouble';
import any from '@travi/any';

suite('canary lifter', () => {
  let lift, removeCanary, canaryExists, glob;

  setup(async () => {
    ({glob} = await td.replaceEsm('tinyglobby'));
    ({default: removeCanary} = await td.replaceEsm('./remover.js'));
    ({default: canaryExists} = await td.replaceEsm('./tester.js'));

    ({default: lift} = (await import('./lifter.js')));
  });

  teardown(() => td.reset());

  test('that the canary file is removed when other test files exist', async () => {
    const projectRoot = any.string();
    td.when(canaryExists({projectRoot})).thenResolve(true);
    td.when(glob(['src/**/*-test.js', '!src/canary-test.js'], {cwd: projectRoot})).thenResolve(['other-test.js']);

    await lift({projectRoot});

    td.verify(removeCanary({projectRoot}));
  });

  test(
    'that removing the canary file is not attempted when other test files exist but the canary is already removed',
    async () => {
      const projectRoot = any.string();
      td.when(canaryExists({projectRoot})).thenResolve(false);

      await lift({projectRoot});

      td.verify(removeCanary({projectRoot}), {times: 0});
    }
  );

  test('that the removing the canary file is not attempted when other test files do not exist', async () => {
    const projectRoot = any.string();
    td.when(canaryExists({projectRoot})).thenResolve(true);
    td.when(glob(['src/**/*-test.js', '!src/canary-test.js'], {cwd: projectRoot})).thenResolve([]);

    await lift({projectRoot});

    td.verify(removeCanary({projectRoot}), {times: 0});
  });
});
