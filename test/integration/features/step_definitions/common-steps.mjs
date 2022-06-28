import {resolve} from 'path';
import filedirname from 'filedirname';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {scaffold} from '@form8ion/mocha-scaffolder';

import {Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const [, __dirname] = filedirname();
const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];

Before(function () {
  stubbedFs({
    node_modules: stubbedFs.load(resolve(...([...pathToProjectRoot, 'node_modules']))),
    templates: stubbedFs.load(resolve(...([...pathToProjectRoot, 'templates'])))
  });
})

When('the project is scaffolded', async function () {
  this.scaffoldRoot = process.cwd();

  await scaffold({projectRoot: this.scaffoldRoot});
});
