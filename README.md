
<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
<img src="images/AYX_NODE_LOGO.svg" alt="ayx-node" width="160px"/>
</p>
<h1 align="center">Another Alteryx TypeScript SDK</h1>
<p align="center">
<a href="#getting-started">A NodeJS Library for Alteryx Server</a> - <a href="#typescript-sdk">TypeScript SDK</a> - <a href="#development-proxy"> Development Proxy</a>

<!-- markdownlint-enableMD033 -->

[![Build](https://github.com/jupiterbak/ayx-node/actions/workflows/build.yml/badge.svg)](https://github.com/jupiterbak/ayx-node/actions/workflows/build.yml) [![The MIT License](https://img.shields.io/github/license/jupiterbak/ayx-node)](./LICENSE.md)
[![npm](https://img.shields.io/npm/v/@jupiterbak/ayx-node/latest.svg?style=flat)](https://www.npmjs.com/package/@jupiterbak/ayx-node) ![downloads](https://img.shields.io/npm/dw/@jupiterbak/ayx-node.svg?colorB=009999)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/jupiterbak/ayx-node.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/jupiterbak/ayx-node/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/jupiterbak/ayx-node.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/jupiterbak/ayx-node/context:javascript)
[![GitHub release](https://img.shields.io/github/release/jupiterbak/ayx-node.svg)](https://github.com/jupiterbak/ayx-node/releases/latest)

</p>

The repository implements a typescript SDK which can be used to interact with the Alteryx Server APIs. It is compatible with linux, windows and MacOS.It supports both frontend (browser e.g. angular, react...) and backend development in node.js.

## Quick Links

| what          | where                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| documentation | coming soon                                  |
| generated api-doc       | [jupiterbak.github.io/ayx-node](https://jupiterbak.github.io/ayx-node/)                |
| npm package   | [@jupiterbak/ayx-node](https://www.npmjs.com/package/@jupiterbak/ayx-node)                                  |
| source        | [https://github.com/jupiterbak/ayx-node](https://github.com/jupiterbak/ayx-node)                |
| changelog     | [CHANGELOG.md](https://github.com/jupiterbak/ayx-node/blob/HEAD/CHANGELOG.md)                           |
| contributing  | [CONTRIBUTING.md](https://github.com/jupiterbak/ayx-node/blob/HEAD/CONTRIBUTING.md)                     |
| license  | [LICENSE.md](https://github.com/jupiterbak/ayx-node/blob/HEAD/LICENSE.md)

## Installation

The recommended way to get started using the nodejs is by using the `npm` (Node Package Manager) to install the dependency in your project.

After you've created your own project using `npm init`, you can run:

```bash
npm install @jupiterbak/ayx-node --save
# or ...
yarn add @jupiterbak/ayx-node --save
```

This will download the this library and add a dependency entry in your `package.json` file.

If you are a Typescript user, you will need the Node.js type definitions:

```sh
npm install -D @types/node
```

## Quick Start

This guide will show you how to set up a simple application using Node.js that allows you to interact with an Alteryx server. Its scope is only to list all the workflows present in your workspace.

### Create the `package.json` file

First, create a directory where your application will live.

```bash
mkdir myProject
cd myProject
```

Enter the following command and answer the questions to create the initial structure for your new project:

```bash
npm init -y
```

Next, install the this SDK as a dependency.

```bash
npm install ayx-node --save
```

### Connect to your Alteryx server

Create a new **app.js** file inside the folder **myProject** and add the following code to read all the workflows listed in your workspace:

```js
const { AlteryxSdk } = require('@jupiterbak/ayx-node');
// or as an es module:
// import { AlteryxSdk } from 'ayx-node'

// Alteryx Server REST API Connection URL
const url = 'http://localhost/webapi/';
const clientId = '8DA3C9A7E88FD2Ebe586219847b7f9b5b1bd0f8c31c3b20ca5f2a9ea54e107a173f379128b3b6b1';
const clientSecret = 'cb1d3a6287f0d86e88169963045512be40dd28771c93d404450d0279c743611a';

// Instantiate the library
const sdk = new AlteryxSdk({
    gateway: url,
    clientId: clientId,
    clientSecret: clientSecret
});

async function main() {
    // Get the workflow management client. Multiple client are supported as well
    const wClient = sdk.GetWorkflowManagementClient();

    // List all the workflows in my workspace
    const workflows = wClient.GetWorkflows();
  
    // the following code examples can be pasted here...
  
    return workflows;
  }
  
main()
.then(console.log)
.catch(console.error);

```


> **NOTE:** Please follow these intructions to read the clientId and the clientSecret of your server.
>
> Alteryx Help:  [https://help.alteryx.com/developer-help/server-api-overview](https://help.alteryx.com/developer-help/server-api-overview)

Run your app from the command line with:

```bash
node app.js
```

The application should print all the workflows of your workspace into the console.


## Running Unit Tests
In order to run unit tests, please follow these steps:

Step 1: Clone this repo.

```bash
git clone https://github.com/jupiterbak/ayx-node.git
cd ayx-node
```

Step 2: Install the dependencies.

```bash
npm install
```

Step 3: Set the environment variables: AYX_SERVER_API, AYX_SERVER_CLIENTID, and AYX_SERVER_CLIENTSECRET.

```bash
export AYX_SERVER_API="http://localhost/webapi/"

export AYX_SERVER_CLIENTID="8DA3C9A7E88FD2Ebe586219847b7f9b5b1bd0f8c31c3b20ca5f2a9ea54e107a173f379128b3b6b1"

export AYX_SERVER_CLIENTSECRET="cb1d3a6287f0d86e88169963045512be40dd28771c93d404450d0279c743611a"

```

Step 4: Start testing. Run the following

```bash
npm run test
```

After a sucessfull startup the following output should be printed.

```console

...

    ✔ 2. should list all user groups @sanity
    ✔ 3. should create new user group
    ✔ 4. should update user group
    ✔ 5. should add user to user group (52ms)
    ✔ 6. should remove user from user group (38ms)
    ✔ 7. should delete user group (42ms)

  [SDK] Workflow Management Client
    ✔ 1. should instantiate
    ✔ 2. should list all existing workflows @sanity
    ✔ 3. should list all workflows with the name 'Dummy_Workflows'
    ✔ 4. should list all workflows with full view
    ✔ 5. should list all workflows with full view
    ✔ 6. the crud operations on workflows should work (286ms)
    ✔ 7. should list all workflows within my subscription (57ms)
    ✔ 8. should list all jobs for the first workflow within my subscription (155ms)
    ✔ 9. should list all the questions for the first workflow within my subscription (174ms)
    ✔ 10. should return the original package containing the first workflow within my subscription (141ms)
    ✔ 11. should start a job with the first workflow within my subscription (201ms)


  60 passing (3s)

```

## Supported Alteryx Server APIs

| Name | AYX Server API Version  | SDK - Client |
| --- | --- | --- |
| Collection Management  |  V3 |  |
| Credential Management  |  V3 | :heavy_check_mark: |
| DCME Connection Management  |  V3 | :heavy_check_mark: |
| Schedule Management  |  V3 | :heavy_check_mark: |
| Server Connection Management  |  V3 | :heavy_check_mark: |
| Usergroup Management  |  V3 | :heavy_check_mark: |
| User Management  |  V3 | :heavy_check_mark: |
| Workflow Management  |  V3 | :heavy_check_mark: |
| Admin Management Tasks |  V2 | :heavy_check_mark: |
| Usergroup Management  |  V2 | :heavy_check_mark: |
| User Management  |  V2 | :heavy_check_mark: |
| Admin Management Tasks |  V1 | :heavy_check_mark: |
| Job Management  |  V1 | :heavy_check_mark: |
| Workflow Management  |  V1 | :heavy_check_mark: |

 

## Proxy support

Set the http_proxy or HTTP_PROXY environment variable if you need to connect via proxy.

```bash
# set http proxy environment variable if you are using e.g. fiddler on the localhost.

export HTTP_PROXY=http://localhost:8888
```

## Change Log

Change history can be found in [`CHANGELOG.md`](./CHANGELOG.md).

## Bugs / Feature Requests

If an API is missing and you would like to contribute a Client for it take a look at [CONTRIBUTING.md](./CONTRIBUTING.md).

## Legal

This project has been released under an [Open Source license](./LICENSE.md). The release may include and/or use APIs to Alteryx’ or third parties’ products or services. In no event shall the project’s Open Source license grant any rights in or to these APIs, products or services that would alter, expand, be inconsistent with, or supersede any terms of separate license agreements applicable to those APIs. “API” means application programming interfaces and their specifications and implementing code that allows other software to communicate with or call on Alteryx’ or third parties’ products or services and may be made available through Alteryx’ or third parties’ products, documentations or otherwise.