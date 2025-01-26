import {test as canaryExists, remove as removeCanary} from './canary/index.js';

export default async function ({projectRoot}) {
  if (await canaryExists({projectRoot})) {
    await removeCanary({projectRoot});
  }

  return {dependencies: {javascript: {remove: ['mocha', 'chai', 'sinon']}}};
}
