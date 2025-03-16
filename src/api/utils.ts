// Copyright (C), Jupiter Bakakeu 2022
import * as crypto from "crypto";
import * as fs from "fs";
import * as os from "os";
import { URL } from "url";
import { SecretCredentials } from "./sdk/common/credentials";

//const groupby = require("json-groupby");

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

/**
 * Normalizes a passkey to ensure it's exactly 32 characters long as required by AES-256.
 * If the passkey is shorter than 32 characters, it's padded with '$' characters.
 * If longer, it's truncated to 32 characters.
 * 
 * @param {string} passkey - The original passkey
 * @returns {string} - A normalized 32-character passkey
 */
const normalizePasskey = (passkey: string): string => {
    return passkey.length < 32 ? passkey + new Array(33 - passkey.length).join("$") : passkey.substr(0, 32);
};

/**
 * Encrypts client credentials using AES-256-CBC encryption.
 * 
 * The encryption process:
 * 1. Combines clientID and clientSecret with a colon and encodes as base64
 * 2. Generates a random initialization vector (IV)
 * 3. Creates an AES cipher with the normalized passkey and IV
 * 4. Encrypts the "Basic {base64encoded}" string
 * 5. Returns the encrypted data along with the IV and metadata
 * 
 * @param {credentialEntry} credentials - The credentials and metadata to encrypt
 * @returns {authJson} - The encrypted credentials with metadata
 */
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
    // Create the base64 encoded Basic auth string (clientID:clientSecret)
    const base64encoded = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");
    
    // Generate a random initialization vector for AES encryption
    const iv = crypto.randomBytes(16);

    // Create cipher with normalized passkey and IV
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(normalizePasskey(passkey)), iv);
    
    // Encrypt the Basic auth string
    let crypted = cipher.update(`Basic ${base64encoded}`, "utf8", "hex");
    crypted += cipher.final("hex");

    // Return the encrypted auth data with metadata
    const encryptedAuth = {
        auth: crypted.toString(),
        iv: iv.toString("base64"),  // IV must be stored to decrypt later
        gateway: gateway,
        appName: appName,
        appVersion: appVersion,
        createdAt: createdAt,
        comments: comments,
        selected: selected
    };
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

/**
 * Decrypts previously encrypted authentication credentials.
 * 
 * The decryption process:
 * 1. Creates a decipher using the same algorithm, normalized passkey, and stored IV
 * 2. Decrypts the auth string from hex to utf8
 * 3. Returns the decrypted Basic auth string
 * 
 * @param {authJson} encryptedAuth - The encrypted auth data with IV
 * @param {string} passkey - The passkey used for encryption
 * @returns {string} - The decrypted Basic auth string
 */
export const decrypt = (encryptedAuth: authJson, passkey: string): string => {
    // Create decipher with the same normalized passkey and stored IV
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        normalizePasskey(passkey),
        Buffer.from(encryptedAuth.iv, "base64")
    );
    
    // Decrypt the auth string
    let dec = decipher.update(encryptedAuth.auth, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
};

/**
 * Returns the path to the .ayx directory in the user's home directory.
 * This directory is used to store authentication configuration.
 * 
 * @returns {string} - Path to the .ayx directory
 */
export const getHomeDotAyxDir = () => {
    return `${os.homedir()}/.ayx/`;
};

/**
 * Stores authentication credentials to the auth.json file.
 * Creates the .ayx directory if it doesn't exist.
 * 
 * @param {Object} auth - The authentication configuration to store
 * @param {authJson[]} auth.credentials - Array of encrypted credential objects
 */
export const storeAuth = (auth: { credentials: authJson[] }) => {
    // Ensure the .ayx directory exists
    const homeDir = getHomeDotAyxDir();
    if (!fs.existsSync(homeDir)) {
        fs.mkdirSync(homeDir);
    }

    // Write the credentials to auth.json
    const pathName = `${getHomeDotAyxDir()}auth.json`;
    fs.writeFileSync(pathName, JSON.stringify(auth));
};

/**
 * Loads authentication credentials from environment variables.
 * This function is primarily used for unit tests and CI/CD environments.
 * 
 * The function expects the following environment variables to be set:
 * - AYX_SERVER_API: The Alteryx server API endpoint
 * - AYX_SERVER_CLIENTID: The client ID for authentication
 * - AYX_SERVER_CLIENTSECRET: The client secret for authentication
 * 
 * @returns {SecretCredentials} - The credentials loaded from environment variables
 * @throws {Error} - If any required environment variables are missing
 */
export const loadAuth = (): SecretCredentials => {
    let result: SecretCredentials | undefined = undefined;

    // Check if all required environment variables are set
    if (!process.env.AYX_SERVER_API || !process.env.AYX_SERVER_CLIENTID || !process.env.AYX_SERVER_CLIENTSECRET) {
        // Display a prominent error message with instructions
        console.error("--------------------------------------------------------------------------------------------");
        console.error(
            "\x1b[31m%s\x1b[0m",
            "\nPlease set the environment variables before running unit tests: AYX_SERVER_API, AYX_SERVER_CLIENTID, AYX_SERVER_CLIENTSECRET"
        );
        console.error("\nsee: https://help.alteryx.com\n");
        console.error("--------------------------------------------------------------------------------------------");
        process.exit(-1);
    }

    // Extract values from environment variables
    const gateway = process.env.AYX_SERVER_API;
    const clientId = process.env.AYX_SERVER_CLIENTID;
    const clientSecret = process.env.AYX_SERVER_CLIENTSECRET;

    // Create credentials object if all values are present
    if(gateway && clientId && clientSecret){
        const newEntry: SecretCredentials = {
            clientId: clientId,
            clientSecret: clientSecret,
            gateway: gateway
        };
        result = newEntry;
    }

    // Throw error if credentials couldn't be created
    !result &&
        throwError(
            "please configure the authentication properly."
        );

    return result!;
};

/**
 * Gets the full authentication configuration from auth.json.
 * If the file or directory doesn't exist, it creates them with an empty configuration.
 * 
 * This function is used to retrieve stored credentials for authentication.
 * 
 * @returns {Object} - The full authentication configuration
 * @returns {authJson[]} - credentials - Array of encrypted credential objects
 */
export function getFullConfig(): { credentials: authJson[] } {
    // Ensure the .ayx directory exists
    const homeDir = getHomeDotAyxDir();
    if (!fs.existsSync(homeDir)) {
        fs.mkdirSync(homeDir);
        console.log(`creating ${homeDir} folder`);
    }

    // Ensure auth.json exists with at least an empty configuration
    const pathName = `${getHomeDotAyxDir()}auth.json`;
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, JSON.stringify({ credentials: [] }));
        console.log(`Initializing ${pathName} with empty configuration`);
    }

    // Read and parse the configuration file
    const buffer = fs.readFileSync(pathName);
    let obj = JSON.parse(buffer.toString());

    return obj;
}

/**
 * Creates a promise that resolves after the specified number of milliseconds.
 * Used for implementing delay/sleep functionality in async functions.
 * 
 * @param {number} ms - The number of milliseconds to sleep
 * @returns {Promise<void>} - A promise that resolves after the specified delay
 */
const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retries a function with exponential backoff until it succeeds or reaches the maximum number of attempts.
 * 
 * This implements a resilient retry mechanism with progressive delay:
 * - First attempt: immediate execution
 * - Second attempt: wait timeoutInMilliseconds
 * - Third attempt: wait 2 * timeoutInMilliseconds
 * - Fourth attempt: wait 3 * timeoutInMilliseconds
 * And so on...
 * 
 * This pattern is useful for operations that might fail temporarily due to network issues,
 * rate limiting, or other transient failures.
 *
 * @param {number} n - Maximum number of retry attempts
 * @param {Function} func - The async function to retry
 * @param {number} [timoutinMilliseconds=300] - Base timeout in milliseconds between retries
 * @param {Function} [logFunction] - Optional function to call before each attempt (for logging)
 * @returns {Promise<any>} - The result of the successful function call
 * @throws {Error} - The last error encountered if all attempts fail
 */
export const retry = async (n: number, func: Function, timoutinMilliseconds: number = 300, logFunction?: Function) => {
    let error;
    for (let i = 0; i < n; i++) {
        try {
            // Execute optional logging function before each attempt
            if (logFunction) {
                logFunction();
            }
            
            // For retries (not the first attempt), wait with exponential backoff
            if (i > 0) {
                await sleep(i * timoutinMilliseconds);
            }
            
            // Attempt to execute the function and return result if successful
            return await func();
        } catch (err) {
            // Store the error to throw if all attempts fail
            error = err;
        }
    }
    
    // If we've exhausted all retry attempts, throw the last error
    throw error;
};

/**
 * Validates that an asset ID is a valid 32-character hexadecimal string.
 * 
 * @param {string} agentId - The asset ID to validate
 * @throws {Error} - If the asset ID is not a valid 32-character hexadecimal string
 */
export const checkAssetId = (agentId: string) => {
    if (!/[a-f0-9]{32}/gi.test(agentId)) {
        throw new Error("You have to pass valid 32 char long asset id");
    }
};

/**
 * Helper function to throw an error with a specific message.
 * Used throughout the codebase for consistent error handling.
 * 
 * @param {string} error - The error message
 * @throws {Error} - Always throws an error with the provided message
 */
export const throwError = (error: string) => {
    throw new Error(error);
};

/**
 * Converts an object to a URL query string.
 * 
 * This function:
 * 1. Filters out properties with undefined values
 * 2. Converts Date objects to ISO strings
 * 3. URL-encodes both keys and values
 * 4. Joins them with '&' to form a valid query string
 * 
 * @param {Object} qs - The object to convert to a query string
 * @returns {string} - The formatted query string (without the leading '?')
 */
export const toQueryString = (qs: any) => {
    return Object.keys(qs || {})
        // Filter out undefined values
        .filter((key) => {
            return qs[key] !== undefined;
        })
        // Convert each key-value pair to "key=value" format
        .map((key) => {
            // Special handling for Date objects
            const value = qs[key] instanceof Date ? qs[key].toISOString() : qs[key];
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
        })
        // Join all pairs with '&'
        .join("&");
};

/**
 * Removes all properties with undefined values from an object.
 * This is useful for cleaning up objects before serialization or API requests.
 * 
 * @param {Object} obj - The object to clean
 * @returns {Object} - The same object with undefined properties removed
 */
export const removeUndefined = (obj: any) => {
    Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
    return obj;
};

/**
 * Calculates a cryptographic hash (checksum) of a file.
 * 
 * This function streams the file contents to avoid loading the entire file into memory,
 * making it suitable for large files.
 * 
 * @param {string} hashName - The hash algorithm to use (e.g., 'md5', 'sha256')
 * @param {string} path - The path to the file
 * @returns {Promise<string>} - A promise that resolves to the hex-encoded hash
 */
export async function checksumFile(hashName: string, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(hashName);
        const stream = fs.createReadStream(path);
        stream.on("error", (err) => reject(err));
        stream.on("data", (chunk) => hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
    });
}

/**
 * Removes certificate header and footer lines from a certificate string.
 * 
 * This function is used to clean certificate strings by removing the
 * "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----" lines.
 * 
 * @param {string} s - The certificate string to prune
 * @returns {string} - The certificate string without header and footer lines
 */
export function pruneCert(s: string): string {
    return s
        .split(/\r\n|\r|\n/)
        .filter((x) => {
            return x.indexOf("CERTIFICATE") < 0;
        })
        .join("");
}

/**
 * Processes and stores a credentials configuration.
 * 
 * This function:
 * 1. Validates the configuration
 * 2. Normalizes gateway URLs
 * 3. Encrypts credentials if a passkey is provided
 * 4. Ensures exactly one credential is selected as default
 * 5. Stores the configuration to auth.json
 * 
 * @param {Object} configuration - The credentials configuration to process and store
 * @throws {Error} - If the configuration is invalid
 */
export function addAndStoreConfiguration(configuration: any) {
    const newConfiguration: {
        credentials: authJson[];
    } = {
        credentials: [],
    };
    
    // Validate configuration
    (!configuration || !configuration.credentials) && throwError("invalid configuration!");
    
    // Process each credential entry
    configuration.credentials.forEach((element: credentialEntry) => {
        // Normalize gateway URL, defaulting to localhost if invalid
        element.gateway = isUrl(element.gateway) ? element.gateway : `https://localhost`;
        
        // Encrypt credentials if passkey is provided, otherwise use as-is
        newConfiguration.credentials.push(element.passkey ? encrypt(element) : ((element as unknown) as authJson));
    });
    
    // Ensure exactly one credential is selected as default
    checkList(newConfiguration.credentials);
    
    // Store the processed configuration
    storeAuth(newConfiguration);
}

/**
 * Ensures exactly one credential in a list is marked as selected (default).
 * 
 * If multiple or no credentials are selected, this function will select
 * the first credential in the list as the default.
 * 
 * @param {any[]} list - The list of credential objects to check
 */
export function checkList(list: any[]) {
    // Count how many credentials are selected
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        element.selected && count++;
    }

    // If not exactly one credential is selected, select the first one
    if (count !== 1) {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            element.selected = i === 0;
        }
    }
}

/**
 * Validates if a string is a valid GUID/UUID.
 * 
 * This function checks if the string matches the standard UUID format:
 * xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * Where M is 1-5 (version) and N is 8-b (variant)
 * 
 * @param {string} x - The string to check
 * @returns {boolean} - True if the string is a valid GUID/UUID, false otherwise
 */
export function isGuid(x: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(x);
}

/**
 * Truncates a string to a specified length, adding ellipsis if necessary.
 * If the string is shorter than the limit, it pads the string to reach the limit.
 * 
 * @param {string} _string - The string to truncate or pad
 * @param {number} limit - The maximum length of the resulting string
 * @returns {string} - The truncated or padded string
 */
export function truncate(_string: string, limit: number){
    return _string.length > limit ? `${_string.substring(0,limit-3>0?limit-3:limit)}...` : _string.padEnd(limit);
}
