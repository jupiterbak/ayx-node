import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModels } from "../models";

/**
 * The Server Connection API provides a means for managing the Alteryx server data connections.
 * @export
 * @extends {SdkClient}
 */
 export class ServerConnectionClient extends SdkClient {
    private _baseUrl: string = "/v3/serverDataConnections";

    /**
     * @summary Retrieve all server data connection records
     * @param {{
     *          view?: 'Default' | 'Full', 
     *         }} [params]
     * @param {'Default' | 'Full'} [param.view] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModels.ReducedServerConnectionView>>}
     *
     * @memberOf ServerConnectionClient
     */
     public async GetServerDataConnections(
        params?: {
            view?: 'Default' | 'Full'
        }
    ): Promise<Array<SDKModels.ReducedServerConnectionView>> {
        const qs = toQueryString(params);

        return (await this.HttpAction({
             verb: "GET",
             gateway: this.GetGateway(),
             authorization: await this.GetToken(),
             baseUrl: `${this._baseUrl}?${qs}`,
             message: "GetServerDataConnections",
         })) as Array<SDKModels.ReducedServerConnectionView>;
    }

    /**
     * 
     * @summary Delete a server data connection
     * @param {string} dataConnectionId 
     * @returns {Promise<Response>}
     * @throws {RequiredError}
     * 
     * @memberOf ServerConnectionClient
     */
    public async DeleteServerDataConnection(
        dataConnectionId: string
    ): Promise<Response> {
        // verify required parameter 'dataConnectionId' is not null or undefined
        if (dataConnectionId === null || dataConnectionId === undefined) {
            throw new SDKModels.RequiredError('dataConnectionId','Required parameter dataConnectionId was null or undefined when calling DeleteServerDataConnection.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${dataConnectionId}`,
            message: "DeleteServerDataConnection",
            rawResponse: true
        })) as Response;
    }

    /**
     * @summary Retrieve a server data connection record
     * @param {string} dataConnectionId 
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.ServerConnectionView>}
     * @memberOf ServerConnectionClient
     */
     public async GetServerDataConnection(dataConnectionId: string): Promise<SDKModels.ServerConnectionView> {
        // verify required parameter 'dataConnectionId' is not null or undefined
        if (dataConnectionId === null || dataConnectionId === undefined) {
            throw new SDKModels.RequiredError('dataConnectionId','Required parameter dataConnectionId was null or undefined when calling ServerConnectionClient.');
        }

        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${dataConnectionId}`,
            message: "GetServerDataConnection",
        })) as Promise<SDKModels.ServerConnectionView>;
    }
    
    /**
     * @summary Update an existing server data connection to change the connection name
     * @param {string} dataConnectionId 
     * @param {UpdateServerConnectionContract} updateServerConnectionContract 
     * @returns {Promise<SDKModels.ScheduleView>}
     * @throws {RequiredError}
     * 
     * @memberOf ServerConnectionClient
     */
    public async UpdateServerDataConnectionName(
        dataConnectionId: string, 
        updateServerConnectionContract: SDKModels.UpdateServerConnectionContract
    ): Promise<SDKModels.ServerConnectionView> {
        // verify required parameter 'dataConnectionId' is not null or undefined
        if (dataConnectionId === null || dataConnectionId === undefined) {
            throw new SDKModels.RequiredError('dataConnectionId','Required parameter dataConnectionId was null or undefined when calling UpdateServerDataConnectionName.');
        }
        // verify required parameter 'updateServerConnectionContract' is not null or undefined
        if (updateServerConnectionContract === null || updateServerConnectionContract === undefined) {
            throw new SDKModels.RequiredError('updateServerConnectionContract','Required parameter updateServerConnectionContract was null or undefined when calling UpdateServerDataConnectionName.');
        }

        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${dataConnectionId}`,
            message: "UpdateServerDataConnectionName",
            body: updateServerConnectionContract,
        })) as SDKModels.ServerConnectionView;
    }

    /**
     * 
     * @summary Add a user to an existing server data connection
     * @param {string} dataConnectionId 
     * @param {AddServerConnectionUserContract} contract 
     * @returns {Promise<SDKModels.ScheduleView>}
     * @throws {RequiredError}
     * 
     * @memberOf ServerConnectionClient
     */
    public async AddUserToServerDataConnection(
        dataConnectionId: string, 
        contract: SDKModels.AddServerConnectionUserContract
    ): Promise<SDKModels.ServerConnectionView> {
        // verify required parameter 'dataConnectionId' is not null or undefined
        if (dataConnectionId === null || dataConnectionId === undefined) {
            throw new SDKModels.RequiredError('dataConnectionId','Required parameter dataConnectionId was null or undefined when calling AddUserToServerDataConnection.');
        }
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling AddUserToServerDataConnection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${dataConnectionId}/users`,
            message: "AddUserToServerDataConnection",
            body: contract,
        })) as SDKModels.ServerConnectionView;
    }

    /**
     * 
     * @summary Add a user to an existing server data connection
     * @param {string} dataConnectionId 
     * @param {SDKModels.AddServerConnectionUserContract} contract 
     * @returns {Promise<SDKModels.ScheduleView>}
     * @throws {RequiredError}
     * 
     * @memberOf ServerConnectionClient
     */
    public async AddUserGroupToServerDataConnection(
        dataConnectionId: string,
        contract: SDKModels.AddServerConnectionUserGroupContract
    ): Promise<SDKModels.ServerConnectionView> {
        // verify required parameter 'dataConnectionId' is not null or undefined
        if (dataConnectionId === null || dataConnectionId === undefined) {
            throw new SDKModels.RequiredError('dataConnectionId','Required parameter dataConnectionId was null or undefined when calling AddUserGroupToServerDataConnection.');
        }
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling AddUserGroupToServerDataConnection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${dataConnectionId}/userGroups`,
            message: "AddUserGroupToServerDataConnection",
            body: contract,
        })) as SDKModels.ServerConnectionView;
    }

    /**
     * 
     * @summary Removes a user from a credential
     * @param {string} credentialId 
     * @param {string} userId 
     * @returns {Promise<SDKModels.ServerConnectionView>}
     * @throws {RequiredError}
     * 
     * @memberOf ServerConnectionClient
     */
     public async RemoveUserFromServerDataConnection(
         dataConnectionId: string, 
         userId: string
    ): Promise<SDKModels.ServerConnectionView> {
        // verify required parameter 'dataConnectionId' is not null or undefined
        if (dataConnectionId === null || dataConnectionId === undefined) {
            throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling RemoveUserFromServerDataConnection.');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new SDKModels.RequiredError('userId','Required parameter userId was null or undefined when calling RemoveUserFromServerDataConnection.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${dataConnectionId}/users/${userId}`,
            message: "RemoveUserFromServerDataConnection",
        })) as SDKModels.ServerConnectionView;
    }

    /**
     * 
     * @summary Remove a userGroup from an existing server data connection
     * @param {string} dataConnectionId 
     * @param {string} userGroupId 
     * @returns {Promise<SDKModels.ServerConnectionView>}
     * @throws {RequiredError}
     * 
     * @memberOf ServerConnectionClient
     */
     public async RemoveUserGroupFromServerDataConnection(
        dataConnectionId: string, 
        userGroupId: string
   ): Promise<SDKModels.ServerConnectionView> {
       // verify required parameter 'dataConnectionId' is not null or undefined
       if (dataConnectionId === null || dataConnectionId === undefined) {
           throw new SDKModels.RequiredError('credentialId','Required parameter credentialId was null or undefined when calling RemoveUserGroupFromServerDataConnection.');
       }
       // verify required parameter 'userId' is not null or undefined
       if (userGroupId === null || userGroupId === undefined) {
           throw new SDKModels.RequiredError('userGroupId','Required parameter userGroupId was null or undefined when calling RemoveUserGroupFromServerDataConnection.');
       }

       return (await this.HttpAction({
           verb: "DELETE",
           gateway: this.GetGateway(),
           authorization: await this.GetToken(),
           baseUrl: `${this._baseUrl}/${dataConnectionId}/userGroups/${userGroupId}`,
           message: "RemoveUserGroupFromServerDataConnection",
       })) as SDKModels.ServerConnectionView;
   }
}