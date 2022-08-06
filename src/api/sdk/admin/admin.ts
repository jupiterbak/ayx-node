import { toQueryString } from "../../utils";
import { SdkClient } from "../common/sdk-client";
import { SDKModels } from "../models";
import { AdminManagementClientV2 } from "./adminV2";

/**
 * The Admin Management API provides a means form managing the server.
 * @export
 * @extends {SdkClient}
 */
 export class AdminManagementClient extends AdminManagementClientV2 {
    private _baseUrl: string = "admin/v1";
}