# Contributing

We welcome contributions in several forms, e.g.

* Sponsoring
* Documenting
* Testing
* Coding
* etc.

Please check for the issues in the project and look for unassigned ones or create a new one. The good issues for newcomers are marked with **good-first-issue**.

Working together in an open and welcoming environment is the foundation of our
success, so please respect our [Code of Conduct](CODE_OF_CONDUCT.md).

## Guidelines

### Workflow

We use the [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
and review all changes we merge to master.

### Automated builds, tests, security and code quality checks

The code is required to pass the automated build, all unit-tests must be green and the configured security- (snyk) and code quality (lgtm) checks
must be OK before the pull request can be merged.

### Commit Message

Commit messages shall follow the conventions defined by [conventional-changelog](https://www.conventionalcommits.org/).


### Code Style

Please follow the typescript code style which is established in tslint.json. (Works out of the box in many editors, e.g. Visual Studio Code)

## Setting up the local development environment

You will need to have administrative access to an Alteryx Server to setup the development environment.
If you don't have a local server installed, you can [register here for a trial license](https://www.alteryx.com/products/alteryx-server). (that is free as in a beer :)

### Local Development Scripts

### Developing new features and unit tests `npm run dev`

The `npm run dev` command will start the typescript transpiler and mocha unit testing in a watch mode so that you can add new features to the library.

### Developing new CLI Commands `npm run ts:watch`

Start in one shell `npm run ts:watch` to run the typescript transpiler in the watch mode. You can run the command you are developing with:

```bash
node src/cli/ayx [list of parameters...]
```

A useful shortcut is to create an alias in your shell for this:

```bash
alias layx='node src/cli/ayx'
```

Running the commands is now very similar to the installed version but instead of `ayx command [options]`
you will use `layx command [options]`, for example like this:

```bash
layx list-users
```

Don't forget to start another shell with `npm run ts:watch` which runs the typescript transpiler.

## package.json scripts

### `npm run clean`

Deletes `dist/` directory.

### `npm run clean:dist`

Deletes `dist/` directory.

### `npm run prepare`

Prepares the library for installation. It is called by `npm pack` and `npm install` commands.

The script executes following steps:

* cleans the `dist/` directory (`npm run clean`)
* transpiles the typescript code to `dist/` directory (`npm run ts:build`)

### `npm run test`

Transpiles the typescript and runs the full mocha unit test suite. (this only works on normal developer tenants)

### `npm run sanity`

Transpiles the typescript and runs the mocha unit tests marked with @sanity (this only works on normal developer tenants)

### `npm run test-dev`

Transpiles the typescript and runs the mocha unit test suite with NODE_TLS_REJECT_UNAUTHORIZED=0 so that you can inspect the HTTP traffic e.g. by using Telerik Fiddler as a proxy server.

### `npm run test-jenkins`

Called by jenkins to create test resports in CI/CD pipeline.

### `npm run ts:build`

Run the typescript transpiler.

### `npm run ts:build:dist`

Run the typescript transpiler and save results in `dist/` folder. (used by `prepare` script)

### `npm run ts:watch`

Run typescript transpiler in watch mode (used for development)

### `npm run lint`

Start typescript linter

### `npm run dev`

Local development for new features. Runs concurrently typescript transpiler in watch mode (`npm run ts:watch`) and mocha in watch mode (`npm run test:watch`)

### `npm run doc`

Generates the documentation.

### `npm run createkey`

Creates a private RSA_3072 key with help of openssl library (which must be available in your PATH)

### `npm run license`

Checks if all depenedent libraries are in a set of allowed libraries. Used by jenkins CI/CD pipeline.

### `npm run license:summary`

Prints out a license summary for the whole dependency tree.

### `npm run pkg`

Creates the binary files with the CLI for Windows, Linux and MacOS.
