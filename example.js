import {scaffold} from './lib/index.cjs';

(async () => {
  await scaffold({projectRoot: process.cwd()});
})();
