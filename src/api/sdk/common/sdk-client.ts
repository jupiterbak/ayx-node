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

    /**
     * Performs an HTTP request to the Alteryx API through the configured authenticator.
     * 
     * This method delegates the HTTP request to the authenticator's HttpAction method,
     * which ensures that all requests are properly authenticated. The authenticator
     * handles token renewal, request formatting, and error handling.
     * 
     * This design pattern centralizes authentication logic and ensures consistent
     * handling of API requests across all SDK client classes.
     *
     * @param {Object} options - The HTTP request configuration
     * @param {string} options.verb - HTTP method (GET, POST, PATCH, PUT, DELETE)
     * @param {string} options.gateway - Base URL of the API gateway
     * @param {string} options.baseUrl - Endpoint path to append to the gateway URL
     * @param {string} options.authorization - Authorization token for the request
     * @param {Object} [options.body] - Request body for POST, PUT, PATCH requests
     * @param {string} [options.message] - Descriptive message for logging purposes
     * @param {boolean} [options.octetStream] - Whether to use octet-stream content type
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
        // Delegate the HTTP request to the authenticator's HttpAction method
        // This ensures all requests use the same authentication mechanism
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
     * Creates a client for AYX Server API with flexible authentication options.
     * 
     * This constructor implements a flexible authentication strategy pattern that supports
     * multiple authentication mechanisms through a single unified interface. It determines
     * the type of credentials provided and creates the appropriate authenticator.
     *
     * @param {(TokenRotation | UserCredentials | ClientCredentials | SecretCredentials | TokenCredentials)} [credentialsOrAuthorizer]
     * The authentication credentials or authenticator to use. This can be:
     * 
     * 1. A custom authenticator implementing the TokenRotation interface
     * 2. Token credentials (pre-existing token)
     * 3. User credentials (username/password)
     * 4. Secret credentials (client ID/secret for OAuth)
     * 5. Client credentials (basic auth)
     * 
     * Each credential type is handled differently:
     * - TokenRotation: Used directly as the authenticator
     * - TokenCredentials: Creates a TokenManagerAuth instance
     * - UserCredentials: Creates a UserAuth instance
     * - SecretCredentials: Creates a SecretCredentialAuth instance
     * - ClientCredentials: Creates a CredentialAuth instance
     *
     * @throws {Error} If no credentials are provided or if the provided credentials
     * don't match any of the supported types
     * 
     * @memberOf SdkClient
     */
    constructor(credentialsOrAuthorizer?: TokenRotation | UserCredentials | ClientCredentials | SecretCredentials | TokenCredentials) {
        // Credentials must be provided
        if (credentialsOrAuthorizer === undefined) {
            throw new Error("invalid autorizer.");
        } 
        // Case 1: Custom authenticator implementing TokenRotation
        else if (isTokenRotation(credentialsOrAuthorizer)) {
            // Use the provided authenticator directly
            this._authenticator = credentialsOrAuthorizer as TokenRotation;
        } 
        // Case 2: Token credentials (pre-existing token)
        else if (isTokenCredentials(credentialsOrAuthorizer)) {
            const userCredentials = credentialsOrAuthorizer as TokenCredentials;
            
            // Create a TokenManagerAuth that uses the provided token
            this._authenticator = new TokenManagerAuth(
                userCredentials.gateway,
                userCredentials.token,
            );
        } 
        // Case 3: User credentials (username/password)
        else if (isUserCredentials(credentialsOrAuthorizer)) {
            const userCredentials = credentialsOrAuthorizer as UserCredentials;
            
            // Create a UserAuth that handles username/password authentication
            this._authenticator = new UserAuth(
                userCredentials.gateway,
                userCredentials.user,
                userCredentials.password,
            );
        } 
        // Case 4: Secret credentials (client ID/secret for OAuth)
        else if (isSecretCredentials(credentialsOrAuthorizer)) {
            const secretCredentials = credentialsOrAuthorizer as SecretCredentials;
            
            // Create a SecretCredentialAuth that handles OAuth client credentials flow
            this._authenticator = new SecretCredentialAuth(
                secretCredentials.gateway,
                secretCredentials.clientId,
                secretCredentials.clientSecret
            );
        } 
        // Case 5: Client credentials (basic auth)
        else if (isClientCredentials(credentialsOrAuthorizer)) {
            const credentialsAuth = credentialsOrAuthorizer as ClientCredentials;
            
            // Create a CredentialAuth that handles basic authentication
            this._authenticator = new CredentialAuth(
                credentialsAuth.gateway,
                credentialsAuth.basicAuth
            );
        } 
        // None of the supported credential types matched
        else {
            throw new Error("invalid constructor");
        }
    }
}
