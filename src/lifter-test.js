import any from '@travi/any';
import * as td from 'testdouble';
import {assert} from 'chai';

suite('lifter', () => {
  let lift, liftCanary;

  setup(async () => {
    ({lift: liftCanary} = await td.replaceEsm('./canary/index.js'));

    ({default: lift} = (await import('./lifter.js')));
  });

  teardown(() => td.reset());

  test('that the mocha details are lifted', async () => {
    const projectRoot = any.string();

    assert.deepEqual(await lift({projectRoot}), {});

    td.verify(liftCanary({projectRoot}));
  });
});
