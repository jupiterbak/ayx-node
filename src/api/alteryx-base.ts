import fetch from "cross-fetch";
import * as debug from "debug";
import { removeUndefined, throwError } from "./utils";
import { AYX_NAME, AYX_VERSION } from "../version";
const HttpsProxyAgent = require("https-proxy-agent");
const log = debug("ayx-node");

/**
 * TokenRotation interface marks all classes which rotate the authentication token according to ayx-node specifications.
 *
 * @export
 * @interface TokenRotation
 */
export interface TokenRotation {
    /**
     * Checks if the token has expired and renews it if necessary.
     *
     * @returns {Promise<boolean>}
     *
     * @memberOf TokenRotation
     */
    RenewToken(): Promise<boolean>;

    /**
     * Returns the current token
     *
     * @returns {Promise<string>}
     *
     * @memberOf TokenRotation
     */
    GetToken(): Promise<string>;

    /**
     * returns the currently used ayx-node gateway
     *
     * @returns {string}
     *
     * @memberOf TokenRotation
     */
    GetGateway(): string;

    /**
     * returns the currently used ayx-node tenant
     *
     * @returns {string}
     *
     * @memberOf TokenRotation
     */
    GetTenant(): string;

    HttpAction({
        verb,
        gateway,
        baseUrl,
        authorization,
        body,
        message,
        octetStream,
        multiPartFormData,
        additionalHeaders,
        noResponse,
        rawResponse,
        returnHeaders,
        ignoreCodes,
    }: {
        verb: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
        gateway: string;
        baseUrl: string;
        authorization: string;
        body?: Object;
        message?: string;
        octetStream?: boolean;
        multiPartFormData?: boolean;
        additionalHeaders?: Object;
        noResponse?: boolean;
        rawResponse?: boolean;
        returnHeaders?: boolean;
        ignoreCodes?: number[];
    }): Promise<Object | undefined>;
}

/**
 * Type guard function to check if an object implements the TokenRotation interface.
 * This function performs a comprehensive check to ensure the object has all required
 * methods of the TokenRotation interface and that they are actually functions.
 * 
 * This is used primarily in the SdkClient constructor to determine the type of
 * authentication mechanism provided.
 * 
 * @param {any} obj - The object to check
 * @returns {boolean} - True if the object implements TokenRotation, false otherwise
 */
export function isTokenRotation(obj: any): boolean {
    const tr = obj as TokenRotation;

    // First check if all required properties exist
    // Then verify the object is actually an object instance
    // Finally ensure all properties are functions (not just properties with the same names)
    return (
        tr.GetGateway !== undefined &&
        tr.GetTenant !== undefined &&
        tr.GetToken !== undefined &&
        tr.RenewToken !== undefined &&
        tr instanceof Object &&
        typeof tr.GetGateway === "function" &&
        typeof tr.GetTenant === "function" &&
        typeof tr.GetToken === "function" &&
        typeof tr.RenewToken === "function"
    );
}

/**
 * Base class for alteryx agent (and setup) which provides headers and proxy handling.
 *
 * @export
 * @abstract
 * @class AlteryxConnectBase
 */
export abstract class AlteryxConnectBase {
    /**
     * This is a https proxy agent which is used in the fetch commands if the HTTP_PROXY variable is configured.
     *
     * @protected
     * @type {*}
     * @memberof AlteryxConnectBase
     */
    protected _proxyHttpAgent: any;

    protected _headers = {
        Accept: "*/*",
        "X-Powered-By": "meowz",
        "User-Agent": `${AYX_NAME} (${AYX_VERSION})`,
    };

    /**
     * Http headers used for /exchange endpoint handling.
     *
     * @protected
     * @memberof AlteryxConnectBase
     */
    protected _multipartHeaders = {
        ...this._headers,
        "Content-Type": "multipart/mixed; boundary=alteryxmessage",
    };

    protected _multipartFormData = {
        ...this._headers,
        "Content-Type": "multipart/form-data; boundary=--alteryx",
    };

    /**
     * Http headers used for onboarding message.
     *
     * @protected
     * @memberof AlteryxConnectBase
     */
    protected _apiHeaders = {
        ...this._headers,
        "Content-Type": "application/json",
    };

    protected _octetStreamHeaders = {
        ...this._headers,
        "Content-Type": "application/octet-stream",
    };

    /**
     * Http headers used to register the client assertion and acquire the /exchange token.
     *
     * @protected
     * @memberof AlteryxConnectBase
     */
    protected _urlEncodedHeaders = {
        ...this._headers,
        "Content-Type": "application/x-www-form-urlencoded",
    };

    /**
     * perform http action
     *
     * @param {({
     *         verb: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
     *         gateway: string;
     *         baseUrl: string;
     *         authorization: string;
     *         body?: Object;
     *         message?: string;
     *         octetStream?: boolean;
     *         multiPartFormData?: boolean;
     *         additionalHeaders?: Object;
     *         noResponse?: boolean;
     *         rawResponse?: boolean;
     *         returnHeaders?: boolean;
     *         ignoreCodes?: number[];
     *     })} {
     *         verb,
     *         gateway,
     *         baseUrl,
     *         authorization,
     *         body,
     *         message,
     *         octetStream,
     *         multiPartFormData,
     *         additionalHeaders,
     *         noResponse,
     *         rawResponse,
     *         returnHeaders,
     *         ignoreCodes,
     *     }
     * @returns {Promise<Object>}
     *
     * @memberOf AlteryxConnectBase
     */
    /**
     * Performs an HTTP request with comprehensive options for different API scenarios.
     * This method handles all HTTP communication with the Alteryx API, supporting various
     * content types, response formats, and error handling strategies.
     * 
     * @param {Object} options - The HTTP request configuration
     * @param {string} options.verb - HTTP method (GET, POST, PATCH, PUT, DELETE)
     * @param {string} options.gateway - Base URL of the API gateway
     * @param {string} options.baseUrl - Endpoint path to append to the gateway URL
     * @param {string} options.authorization - Authorization token for the request
     * @param {Object} [options.body] - Request body for POST, PUT, PATCH requests
     * @param {string} [options.message] - Descriptive message for logging purposes
     * @param {boolean} [options.octetStream] - Whether to use octet-stream content type (for binary data)
     * @param {boolean} [options.multiPartFormData] - Whether to use multipart/form-data content type
     * @param {Object} [options.additionalHeaders] - Additional HTTP headers to include
     * @param {boolean} [options.noResponse] - Whether to expect no response body
     * @param {boolean} [options.rawResponse] - Whether to return the raw response object
     * @param {boolean} [options.returnHeaders] - Whether to return response headers instead of body
     * @param {number[]} [options.ignoreCodes] - HTTP status codes to ignore as errors
     * @returns {Promise<Object | undefined>} - Response data or undefined if no response expected
     */
    public async HttpAction({
        verb,
        gateway,
        baseUrl,
        authorization,
        body,
        message,
        octetStream,
        multiPartFormData,
        additionalHeaders,
        noResponse,
        rawResponse,
        returnHeaders,
        ignoreCodes,
    }: {
        verb: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
        gateway: string;
        baseUrl: string;
        authorization: string;
        body?: Object;
        message?: string;
        octetStream?: boolean;
        multiPartFormData?: boolean;
        additionalHeaders?: Object;
        noResponse?: boolean;
        rawResponse?: boolean;
        returnHeaders?: boolean;
        ignoreCodes?: number[];
    }): Promise<Object | undefined> {
        // Initialize default values and prepare headers
        additionalHeaders = additionalHeaders || {};
        let apiheaders = octetStream ? this._octetStreamHeaders : this._apiHeaders;
        apiheaders = multiPartFormData ? this._multipartFormData : apiheaders;
        ignoreCodes = ignoreCodes || [];
        let headers: any = {
            ...apiheaders,
            Authorization: `Bearer ${authorization}`,
        };

        // Remove Content-Type for GET and DELETE requests as they don't have a body
        // This prevents potential issues with some API servers
        if (verb === "GET" || verb === "DELETE") {
            delete headers["Content-Type"];
        }

        // Merge and clean up headers, removing any undefined values
        headers = removeUndefined({ ...headers, ...additionalHeaders });

        // Construct the full URL by combining gateway and endpoint path
        const url = `${gateway}${baseUrl}`;
        log(`${message} Headers ${JSON.stringify(headers)} Url ${url}`);
        try {
            // Prepare the request object with method, headers and proxy agent if configured
            const request: any = { method: verb, headers: headers, agent: this._proxyHttpAgent };
            
            // Add body for non-GET/DELETE requests, handling different content types appropriately
            if (verb !== "GET" && verb !== "DELETE") {
                // For octet-stream or multipart/form-data, use the body as-is
                // For JSON requests, stringify the body object
                request.body = octetStream || multiPartFormData ? body : JSON.stringify(body);
            }
            
            // Execute the HTTP request
            const response = await fetch(url, request);

            // Check if the response status code is in the ignore list
            const codeIgnored = ignoreCodes.indexOf(response.status) >= 0;

            // Handle error responses unless the status code is in the ignore list
            // First check throws an error with the response text for non-OK responses
            !codeIgnored && !response.ok && throwError(`${response.statusText} ${await response.text()}`);

            // Second check ensures status is in the 200-299 range (success codes)
            !codeIgnored &&
                (response.status < 200 || response.status > 299) &&
                throwError(`invalid response ${JSON.stringify(response)}`);

            // If status code is in ignore list, return undefined as specified
            if (codeIgnored) return undefined;

            // Return the raw response object if requested
            if (rawResponse) return response;

            // Handle cases where no response body is expected
            if (noResponse) {
                if (returnHeaders) {
                    return response.headers;
                }
                return {};
            }

            // Parse and return the JSON response for normal requests
            const json = await response.json();
            log(`${message} Response ${JSON.stringify(json)}`);
            return json;
        } catch (err) {
            // Log and rethrow network errors with a more descriptive message
            log(err);
            throw new Error(`Network error occured ${err.message}`);
        }
    }

    constructor() {
        const proxy = process.env.http_proxy || process.env.HTTP_PROXY;
        log(`Proxy: ${proxy}`);
        this._proxyHttpAgent = proxy ? new HttpsProxyAgent(proxy) : null;
    }
}
