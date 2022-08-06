import fetch from "cross-fetch";
import * as debug from "debug";
import { removeUndefined, throwError } from "./utils";
import { AYX_NAME, AYX_VERSION } from "../version";
const HttpsProxyAgent = require("https-proxy-agent");
const log = debug("another-alteryx-cli");

/**
 * TokenRotation interface marks all classes which rotate the authentication token according to another-alteryx-cli specifications.
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
     * returns the currently used another-alteryx-cli gateway
     *
     * @returns {string}
     *
     * @memberOf TokenRotation
     */
    GetGateway(): string;

    /**
     * returns the currently used another-alteryx-cli tenant
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

export function isTokenRotation(obj: any): boolean {
    const tr = obj as TokenRotation;

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
        additionalHeaders = additionalHeaders || {};
        let apiheaders = octetStream ? this._octetStreamHeaders : this._apiHeaders;
        apiheaders = multiPartFormData ? this._multipartFormData : apiheaders;
        ignoreCodes = ignoreCodes || [];
        let headers: any = {
            ...apiheaders,
            Authorization: `Bearer ${authorization}`,
        };

        if (verb === "GET" || verb === "DELETE") {
            delete headers["Content-Type"];
        }

        headers = removeUndefined({ ...headers, ...additionalHeaders });

        const url = `${gateway}${baseUrl}`;
        log(`${message} Headers ${JSON.stringify(headers)} Url ${url}`);
        try {
            const request: any = { method: verb, headers: headers, agent: this._proxyHttpAgent };
            if (verb !== "GET" && verb !== "DELETE") {
                request.body = octetStream || multiPartFormData ? body : JSON.stringify(body);
                // const fs = require('fs');
                // fs.writeFileSync("BodyFile.txt", request.body)
            }
            const response = await fetch(url, request);

            const codeIgnored = ignoreCodes.indexOf(response.status) >= 0;

            !codeIgnored && !response.ok && throwError(`${response.statusText} ${await response.text()}`);

            !codeIgnored &&
                (response.status < 200 || response.status > 299) &&
                throwError(`invalid response ${JSON.stringify(response)}`);

            if (codeIgnored) return undefined;

            if (rawResponse) return response;

            if (noResponse) {
                if (returnHeaders) {
                    return response.headers;
                }
                return {};
            }

            const json = await response.json();
            log(`${message} Response ${JSON.stringify(json)}`);
            return json;
        } catch (err) {
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
