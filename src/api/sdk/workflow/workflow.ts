import { toQueryString } from "../../utils";
import { SDKModels } from "../models";
import { worflowDataTemplate, worflowVersionDataTemplate} from "./worflow-data-template";
import {WorkflowManagementClientV1} from "./workflowV1"

/**
 * The Workflow Management API provides a means form managing workflows.
 * @export
 * @extends {WorkflowManagementClientV1}
 */
 export class WorkflowManagementClient extends WorkflowManagementClientV1 {
    private _baseUrl: string = "/v3/workflows";

    /**
     * 
     * @summary Retrieve a workflow record
     * @param {string} workflowId 
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.UserView>}
     * @memberOf WorkflowManagementClient
     */
    public async GetWorkflow(workflowId: String): Promise<SDKModels.WorkflowView> {
        // verify required parameter 'workflowId' is not null or undefined
        if (workflowId === null || workflowId === undefined) {
            throw new SDKModels.RequiredError('workflowId','Required parameter workflowId was null or undefined when calling GetWorkflow.');
        }
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${workflowId}`,
            message: "GetWorkflow",
        })) as Promise<SDKModels.WorkflowView>;
    }

    /**
    * 
    * @summary Retrieve question information for a workflow
    * @param {string} workflowId Specifies which workflow&#39;s questions to retrieve
    * @param {string} [versionId] Which specific version of workflow to get questions of
    * @param {*} [options] Override http request option.
    * @throws {RequiredError}
    */
    public async workflowsGetWorkflowQuestions(workflowId: string, versionId?: string, options: any = {}): Promise<Array<SDKModels.WorkflowQuestionView>> {
        // verify required parameter 'workflowId' is not null or undefined
        if (workflowId === null || workflowId === undefined) {
            throw new SDKModels.RequiredError('workflowId','Required parameter workflowId was null or undefined when calling GetWorkflowQuestions.');
        }

        const params = {} as any;
        if(versionId){
            params['versionId'] = versionId;
        }
        const qs = toQueryString(params);

        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${workflowId}/questions?${qs}`,
            message: "GetWorkflow",
            rawResponse: true
        })) as Promise<Array<SDKModels.WorkflowQuestionView>>;
    }

    /**
     * 
     * @summary Retrieve all jobs for a workflow
     * @param {string} workflowId 
     * @param {string} [sortField] 
     * @param {string} [direction] 
     * @param {string} [offset] 
     * @param {string} [limit] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    public async GetJobsForWorkflow(workflowId: string, sortField?: string, direction?: string, offset?: string, limit?: string, options?: any): Promise<Array<SDKModels.WorkflowJobView>> {
        // verify required parameter 'workflowId' is not null or undefined
        if (workflowId === null || workflowId === undefined) {
            throw new SDKModels.RequiredError('workflowId','Required parameter workflowId was null or undefined when calling GetJobsForWorkflow.');
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
            baseUrl: `${this._baseUrl}/${workflowId}/jobs?${qs}`,
            message: "GetJobsForWorkflow",
            rawResponse: true
        })) as Promise<Array<SDKModels.WorkflowJobView>>;
    }

    /**
     * If no version is provided, then the published version will be downloaded.
     * @summary Download a workflow package
     * @param {string} workflowId The identifier for the workflow package
     * @param {string} [versionId] A specific version of the workflow
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    public async DownloadWorkflow(workflowId: string, versionId?: string, options?: any): Promise<Response> {
        // verify required parameter 'workflowId' is not null or undefined
        if (workflowId === null || workflowId === undefined) {
            throw new SDKModels.RequiredError('workflowId','Required parameter workflowId was null or undefined when calling DownloadWorkflow.');
        }

        const params = {} as any;
        if(versionId){
            params['versionId'] = versionId;
        }
        
        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${workflowId}/package?${qs}`,
            message: "AdminGetAppInfoV1",
            rawResponse: true
        })) as Response;
    }

    /**
     * @summary Retrieve all workflow records
     * @param {{
     *          view?: 'Default' | 'Full', 
     *          name?: string, 
     *          ownerId?: string, 
     *          firstName?: string, 
     *          lastName?: string, 
     *          createdAfter?: Date, 
     *          createdBefore?: Date
     *         }} [params]
     * @param {'Default' | 'Full'} [param.view] 
     * @param {string} [param.name] Filter by Workflow name
     * @param {string} [param.ownerId] Filter by OwnerId
     * @param {string} [param.createdAfter] Filter on the published revision&#39;s created date, inclusive
     * @param {string} [param.createdBefore] Filter on the published revision&#39;s created date, inclusive
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModels.ReducedWorkflowView>>}
     *
     * @memberOf WorkflowManagementClient
     */
     public async GetWorkflows(
        params?: {
         view?: 'Default' | 'Full', 
         name?: string, 
         ownerId?: string, 
         createdAfter?: string, 
         createdBefore?: string
        }): Promise<Array<SDKModels.ReducedWorkflowView>> {
         const qs = toQueryString(params);
         return (await this.HttpAction({
             verb: "GET",
             gateway: this.GetGateway(),
             authorization: await this.GetToken(),
             baseUrl: `${this._baseUrl}?${qs}`,
             message: "GetWorkflows",
         })) as Array<SDKModels.ReducedWorkflowView>;
    }

    /**
     * @summary Upload a new workflow
     * @param {{
     *          file: any, 
     *          name: string, 
     *          ownerId: string, 
     *          isPublic: boolean, 
     *          isReadyForMigration: boolean, 
     *          othersMayDownload: boolean, 
     *          othersCanExecute: boolean, 
     *          executionMode: string,
     *          workflowCredentialType: string,
     *          workerTag?: string, 
     *          districtTags?: string, 
     *          comments?: string, 
     *          sourceAppId?: string, 
     *          hasPrivateDataExemption?: boolean
     *          credentialId?: string
     *          collectionIds?:  Submit as JSON formatted array. IE: ["id1", "id2"]
     *        }} [params]
     * @param {any} [param.file]
    * @param {string} [param.name] 
    * @param {string} [param.ownerId] 
    * @param {boolean} [param.isPublic]  
    * @param {boolean} [param.isReadyForMigration]   
    * @param {boolean} [param.othersMayDownload]  
    * @param {boolean} [param.othersCanExecute]  
    * @param {string} [param.executionMode]    Accepted values are "Safe", "SemiSafe", "Standard",
    * @param {string} [param.workflowCredentialType]    Accepted values are "Default", "Required", "Specific", 
    * @param {string} [param.workerTag] 
    * @param {string} [param.istrictTags]  Submit as JSON formatted array. IE: [\&quot;id1\&quot;, \&quot;id2\&quot;]
    * @param {string} [param.comments] 
    * @param {string} [param.sourceAppId]
    * @param {boolean} [param.hasPrivateDataExemption]
    * @param {string} [param.credentialId]
    * @param {string} [param.collectionIds]  Submit as JSON formatted array. IE: [\&quot;id1\&quot;, \&quot;id2\&quot;]
     * @returns {Promise<String>}
     *
     * @memberOf WorkflowManagementClient
     */
     public async CreateWorkflow(
        params?: {
            file: any, 
            name: string, 
            ownerId: string, 
            isPublic: boolean, 
            isReadyForMigration: boolean, 
            othersMayDownload: boolean, 
            othersCanExecute: boolean, 
            executionMode: string,
            workflowCredentialType: string,
            workerTag?: string, 
            districtTags?: string, 
            comments?: string, 
            sourceAppId?: string, 
            hasPrivateDataExemption?: boolean,
            credentialId?: string,
            collectionIds?: string[]
           }
    ): Promise<String> {
        // verify required parameter 'params' is not null or undefined
        if (params === null || params === undefined) {
            throw new SDKModels.RequiredError('params','Required parameter params was null or undefined when calling CreateWorkflow.');
        }
        // verify required parameter 'file' is not null or undefined
        if (params.file === null || params.file === undefined) {
            throw new SDKModels.RequiredError('file','Required parameter file was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'name' is not null or undefined
        if (params.name === null || params.name === undefined) {
            throw new SDKModels.RequiredError('name','Required parameter name was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'ownerId' is not null or undefined
        if (params.ownerId === null || params.ownerId === undefined) {
            throw new SDKModels.RequiredError('ownerId','Required parameter ownerId was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'isPublic' is not null or undefined
        if (params.isPublic === null || params.isPublic === undefined) {
            throw new SDKModels.RequiredError('isPublic','Required parameter isPublic was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'isReadyForMigration' is not null or undefined
        if (params.isReadyForMigration === null || params.isReadyForMigration === undefined) {
            throw new SDKModels.RequiredError('isReadyForMigration','Required parameter isReadyForMigration was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'othersMayDownload' is not null or undefined
        if (params.othersMayDownload === null || params.othersMayDownload === undefined) {
            throw new SDKModels.RequiredError('othersMayDownload','Required parameter othersMayDownload was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'othersCanExecute' is not null or undefined
        if (params.othersCanExecute === null || params.othersCanExecute === undefined) {
            throw new SDKModels.RequiredError('othersCanExecute','Required parameter othersCanExecute was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'executionMode' is not null or undefined
        if (params.executionMode === null || params.executionMode === undefined) {
            throw new SDKModels.RequiredError('executionMode','Required parameter executionMode was null or undefined when calling workflowsCreateWorkflow.');
        }
        // verify required parameter 'workflowCredentialType' is not null or undefined
        if (params.workflowCredentialType === null || params.workflowCredentialType === undefined) {
            throw new SDKModels.RequiredError('workflowCredentialType','Required parameter workflowCredentialType was null or undefined when calling workflowsCreateWorkflow.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}`,
            message: "CreateWorkflow",
            body: worflowDataTemplate(params),
            multiPartFormData: true,
            //additionalHeaders: { enctype: "multipart/form-data" },
        })) as String;
    }

    /**
     * 
     * @summary Upload a new workflow
     * @param {{
     *          file?: any, 
     *          name: string, 
     *          ownerId: string, 
     *          othersMayDownload: boolean, 
     *          othersCanExecute: boolean, 
     *          executionMode: string, 
     *          makePublished?: boolean, 
     *          comments?: string, 
     *          sourceAppId?: string, 
     *          hasPrivateDataExemption?: boolean
     *         }} [params]
     * @param {any} [param.file]
    * @param {string} [param.name] 
    * @param {string} [param.ownerId]   
    * @param {boolean} [param.othersMayDownload]  
    * @param {boolean} [param.othersCanExecute]  
    * @param {string} [param.executionMode]    Accepted values are \&quot;Safe\&quot;, \&quot;SemiSafe\&quot;, \&quot;Standard\&quot;, 
    * @param {boolean} [param.makePublished] 
    * @param {string} [param.comments] 
    * @param {string} [param.sourceAppId] 
    * @param {boolean} [param.hasPrivateDataExemption]
     * @returns {Promise<SDKModels.WorkflowView>}
     *
     * @memberOf WorkflowManagementClient
     */
     public async AddVersionToWorkflow(
        workflowId: string,
        params: {
            file: any, 
            name: string, 
            ownerId: string, 
            othersMayDownload: boolean, 
            othersCanExecute: boolean, 
            executionMode: string, 
            makePublished: boolean, 
            comments?: string, 
            sourceAppId?: string, 
            hasPrivateDataExemption?: boolean,
            workflowCredentialType: string,
            credentialId?: string
           }
    ): Promise<SDKModels.WorkflowView> {
        // verify required parameter 'params' is not null or undefined
        if (params === null || params === undefined) {
            throw new SDKModels.RequiredError('params','Required parameter params was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'file' is not null or undefined
        if (params.file === null || params.file === undefined) {
            throw new SDKModels.RequiredError('file','Required parameter file was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'name' is not null or undefined
        if (params.name === null || params.name === undefined) {
            throw new SDKModels.RequiredError('name','Required parameter name was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'ownerId' is not null or undefined
        if (params.ownerId === null || params.ownerId === undefined) {
            throw new SDKModels.RequiredError('ownerId','Required parameter ownerId was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'othersMayDownload' is not null or undefined
        if (params.othersMayDownload === null || params.othersMayDownload === undefined) {
            throw new SDKModels.RequiredError('othersMayDownload','Required parameter othersMayDownload was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'othersCanExecute' is not null or undefined
        if (params.othersCanExecute === null || params.othersCanExecute === undefined) {
            throw new SDKModels.RequiredError('othersCanExecute','Required parameter othersCanExecute was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'executionMode' is not null or undefined
        if (params.executionMode === null || params.executionMode === undefined) {
            throw new SDKModels.RequiredError('executionMode','Required parameter executionMode was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'makePublished' is not null or undefined
        if (params.makePublished === null || params.makePublished === undefined) {
            throw new SDKModels.RequiredError('makePublished','Required parameter makePublished was null or undefined when calling AddVersionToWorkflow.');
        }
        // verify required parameter 'workflowCredentialType' is not null or undefined
        if (params.workflowCredentialType === null || params.workflowCredentialType === undefined) {
            throw new SDKModels.RequiredError('workflowCredentialType','Required parameter workflowCredentialType was null or undefined when calling AddVersionToWorkflow.');
        }

        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${workflowId}/versions`,
            message: "AddVersionToWorkflow",
            body: worflowVersionDataTemplate(params),
            multiPartFormData: true,
            additionalHeaders: { enctype: "multipart/form-data" },
        })) as SDKModels.WorkflowView;
    }

    /**
     * 
     * @summary Delete a specific workflow
     * @param {string} workflowId id of workflow to delete
     * @param {boolean} [force] if workflow is scheduled forcing will delete all schedules before deleting
     * @returns {Promise<Response>}
     *
     * @memberOf WorkflowManagementClient
     */
     public async DeleteWorkflow(
        workflowId: string, 
        force?: boolean
    ): Promise<Response> {
        const qs = toQueryString({force:force?force:false});
        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${workflowId}?${qs}`,
            message: "DeleteWorkflow",
            rawResponse:true
        })) as Response;
    }

    /**
     * To change the ownerId, the new owner must be in the same subscription as the current owner.
     * @summary Update an existing workflow
     * @param {string} workflowId 
     * @param {UpdateWorkflowContract} updateWorkflowContract          
     * @returns {Promise<SDKModels.WorkflowView>}
     *
     * @memberOf WorkflowManagementClient
     */
     public async UpdateWorkflow(
        workflowId: string, 
        updateWorkflowContract: SDKModels.UpdateWorkflowContract
    ): Promise<SDKModels.WorkflowView> {
        // verify required parameter 'workflowId' is not null or undefined
        if (workflowId === null || workflowId === undefined) {
            throw new SDKModels.RequiredError('workflowId','Required parameter workflowId was null or undefined when calling UpdateWorkflow.');
        }
        // verify required parameter 'updateWorkflowContract' is not null or undefined
        if (updateWorkflowContract === null || updateWorkflowContract === undefined) {
            throw new SDKModels.RequiredError('updateWorkflowContract','Required parameter updateWorkflowContract was null or undefined when calling UpdateWorkflow.');
        }
        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${workflowId}`,
            message: "UpdateWorkflow",
            body: updateWorkflowContract,
        })) as SDKModels.WorkflowView;
    }
}