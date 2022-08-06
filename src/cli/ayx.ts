#!/usr/bin/env node
import { Command } from "commander";

import serviceCredentialsCommand from "./commands/ayx-service-credentials";
// import serviceTokenCommand from "./commands/ayx-service-token";
// import agentStatusCommand from "./commands/mc-agent-status";
// import agentTokenCommand from "./commands/mc-agent-token";
// import agentAutoConfigCommand from "./commands/mc-automap";
import versionAndHelp from "./commands/ayx-version-help";
import generateExamples from "./commands/ayx-examples";
// import identityCommand from "./commands/identity";


const program = new Command();

// * generic commands

versionAndHelp(program);

// * Dummy examples
generateExamples(program)

// * setup commands
serviceCredentialsCommand(program);
// serviceTokenCommand(program);

// * identity access management commands

// identityCommand(program);


program.configureHelp({
    sortSubcommands: true
});

// program.on("command:*", function () {
//     console.error("Invalid command: %s\nSee --help for a list of available commands.", program.args.join(" "));
//     process.exit(1);
// });

program.parse(process.argv);

function displayUsage() {
    console.log('usage: ayx [options] <command>')
    console.log('');
    console.log('ayx -h, --help             all available commands and options');
    console.log('ayx examples               display ayx usage examples');
    console.log('ayx <command> -h           help on a specific command');
    console.log('');
    console.log('Access ayx files in ~/.ayx');
}

if (process.argv.length < 2) {
    displayUsage();
}

export default program;
