import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
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
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${workflowId}`,
            message: "GetWorkflow",
        })) as Promise<SDKModels.WorkflowView>;
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
     *          workerTag?: string, 
     *          districtTags?: string, 
     *          comments?: string, 
     *          sourceAppId?: string, 
     *          hasPrivateDataExemption?: boolean
     *        }} [params]
     * @param {any} [param.file]
    * @param {string} [param.name] 
    * @param {string} [param.ownerId] 
    * @param {boolean} [param.isPublic]  
    * @param {boolean} [param.isReadyForMigration]   
    * @param {boolean} [param.othersMayDownload]  
    * @param {boolean} [param.othersCanExecute]  
    * @param {string} [param.executionMode]    Accepted values are "Safe", "SemiSafe", "Standard", 
    * @param {string} [param.workerTag] 
    * @param {string} [param.istrictTags]  Submit as JSON formatted array. IE: [\&quot;id1\&quot;, \&quot;id2\&quot;]
    * @param {string} [param.comments] 
    * @param {string} [param.sourceAppId] 
    * @param {boolean} [param.hasPrivateDataExemption]
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
            workerTag?: string, 
            districtTags?: string, 
            comments?: string, 
            sourceAppId?: string, 
            hasPrivateDataExemption?: boolean
           }
    ): Promise<String> {
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
            file?: any, 
            name: string, 
            ownerId: string, 
            othersMayDownload: boolean, 
            othersCanExecute: boolean, 
            executionMode: string, 
            makePublished?: boolean, 
            comments?: string, 
            sourceAppId?: string, 
            hasPrivateDataExemption?: boolean
           }
    ): Promise<SDKModels.WorkflowView> {
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