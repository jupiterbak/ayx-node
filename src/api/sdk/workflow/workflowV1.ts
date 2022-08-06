import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModelsV1 } from "../models/modelsV1";
//import { worflowDataTemplate, worflowVersionDataTemplate} from "./worflow-data-template";

/**
 * The Workflow Management API provides a means form managing workflows.
 * @export
 * @extends {SdkClient}
 */
 export class WorkflowManagementClientV1 extends SdkClient {
    private _baseUrlV1: string = "/v1/workflows";

    /**
     * 
     * @summary Retrieve the app that was requested
     * @param {string} appId 
     * @throws {RequiredError}
     * @returns {Promise<Response>}
     * @memberOf WorkflowManagementClientV1
     */
     public async GetAppInfoV1(appId: String): Promise<Response> {
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModelsV1.RequiredError('appId','Required parameter appId was null or undefined when calling GetAppInfo.');
        }

        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${appId}/package`,
            message: "GetAppInfo",
            rawResponse: true
        })) as Promise<Response>;
    }

    /**
     * Only app workflows can be used.
     * @summary Get the questions for the given Alteryx Analytics App
     * @param {string} appId The ID of the app for which you want to retrieve the questions.
     * @throws {RequiredError}
     * @returns {Promise<Array<QuestionApiView>>}
     * @memberOf WorkflowManagementClientV1
     */
     public async GetAppQuestionsV1(appId: String): Promise<Array<SDKModelsV1.QuestionApiView>> {
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModelsV1.RequiredError('appId','Required parameter appId was null or undefined when calling GetAppQuestions.');
        }

        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${appId}/questions`,
            message: "GetAppQuestions",
        })) as Promise<Array<SDKModelsV1.QuestionApiView>>;
    }

    /**
     * Only app workflows can be used.
     * @summary Returns the jobs for the given Alteryx Analytics App
     * @param {string} appId 
     * @param {string} [sortField] 
     * @param {string} [direction] 
     * @param {string} [offset] 
     * @param {string} [limit] 
     * @throws {RequiredError}
     * @returns {Promise<Array<JobListApiView>>}
     * @memberOf WorkflowManagementClientV1
     */
     public async GetJobsForAppV1(appId: string, sortField?: string, direction?: string, offset?: string, limit?: string): Promise<Array<SDKModelsV1.JobListApiView>> {
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModelsV1.RequiredError('appId','Required parameter appId was null or undefined when calling GetAppQuestions.');
        }

        const params = {} as any;
        if(sortField){
            params['sortField'] = sortField;
        }
        if(direction){
            params['direction'] = direction;
        }
        if(offset){
            params['offset'] = offset;
        }
        if(limit){
            params['limit'] = limit;
        }

        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${appId}/jobs?${qs}`,
            message: "GetJobsForApp",
        })) as Promise<Array<SDKModelsV1.JobListApiView>>;
    }

    /**
     * Subscription is tied to API key. You cannot request workflows for any other subscription without that subscription's key.
     * @summary Finds workflows in a subscription
     * @param {string} [sortField] The field on which in the results should be sorted.&lt;br /&gt;author; copyright;datemadepublic;description;executionmode;name;owner;runcount;subscriptionid;uploaddate;
     * @param {string} [direction] The direction of the sort used with search results.
     * @param {number} [offset] The index of the first record to return in the result set.
     * @param {number} [limit] The number of records to return.
     * @param {string} [search] Only result containing the search text will be returned.
     * @param {string} [packageType] The type of workflow to be returned, any of 1 (apps), 1(workflow), 2(macros).
     * @throws {RequiredError}
     * @returns {Promise<Array<WorkflowApiView>>}
     * @memberOf WorkflowManagementClientV1
     */
    public async GetStudioAppsV1(sortField?: string, direction?: string, offset?: number, limit?: number, search?: string, packageType?: string): Promise<Array<SDKModelsV1.WorkflowApiView>> {
        const params = {} as any;
        if(sortField){
            params['sortField'] = sortField;
        }
        if(direction){
            params['direction'] = direction;
        }
        if(offset){
            params['offset'] = offset;
        }
        if(limit){
            params['limit'] = limit;
        }
        if(search){
            params['search'] = search;
        }
        if(packageType){
            params['packageType'] = packageType;
        }

        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/subscription?${qs}`,
            message: "GetStudioAppsV1",
        })) as Promise<Array<SDKModelsV1.WorkflowApiView>>;
    }

    /**
     * Use the status request to get the results of the job.
     * @summary Queues a job execution for the specified workflow with the supplied answers
     * @param {string} appId The id for the workflow to execute.
     * @param {SDKModelsV1.AppValues} values The list of answers to execute the workflow with.          
     * @throws {RequiredError}
     * @returns {Promise<Array<WorkflowApiView>>}
     *
     * @memberOf WorkflowManagementClientV1
     */
     public async PostNewJobV1(
        appId: string, 
        values: SDKModelsV1.AppValues
    ): Promise<SDKModelsV1.JobApiView> {
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModelsV1.RequiredError('appId','Required parameter appId was null or undefined when calling PostNewJobV1.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${appId}/jobs`,
            message: "PostNewJobV1",
            body: values,
        })) as SDKModelsV1.JobApiView;
    }
}