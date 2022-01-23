// #### Import
// remark-usage-ignore-next 2
import {resolve} from 'path';
import stubbedFs from 'mock-fs';
import {scaffold} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs({templates: stubbedFs.load(resolve(...[__dirname, 'templates']))});

(async () => {
  await scaffold({projectRoot: process.cwd()});
})();
