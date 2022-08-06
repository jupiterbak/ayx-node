import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModels } from "../models";

/**
 * The Schedule Management API provides a means form managing schedules.
 * @export
 * @extends {SdkClient}
 */
 export class ScheduleManagementClient extends SdkClient {
    private _baseUrl: string = "/v3/schedules";

    /**
     * 
     * @summary Get information for a specific schedule
     * @param {string} id 
     * @throws {RequiredError}
     * @returns {Promise<SDKModels.ScheduleView>}
     * @memberOf ScheduleManagementClient
     */
     public async GetSchedule(id: string): Promise<SDKModels.ScheduleView> {
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "GetSchedule",
        })) as Promise<SDKModels.ScheduleView>;
    }

    /**
     * When filtering using RunsAfter and RunsBefore, you are limited to 45 days apart from each other.
     * @summary Get all schedules
     * @param {{
     *          view?: 'Default' | 'Full',
     *          ownerId?: string, 
     *          ScheduleId?: string, 
     *          runsAfter?: Date, 
     *          runsBefore?: Date
     *         }} [params]
     * @param {'Default' | 'Full'} [param.view] 
     * @param {string} [param.ownerId] Filter by OwnerId
     * @param {string} [param.ScheduleId] Filter by ScheduleId
     * @param {string} [param.runsAfter] Filter on 
     * @param {string} [param.runsBefore] Filter on
     * @throws {RequiredError}
     * @returns {Promise<Array<SDKModels.ReducedScheduleView>>}
     *
     * @memberOf ScheduleManagementClient
     */
     public async GetSchedules(
        params?: {
            view?: 'Default' | 'Full', 
            ownerId?: string, 
            ScheduleId?: string, 
            runsAfter?: Date, 
            runsBefore?: Date
        }): Promise<Array<SDKModels.ReducedScheduleView>> {
         const qs = toQueryString(params);
         return (await this.HttpAction({
             verb: "GET",
             gateway: this.GetGateway(),
             authorization: await this.GetToken(),
             baseUrl: `${this._baseUrl}?${qs}`,
             message: "GetSchedules",
         })) as Array<SDKModels.ReducedScheduleView>;
    }

    /**
     * All Date Time fields need to be submitted as UTC-0.
     * @summary Create a new schedule
     * @param {SDKModels.CreateScheduleContract} contract See Data Type Model for iteration type contract structures.
     * @returns {Promise<SDKModels.ScheduleView>}
     * @throws {RequiredError}
     * 
     * @memberOf ScheduleManagementClient
     */
     public async CreateSchedule(
        contract: SDKModels.CreateScheduleContract
    ): Promise<SDKModels.ScheduleView> {
        return (await this.HttpAction({
            verb: "POST",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}`,
            message: "CreateSchedule",
            body: contract,
        })) as SDKModels.ScheduleView;
    }

    /**
     * 
     * @summary Delete a schedule
     * @param {string} id
     * @returns {Promise<Response>}
     * @throws {RequiredError}
     * 
     * @memberOf ScheduleManagementClient
     */
     public async DeleteSchedule(
        id: string, 
    ): Promise<Response> {
        return (await this.HttpAction({
            verb: "DELETE",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "DeleteSchedule",
            rawResponse:true
        })) as Response;
    }

    /**
     * 
     * @summary Update an existing schedule
     * @param {string} id 
     * @param {UpdateScheduleContract} contract       
     * @returns {Promise<SDKModels.ScheduleView>}
     * @throws {RequiredError}
     * 
     * @memberOf ScheduleManagementClient
     */
     public async UpdateSchedule(
        id: string, 
        contract: SDKModels.UpdateScheduleContract
    ): Promise<SDKModels.ScheduleView> {
        return (await this.HttpAction({
            verb: "PUT",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${id}`,
            message: "UpdateSchedule",
            body: contract,
        })) as SDKModels.ScheduleView;
    }
}