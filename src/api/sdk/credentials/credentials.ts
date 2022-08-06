import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModels } from "../models";

/**
 * The Credential Management API provides a means to manage data connections.
 * @export
 * @extends {SdkClient}
 */
 export class CredentialsManagementClient extends SdkClient {
    private _baseUrl: string = "/v3/credentials";

    /**
     * 
     * @summary Delete a credential
     * @param {string} credentialId 
     * @param {boolean} [force] cleans up any shares
     * @returns {Promise<Array<CredentialsView>>}
     * @throws {RequiredError}
     * 
     * @memberOf CredentialsManagementClient
     */
     public async DeleteCredential(
        credentialId: string,
        force?: boolean
    ): Promise<Array<SDKModels.CredentialsView>> {
        // verify required parameter 'credentialId' is not null or undefined
        if (credentialId === null || credentialId === undefined) {
            throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling DeleteCredential.');
        }

        const qs = toQueryString({force:force || false});

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${credentialId}?${qs}`,
            message: "DeleteCredential",
        })) as Array<SDKModels.CredentialsView>;
    }

    /**
     * @summary Retrieve a credential record
     * @param {string} credentialId 
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CredentialsView>}
     * @memberOf CredentialsManagementClient
     */
     public async GetCredential(credentialId: string): Promise<SDKModels.CredentialsView> {
        // verify required parameter 'credentialId' is not null or undefined
        if (credentialId === null || credentialId === undefined) {
            throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling GetCredential.');
        }

        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${credentialId}`,
            message: "GetCredentials",
        })) as Promise<SDKModels.CredentialsView>;
    }

    /**
     * @summary Retrieve all Credential records
     * @param {{
     *          view?: 'Default' | 'Full', 
     *          userId?: string, 
     *          userGroupId?: string, 
     *         }} [params]
     * @param {'Default' | 'Full'} [param.view] 
     * @param {string} [param.view] Filter results by userId
     * @param {string} [param.userId] Filter results by userGroupId
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModels.ReducedCredentialsView>>}
     *
     * @memberOf CredentialsManagementClient
     */
     public async GetCredentials(
        params?: {
            view?: 'Default' | 'Full', 
            userId?: string, 
            userGroupId?: string,
        }
    ): Promise<Array<SDKModels.ReducedCredentialsView>> {
        const qs = toQueryString(params);

        return (await this.HttpAction({
             verb: "GET",
             gateway: this.GetGateway(),
             authorization: await this.GetToken(),
             baseUrl: `${this._baseUrl}?${qs}`,
             message: "GetCredentials",
         })) as Array<SDKModels.ReducedCredentialsView>;
    }

    /**
     * 
     * @summary Share a credential with a user
     * @param {string} credentialId 
     * @param {SDKModels.AddCredentialsUserContract} contract
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.CredentialsView>}
     *
     * @memberOf CredentialsManagementClient
     */
     public async ShareCredentialWithUser(
        credentialId: string, 
        contract: SDKModels.AddCredentialsUserContract
    ): Promise<SDKModels.CredentialsView> {
        // verify required parameter 'credentialId' is not null or undefined
        if (credentialId === null || credentialId === undefined) {
            throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling ShareCredentialWithUser.');
        }
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling ShareCredentialWithUser.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${credentialId}/users`,
            message: "ShareCredentialWithUser",
            body: contract,
        })) as SDKModels.CredentialsView;
    }

    /**
     * 
     * @summary Share a credential with a userGroup
     * @param {string} credentialId 
     * @param {SDKModels.AddCredentialsUserGroupContract} contract
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.CredentialsView>}
     *
     * @memberOf CredentialsManagementClient
     */
     public async ShareCredentialWithUserGroup(
        credentialId: string, 
        contract: SDKModels.AddCredentialsUserGroupContract
    ): Promise<SDKModels.CredentialsView> {
       // verify required parameter 'credentialId' is not null or undefined
        if (credentialId === null || credentialId === undefined) {
            throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling ShareCredentialWithUserGroup.');
        }
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling ShareCredentialWithUserGroup.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${credentialId}/users`,
            message: "ShareCredentialWithUserGroup",
            body: contract,
        })) as SDKModels.CredentialsView;
    }

    

    /**
     * 
     * @summary Removes a user from a credential
     * @param {string} credentialId 
     * @param {string} userId 
     * @returns {Promise<SDKModels.CredentialsView>}
     * @throws {RequiredError}
     * 
     * @memberOf CredentialsManagementClient
     */
     public async RemoveUserFromCredential(
        credentialId: string, 
        userId: string,
    ): Promise<SDKModels.CredentialsView> {
        // verify required parameter 'credentialId' is not null or undefined
        if (credentialId === null || credentialId === undefined) {
            throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling RemoveUserFromCredential.');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new SDKModels.RequiredError('userId','Required parameter userId was null or undefined when calling RemoveUserFromCredential.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${credentialId}/users/${userId}`,
            message: "RemoveUserFromCredential",
        })) as SDKModels.CredentialsView;
    }

    /**
     * 
     * @summary Removes a userGroup from a credential
     * @param {string} credentialId 
     * @param {string} userGroupId 
     * @returns {Promise<SDKModels.CredentialsView>}
     * @throws {RequiredError}
     * 
     * @memberOf CredentialsManagementClient
     */
     public async RemoveUserGroupFromCredential(
        credentialId: string, 
        userGroupId: string,
    ): Promise<SDKModels.CredentialsView> {
        // verify required parameter 'credentialId' is not null or undefined
        if (credentialId === null || credentialId === undefined) {
            throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling RemoveUserGroupFromCredential.');
        }
        // verify required parameter 'userGroupId' is not null or undefined
        if (userGroupId === null || userGroupId === undefined) {
            throw new SDKModels.RequiredError('userGroupId','Required parameter userGroupId was null or undefined when calling RemoveUserGroupFromCredential.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${credentialId}/userGroups/${userGroupId}`,
            message: "RemoveUserFromCredential",
        })) as SDKModels.CredentialsView;
    }

}