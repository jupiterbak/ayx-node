import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModels } from "../models";

/**
 * The Group Management API provides a means form managing usergroups.
 * @export
 * @extends {SdkClient}
 */
 export class UserGroupManagementClient extends SdkClient {
    private _baseUrl: string = "/v3/usergroups";

    /**
     * Only works for Custom User Groups. Active Directory Groups cannot be retrieved from this endpoint.
     * @summary Retrieve a Custom User Group
     * @param {string} id 
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.UserGroupView>}
     * @memberOf UserGroupManagementClient
     */
     public async GetUserGroup(id: string): Promise<SDKModels.UserGroupView> {
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "GetUserGroup",
        })) as Promise<SDKModels.UserGroupView>;
    }

    /**
     * Only Custom User Groups will be retrieved. No Active Directory Groups will be returned.
     * @summary Get all Custom User Groups
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModels.ReducedUserGroupView>>}
     *
     * @memberOf UserGroupManagementClient
     */
     public async GetUserGroups(): Promise<Array<SDKModels.ReducedUserGroupView>> {
         return (await this.HttpAction({
             verb: "GET",
             gateway: this.GetGateway(),
             authorization: await this.GetToken(),
             baseUrl: `${this._baseUrl}`,
             message: "GetUserGroups",
         })) as Array<SDKModels.ReducedUserGroupView>;
    }

    /**
     * 
     * @summary Create a new Custom User Group
     * @param {CreateUserGroupContract} contract
     * @throws {RequiredError}
     * @returns {Promise<string>}
     *
     * @memberOf UserGroupManagementClient
     */
     public async CreateUserGroup(
        contract: SDKModels.CreateUserGroupContract
    ): Promise<string> {
        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}`,
            message: "CreateUser",
            body: contract,
        })) as string;
    }

    /**
     * 
     * @summary Add one or more users to a user group
     * @param {string} id The user group id
     * @param {Array<string>} userIds User identifiers to add to the group
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.UserGroupAddedUsersView>}
     *
     * @memberOf UserGroupManagementClient
     */
     public async AddUsersToGroup(
        id: string,
        userIds: Array<string>
    ): Promise<SDKModels.UserGroupAddedUsersView> {
        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}/users`,
            message: "AddUsersToGroup",
            body: userIds,
        })) as SDKModels.UserGroupAddedUsersView;
    }

    /**
     * 
     * @summary Update a User Group's name and role
     * @param {string} id 
     * @param {UpdateUserGroupContract} contract
     * @returns {Promise<Response>}
     * @throws {RequiredError}
     * 
     * @memberOf UserGroupManagementClient
     */
     public async UpdateUserGroup(
        id: string, 
        contract: SDKModels.UpdateUserGroupContract
    ): Promise<Response > {
        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "UpdateUserGroup",
            body: contract,
            rawResponse:true
        })) as Response;
    }

    /**
     * Will return a 400 Bad Request if the user group is not empty and the forceDelete query param is false.
     * @summary Delete a Custom User Group from the system
     * @param {string} id The identifier of the User Group
     * @param {boolean} [forceDelete] Delete the user group even if the group is not empty
     * @returns {Promise<Response>}
     * @throws {RequiredError}
     * 
     * @memberOf UserGroupManagementClient
     */
     public async DeleteUserGroup(
        id: string,
        forceDelete?: boolean
    ): Promise<Response> {
        const qs = toQueryString({forceDelete:forceDelete || false});
        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}?${qs}`,
            message: "DeleteUserGroup",
            rawResponse:true
        })) as Response;
    }

    /**
     * If the user is not a part of the group, then an OK response will be returned.
     * @summary Remove a User from a User Group
     * @param {string} userGroupId 
     * @param {string} userId 
     * @returns {Promise<SDKModels.UserGroupView>}
     * @throws {RequiredError}
     * 
     * @memberOf UserGroupManagementClient
     */
     public async RemoveUserFromGroup(
        userGroupId: string,
        userId: string
    ): Promise<SDKModels.UserGroupView> {
        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${userGroupId}/users/${userId}`,
            message: "RemoveUserFromGroup",
        })) as SDKModels.UserGroupView;
    }

}