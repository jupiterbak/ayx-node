import { CredentialAuth } from "../../credential-auth";
import { TokenManagerAuth } from "../../tokenmanager-auth";
import { isTokenRotation, TokenRotation } from "../../alteryx-base";
import {
    UserCredentials,
    ClientCredentials,
    isSecretCredentials,
    SecretCredentials,
    TokenCredentials,
    isTokenCredentials,
} from "./credentials";
import { isUserCredentials, isClientCredentials } from "./credentials";
import { SecretCredentialAuth } from "../../secret-credential-auth";
import { UserAuth } from "../../user-auth";

export abstract class SdkClient {
    public async GetToken() {
        return await this._authenticator.GetToken();
    }

    public async RenewToken() {
        return await this._authenticator.RenewToken();
    }

    public GetGateway() {
        return this._authenticator.GetGateway();
    }

    public GetTenant() {
        return this._authenticator.GetTenant();
    }

    protected _authenticator: TokenRotation;

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
        return this._authenticator.HttpAction({
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
        });
    }

    /**
     * * Creates a client for AYX Server API
     *
     * @param {(TokenRotation | ClientCredentials | UserCredentials)} [credentialsOrAuthorizer]
     *
     * you can pass either an instance an Authorizer:
     * UserAuth, CredentialsAuth, or TokenManagerAuth
     *
     * or a set of Credentials:
     * ServiceCredentials or AppCredentials
     *
     * implement the TokenRotation interface if you want to provide your own authorizer.
     *
     * The default constructor uses frontend authorization.
     *
     * @memberOf SdkClient
     */
    constructor(credentialsOrAuthorizer?: TokenRotation | UserCredentials | ClientCredentials | SecretCredentials  | TokenCredentials) {
        if (credentialsOrAuthorizer === undefined) {
            throw new Error("invalid autorizer.");
        } else if (isTokenRotation(credentialsOrAuthorizer)) {
            this._authenticator = credentialsOrAuthorizer as TokenRotation;
        } else if (isTokenCredentials(credentialsOrAuthorizer)) {
            const userCredentials = credentialsOrAuthorizer as TokenCredentials;

            this._authenticator = new TokenManagerAuth(
                userCredentials.gateway,
                userCredentials.token,
            );
        } else if (isUserCredentials(credentialsOrAuthorizer)) {
            const userCredentials = credentialsOrAuthorizer as UserCredentials;

            this._authenticator = new UserAuth(
                userCredentials.gateway,
                userCredentials.user,
                userCredentials.password,
            );
        } else if (isSecretCredentials(credentialsOrAuthorizer)) {
            const secretCredentials = credentialsOrAuthorizer as SecretCredentials;

            this._authenticator = new SecretCredentialAuth(
                secretCredentials.gateway,
                secretCredentials.clientId,
                secretCredentials.clientSecret
            );
        } else if (isClientCredentials(credentialsOrAuthorizer)) {
            const credentialsAuth = credentialsOrAuthorizer as ClientCredentials;
            this._authenticator = new CredentialAuth(
                credentialsAuth.gateway,
                credentialsAuth.basicAuth
            );
        } else {
            throw new Error("invalid constructor");
        }
    }
}
