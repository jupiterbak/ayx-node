import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModelsV2 } from "../models/modelsV2";
import { adminWorkflowDataTemplate} from "./admin-data-template";
import { AdminManagementClientV1 } from "./adminV1";

/**
 * The Admin Management API provides a means to automate administrative tasks (API V1).
 * @export
 * @extends {SdkClient}
 */
 export class AdminManagementClientV2 extends AdminManagementClientV1 {
    private _baseUrlV2: string = "/admin/v2";

   /**
     * 
     * @summary Return all workflows, optionally filtered by date
     * @param {string} [name] The name of the workflow to filter on.
     * @param {string} [startDate] The starting date to filter on, inclusive.
     * @param {string} [endDate] The ending date to filter on, inclusive.
     * @param {string} [subscriptionId] 
     * @param {number} [page] The page number to start. (Zero based)
     * @param {number} [pageSize] Workflows per page. (Zero means return all)
     * @param {boolean} [useEvents] Whether to use audit event dates to filter.
     * @throws {RequiredError}
     * @returns {Promise<Array<WorkflowAllAdminApiView>>}
     * @memberOf AdminManagementClientV2
     */
     public async AdminGetAllAppsV2(name?: string, startDate?: string, endDate?: string, subscriptionId?: string, page?: number, pageSize?: number, useEvents?: boolean): Promise<Array<SDKModelsV2.WorkflowAllAdminApiView>> {
        const params = {} as any;
        if(name){
            params['name'] = name;
        }
        if(startDate){
            params['startDate'] = startDate;
        }
        if(endDate){
            params['endDate'] = endDate;
        }
        if(subscriptionId){
            params['subscriptionId'] = subscriptionId;
        }
        if(page){
            params['page'] = page;
        }
        if(pageSize){
            params['pageSize'] = pageSize;
        }
        if(useEvents){
            params['useEvents'] = useEvents;
        }
        
        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV2}/workflows/all?${qs}`,
            message: "AdminGetAllAppsV1",
        })) as Promise<Array<SDKModelsV2.WorkflowAllAdminApiView>>;
    }

    /**
     * Only Gallery Curators(Admins) can us this API endpoint.
     * @summary Finds insights in a Gallery
     * @param {string} [search] Only results containing the search text will be returned.
     * @param {number} [offset] The index of the first record to return in the result set.
     * @param {number} [limit] The number of records to return.
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV2.InsightMetaInfo>>}
     * @memberOf AdminManagementClientV2
     */
     public async AdminGetInsightsV2(search?: string, offset?: number, limit?: number): Promise<Array<SDKModelsV2.InsightMetaInfo>> {
        const params = {} as any;
        if(search){
            params['search'] = search;
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
            baseUrl: `${this._baseUrlV2}/insights?${qs}`,
            message: "AdminGetAppsV2",
        })) as Array<SDKModelsV2.InsightMetaInfo>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Finds subscriptions in a Gallery
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV2.AdminApiSubscriptionView>>}
     * @memberOf AdminManagementClientV2
     */
     public async AdminGetPagedSubscriptionsV2(page?: number, pageSize?: number): Promise<Array<SDKModelsV2.AdminApiSubscriptionView>> {
        const params = {} as any;
        if(page){
            params['page'] = page;
        }
        if(pageSize){
            params['pageSize'] = pageSize;
        }
        
        const qs = toQueryString(params);        
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV2}/subscriptions?${qs}`,
            message: "AdminGetPagedSubscriptionsV1",
        })) as Array<SDKModelsV2.AdminApiSubscriptionView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Finds users in a Gallery
     * @param {string} [subscriptionId] 
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV2.AdminApiSubscriptionView>>}
     * @memberOf AdminManagementClientV2
     */
     public async AdminGetPagedUsersV2(subscriptionId?: string, page?: number, pageSize?: number): Promise<Array<SDKModelsV2.AdminApiSubscriptionView>> {
        const params = {} as any;
        if(subscriptionId){
            params['subscriptionId'] = subscriptionId;
        }
        if(page){
            params['page'] = page;
        }
        if(pageSize){
            params['pageSize'] = pageSize;
        }
        
        const qs = toQueryString(params);        
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV2}/users?${qs}`,
            message: "AdminGetPagedUsersV1",
        })) as Array<SDKModelsV2.AdminApiSubscriptionView>;
    }

    /**
     * Time range must be less than a 45 day window.<br />  Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Forecasts all future run jobs for the given time period
     * @param {Date} beforeDate Will only return jobs that will run before this date.
     * @param {Date} afterDate Will only reutnr jobs that will run after this date.
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV2.ScheduleForecastView>>}
     * @memberOf AdminManagementClientV2
     */
     public async AdminGetScheduleForecastV2(beforeDate: Date, afterDate: Date): Promise<Array<SDKModelsV2.ScheduleForecastView>> {
        // verify required parameter 'beforeDate' is not null or undefined
        if (beforeDate === null || beforeDate === undefined) {
            throw new SDKModelsV2.RequiredError('beforeDate','Required parameter beforeDate was null or undefined when calling AdminGetScheduleForecastV2.');
        }
        // verify required parameter 'afterDate' is not null or undefined
        if (afterDate === null || afterDate === undefined) {
            throw new SDKModelsV2.RequiredError('afterDate','Required parameter afterDate was null or undefined when calling AdminGetScheduleForecastV2.');
        }

        const params = {} as any;
        if(beforeDate){
            params['beforeDate'] = beforeDate;
        }
        if(afterDate){
            params['afterDate'] = afterDate;
        }
                
        const qs = toQueryString(params);        
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV2}/schedule/forecast?${qs}`,
            message: "AdminGetPagedUsersV1",
        })) as Array<SDKModelsV2.ScheduleForecastView>;
    }
}