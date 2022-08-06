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

export default (program: Command) => {
    program.version(`Another Alteryx CLI (ayx) - Version: ${AYX_VERSION}`);

    // program.name("ayx");

    program.on("--help", () => {
        log(`\n  Documentation:\n`);
        log(
            `    the ${magenta(
                "magenta colored commands *"
            )} use saved client credentials`
        );
        // log(`    the ${cyan("cyan colored commands ")}require client credentials`);
        // log(`    the ${blue("blue colored commands @")} use analytical functions of Alteryx`);
        // log(`    the ${green("green colored commands #")} are used as setup and utility commands`);
        // log(`    the ${yellow("yellow colored commands &")} use borrowed alteryx application cookies`);
        log(`    the credentials should only be used in secure environments`);
        log(`    Full documentation: ${cyan("https://help.alteryx.com/")}\n`);

        checkForUpdates();
    });


    function displayUsage() {
        console.log('usage: ayx [options] <command>')
        console.log('');
        console.log('ayx -h, --help             all available commands and options');
        console.log('ayx examples               display ayx usage examples');
        console.log('ayx <command> -h           help on a specific command');
        console.log('');
        console.log('Access ayx files in ~/.ayx');
    }

    program.on("command:*", function () {
        console.error(red(`Invalid command: ${program.args.join(" ")}`));
        displayUsage();
        process.exit(1);
    });
};
