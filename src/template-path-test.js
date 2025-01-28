import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import any from '@travi/any';
import {assert} from 'chai';

import determinePathToTemplateFile from './template-path.js';

const __dirname = dirname(fileURLToPath(import.meta.url));          // eslint-disable-line no-underscore-dangle

suite('path to templates', () => {
  test('that the proper path to a template file is provided', async () => {
    const fileName = any.string();

    assert.equal(determinePathToTemplateFile(fileName), resolve(__dirname, '..', 'templates', fileName));
  });
});
