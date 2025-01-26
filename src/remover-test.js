import {assert} from 'chai';

import remove from './remover.js';

suite('mocha remover', () => {
  test('that mocha details are removed from the project', async () => {
    const {dependencies} = await remove();

    assert.deepEqual(dependencies.javascript.remove, ['mocha', 'chai', 'sinon']);
  });
});
