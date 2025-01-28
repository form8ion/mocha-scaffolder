import {test as canaryExists, remove as removeCanary} from './canary/index.js';
import {test as configExists, remove as removeConfig} from './configuration/index.js';
import {test as setupExists, remove as removeSetup} from './setup/index.js';

export default async function ({projectRoot}) {
  if (await canaryExists({projectRoot})) {
    await removeCanary({projectRoot});
  }

  if (await configExists({projectRoot})) {
    await removeConfig({projectRoot});
  }

  if (await setupExists({projectRoot})) {
    await removeSetup({projectRoot});
  }

  return {dependencies: {javascript: {remove: ['mocha', 'chai', 'sinon']}}};
}
