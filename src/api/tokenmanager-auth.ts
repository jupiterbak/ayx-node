import * as debug from "debug";
import { AuthBase } from "./auth-base";
import { TokenRotation } from "./alteryx-base";
import { isUrl, throwError } from "./utils";

const log = debug("alteryx-credentialauth");

/**
 * Token Manager Authentication
 *
 * @export
 * @class TokenManagerAuth
 * @extends {AuthBase}
 * @implements {TokenRotation}
 */
export class TokenManagerAuth extends AuthBase implements TokenRotation {
    protected async AcquireToken(): Promise<boolean> {
        this._accessToken = this._basicAuth.replace("Bearer", "").trim(); // just for the case that people pass complete bearer token with leading bearer
        return true;
    }

    protected async ValidateToken(): Promise<boolean> {
        //  No validation is needed.
        log("Token validated, still good");
        return true;
    }

    /**
     * Returns the current agent token.
     * This token can be used in e.g. in Postman to call alteryx APIs.
     *
     * @returns {(Promise<string>)}
     *
     * @memberOf AgentAuth
     */
    public async GetToken(): Promise<string> {
        await this.RenewToken();
        if (!this._accessToken) throw new Error("Error getting the new token!");
        return this._accessToken;
    }

    /**
     * Creates an instance of TokenManagerAuth.
     * @param {string} _gateway
     * @param {string} _token
     *
     * @memberOf TokenManagerAuth
     */
    constructor(
        protected _gateway: string,
        protected _token: string,
    ) {
        super(_gateway, `Basic ${_token}`);

        !isUrl(_gateway) && throwError("the gateway must be an URL (e.g. https://localhost:8080");

        (!this._basicAuth || !this._basicAuth.startsWith("Basic")) &&
            throwError(
                "You have to pass the basic authentication header (Basic: <base64encoded login:password> in the constructor. Wrong Passkey in CLI?"
            );

        
    }
}
