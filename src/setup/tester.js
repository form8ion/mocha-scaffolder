import {fileExists} from '@form8ion/core';

export default function ({projectRoot}) {
  return fileExists(`${projectRoot}/test/mocha-setup.js`);
}
