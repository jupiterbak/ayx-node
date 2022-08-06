import { Command } from "commander";
import { log } from "console";
import { format } from 'date-fns'
import {
    decrypt,
    addAndStoreConfiguration,
    checkList,
    credentialEntry,
    getFullConfig,
    storeAuth,
    truncate,
    throwError,
} from "../../api/utils";
import { errorLog, getColor, homeDirLog, proxyLog, serviceCredentialLog, verboseLog } from "./command-utils";

const color = getColor("magenta");
export default (program: Command) => {

    const sc =  program
    .command("service-credentials")
    .alias("sc")
    .description(color("Manage your stored client credentials needed by your alteryx servers"))
    .on("--help", () => {
        log(`\n  Example:\n`);
        
        log(`    ayx service-credentials list  \t\t\t list all configured credentials`);
        log(
            `    ayx service-credentials select --index <index> \t select credentials with index <index> from the list`
        );

        log(`    ayx service-credentials add --gateway http://xxx ...  add new service credentials`);
        serviceCredentialLog();
    });

    sc.command("list")
        .description(color("list all saved client credentials needed by the rest api of the alteryx server *"))
        .action((options) => {
            (async () => {
                try {
                    homeDirLog(options.verbose, color);
                    proxyLog(options.verbose, color);
                    listEntries(options);
                } catch (err) {
                    errorLog(err, options.verbose);
                }
            })();
        })
        .on("--help", () => {
            log(`\n  Example:\n`);
            
            log(`    ayx service-credentials list  \t\t\t list all configured credentials`);
        });
    
    sc.command("select")
        .option("-i, --index <index>", "select credentials with specified index")
        .description(color("set the saved client credentials to use"))
        .on("--help", () => {
            log(`\n  Example:\n`);
            log(
                `    ayx service-credentials select --index <index> \t select credentials with index <index> from the list`
            );
        })
        .action((options) => {
            (async () => {
                try {
                    homeDirLog(options.verbose, color);
                    proxyLog(options.verbose, color);
                    checkSelectRequiredParamaters(options);
                    selectEntry(options);
                } catch (err) {
                    errorLog(err, options.verbose);
                }
            })();
        });

        sc.command("view")
        .option("-i, --index <index>", "select credentials with specified index")
        .option(
            "-k, --passkey <passkey>",
            "passkey (you will use this in the commands that require service credentials)"
        )
        .option("-v, --verbose", "verbose output")
        .description(color("view stored client/service credentials."))
        .on("--help", () => {
            log(`\n  Example:\n`);
            log(
                `    ayx service-credentials view --index <index> --passkey XXXX \t select credentials with index <index> from the list`
            );
        })
        .action((options) => {
            (async () => {
                try {
                    homeDirLog(options.verbose, color);
                    proxyLog(options.verbose, color);
                    checkViewRequiredParamaters(options);
                    viewEntry(options);
                } catch (err) {
                    errorLog(err, options.verbose);
                }
            })();
        });

    sc.command("add")
        .option("-u, --clientid <clientid>", "credentials: clientid")
        .option("-s, --clientsecret <clientsecret>", "credendials: clientsecret")
        .option(
            "-g, --gateway <gateway>",
            "full alteryx server gateway url (e.g. https://localhost:8080)"
        )
        .option(
            "-k, --passkey <passkey>",
            "passkey (you will use this in the commands that require service credentials)"
        )
        .option("-c, --comments <comments>", "a short description")
        .option("-v, --verbose", "verbose output")
        .description(color("provide client credentials needed by the rest api of the alteryx server *"))
        .on("--help", () => {
            log(`\n  Example:\n`);
            log(`    ayx service-credentials add --gateway http://xxx ...  add new service credentials`);
            serviceCredentialLog();
        })
        .action((options) => {
            (async () => {
                try {
                    homeDirLog(options.verbose, color);
                    proxyLog(options.verbose, color);
                    checkAddRequiredParamaters(options);
                    addEntry(options);
                } catch (err) {
                    errorLog(err, options.verbose);
                }
            })();
        });

    // program
    //     .command("service-credentials")
    //     .alias("sc")
    //     .option("-m, --mode [list|select|add]", "list | select | add", "list")
    //     .option("-i, --index <index>", "select credentials with specified index")
    //     .option("-u, --clientid <clientid>", "credentials: clientid")
    //     .option("-s, --clientsecret <clientsecret>", "credendials: clientsecret")
    //     .option(
    //         "-g, --gateway <gateway>",
    //         "full alteryx server gateway url (e.g. https://localhost:8080)"
    //     )
    //     .option("-t, --tenant <tenant>", "your tenant name")
    //     .option("-a, --appName <appName>", "your application name (e.g. cli)")
    //     .option("-p, --appVersion <appVersion>", "your application version (e.g. 1.0.0)")
    //     .option(
    //         "-k, --passkey <passkey>",
    //         "passkey (you will use this in the commands which require service credentials)"
    //     )
    //     .option("-c, --comments <comments>", "a short description")
    //     .option("-v, --verbose", "verbose output")
    //     .description(color("provide client credentials needed by the rest api of the alteryx server *"))
    //     .action((options) => {
    //         (async () => {
    //             try {
    //                 homeDirLog(options.verbose, color);
    //                 proxyLog(options.verbose, color);
    //                 checkRequiredParamaters(options);
    //                 options.mode === "list" && listEntries(options);
    //                 options.mode === "select" && selectEntry(options);
    //                 options.mode === "add" && addEntry(options);
    //             } catch (err) {
    //                 errorLog(err, options.verbose);
    //             }
    //         })();
    //     })
    //     .on("--help", () => {
    //         log(`\n  Example:\n`);
            
    //         log(`    ayx service-credentials --mode list  \t\t\t list all configured credentials`);
    //         log(
    //             `    ayx service-credentials --mode select --index <index> \t select credentials with index <index> from the list`
    //         );

    //         log(`    ayx service-credentials --mode add --gateway http://xxx ...  add new service credentials`);
    //         serviceCredentialLog();
    //     });
};

function listEntries(options: any) {
    const config = getFullConfig();
    console.log(
        `Sel. ${"Index".padEnd(5)} ${"Gateway".padEnd(25)} ${"Created".padEnd(19)
        } ${"AppName".padEnd(12)} ${"Vers.".padEnd(6)} ${"Comment".padEnd(25)} `
    );
    console.log(
        `${"".padEnd(4, "-")} ${"".padEnd(5, "-")} ${"".padEnd(25, "-")} ${"".padEnd(19, "-")
        } ${"".padEnd(12, "-")} ${"".padEnd(6, "-")} ${"".padEnd(7, "-")} `
    );
    for (let index = 0; index < config.credentials.length; index++) {
        const element = config.credentials[index];
        const highlight = element.selected
            ? color
            : (x: string) => {
                  return x;
              };
        const selected = element.selected ? color(" -> ") : "    ";
        console.log(
            `${selected} ${highlight(index.toString().padEnd(5))} ${highlight(element.gateway.padEnd(25))} ${
                highlight(format(new Date(element.createdAt), 'yyyy-MM-dd hh:mm:ss'))
            } ${highlight(element.appName.padEnd(12))} ${highlight(element.appVersion?.padEnd(6))} ${highlight(element.comments?.padEnd(25))} `
        );
    }
    verboseLog(JSON.stringify(config, null, 2), options.verbose);
}

function selectEntry(options: any) {
    const config = getFullConfig();

    const optionIndex = parseInt(options.index);

    (optionIndex < 0 || optionIndex > config.credentials.length - 1) &&
        throwError(`the index has to be between 0 and ${config.credentials.length - 1}`);

    for (let index = 0; index < config.credentials.length; index++) {
        const element = config.credentials[index];
        element.selected = index === parseInt(options.index);
    }

    checkList(config.credentials);
    storeAuth(config);
    listEntries(options);
}

function viewEntry(options: any) {
    const config = getFullConfig();

    const optionIndex = parseInt(options.index);

    (optionIndex < 0 || optionIndex > config.credentials.length - 1) &&
        throwError(`the index has to be between 0 and ${config.credentials.length - 1}`);

    const element = config.credentials[optionIndex];
    const credentials = Buffer.from(decrypt(element, options.passkey).slice(6), 'base64').toString("utf-8").split(":");
    
    verboseLog(JSON.stringify(element, null, 2), options.verbose);
    verboseLog(JSON.stringify(credentials, null, 2), options.verbose);

    console.log(
        `Sel. ${"Index".padEnd(5)} ${"Gateway".padEnd(25)} ${"ClientID".padEnd(20)} ${"ClientSecret".padEnd(20)} ${"Created".padEnd(19)
        } ${"AppName".padEnd(12)} ${"Vers.".padEnd(6)} ${"Comment".padEnd(25)} `
    );
    console.log(
        `${"".padEnd(4, "-")} ${"".padEnd(5, "-")} ${"".padEnd(25, "-")} ${"".padEnd(20, "-")} ${"".padEnd(20, "-")} ${"".padEnd(19, "-")
        } ${"".padEnd(12, "-")} ${"".padEnd(6, "-")} ${"".padEnd(7, "-")} `
    );
    const highlight = element.selected
        ? color
        : (x: string) => {
                return x;
            };
    const selected = element.selected ? color(" -> ") : "    ";
    console.log(
        `${selected} ${highlight(optionIndex.toString().padEnd(5))} ${highlight(element.gateway.padEnd(25))} ${highlight(truncate(credentials[0], 20))} ${
            highlight(truncate(credentials[1], 20))} ${highlight(format(new Date(element.createdAt), 'yyyy-MM-dd hh:mm:ss'))
        } ${highlight(element.appName.padEnd(12))} ${highlight(element.appVersion?.padEnd(6))} ${highlight(element.comments?.padEnd(25))} `
    );
}

function addEntry(options: any) {
    const config = getFullConfig();

    config.credentials.forEach((x) => (x.selected = false));

    const newEntry: credentialEntry = {
        clientID: options.clientid,
        clientSecret: options.clientsecret,
        passkey: options.passkey,
        gateway: options.gateway,
        appName: `${options.appName || "AYX CLI"}`,
        appVersion: `${options.appVersion || ""}`,
        createdAt: new Date().toISOString(),
        comments: `${options.comments || ""}`,
        selected: true,
    };

    (config.credentials as any[]).push(newEntry);
    addAndStoreConfiguration(config);
    listEntries(options);
}


function checkViewRequiredParamaters(options: any) {
    (!options.index) && throwError("you have to specify a configuration index to select");
    (!options.passkey) && throwError("you have to specify a passkey to decrypt the credentials");
}

function checkSelectRequiredParamaters(options: any) {
    (!options.index) && throwError("you have to specify a configuration index to select");    
}

function checkAddRequiredParamaters(options: any) {
    (!options.clientid || !options.clientsecret || !options.passkey || !options.gateway) &&
    throwError("you have to specify clientid, clientsecret, gateway and passkey for new service credentials");   
}
