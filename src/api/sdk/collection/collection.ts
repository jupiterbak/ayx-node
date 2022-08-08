import { toQueryString } from "../../utils";
import { SDKModels } from "../models";
import { SdkClient } from "../common/sdk-client";

/**
 * The Collection Management API provides a means form managing Collections.
 * @export
 * @extends {CollectionManagementClientV1}
 */
 export class CollectionManagementClient extends SdkClient {
    private _baseUrl: string = "/v3/collections";


    /**
     * 
     * @summary Add an insight to a Collection
     * @param {string} collectionId Collection to add to
     * @param {SDKModels.AddInsightContract} contract
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async AddInsightToCollection(collectionId: string, contract: SDKModels.AddInsightContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling AddInsightToCollection.');
        }
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling AddInsightToCollection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/insights`,
            message: "AddInsightToCollection",
            body: contract,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Add a schedule to a Collection
     * @param {string} collectionId Collection to add to
     * @param {SDKModels.AddScheduleContract} contract
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async AddScheduleToCollection(collectionId: string, contract: SDKModels.AddScheduleContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling AddScheduleToCollection.');
        }
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling AddScheduleToCollection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/insights`,
            message: "AddScheduleToCollection",
            body: contract,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Add a userGroup to a Collection
     * @param {string} collectionId Collection to add to
     * @param {SDKModels.AddUserGroupContract} addUserGroupsContract User Group and permissions information.
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async AddUserGroupToCollection(collectionId: string, addUserGroupsContract: SDKModels.AddUserGroupContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling AddUserGroupToCollection.');
        }
        // verify required parameter 'addUserGroupsContract' is not null or undefined
        if (addUserGroupsContract === null || addUserGroupsContract === undefined) {
            throw new SDKModels.RequiredError('addUserGroupsContract','Required parameter addUserGroupsContract was null or undefined when calling AddUserGroupToCollection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/userGroups`,
            message: "AddUserGroupToCollection",
            body: addUserGroupsContract,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Add a user to a Collection
     * @param {string} collectionId Collection to add user to.
     * @param {SDKModels.AddUserContract} addUsersContract User and permissions information.
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async AddUserToCollection(collectionId: string, addUsersContract: SDKModels.AddUserContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling AddUserToCollection.');
        }
        // verify required parameter 'addUsersContract' is not null or undefined
        if (addUsersContract === null || addUsersContract === undefined) {
            throw new SDKModels.RequiredError('addUsersContract','Required parameter addUsersContract was null or undefined when calling AddUserToCollection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/users`,
            message: "AddUserToCollection",
            body: addUsersContract,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Add a workflow to a Collection
     * @param {string} collectionId Collection to add to
     * @param {SDKModels.AddWorkflowContract} contract 
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async AddWorkflowToCollection(collectionId: string, contract: SDKModels.AddWorkflowContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling AddWorkflowToCollection.');
        }
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling AddWorkflowToCollection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/workflows`,
            message: "AddWorkflowToCollection",
            body: contract,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * The authenticated API user must have the \"Create Collections\" permission to use this endpoint, else 401 Unauthorized will be returned.
     * @summary Create a new Collection
     * @param {CreateCollectionContract} contract 
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<string>}
     *
     * @memberOf CollectionManagementClient
     */
     public async CreateCollection(contract: SDKModels.CreateCollectionContract): Promise<string> {
        // verify required parameter 'contract' is not null or undefined
        if (contract === null || contract === undefined) {
            throw new SDKModels.RequiredError('contract','Required parameter contract was null or undefined when calling CreateCollection.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}`,
            message: "CreateCollection",
            body: contract,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as string;
    }

    /**
     * 
     * @summary Delete a collection
     * @param {string} collectionId 
     * @param {boolean} [forceDelete]  
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<Response>}
     *
     * @memberOf CollectionManagementClient
     */
     public async DeleteCollection(collectionId: string, forceDelete?: boolean): Promise<Response> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling DeleteCollection.');
        }

        const params = {} as any;
        if(forceDelete){
            params['forceDelete'] = forceDelete;
        }

        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}?${qs}`,
            message: "DeleteCollection",
            rawResponse: true
        })) as Response;
    }

    /**
     * 
     * @summary Retrieve a collection record
     * @param {string} collectionId
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async GetCollection(collectionId: string): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling GetCollection.');
        }
        
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}`,
            message: "GetCollection",
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Retrieve all accessible collection records
     * @param {'Default' | 'Full'} [view] 
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<Array<ReducedCollectionView>>}
     *
     * @memberOf CollectionManagementClient
     */
     public async GetCollections(view?: 'Default' | 'Full'): Promise<Array<SDKModels.ReducedCollectionView>> {
        const params = {} as any;
        if(view){
            params['view'] = view;
        }

        const qs = toQueryString(params);
        
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}?${qs}`,
            message: "GetCollections",
        })) as Array<SDKModels.ReducedCollectionView>;
    }

    /**
     * 
     * @summary Remove an insight from a Collection
     * @param {string} collectionId Collection to add to
     * @param {string} insightId Insight id to remove
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async RemoveInsightFromCollection(collectionId: string, insightId: string): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling RemoveInsightFromCollection.');
        }
        // verify required parameter 'insightId' is not null or undefined
        if (insightId === null || insightId === undefined) {
            throw new SDKModels.RequiredError('insightId','Required parameter insightId was null or undefined when calling RemoveInsightFromCollection.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/insights/${insightId}`,
            message: "RemoveInsightFromCollection",
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Remove a schedule from a Collection
     * @param {string} collectionId Collection to add to
     * @param {string} scheduleId Schedule id to remove
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async RemoveScheduleFromCollection(collectionId: string, scheduleId: string): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling RemoveScheduleFromCollection.');
        }
        // verify required parameter 'scheduleId' is not null or undefined
        if (scheduleId === null || scheduleId === undefined) {
            throw new SDKModels.RequiredError('scheduleId','Required parameter scheduleId was null or undefined when calling RemoveScheduleFromCollection.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/schedules/${scheduleId}`,
            message: "RemoveScheduleFromCollection",
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Remove a user from a Collection
     * @param {string} collectionId Collection to add to
     * @param {string} userId User id to remove
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async RemoveUserFromCollection(collectionId: string, userId: string): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling RemoveUserFromCollection.');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new SDKModels.RequiredError('userId','Required parameter userId was null or undefined when calling RemoveUserFromCollection.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/users/${userId}`,
            message: "RemoveUserFromCollection",
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Remove a userGroup from a Collection
     * @param {string} collectionId Collection to add to
     * @param {string} userGroupId UserGroup id to remove
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async RemoveUserGroupFromCollection(collectionId: string, userGroupId: string): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling RemoveUserGroupFromCollection.');
        }
        // verify required parameter 'userGroupId' is not null or undefined
        if (userGroupId === null || userGroupId === undefined) {
            throw new SDKModels.RequiredError('userGroupId','Required parameter userGroupId was null or undefined when calling RemoveUserGroupFromCollection.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/userGroups/${userGroupId}`,
            message: "RemoveUserGroupFromCollection",
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Remove a workflow from a Collection
     * @param {string} collectionId Collection to add to
     * @param {string} appId Workflow id to remove
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async RemoveWorkflowFromCollection(collectionId: string, appId: string): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling RemoveWorkflowFromCollection.');
        }
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModels.RequiredError('appId','Required parameter appId was null or undefined when calling RemoveWorkflowFromCollection.');
        }

        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/workflows/${appId}`,
            message: "RemoveUserGroupFromCollection",
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Update an existing collection to change the name or owner
     * @param {string} collectionId 
     * @param {SDKModels.UpdateCollectionContract} updateCollectionContract
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async UpdateCollection(collectionId: string, updateCollectionContract: SDKModels.UpdateCollectionContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling UpdateCollection.');
        }
        // verify required parameter 'updateCollectionContract' is not null or undefined
        if (updateCollectionContract === null || updateCollectionContract === undefined) {
            throw new SDKModels.RequiredError('updateCollectionContract','Required parameter updateCollectionContract was null or undefined when calling UpdateCollection.');
        }

        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}`,
            message: "UpdateCollection",
            body: updateCollectionContract
        })) as SDKModels.CollectionView;
    }

    /**
     * 
     * @summary Update a collection userGroups permissions
     * @param {string} collectionId 
     * @param {string} userGroupId 
     * @param {SDKModels.UpdatePermissionsContract} updatePermissionsContract
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async UpdateCollectionUserGroupPermissions(collectionId: string, userGroupId: string, updatePermissionsContract: SDKModels.UpdatePermissionsContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling UpdateCollectionUserGroupPermissions.');
        }
        // verify required parameter 'userGroupId' is not null or undefined
        if (userGroupId === null || userGroupId === undefined) {
            throw new SDKModels.RequiredError('userGroupId','Required parameter userGroupId was null or undefined when calling UpdateCollectionUserGroupPermissions.');
        }
        // verify required parameter 'updatePermissionsContract' is not null or undefined
        if (updatePermissionsContract === null || updatePermissionsContract === undefined) {
            throw new SDKModels.RequiredError('updatePermissionsContract','Required parameter updatePermissionsContract was null or undefined when calling UpdateCollectionUserGroupPermissions.');
        }

        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/userGroups/${userGroupId}/permissions`,
            message: "UpdateCollectionUserGroupPermissions",
            body: updatePermissionsContract
        })) as SDKModels.CollectionView;
    }

    /**
     * For Windows Authentication configured Server instances, provide the Active Directory Sid for the userId parameter.
     * @summary Update a collection users permissions.
     * @param {string} collectionId 
     * @param {string} userId The User&#39;s identifier.   For Windows Authentication-configured Server instances, the Active Directory Sid should be provided instead.
     * @param {UpdatePermissionsContract} updatePermissionsContract 
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.CollectionView>}
     *
     * @memberOf CollectionManagementClient
     */
     public async UpdateCollectionUserPermissions(collectionId: string, userId: string, updatePermissionsContract: SDKModels.UpdatePermissionsContract): Promise<SDKModels.CollectionView> {
        // verify required parameter 'collectionId' is not null or undefined
        if (collectionId === null || collectionId === undefined) {
            throw new SDKModels.RequiredError('collectionId','Required parameter collectionId was null or undefined when calling UpdateCollectionUserPermissions.');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new SDKModels.RequiredError('userId','Required parameter userId was null or undefined when calling UpdateCollectionUserPermissions.');
        }
        // verify required parameter 'updatePermissionsContract' is not null or undefined
        if (updatePermissionsContract === null || updatePermissionsContract === undefined) {
            throw new SDKModels.RequiredError('updatePermissionsContract','Required parameter updatePermissionsContract was null or undefined when calling UpdateCollectionUserPermissions.');
        }

        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${collectionId}/users/${userId}/permissions`,
            message: "UpdateCollectionUserGroupPermissions",
            body: updatePermissionsContract
        })) as SDKModels.CollectionView;
    }



}