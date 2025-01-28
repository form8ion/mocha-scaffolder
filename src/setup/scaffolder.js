import {promises as fs} from 'node:fs';

import determinePathToTemplateFile from '../template-path.js';

export default async function ({projectRoot}) {
  await fs.mkdir(`${projectRoot}/test`);
  await fs.copyFile(determinePathToTemplateFile('mocha-setup.txt'), `${projectRoot}/test/mocha-setup.js`);
}
