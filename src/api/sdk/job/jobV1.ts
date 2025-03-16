import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModelsV1 } from "../models/modelsV1";

/**
 * The Job Management API provides a means for managing jobs (API V1).
 * This client handles job-related operations such as retrieving job details
 * and downloading job output files.
 * 
 * @export
 * @extends {SdkClient}
 */
 export class JobManagementClientV1 extends SdkClient {
    /**
     * Base URL for all job-related API endpoints in V1
     * @private
     */
    private _baseUrlV1: string = "/v1/jobs";

    /**
     * Retrieves detailed information about a specific job, including its current state.
     * 
     * This method fetches comprehensive information about a job execution, including
     * its status, start/end times, and optionally any messages generated during execution.
     * 
     * Note: Only app workflows can be used with this endpoint.
     * 
     * @summary Retrieves the job and its current state
     * @param {string} id - The unique identifier of the job to retrieve
     * @param {boolean} [includeMessages] - Whether to include execution messages in the response
     * @throws {RequiredError} - If the required id parameter is missing
     * @returns {Promise<JobApiView>} - A promise that resolves to the job details
     * @memberOf JobManagementClientV1
     */
     public async GetJobDetailsV1(id: string, includeMessages?: boolean): Promise<SDKModelsV1.JobApiView> {
        // Validate required parameters
        if (id === null || id === undefined) {
            throw new SDKModelsV1.RequiredError('id','Required parameter id was null or undefined when calling GetJobV1.');
        }

        // Build query parameters
        const params = {} as any;
        if(includeMessages){
            params['includeMessages'] = includeMessages;
        }

        // Convert parameters to query string
        const qs = toQueryString(params);
        
        // Execute the API request
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${id}?${qs}`,
            message: "GetJobV1",
        })) as Promise<SDKModelsV1.JobApiView>;
    }

    /**
     * Retrieves a specific output file from a completed job in the requested format.
     * 
     * This method allows downloading the results of a job execution in various formats,
     * making it useful for integrating Alteryx job outputs with other systems or
     * for presenting results to users.
     * 
     * Note: Only app workflows can be used with this endpoint.
     * 
     * @summary Get output for a given job
     * @param {string} id - The unique identifier of the job
     * @param {string} outputId - The identifier of the specific output to retrieve
     * @param {'Raw' | 'Yxdb' | 'Shp' | 'Kml' | 'Tab' | 'Mif' | 'Dbf' | 'Csv' | 'Pdf' | 'Docx' | 'Xlsx' | 'Html' | 'Tde' | 'Zip'} format - The desired output format
     * @throws {RequiredError} - If any required parameters are missing
     * @returns {Promise<string>} - A promise that resolves to the output file content
     * @memberOf JobManagementClientV1
     */
     public async GetJobOutputFileV1(id: string, outputId: string, format: 'Raw' | 'Yxdb' | 'Shp' | 'Kml' | 'Tab' | 'Mif' | 'Dbf' | 'Csv' | 'Pdf' | 'Docx' | 'Xlsx' | 'Html' | 'Tde' | 'Zip'): Promise<string> {
        // Validate required parameters
        if (id === null || id === undefined) {
            throw new SDKModelsV1.RequiredError('id','Required parameter id was null or undefined when calling GetJobOutputFileV1.');
        }
        if (outputId === null || outputId === undefined) {
            throw new SDKModelsV1.RequiredError('outputId','Required parameter outputId was null or undefined when calling GetJobOutputFileV1.');
        }
        if (format === null || format === undefined) {
            throw new SDKModelsV1.RequiredError('format','Required parameter format was null or undefined when calling GetJobOutputFileV1.');
        }

        // Build query parameters with the requested format
        const params = {format:format} as any;

        // Convert parameters to query string
        const qs = toQueryString(params);
        
        // Execute the API request
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${id}/output/${outputId}?${qs}`,
            message: "GetJobOutputFileV1",
        })) as string;
    }
}
