import { SdkClient } from "../common/sdk-client";
import { SDKModels } from "../models";

/**
 * The DCME Connection API provides a means for managing DCME connections.
 * @export
 * @extends {SdkClient}
 */
 export class DCMEConnectionClient extends SdkClient {
    private _baseUrl: string = "/v3/DCMEConnections";

    /**
     * 
     * @summary Retrieve a DCM.E Connection
     * @param {string} connectionId 
     * @throws {SDKModels.RequiredError}
     * @returns {Promise<SDKModels.DCMEConnectionConnectView>}
     * @memberOf DCMEConnectionClient
     */
     public async GetDCMEConnection(connectionId: string): Promise<SDKModels.DCMEConnectionConnectView> {
        // verify required parameter 'connectionId' is not null or undefined
        if (connectionId === null || connectionId === undefined) {
            throw new SDKModels.RequiredError('connectionId','Required parameter connectionId was null or undefined when calling GetDCMEConnection.');
        }

        return (await this.HttpAction({
            verb: "GET",
            gateway: this.GetGateway(),
            authorization: await this.GetToken(),
            baseUrl: `${this._baseUrl}/${connectionId}`,
            message: "GetDCMEConnection",
        })) as SDKModels.DCMEConnectionConnectView;
    }
}