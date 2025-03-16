import * as debug from "debug";
import { AlteryxConnectBase, TokenRotation } from "./alteryx-base";
import { isUrl } from "./utils";

const log = debug("alteryx-authbase");

export abstract class AuthBase extends AlteryxConnectBase implements TokenRotation {
    protected _accessToken?: any;
    protected _oauthResponse?: any;
    protected _publicKey: any;

    protected abstract AcquireToken(): Promise<boolean>;

    /**
     * Validates the current access token.
     * 
     * Note: This method currently performs a basic validation check.
     * The commented code shows a more comprehensive JWT validation approach
     * that may be implemented in the future.
     * 
     * @returns {Promise<boolean>} - True if the token is valid
     * @throws {Error} - If the token is invalid or missing
     */
    protected async ValidateToken(): Promise<boolean> {
        //TODO: Currently Alteryx Server is not really validated. Must be cleared.
        //await retry(5, () => this.AcquirePublicKey());

        // The following commented code shows a more comprehensive JWT validation
        // that could be implemented in the future:
        // const fullToken = jwt.decode(this._accessToken, {
        //     complete: true,
        // }) as any;
        // const tokenkey = fullToken.header.kid;

        // // console.log(tokenkey);
        // if (!tokenkey) {
        //     throw new Error(`Token validation error, can't find tokenkey for ${this._accessToken}`);
        // }

        // Basic validation - just check if token exists
        if (!this._accessToken) throw new Error("Invalid access token");

        log("Token validated, still good");
        return true;
    }

    /**
     * Renews the authentication token if necessary.
     * 
     * This method implements the token renewal logic:
     * 1. If a token exists, it attempts to validate it
     * 2. If validation fails, it clears the token and prepares for renewal
     * 3. If no valid token exists, it acquires a new one
     * 4. It validates the newly acquired token
     * 
     * This ensures the SDK always has a valid token for API requests.
     * 
     * @returns {Promise<boolean>} - True if token is valid (either existing or newly acquired)
     * @throws {Error} - If unable to acquire a new token
     */
    public async RenewToken(): Promise<boolean> {
        // If we have an existing token, try to validate it
        if (this._accessToken) {
            try {
                await this.ValidateToken();
            } catch (err) {
                // Token validation failed - clear it and prepare for renewal
                log(`jwt exchange token expired - renewing : ${err}`);
                this._accessToken = undefined;
                
                // Special handling for invalid signature errors
                // This may indicate the server's certificate has changed
                if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
                    log("invalid certificate - renewing");
                    this._oauthResponse = undefined;
                }
            }
        }

        // If no valid token exists (either there was none or validation failed),
        // acquire a new one and validate it
        if (!this._accessToken) {
            await this.AcquireToken();
            await this.ValidateToken();
            if (!this._accessToken) {
                throw new Error("Error aquiering the new token!");
            }
        }
        return true;
    }

    public abstract GetToken(): Promise<string>;

    /**
     * Creates an instance of CredentialAuth.
     * @param {string} _gateway
     * @param {string} _basicAuth
     *
     * @memberOf CredentialAuth
     */
    constructor(protected _gateway: string, protected _basicAuth: string) {
        super();
        if (!_basicAuth || !_basicAuth.startsWith("Basic")) {
            throw new Error(
                "You have to pass the basic authentication header (Basic: <base64encoded login:password> in the constructor. Wrong Passkey in CLI?"
            );
        }

        if (!isUrl(_gateway)) {
            throw new Error("the gateway must be an URL (e.g. https://localhost:8080");
        }
    }
    GetTenant(): string {
        return "";
    }
    GetGateway(): string {
        return this._gateway;
    }
}
