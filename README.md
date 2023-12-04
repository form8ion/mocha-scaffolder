# mocha-scaffolder

opinionated scaffolder for [Mocha](https://mochajs.org/)

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]
![SLSA Level 2][slsa-badge]

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
    * [Import](#import)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try @form8ion/mocha-scaffolder on RunKit][runkit-badge]][runkit-link]
![node][node-badge]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/mocha-scaffolder --save-dev
```

### Example

#### Import

```javascript
import {scaffold} from '@form8ion/mocha-scaffolder';
```

```javascript
(async () => {
  await scaffold({projectRoot: process.cwd()});
})();
```

## Contributing

<!--contribution-badges start -->

[![PRs Welcome][PRs-badge]][PRs-link]
[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![Renovate][renovate-badge]][renovate-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/mocha-scaffolder.svg

[npm-link]: https://www.npmjs.com/package/@form8ion/mocha-scaffolder

[npm-badge]: https://img.shields.io/npm/v/@form8ion/mocha-scaffolder?logo=npm

[runkit-link]: https://npm.runkit.com/@form8ion/mocha-scaffolder

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/mocha-scaffolder.svg

[github-actions-ci-link]: https://github.com/form8ion/mocha-scaffolder/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://img.shields.io/github/actions/workflow/status/form8ion/mocha-scaffolder/node-ci.yml.svg?branch=master&logo=github

[node-badge]: https://img.shields.io/node/v/@form8ion/mocha-scaffolder?logo=node.js

[coverage-link]: https://codecov.io/github/form8ion/mocha-scaffolder

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/mocha-scaffolder?logo=codecov

[slsa-badge]: https://slsa.dev/images/gh-badge-level2.svg
