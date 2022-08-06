import { AlteryxConnectBase, TokenRotation } from "./alteryx-base";
import { isUrl } from "./utils";

/**
 * User Authenticator for Backend Authentication in NodeJS
 *
 *
 * @export
 * @class UserAuth
 * @extends {AlteryxConnectBase}
 * @implements {TokenRotation}
 */
export class UserAuth extends AlteryxConnectBase implements TokenRotation {
    private _token: string;
    private _gateway: string;
    protected _appName: string = "cli";
    protected _appVersion: string = "1.0.0"

    /**
     * Creates an instance of UserAuth.
     * extract token from http request headers (req.get("authorization"))
     *
     * @param {string} token
     * @param {string} gateway
     *
     *
     * @memberOf UserAuth
     */
    constructor(
        token: string, 
        gateway: string, 
        appName: string = "cli",
        appVersion: string = "1.0.0"
        ) {
        super();
        if (!isUrl(gateway)) {
            throw new Error("the gateway must be an URL (e.g. https://localhost");
        }
        this._token = token.replace("Bearer", "").trim(); // just for the case that people pass complete bearer token with leading bearer
        this._gateway = gateway;
        this._appName = appName;
        this._appVersion = appVersion;
    }

    /**
    /**
     * * Returns true; 
     *
     * @returns {Promise<boolean>}
     *
     * @memberOf BrowserAuth
     */
    async RenewToken(): Promise<boolean> {
        return true; 
    }

    /**
     * * Returns ""; 
     *
     * @returns {Promise<string>}
     *
     * @memberOf BrowserAuth
     */
    async GetToken(): Promise<string> {
        return this._token; 
    }

    /**
     * returns the configured gateway
     *
     * @returns {string}
     *
     * @memberOf BrowserAuth
     */
    GetGateway(): string {
        return this._gateway;
    }

    /**
     *
     * * Returns ""; Alteryx Gateway is taking care of this
     *
     * @returns {string}
     *
     * @memberOf BrowserAuth
     */
    GetTenant(): string {
        return ""; 
    }
}
