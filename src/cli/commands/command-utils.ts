import * as chalk from "chalk";
import { log } from "console";
import * as updateNotifier from "update-notifier";
import { AlteryxSdk } from "../../api/sdk";
import { decrypt, getHomeDotAyxDir, loadAuth } from "../../api/utils";
import { AYX_NAME, AYX_VERSION } from "../../version";

const magenta = getColor("magenta");
const yellow = getColor("yellow");
const green = getColor("green");
const red = getColor("red");
const cyan = getColor("cyan");

export function checkForUpdates() {
    const pkgInfo = {
        pkg: {
            name: `@jupiterbak/${AYX_NAME}`,
            version: `${AYX_VERSION}`,
        },
    };

    const notifier = updateNotifier(pkgInfo);

    if (notifier.update) {
        console.log(
            `\n\t There is an update available: ${magenta(notifier.update.latest + " ")} (${notifier.update.type})`
        );
        console.log(`\t Run ${magenta("npm install -g ")}${magenta(pkgInfo.pkg.name)} to update`);
        console.log(`\t or download the release for your system from`);
        console.log(`\t ${magenta("https://github.com/jupiterbak/Another-Alteryx-CLI/releases")}\n`);
    }
}

export const serviceCredentialLog = (color: Function = magenta) => {
    if (
        process.env.AYX_PASSKEY ||
        (process.env.AYX_HOST && process.env.AYX_CLIENTID && process.env.AYX_CLIENTSECRET)
    ) {
        checkForUpdates();
        return;
    }

    log(`\n  Important: `);
    log(`\n  Authentication with ${color("saved client credentials")}:\n`);

    log(`    \t- either append option [--passkey <your passkey>] to the command `);
    log(`    \t- or create environment variable ${color("AYX_PASSKEY")} with your current passkey`);

    log(`\n  Authentication with ${yellow("environment variables")}: \n`);

    log(
        `    \t- create environment variables ${yellow("AYX_HOST")} , ${yellow("AYX_CLIENTID")} and ${yellow(
            "AYX_CLIENTSECRET"
        )}`
    );
    log(`\n  Full Documentation: \n`);
    log(`    ${color("https://help.alteryx.com/")}\n`);

    checkForUpdates();
};

export function colorizeStatus(message: string) {
    switch (message) {
        case "SUCCESS":
            return green(message);

        case "IN_PROGRESS":
            return chalk.yellow(message);

        case "ERROR":
            return red(message);

        default:
            return message;
    }
}

export const subtractSecond = (date: Date, seconds: number): Date => {
    const newDate = new Date(date);
    newDate.setUTCMilliseconds(date.getUTCMilliseconds() - Math.floor(seconds * 1000));
    return newDate;
};

export const displayCsvHelp = (color: (chalk: string) => string) => {
    const now = new Date();
    log("\n  Examples:\n");
    log(`    mc ts -f timeseries.csv \t\t\t\t\t upload timeseries from the csv file to alteryx `);
    log(`    mc upload-timeseries --file timeseries.csv  --size 100  \t use http post size of 100 records `);

    log(`\n  ${color("Data Format:")} (use your own data point ids from alteryx)\n`);
    log(`  timestamp, ${color("dataPointId")}, ${green("qualityCode")}, ${yellow("value")}`);
    log(`  ${subtractSecond(now, 2).toISOString()}, ${color("DP-Temperature")} ,${green("0")}, ${yellow("20.34")}`);
    log(`  ${subtractSecond(now, 1).toISOString()}, ${color("DP-Humidity")}, ${green("0")}, ${yellow("70")}`);
    log(`  ${subtractSecond(now, 0).toISOString()}, ${color("DP-Pressure")}, ${green("0")}, ${yellow("1012.3")}`);

    log(
        `\n  Make sure that the timestamp is in ISO format. The headers and the casing (timestamp, dataPointId) are important.`,
        `\n  The values must correspond with data types configured in alteryx (in example: ${color(
            "DP-Humidity"
        )} must be an ${color("integer")})`
    );

    log(`\n  ${color("Important:")}\n`);
    log(
        `    You have to configure the data source and data mappings in alteryx asset manager before you can upload the data`
    );
    log(
        `    See also: ${color(
            "https://documentation.alteryx.io/resources/html/asset-manager/en-US/116404525451.html"
        )}`
    );
};

export const directoryReadyLog = ({
    path,
    runCommand,
    jobCommand,
}: {
    path: string;
    runCommand: string;
    jobCommand: string;
}) => {
    log(`\nthe directory ${green(path)} is ${green("ready")}`);
    log(`you can now edit the template files in the directory`);
    log(`\nwhen you are done run:`);
    log(`\tmc ${runCommand} command to upload files and start the job`);
    log(`\nchecking progress:`);
    log(`\tmc ${jobCommand} to check the progress of the job`);
};

export function getColor(name: string) {
    return chalk.level < 2 ? (chalk as any)[name] : (chalk as any)[`${name}Bright`];
}

export function adjustColor(color: any, options: any, analyticcommand: boolean = false) {
    if ((process.env.AYX_PASSKEY || options.passkey) && !analyticcommand) {
        return getColor("magenta");
    } else if (process.env.AYX_HOST && process.env.AYX_CLIENTID && process.env.AYX_CLIENTSECRET) {
        return getColor("yellow");
    } else {
        return color;
    }
}

export function getSdk(options: any) {
    let sdk: AlteryxSdk;
    const magenta = getColor("magenta");
    const yellow = getColor("yellow");

    if (options.passkey) {
        verboseLog(
            `The passkey was specified as command line option using ${magenta("saved credentials")}`,
            options.verbose
        );

        const auth = loadAuth();
        options._selected_mode = "passkey";
        sdk = new AlteryxSdk({ ...auth, basicAuth: decrypt(auth, options.passkey) });
    } else if (process.env.AYX_PASSKEY && process.env.AYX_PASSKEY !== "") {
        verboseLog(
            `The passkey was specified in environment variable AYX_PASSKEY using ${magenta(
                "user credentials"
            )}`,
            options.verbose
        );
        const auth = loadAuth();
        options.passkey = process.env.AYX_PASSKEY;
        options._selected_mode = "passkey";
        sdk = new AlteryxSdk({ ...auth, basicAuth: decrypt(auth, options.passkey) });
    } else {
        throw new Error("The passkey was not provided and there are no environment variables");
    }
    return sdk;
}


export const errorLog = (err: any, verbose: any) => {
    if (err.message) {
        console.error(`\n${red(err.message.toString())}`);
        if (verbose && err.stack) {
            console.error(red(err.stack));
        }
    } else {
        console.error(red(err.toString()));
    }
    process.exit(1);
};

export const verboseLog = (message: any, verbose: any, spinner?: any) => {
    verbose && console.log(`... ${message}`);
    if (!verbose && spinner) {
        spinner.text = `... ${message}`;
    }
};

export const proxyLog = (verbose: any, color: Function) => {
    const proxy = process.env.HTTP_PROXY || process.env.http_proxy;
    const c = color;
    verboseLog(proxy ? `Using ${c(proxy)} as proxy server` : "No proxy configured.", verbose);
};

export const homeDirLog = (verbose: any, color: Function) => {
    const c = color;
    verboseLog(`Using configuration stored in ${c(getHomeDotAyxDir())}`, verbose);
};

export const retrylog = function (operation: string, c: Function = cyan) {
    let x = 0;
    return () => {
        if (x > 0) {
            console.log(`...Retry no ${c("" + x)} for ${c(operation)} operation.`);
        }
        x++;
    };
};

export const humanFileSize = (size: number) => {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const calculatedSize = (size / Math.pow(1024, i)).toFixed(2);
    const suffix = ["B", "KB", "MB", "GB", "TB"][i];
    return `${calculatedSize}${suffix}`;
};

export function printObjectInfo(
    title: string,
    dto: object,
    options: any,
    coloredProperties: Array<string>,
    color: Function,
    depth: number = 0
) {
    console.log(`${title}`);

    if (isPrimitive(dto)) {
        console.log(dto);
        return;
    }

    for (const [key, value] of Object.entries(dto)) {
        if (Array.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
                const element = value[index];
                if (isPrimitive(element)) {
                    console.log(`${key}[${color(index)}]: ${element}`);
                } else {
                    printObjectInfo(`${key}[${color(index)}]`, element, options, coloredProperties, color, depth + 1);
                }
            }
        } else if (typeof value === "object" && value !== null) {
            printObjectInfo(key, value, options, coloredProperties, color, depth + 1);
        } else {
            const words = key
                .split(/(?=[A-Z])/)
                .join(" ")
                .toLowerCase();

            console.log(`${"\t".repeat(depth)}${words}: ${coloredProperties.indexOf(key) >= 0 ? color(value) : value}`);
        }
    }
    depth === 0 && verboseLog(JSON.stringify(dto, null, 2), options.verbose);
}

export function isPrimitive(x: any) {
    return x !== Object(x);
}
