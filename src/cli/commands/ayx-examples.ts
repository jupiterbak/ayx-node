import { Command } from "commander";
import { log } from "console";
import { AYX_VERSION } from "../../version";
import { checkForUpdates, getColor } from "./command-utils";

const magenta = getColor("magenta");
const cyan = getColor("cyan");
const green = getColor("green");
const red = getColor("red");
const blue = getColor("blue");
const yellow = getColor("yellow");
const grey = getColor("grey")

export default (program: Command) => {
    program.command('examples')
    .description('display ayx usage examples')
    .action(() => {
        console.log(cyan('ayx usage examples:\n'));
        displayExamples();
        process.exit(0);
    })

    function displayExamples() {
        console.log('- Start by adding your credentials list:')
        console.log('');
        console.log(cyan('  $ ayx sc add -g sc add -g "http://localhost/webapi/" -k <privateKey> -u <clienId> -s <clientSecret>'));
        console.log('');
        console.log('- List all saved credentials:');
        console.log('');
        console.log(cyan('  $ ayx sc list'));
        console.log('');
        console.log('- Select default credentials to use:');
        console.log('');
        console.log(cyan('  $ ayx sc select -i <credIndex>'));
        console.log('');
        console.log('Check the full documentation on https://help.alteryx.com/');
        console.log('');
    }
};
