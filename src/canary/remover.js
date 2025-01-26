import {promises as fs} from 'node:fs';

export default async function ({projectRoot}) {
  await fs.unlink(`${projectRoot}/src/canary-test.js`);
}
