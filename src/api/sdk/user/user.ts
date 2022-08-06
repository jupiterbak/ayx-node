import { toQueryString } from "../../utils";
import { SDKModels } from "../models";
import { UserManagementClientV2 } from "./userV2";

/**
 * The User Management API provides a means form managing users.
 * @export
 * @extends {SdkClient}
 */
 export class UserManagementClient extends UserManagementClientV2 {
    private _baseUrl: string = "/v3/users";

    /**
     * 
     * @summary Retrieve a User record
     * @param {string} id The identifier for the user to be retrieved
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.UserView>}
     * @memberOf UserManagementClient
     */
     public async GetUser(id: string): Promise<SDKModels.UserView> {
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "GetUser",
        })) as Promise<SDKModels.UserView>;
    }

    /**
     * If the searchContract.Verbose is set to false, then a reduced view object will be returned.
     * @summary Search for User records
     * @param {{
     *          view?: 'Default' | 'Full', 
     *          active?: boolean, 
     *          email?: string, 
     *          role?: 'NoAccess' | 'Viewer' | 'Member' | 'Artisan' | 'Curator' | 'Evaluated', 
     *          firstName?: string, 
     *          lastName?: string, 
     *          createdAfter?: Date, 
     *          createdBefore?: Date
     *         }} [params]
     * @param {'Default' | 'Full'} [param.view] 
     * @param {boolean} [param.active] 
     * @param {string} [param.email] 
     * @param {'NoAccess' | 'Viewer' | 'Member' | 'Artisan' | 'Curator' | 'Evaluated'} [role] 
     * @param {string} [param.firstName] 
     * @param {string} [param.lastName] 
     * @param {Date} [param.createdAfter] 
     * @param {Date} [param.createdBefore] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModels.UserView>>}
     *
     * @memberOf UserManagementClient
     */
     public async GetUsers(
        params?: {
         view?: 'Default' | 'Full', 
         active?: boolean, 
         email?: string, 
         role?: 'NoAccess' | 'Viewer' | 'Member' | 'Artisan' | 'Curator' | 'Evaluated', 
         firstName?: string, 
         lastName?: string, 
         createdAfter?: Date, 
         createdBefore?: Date
        }): Promise<Array<SDKModels.UserView>> {
         const qs = toQueryString(params);
         return (await this.HttpAction({
             verb: "GET",
             gateway: this.GetGateway(),
             authorization: await this.GetToken(),
             baseUrl: `${this._baseUrl}?${qs}`,
             message: "GetUsers",
         })) as Array<SDKModels.UserView>;
    }

    /**
     * 
     * @summary Retrieve a full list of assets that a user owns.
     * @param {string} id The Id of the user to get assets for
     * @param {'All' | 'Workflows' | 'Schedules' | 'Collections' | 'Insights'} [assetType] The type of assets I want to return (defaulted to All)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.AssetsView>}
     * @memberOf UserManagementClient
     */
     public async GetUsersAssets(id: string, assetType?: 'All' | 'Workflows' | 'Schedules' | 'Collections' | 'Insights'): Promise<SDKModels.AssetsView> {
        const qs = toQueryString({assetType:assetType});
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}/assets?${qs}`,
            message: "GetUsersAssets",
        })) as Promise<SDKModels.AssetsView>;
    }

    /**
     * This endpoint cannot be used for Windows Authentication configured Server instances.
     * @summary Creates a new User record
     * @param {CreateUserContract} userContract The request body structure required to make a new user
     * @returns {Promise<SDKModels.UserView>}
     *
     * @memberOf UserManagementClient
     */
     public async CreateUser(
        userContract: SDKModels.CreateUserContract
    ): Promise<SDKModels.UserView> {
        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}`,
            message: "CreateUser",
            body: userContract,
        })) as SDKModels.UserView;
    }

    /**
     * 
     * @summary Deactivate a user in the system
     * @param {string} id
     * @returns {Promise<Array<string>>}
     *
     * @memberOf UserManagementClient
     */
     public async DeactivateUser(
        id: string
    ): Promise<Array<string>> {
        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}/deactivate`,
            message: "DeactivateUser",
        })) as Array<string>;
    }

     /**
     * This endpoint cannot be used for Windows Authentication configured Server instances.  This endpoint cannot be used for SAML Authentication configured Server instances.
     * @summary Sends a password reset email to the given user.
     * @param {string} id 
     * @returns {Promise<Response>}
     *
     * @memberOf UserManagementClient
     */
     public async SendPasswordReset(
        id: string
    ): Promise<Response> {
        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}/passwordReset`,
            message: "SendPasswordReset",
            rawResponse: true
        })) as Response;
    }

    /**
     * The Id of the updateContract will be overwritten by the id value in the URL.
     * @summary Update an existing User
     * @param {string} id The Id of the user to be updated
     * @param {UpdateUserContract} updateContract The request body structure
     * @returns {Promise<SDKModels.UserView>}
     *
     * @memberOf UserManagementClient
     */
     public async UpdateUser(
        id: string, 
        updateContract: SDKModels.UpdateUserContract
    ): Promise<SDKModels.UserView> {
        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "UpdateUser",
            body: updateContract,
        })) as SDKModels.UserView;
    }

    /**
     * If the user has any assets (Workflows, schedules, collections, insights) or user groups, then the  user cannot be deleted.
     * @summary Delete a user from the system
     * @param {string} id 
     * @returns {Promise<Response>}
     *
     * @memberOf UserManagementClient
     */
     public async DeleteUser(
        id: string
    ): Promise<Response> {
        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "DeleteUser",
            rawResponse:true
        })) as Response;
    }

}