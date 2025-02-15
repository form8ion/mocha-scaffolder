import {resolve} from 'path';
import filedirname from 'filedirname';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {scaffold, remove} from '@form8ion/mocha-scaffolder';

import {Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const [, __dirname] = filedirname();
const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];

Before(function () {
  this.projectRoot = process.cwd();

  stubbedFs({
    node_modules: stubbedFs.load(resolve(...([...pathToProjectRoot, 'node_modules']))),
    templates: stubbedFs.load(resolve(...([...pathToProjectRoot, 'templates'])))
  });
});

When('the project is scaffolded', async function () {
  this.results = await scaffold({projectRoot: this.projectRoot});
});

When('mocha is removed from the project', async function () {
  this.results = await remove({projectRoot: this.projectRoot});
});
