import {JobManagementClientV1} from "./jobV1"

/**
 * The Workflow Management API provides a means form managing workflows.
 * @export
 * @extends {SdkClient}
 */
 export class JobManagementClient extends JobManagementClientV1 {
    private _baseUrl: string = "/v1/jobs";
}