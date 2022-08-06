import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModelsV1 } from "../models/modelsV1";

/**
 * The Job Management API provides a means form managing jobs (API V1).
 * @export
 * @extends {SdkClient}
 */
 export class JobManagementClientV1 extends SdkClient {
    private _baseUrlV1: string = "/v1/jobs";

    /**
     * Only app workflows can be used.
     * @summary Retrieves the job and its current state
     * @param {string} id 
     * @param {boolean} [includeMessages] 
     * @throws {RequiredError}
     * @returns {Promise<JobApiView>}
     * @memberOf JobManagementClientV1
     */
     public async GetJobDetailsV1(id: string, includeMessages?: boolean): Promise<SDKModelsV1.JobApiView> {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new SDKModelsV1.RequiredError('id','Required parameter id was null or undefined when calling GetJobV1.');
        }

        const params = {} as any;
        if(includeMessages){
            params['includeMessages'] = includeMessages;
        }

        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${id}?${qs}`,
            message: "GetJobV1",
        })) as Promise<SDKModelsV1.JobApiView>;
    }

    /**
     * Only app workflows can be used.
     * @summary Get output for a given job
     * @param {string} id 
     * @param {string} outputId 
     * @param {'Raw' | 'Yxdb' | 'Shp' | 'Kml' | 'Tab' | 'Mif' | 'Dbf' | 'Csv' | 'Pdf' | 'Docx' | 'Xlsx' | 'Html' | 'Tde' | 'Zip'} format 
     * @throws {RequiredError}
     * @returns {Promise<string>}
     * @memberOf JobManagementClientV1
     */
     public async GetJobOutputFileV1(id: string, outputId: string, format: 'Raw' | 'Yxdb' | 'Shp' | 'Kml' | 'Tab' | 'Mif' | 'Dbf' | 'Csv' | 'Pdf' | 'Docx' | 'Xlsx' | 'Html' | 'Tde' | 'Zip'): Promise<string> {
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new SDKModelsV1.RequiredError('id','Required parameter id was null or undefined when calling GetJobOutputFileV1.');
        }
        // verify required parameter 'outputId' is not null or undefined
        if (outputId === null || outputId === undefined) {
            throw new SDKModelsV1.RequiredError('outputId','Required parameter outputId was null or undefined when calling GetJobOutputFileV1.');
        }
        // verify required parameter 'format' is not null or undefined
        if (format === null || format === undefined) {
            throw new SDKModelsV1.RequiredError('format','Required parameter format was null or undefined when calling GetJobOutputFileV1.');
        }

        const params = {format:format} as any;

        const qs = toQueryString(params);
        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrlV1}/${id}/output/${outputId}?${qs}`,
            message: "GetJobOutputFileV1",
        })) as string;
    }
}