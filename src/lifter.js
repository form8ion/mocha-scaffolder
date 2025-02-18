import {lift as liftCanary} from './canary/index.js';

export default async function ({projectRoot}) {
  await liftCanary({projectRoot});
}
