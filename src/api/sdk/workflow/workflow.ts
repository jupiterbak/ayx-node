import { toQueryString } from "../../utils";
import { SDKModels } from "../models";
import { worflowDataTemplate, worflowVersionDataTemplate} from "./worflow-data-template";
import {WorkflowManagementClientV1} from "./workflowV1"

/**
 * The Workflow Management API provides a means for managing workflows in Alteryx Server.
 * 
 * This client extends the V1 client and implements the V3 API endpoints, providing
 * comprehensive workflow management capabilities including:
 * - Retrieving workflow details and listings
 * - Creating and updating workflows
 * - Managing workflow versions
 * - Downloading workflow packages
 * - Retrieving workflow questions and jobs
 * - Deleting workflows
 * 
 * @export
 * @extends {WorkflowManagementClientV1}
 */
 export class WorkflowManagementClient extends WorkflowManagementClientV1 {
    /**
     * Base URL for all V3 workflow API endpoints
     * @private
     */
    private _baseUrl: string = "/v3/workflows";

    /**
     * Retrieves detailed information about a specific workflow by its ID.
     * 
     * This method fetches comprehensive information about a workflow, including:
     * - Basic metadata (name, description, creation date)
     * - Owner information
     * - Permission settings
     * - Version information
     * - Execution settings
     * 
     * This is typically used to:
     * - Display workflow details to users
     * - Check workflow configuration before execution
     * - Verify workflow settings before making changes
     * 
     * @summary Retrieve a complete workflow record by ID
     * @param {string} workflowId - The unique identifier of the workflow to retrieve
     * @throws {RequiredError} - If the workflowId parameter is missing
     * @returns {Promise<SDKModels.WorkflowView>} - A promise that resolves to the workflow details
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
     * Retrieves the questions defined in a workflow.
     * 
     * Alteryx workflows can include questions that prompt users for input values when
     * the workflow is executed. This method retrieves those questions, which can be used to:
     * - Build dynamic user interfaces for workflow execution
     * - Understand what inputs a workflow requires
     * - Prepare data for workflow execution
     * 
     * Questions can include various types such as text inputs, dropdowns, file selectors,
     * and more. Each question has properties like name, type, description, and default value.
     * 
     * @summary Retrieve the questions defined in a workflow
     * @param {string} workflowId - The ID of the workflow to get questions for
     * @param {string} [versionId] - Optional specific version ID (defaults to published version)
     * @param {*} [options] - Optional HTTP request options
     * @throws {RequiredError} - If the workflowId parameter is missing
     * @returns {Promise<Array<SDKModels.WorkflowQuestionView>>} - A promise that resolves to an array of workflow questions
     * @memberOf WorkflowManagementClient
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
     * Retrieves the execution history (jobs) for a specific workflow.
     * 
     * This method returns information about past and current executions of a workflow,
     * including status, start/end times, and execution parameters. It supports pagination
     * and sorting to handle large numbers of job records efficiently.
     * 
     * Common use cases include:
     * - Monitoring workflow execution history
     * - Auditing workflow usage
     * - Troubleshooting failed workflow executions
     * - Analyzing workflow performance over time
     * 
     * @summary Retrieve execution history for a workflow
     * @param {string} workflowId - The ID of the workflow to get jobs for
     * @param {string} [sortField] - Field to sort results by (e.g., "startDate", "status")
     * @param {string} [direction] - Sort direction ("asc" or "desc")
     * @param {string} [offset] - Pagination offset (starting record)
     * @param {string} [limit] - Maximum number of records to return
     * @param {*} [options] - Optional HTTP request options
     * @throws {RequiredError} - If the workflowId parameter is missing
     * @returns {Promise<Array<SDKModels.WorkflowJobView>>} - A promise that resolves to an array of workflow jobs
     * @memberOf WorkflowManagementClient
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
     * Downloads a workflow package file from Alteryx Server.
     * 
     * This method retrieves the actual workflow file (.yxzp or .yxmd) that can be:
     * - Saved to disk for backup purposes
     * - Imported into Alteryx Designer for editing
     * - Uploaded to another Alteryx Server instance
     * - Used for version control or archiving
     * 
     * By default, this method downloads the published (active) version of the workflow.
     * You can specify a particular version by providing the versionId parameter.
     * 
     * The response is a raw binary file that should be handled appropriately by the client.
     * 
     * @summary Download a workflow package file
     * @param {string} workflowId - The ID of the workflow to download
     * @param {string} [versionId] - Optional specific version ID (defaults to published version)
     * @param {*} [options] - Optional HTTP request options
     * @throws {RequiredError} - If the workflowId parameter is missing
     * @returns {Promise<Response>} - A promise that resolves to the raw HTTP response with the file
     * @memberOf WorkflowManagementClient
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
     * Retrieves a list of workflows with optional filtering criteria.
     * 
     * This method provides a powerful way to search and filter workflows based on various
     * criteria such as name, owner, and creation date. It's commonly used for:
     * - Displaying workflow listings in user interfaces
     * - Finding workflows that match specific criteria
     * - Building workflow dashboards and reports
     * 
     * The method returns a reduced view of workflows by default, which includes basic
     * information but not all details. For complete workflow information, use the 'Full'
     * view parameter or call GetWorkflow() with a specific workflow ID.
     * 
     * @summary Retrieve a filtered list of workflows
     * @param {Object} [params] - Optional filtering parameters
     * @param {'Default' | 'Full'} [params.view] - Level of detail to include in results
     * @param {string} [params.name] - Filter by workflow name (partial match)
     * @param {string} [params.ownerId] - Filter by workflow owner ID
     * @param {string} [params.createdAfter] - Filter for workflows created after this date (inclusive)
     * @param {string} [params.createdBefore] - Filter for workflows created before this date (inclusive)
     * @returns {Promise<Array<SDKModels.ReducedWorkflowView>>} - A promise that resolves to an array of workflow records
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
     * Creates a new workflow in Alteryx Server by uploading a workflow package file
     * along with metadata and permission settings.
     * 
     * This method handles the complex process of uploading a workflow file and configuring
     * its properties, including:
     * - Basic metadata (name, owner, comments)
     * - Permission settings (public access, execution rights, download rights)
     * - Execution configuration (execution mode, credential requirements)
     * - Collection assignments
     * - Worker and district tags for execution routing
     * 
     * The workflow file should be an Alteryx workflow package (.yxzp or .yxmd file).
     * 
     * @summary Upload a new workflow to Alteryx Server
     * @param {Object} params - The workflow configuration parameters
     * @param {any} params.file - The workflow file to upload (.yxzp or .yxmd)
     * @param {string} params.name - The name for the workflow
     * @param {string} params.ownerId - The ID of the user who will own the workflow
     * @param {boolean} params.isPublic - Whether the workflow is publicly visible
     * @param {boolean} params.isReadyForMigration - Whether the workflow is ready for migration
     * @param {boolean} params.othersMayDownload - Whether others can download the workflow
     * @param {boolean} params.othersCanExecute - Whether others can execute the workflow
     * @param {string} params.executionMode - Security level for execution ("Safe", "SemiSafe", "Standard")
     * @param {string} params.workflowCredentialType - Credential requirement ("Default", "Required", "Specific")
     * @param {string} [params.workerTag] - Optional tag for worker selection
     * @param {string} [params.districtTags] - Optional district tags as JSON array
     * @param {string} [params.comments] - Optional comments about the workflow
     * @param {string} [params.sourceAppId] - Optional source application ID
     * @param {boolean} [params.hasPrivateDataExemption] - Optional private data exemption flag
     * @param {string} [params.credentialId] - Optional credential ID (required if workflowCredentialType is "Specific")
     * @param {string[]} [params.collectionIds] - Optional collection IDs to add the workflow to
     * @returns {Promise<String>} - A promise that resolves to the ID of the created workflow
     * @throws {RequiredError} - If any required parameters are missing
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
     * Adds a new version to an existing workflow by uploading a new workflow package file.
     * 
     * This method enables versioning of workflows, allowing for:
     * - Updating workflows with new functionality
     * - Maintaining multiple versions of the same workflow
     * - Optionally publishing the new version as the current active version
     * 
     * Versioning is a key feature for workflow management as it allows for:
     * - Testing new versions without affecting production
     * - Rolling back to previous versions if issues are found
     * - Maintaining an audit trail of workflow changes
     * 
     * @summary Add a new version to an existing workflow
     * @param {string} workflowId - The ID of the existing workflow to add a version to
     * @param {Object} params - The version configuration parameters
     * @param {any} params.file - The workflow file to upload (.yxzp or .yxmd)
     * @param {string} params.name - The name for this version of the workflow
     * @param {string} params.ownerId - The ID of the user who will own this version
     * @param {boolean} params.othersMayDownload - Whether others can download this version
     * @param {boolean} params.othersCanExecute - Whether others can execute this version
     * @param {string} params.executionMode - Security level for execution ("Safe", "SemiSafe", "Standard")
     * @param {boolean} params.makePublished - Whether to make this the published (active) version
     * @param {string} params.workflowCredentialType - Credential requirement ("Default", "Required", "Specific")
     * @param {string} [params.comments] - Optional comments about this version
     * @param {string} [params.sourceAppId] - Optional source application ID
     * @param {boolean} [params.hasPrivateDataExemption] - Optional private data exemption flag
     * @param {string} [params.credentialId] - Optional credential ID (required if workflowCredentialType is "Specific")
     * @returns {Promise<SDKModels.WorkflowView>} - A promise that resolves to the updated workflow with the new version
     * @throws {RequiredError} - If any required parameters are missing
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
     * Permanently deletes a workflow from Alteryx Server.
     * 
     * This method removes a workflow and all its versions from the server. This is a
     * destructive operation that cannot be undone, so it should be used with caution.
     * 
     * If the workflow is associated with schedules, the operation will fail by default.
     * Setting the force parameter to true will delete all associated schedules before
     * deleting the workflow.
     * 
     * Common use cases include:
     * - Removing obsolete or unused workflows
     * - Cleaning up test workflows
     * - Removing workflows that have been migrated to other systems
     * 
     * @summary Permanently delete a workflow and all its versions
     * @param {string} workflowId - The ID of the workflow to delete
     * @param {boolean} [force=false] - Whether to force deletion by removing associated schedules
     * @returns {Promise<Response>} - A promise that resolves when the workflow is deleted
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
     * Updates the metadata and settings of an existing workflow.
     * 
     * This method allows modifying various aspects of a workflow without uploading a new
     * workflow file or creating a new version. It's commonly used to:
     * - Change the workflow name or description
     * - Update permission settings
     * - Transfer ownership to another user
     * - Modify execution settings
     * 
     * Note: To change the workflow owner (ownerId), the new owner must be in the same
     * subscription as the current owner. This restriction ensures that workflows remain
     * within their licensing boundaries.
     * 
     * @summary Update metadata and settings of an existing workflow
     * @param {string} workflowId - The ID of the workflow to update
     * @param {UpdateWorkflowContract} updateWorkflowContract - The updated workflow properties
     * @returns {Promise<SDKModels.WorkflowView>} - A promise that resolves to the updated workflow
     * @throws {RequiredError} - If any required parameters are missing
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
