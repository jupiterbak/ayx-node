import { SdkClient } from "../common/sdk-client";
import { SDKModelsV2 } from "../models/modelsV2";
import { userDataTemplate } from "./user-data-template";

/**
 * The User Management API provides a means form managing users.
 * @export
 * @extends {SdkClient}
 */
 export class UserManagementClientV2 extends SdkClient {
    private _baseUrlV2: string = "/user/v2";

    /**
     * 
     * @summary Finds credentials shared directly with users or via a sub
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV2.CredentialApiView>>}
     * @memberOf UserManagementClientV2
     */
     public async GetSharedCredentialsV2(): Promise<Array<SDKModelsV2.CredentialApiView>> {
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV2}/credentials`,
            message: "GetSharedCredentials",
        })) as Promise<Array<SDKModelsV2.CredentialApiView>>;
    }

    /**
     * Use the status request to get the results of the job.
     * @summary Creates a new job and adds it to the job execution queue
     * @param {string} appId 
     * @param {SDKModelsV2.AppValuesV2} values 
     * @throws {RequiredError}
     * @returns {Promise<JobApiView>}
     *
     * @memberOf UserManagementClientV2
     */
     public async PostNewJobV2(appId: string, values: SDKModelsV2.AppValuesV2): Promise<SDKModelsV2.JobApiView> {
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModelsV2.RequiredError('appId','Required parameter appId was null or undefined when calling PostNewJobV2.');
        }
        // verify required parameter 'values' is not null or undefined
        if (values === null || values === undefined) {
            throw new SDKModelsV2.RequiredError('values','Required parameter values was null or undefined when calling PostNewJobV2.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV2}/workflows/${appId}/jobs`,
            message: "PostNewJobV2",
            body: values,
        })) as SDKModelsV2.JobApiView;
    }

    /**
     * 
     * @summary Published a temp file to be used in a subsequent workflow execution
     * @param {any} file 
     * @throws {RequiredError}
     * @returns {Promise<string>}
     * @memberOf AdminManagementClientV1
     */
     public async publishTempFileV2(file: any, name: string): Promise<string> {
        // verify required parameter 'file' is not null or undefined
        if (file === null || file === undefined) {
            throw new SDKModelsV2.RequiredError('file','Required parameter file was null or undefined when calling publishTempFileV2.');
        }
        if (name === null || name === undefined) {
            throw new SDKModelsV2.RequiredError('file','Required parameter name was null or undefined when calling publishTempFileV2.');
        }
        
        const params = {} as any;
        if(file){
            params['file'] = file;
        }
        if(name){
            params['name'] = file;
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV2}/inputfiles`,
            message: "publishTempFileV2",
            body: userDataTemplate(params),
            multiPartFormData: true,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as string;
    }

}