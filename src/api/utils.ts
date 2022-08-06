// Copyright (C), Jupiter Bakakeu 2022
import * as crypto from "crypto";
import * as fs from "fs";
import * as os from "os";
import { URL } from "url";

const groupby = require("json-groupby");

export type authJson = {
    auth: string;
    iv: string;
    gateway: string;
    appName: string;
    appVersion: string;
    createdAt: string;
    comments: string;
    selected: boolean;
};

export const isUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

const normalizePasskey = (passkey: string): string => {
    return passkey.length < 32 ? passkey + new Array(33 - passkey.length).join("$") : passkey.substr(0, 32);
};

export const encrypt = ({
    gateway,
    clientID,
    clientSecret,
    passkey,
    appName,
    appVersion,
    createdAt,
    comments,
    selected,
}: credentialEntry): authJson => {
    const base64encoded = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(normalizePasskey(passkey)), iv);
    let crypted = cipher.update(`Basic ${base64encoded}`, "utf8", "hex");
    crypted += cipher.final("hex");

    const encryptedAuth = {
        auth: crypted.toString(),
        iv: iv.toString("base64"),
        gateway: gateway,
        appName: appName,
        appVersion: appVersion,
        createdAt: createdAt,
        comments: comments,
        selected: selected
    };
    // console.log(encryptedAuth);
    return encryptedAuth;
};

export type credentialEntry = {
    passkey: string;
    gateway: string;
    clientID: string;
    clientSecret: string;
    appName: string;
    appVersion: string;
    createdAt: string;
    comments: string;
    selected: boolean;
};

export const decrypt = (encryptedAuth: authJson, passkey: string): string => {
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        normalizePasskey(passkey),
        Buffer.from(encryptedAuth.iv, "base64")
    );
    let dec = decipher.update(encryptedAuth.auth, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
};

export const getHomeDotAyxDir = () => {
    return `${os.homedir()}/.ayx/`;
};

export const storeAuth = (auth: { credentials: authJson[] }) => {
    const homeDir = getHomeDotAyxDir();
    if (!fs.existsSync(homeDir)) {
        fs.mkdirSync(homeDir);
    }

    const pathName = `${getHomeDotAyxDir()}auth.json`;
    fs.writeFileSync(pathName, JSON.stringify(auth));
};

export const loadAuth = (): authJson => {
    const fullConfig = getFullConfig();

    let result: authJson | undefined = undefined;

    for (let index = 0; index < fullConfig.credentials.length; index++) {
        const element = fullConfig.credentials[index];

        if (element.selected) {
            result = element;
            break;
        }
    }

    !result &&
        throwError(
            "please configure the authentication properly."
        );

    return result!;
};

export function getFullConfig(): { credentials: authJson[] } {
    const homeDir = getHomeDotAyxDir();
    if (!fs.existsSync(homeDir)) {
        fs.mkdirSync(homeDir);
        console.log(`creating ${homeDir} folder`);
    }

    // create empty auth.json
    const pathName = `${getHomeDotAyxDir()}auth.json`;
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, JSON.stringify({ credentials: [] }));
        console.log(`Initializing ${pathName} with empty configuration`);
    }

    const buffer = fs.readFileSync(pathName);
    let obj = JSON.parse(buffer.toString());

    // console.log(obj);
    return obj;
}

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * retry the function n times (while progressively waiting for the success) until success
 * the waiting schema is iteration * timeoutInMiliseconds (default is 300ms)
 *
 * @param {number} n
 * @param {Function} func
 * @param {number} [timoutinMilliseconds=300]
 * @param {Function} [logFunction]
 * @returns
 */
export const retry = async (n: number, func: Function, timoutinMilliseconds: number = 300, logFunction?: Function) => {
    let error;
    for (let i = 0; i < n; i++) {
        try {
            if (logFunction) {
                logFunction();
            }
            if (i > 0) {
                await sleep(i * timoutinMilliseconds);
            }
            return await func();
        } catch (err) {
            error = err;
        }
    }
    throw error;
};

export const checkAssetId = (agentId: string) => {
    if (!/[a-f0-9]{32}/gi.test(agentId)) {
        throw new Error("You have to pass valid 32 char long asset id");
    }
};

export const throwError = (error: string) => {
    throw new Error(error);
};

export const toQueryString = (qs: any) => {
    return Object.keys(qs || {})
        .filter((key) => {
            return qs[key] !== undefined;
        })
        .map((key) => {
            const value = qs[key] instanceof Date ? qs[key].toISOString() : qs[key];
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
        })
        .join("&");
};

export const removeUndefined = (obj: any) => {
    Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
    return obj;
};

export async function checksumFile(hashName: string, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(hashName);
        const stream = fs.createReadStream(path);
        stream.on("error", (err) => reject(err));
        stream.on("data", (chunk) => hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
    });
}

export function pruneCert(s: string): string {
    return s
        .split(/\r\n|\r|\n/)
        .filter((x) => {
            return x.indexOf("CERTIFICATE") < 0;
        })
        .join("");
}

export function addAndStoreConfiguration(configuration: any) {
    const newConfiguration: {
        credentials: authJson[];
    } = {
        credentials: [],
    };
    (!configuration || !configuration.credentials) && throwError("invalid configuration!");
    configuration.credentials.forEach((element: credentialEntry) => {
        element.gateway = isUrl(element.gateway) ? element.gateway : `https://localhost`;
        newConfiguration.credentials.push(element.passkey ? encrypt(element) : ((element as unknown) as authJson));
    });
    checkList(newConfiguration.credentials);
    storeAuth(newConfiguration);
}

export function checkList(list: any[]) {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        element.selected && count++;
    }

    if (count !== 1) {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            element.selected = i === 0;
        }
    }
}

export function isGuid(x: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(x);
}

export function truncate(_string: string,limit: number){
    return _string.length > limit ? `${_string.substring(0,limit-3>0?limit-3:limit)}...` : _string.padEnd(limit);
}

