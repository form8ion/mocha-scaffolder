// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {scaffold, remove} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs({templates: stubbedFs.load('templates')});

(async () => {
  await scaffold({projectRoot: process.cwd()});

  await remove({projectRoot: process.cwd()});
})();
