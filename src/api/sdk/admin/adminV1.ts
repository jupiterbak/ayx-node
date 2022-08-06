import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModelsV1 } from "../models/modelsV1";
import { adminWorkflowDataTemplate} from "./admin-data-template";

/**
 * The Admin Management API provides a means to automate administrative tasks (API V1).
 * @export
 * @extends {SdkClient}
 */
 export class AdminManagementClientV1 extends SdkClient {
    private _baseUrlV1: string = "/admin/v1";

   /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Return all workflows, optionally filtered by date
     * @param {string} [startDate] The starting date to filter on, inclusive.
     * @param {string} [endDate] The ending date to filter on, inclusive.
     * @param {number} [page] The page number to start. (Zero based)
     * @param {number} [pageSize] Workflows per page. (Zero means return all)
     * @throws {RequiredError}
     * @returns {Promise<Array<WorkflowAllAdminApiView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetAllAppsV1(startDate?: string, endDate?: string, page?: number, pageSize?: number): Promise<Array<SDKModelsV1.WorkflowAllAdminApiView>> {
        const params = {} as any;
        if(startDate){
            params['startDate'] = startDate;
        }
        if(endDate){
            params['endDate'] = endDate;
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
            baseUrl: `${this._baseUrlV1}/workflows/all?${qs}`,
            message: "AdminGetAllAppsV1",
        })) as Promise<Array<SDKModelsV1.WorkflowAllAdminApiView>>;
    }

    /**
     * 
     * @summary Returns the app that was requested
     * @param {string} appId
     * @throws {RequiredError}
     * @returns {Promise<Response>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetAppInfoV1(appId: string): Promise<Response> {
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModelsV1.RequiredError('appId','Required parameter appId was null or undefined when calling AdminGetAppInfoV1.');
        }

        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${appId}/package`,
            message: "AdminGetAppInfoV1",
            rawResponse: true
        })) as Response;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Returns the last run job and its current state for workflows
     * @param {string} [appIds] The ID of the apps for which you want to retrieve metadata in a comma seperated list. Returns all if not specified
     * @param {string} [includeMessages] Whether or not to return messages. True by default
     * @throws {RequiredError}
     * @returns {Promise<Array<JobApiView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetAppOutputInfoV1(appIds?: string, includeMessages?: string): Promise<Array<SDKModelsV1.JobApiView>> {
        const params = {} as any;
        if(appIds){
            params['appIds'] = appIds;
        }
        if(includeMessages){
            params['includeMessages'] = includeMessages;
        }
        
        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/workflows/jobs?${qs}`,
            message: "AdminGetAppOutputInfoV1",
        })) as Array<SDKModelsV1.JobApiView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint
     * @summary Finds workflows in a Gallery
     * @param {string} [search] Only results containing the search text will be returned.
     * @param {string} [sortField] author;copyright;datemadepublic;description;executionmode;name;owner;runcount;subscriptionid;uploaddate;
     * @param {string} [direction] The direction of the sort used with search results.
     * @param {number} [offset] The index of the first record to return in the result set.
     * @param {number} [limit] The number of records to return.
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.WorkflowAdminApiView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetAppsV1(search?: string, sortField?: string, direction?: string, offset?: number, limit?: number): Promise<Array<SDKModelsV1.WorkflowAdminApiView>> {
        const params = {} as any;
        if(search){
            params['search'] = search;
        }
        if(sortField){
            params['sortField'] = sortField;
        }
        if(offset){
            params['offset'] = offset;
        }
        if(direction){
            params['direction'] = direction;
        }
        if(limit){
            params['limit'] = limit;
        }
        
        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/workflows?${qs}`,
            message: "AdminGetAppsV1",
        })) as Array<SDKModelsV1.WorkflowAdminApiView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Returns data connections created in a private Gallery
     * @param {number} [offset] 
     * @param {number} [limit]
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.DataConnectionSearchView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetDataConnectionsV1(offset?: number, limit?: number): Promise<Array<SDKModelsV1.DataConnectionSearchView>> {
        const params = {} as any;
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
            baseUrl: `${this._baseUrlV1}/serverdataconnections?${qs}`,
            message: "AdminGetAppsV1",
        })) as Array<SDKModelsV1.DataConnectionSearchView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Finds insights in a Gallery
     * @param {string} [search] Only results containing the search text will be returned.
     * @param {number} [offset] The index of the first record to return in the result set.
     * @param {number} [limit] The number of records to return.
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.DeprecatedInsightMetaInfo>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetInsightsV1(search?: string, offset?: number, limit?: number): Promise<Array<SDKModelsV1.DeprecatedInsightMetaInfo>> {
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
            baseUrl: `${this._baseUrlV1}/insights?${qs}`,
            message: "AdminGetAppsV1",
        })) as Array<SDKModelsV1.DeprecatedInsightMetaInfo>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Finds workflows in a Gallery that have been marked ready for migration
     * @param {string} subscriptionIds 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.MigratableWorkflowView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetMigratableAppsV1(subscriptionIds: string): Promise<Array<SDKModelsV1.MigratableWorkflowView>> {
        // verify required parameter 'subscriptionIds' is not null or undefined
        if (subscriptionIds === null || subscriptionIds === undefined) {
            throw new SDKModelsV1.RequiredError('subscriptionIds','Required parameter subscriptionIds was null or undefined when calling AdminGetMigratableAppsV1.');
        }
        
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/workflows/migratable`,
            message: "AdminGetAppsV1",
        })) as Array<SDKModelsV1.MigratableWorkflowView>;
    }

    /**
     * Only Gallery Curators(Admins) can us this API endpoint
     * @summary Retrieve audit log entries for a given entity type
     * @param {string} entity The entity type
     * @param {number} page The page number
     * @param {number} pageSize The page size
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.AuditEvent>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetPagedAuditLogV1(entity: string, page: number, pageSize: number): Promise<Array<SDKModelsV1.AuditEvent>> {
        // verify required parameter 'entity' is not null or undefined
        if (entity === null || entity === undefined) {
            throw new SDKModelsV1.RequiredError('entity','Required parameter entity was null or undefined when calling AdminGetPagedAuditLogV1.');
        }
        // verify required parameter 'page' is not null or undefined
        if (page === null || page === undefined) {
            throw new SDKModelsV1.RequiredError('page','Required parameter page was null or undefined when calling AdminGetPagedAuditLogV1.');
        }
        // verify required parameter 'pageSize' is not null or undefined
        if (pageSize === null || pageSize === undefined) {
            throw new SDKModelsV1.RequiredError('pageSize','Required parameter pageSize was null or undefined when calling AdminGetPagedAuditLogV1.');
        }

        const params = {} as any;
        if(entity){
            params['entity'] = entity;
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
            baseUrl: `${this._baseUrlV1}/auditlog?${qs}`,
            message: "AdminGetAppsV1",
        })) as Array<SDKModelsV1.AuditEvent>;
    }

    /**
     * Only Gallery Curators(Admins) can us this API endpoint.
     * @summary Finds collections in a Gallery
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.Collection>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetPagedCollectionsV1(page?: number, pageSize?: number): Promise<Array<SDKModelsV1.WorkflowCollectionView>> {
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
            baseUrl: `${this._baseUrlV1}/collections?${qs}`,
            message: "AdminGetAppsV1",
        })) as Array<SDKModelsV1.WorkflowCollectionView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Finds schedules in a Gallery
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.ScheduleView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetPagedSchedulesV1(page?: number, pageSize?: number): Promise<Array<SDKModelsV1.ScheduleView>> {
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
            baseUrl: `${this._baseUrlV1}/schedules?${qs}`,
            message: "AdminGetAppsV1",
        })) as Array<SDKModelsV1.ScheduleView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Finds subscriptions in a Gallery
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.DeprecatedAdminApiSubscriptionView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetPagedSubscriptionsV1(page?: number, pageSize?: number): Promise<Array<SDKModelsV1.DeprecatedAdminApiSubscriptionView>> {
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
            baseUrl: `${this._baseUrlV1}/subscriptions?${qs}`,
            message: "AdminGetPagedSubscriptionsV1",
        })) as Array<SDKModelsV1.DeprecatedAdminApiSubscriptionView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Finds subscriptions in a Gallery
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.DeprecatedAdminApiUserView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetPagedUsersV1(page?: number, pageSize?: number): Promise<Array<SDKModelsV1.DeprecatedAdminApiUserView>> {
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
            baseUrl: `${this._baseUrlV1}/users?${qs}`,
            message: "AdminGetPagedUsersV1",
        })) as Array<SDKModelsV1.DeprecatedAdminApiUserView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Returns system data connections created on the server where Alteryx Server is installed
     * @param {number} [offset] 
     * @param {number} [limit] 
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModelsV1.DataConnectionSummaryView>>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminGetSystemDataConnectionsV1(offset?: number, limit?: number): Promise<Array<SDKModelsV1.DataConnectionSummaryView>> {
        const params = {} as any;
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
            baseUrl: `${this._baseUrlV1}/systemdataconnections?${qs}`,
            message: "AdminGetSystemDataConnectionsV1",
        })) as Array<SDKModelsV1.DataConnectionSummaryView>;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint. <br />
     * @summary Publishes a YXZP to the system
     * @param {any} file 
     * @param {string} name 
     * @param {string} owner 
     * @param {boolean} validate 
     * @param {boolean} isPublic 
     * @param {boolean} canDownload 
     * @param {string} [workerTag] 
     * @param {string} [comments] 
     * @param {string} [sourceId]
     * @throws {RequiredError}
     * @returns {Promise<string>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminPublishYxzpV1(file: any, name: string, owner: string, validate: boolean, isPublic: boolean, canDownload: boolean, workerTag?: string, comments?: string, sourceId?: string): Promise<string> {
        // verify required parameter 'file' is not null or undefined
        if (file === null || file === undefined) {
            throw new SDKModelsV1.RequiredError('file','Required parameter file was null or undefined when calling AdminPublishYxzpV1.');
        }
        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new SDKModelsV1.RequiredError('name','Required parameter name was null or undefined when calling AdminPublishYxzpV1.');
        }
        // verify required parameter 'owner' is not null or undefined
        if (owner === null || owner === undefined) {
            throw new SDKModelsV1.RequiredError('owner','Required parameter owner was null or undefined when calling AdminPublishYxzpV1.');
        }
        // verify required parameter 'validate' is not null or undefined
        if (validate === null || validate === undefined) {
            throw new SDKModelsV1.RequiredError('validate','Required parameter validate was null or undefined when calling AdminPublishYxzpV1.');
        }
        // verify required parameter 'isPublic' is not null or undefined
        if (isPublic === null || isPublic === undefined) {
            throw new SDKModelsV1.RequiredError('isPublic','Required parameter isPublic was null or undefined when calling AdminPublishYxzpV1.');
        }
        // verify required parameter 'canDownload' is not null or undefined
        if (canDownload === null || canDownload === undefined) {
            throw new SDKModelsV1.RequiredError('canDownload','Required parameter canDownload was null or undefined when calling AdminPublishYxzpV1.');
        }
        
        const params = {} as any;
        if(file){
            params['file'] = file;
        }
        if(name){
            params['name'] = name;
        }
        if(owner){
            params['owner'] = owner;
        }
        if(validate){
            params['validate'] = validate;
        }
        if(isPublic){
            params['isPublic'] = isPublic;
        }
        if(canDownload){
            params['canDownload'] = canDownload;
        }
        if(workerTag){
            params['workerTag'] = workerTag;
        }
        if(comments){
            params['comments'] = comments;
        }
        if(sourceId){
            params['sourceId'] = sourceId;
        }        
        
        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/workflows`,
            message: "AdminPublishYxzpV1",
            body: adminWorkflowDataTemplate(params),
            multiPartFormData: true,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as string;
    }

    /**
     * Only Gallery Curators(Admins) can use this API endpoint.
     * @summary Updates an App's ready for migration flag
     * @param {string} appId 
     * @param {boolean} isReadyForMigration 
     * @throws {RequiredError}
     * @returns {Promise<string>}
     * @memberOf AdminManagementClientV1
     */
     public async AdminUpdateAppMigrationV1(appId: string, isReadyForMigration: boolean): Promise<string> {
        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new SDKModelsV1.RequiredError('appId','Required parameter appId was null or undefined when calling AdminUpdateAppMigrationV1.');
        }
        // verify required parameter 'isReadyForMigration' is not null or undefined
        if (isReadyForMigration === null || isReadyForMigration === undefined) {
            throw new SDKModelsV1.RequiredError('isReadyForMigration','Required parameter isReadyForMigration was null or undefined when calling AdminUpdateAppMigrationV1.');
        }             
        
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/workflows/migratable/${appId}`,
            message: "AdminUpdateAppMigrationV1",
            body: isReadyForMigration,
            multiPartFormData: true,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as string;
    }
}