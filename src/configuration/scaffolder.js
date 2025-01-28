import {write} from '@form8ion/config-file';
import {fileTypes} from '@form8ion/core';

export default async function ({projectRoot}) {
  await write({
    format: fileTypes.JSON,
    path: projectRoot,
    name: 'mocha',
    config: {ui: 'tdd', require: ['@babel/register', './test/mocha-setup.js']}
  });

  return {};
}
