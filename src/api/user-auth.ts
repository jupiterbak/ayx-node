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
    protected _user: string = "cli";
    protected _password: string = "1.0.0"

    /**
     * Creates an instance of UserAuth.
     * extract token from http request headers (req.get("authorization"))
     *
     * @param {string} gateway
     * @param {string} user
     * @param {string} password
     * @memberOf UserAuth
     */
    constructor(
        gateway: string, 
        user: string,
        password: string
    ) {
        super();
        
        if (!isUrl(gateway)) {
            throw new Error("the gateway must be an URL (e.g. https://localhost");
        }
        const base64encoded = Buffer.from(`${user}:${password}`).toString("base64");
        const token =  `Basic ${base64encoded}`;
        this._token = token.replace("Bearer", "").trim(); // just for the case that people pass complete bearer token with leading bearer
        this._gateway = gateway;
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
