import * as debug from "debug";
import { AlteryxConnectBase, TokenRotation } from "./alteryx-base";
import { isUrl } from "./utils";

const log = debug("alteryx-authbase");

export abstract class AuthBase extends AlteryxConnectBase implements TokenRotation {
    protected _accessToken?: any;
    protected _oauthResponse?: any;
    protected _publicKey: any;

    protected abstract AcquireToken(): Promise<boolean>;

    protected async ValidateToken(): Promise<boolean> {
        //TODO: Currently Alteryx Server is not really validated. Must be cleared.
        //await retry(5, () => this.AcquirePublicKey());

        // const fullToken = jwt.decode(this._accessToken, {
        //     complete: true,
        // }) as any;
        // const tokenkey = fullToken.header.kid;

        // // console.log(tokenkey);
        // if (!tokenkey) {
        //     throw new Error(`Token validation error, can't find tokenkey for ${this._accessToken}`);
        // }

        if (!this._accessToken) throw new Error("Invalid access token");

        log("Token validated, still good");
        return true;
    }

    public async RenewToken(): Promise<boolean> {
        if (this._accessToken) {
            try {
                await this.ValidateToken();
            } catch (err) {
                log(`jwt exchange token expired - renewing : ${err}`);
                this._accessToken = undefined;
                if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
                    log("invalid certificate - renewing");
                    this._oauthResponse = undefined;
                }
            }
        }

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
