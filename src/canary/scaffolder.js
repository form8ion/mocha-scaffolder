import {promises as fs} from 'node:fs';

import determinePathToTemplateFile from '../template-path.js';

export default async function ({projectRoot}) {
  await fs.mkdir(`${projectRoot}/src`);
  await fs.copyFile(determinePathToTemplateFile('canary-test.txt'), `${projectRoot}/src/canary-test.js`);
}
