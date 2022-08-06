import * as debug from "debug";
import fetch from "cross-fetch";
import { AuthBase } from "./auth-base";
import { TokenRotation } from "./alteryx-base";
import { isUrl, throwError } from "./utils";

const log = debug("alteryx-credentialauth");

export class SecretCredentialAuth extends AuthBase implements TokenRotation {
    protected async AcquireToken(): Promise<boolean> {
        const headers = {
            ...this._urlEncodedHeaders,
            Authorization: this._basicAuth,
        };
        const url = `${this._gateway.endsWith("/") ? this._gateway : this._gateway + "/"}oauth2/token`;
        log(`AcquireToken Headers: ${JSON.stringify(headers)} Url: ${url}`);
        const body = "grant_type=client_credentials";

        try {
            const response = await fetch(url, {
                method: "POST",
                body: body,
                headers: headers,
                agent: this._proxyHttpAgent,
            } as RequestInit);
            if (!response.ok) {
                throw new Error(`${response.statusText} ${await response.text()}`);
            }
            if (response.status >= 200 && response.status <= 299) {
                const json = await response.json();
                log(`AcquireToken Response ${JSON.stringify(json)}`);
                this._accessToken = json;
            } else {
                throw new Error(`invalid response ${JSON.stringify(response)}`);
            }
        } catch (err) {
            log(err);
            throw new Error(`Network error occured ${err.message}`);
        }
        return true;
    }

    /**
     * Returns the current token.
     * This token can be used in e.g. in Postman to call ayx-node APIs.
     *
     * @returns {(Promise<string>)}
     *
     * @memberOf AgentAuth
     */
    public async GetToken(): Promise<string> {
        await this.RenewToken();
        if (!this._accessToken || !this._accessToken.access_token) throw new Error("Error getting the new token!");
        return this._accessToken.access_token;
    }

    /**
     * Creates an instance of TokenManagerAuth.
     * @param {string} _gateway
     * @param {string} _clientid
     * @param {string} _clientsecret
     *
     * @memberOf TokenManagerAuth
     */
     constructor(
        protected _gateway: string,
        protected _clientid: string,
        protected _clientsecret: string,
    ) {
        const base64encoded = Buffer.from(`${_clientid}:${_clientsecret}`).toString("base64");
        super(_gateway, `Basic ${base64encoded}`);

        (!this._basicAuth || !this._basicAuth.startsWith("Basic")) &&
            throwError(
                "You have to pass the basic authentication header (Basic: <base64encoded login:password> in the constructor. Wrong Passkey in CLI?"
            );

        !isUrl(_gateway) && throwError("the gateway must be an URL (e.g. https://localhost:8080");
    }
}
