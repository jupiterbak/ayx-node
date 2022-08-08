import { UserManagementClient } from "../user/user";
import { WorkflowManagementClient } from "../workflow/workflow";
import { UserGroupManagementClient } from "../groups/group";
import { ScheduleManagementClient } from "../schedule/schedule";
import { CredentialsManagementClient } from "../credentials/credentials";
import { DCMEConnectionClient } from "../dcme/dcmeconnections";
import { ServerConnectionClient } from "../serverconnections/serverconnection";
import { JobManagementClient } from "../job/job";
import { AdminManagementClient } from "../admin/admin";
import { CollectionManagementClient } from "../collection/collection";
import { SdkClient } from "./sdk-client";

/**
 *
 * Alteryx typescript SDK
 *
 * Runs in browser and in NodeJs.
 *
 * The SDK uses all 2 types of Alteryx Credentials
 * (User Credentials, Client Credentials).
 *
 * @export
 * @class AlteryxSdk
 */
export class AlteryxSdk extends SdkClient {

    /**
     * * User Management Client
     *
     * @returns {UserManagementClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetUserManagementClient(): UserManagementClient {
        this._userManagementClient =
            this._userManagementClient || new UserManagementClient(this._authenticator);
        return this._userManagementClient;
    }

    private _userManagementClient?: UserManagementClient;

    /**
     * * Workflow Management Client
     *
     * @returns {WorkflowManagementClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetWorkflowManagementClient(): WorkflowManagementClient {
        this._workflowManagementClient =
            this._workflowManagementClient || new WorkflowManagementClient(this._authenticator);
        return this._workflowManagementClient;
    }

    private _workflowManagementClient?: WorkflowManagementClient;

    /**
     * * User Group Management Client
     *
     * @returns {UserGroupManagementClient}
     *
     * @memberOf AlteryxSdk
     */
      public GetUserGroupManagementClient(): UserGroupManagementClient {
        this._userGroupManagementClient =
            this._userGroupManagementClient || new UserGroupManagementClient(this._authenticator);
        return this._userGroupManagementClient;
    }

    private _userGroupManagementClient?: UserGroupManagementClient;


    /**
     * * Credential Management Client
     *
     * @returns {CredentialManagementClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetCredentialsManagementClient(): CredentialsManagementClient {
        this._credentialsManagementClient =
            this._credentialsManagementClient || new CredentialsManagementClient(this._authenticator);
        return this._credentialsManagementClient;
    }

    private _credentialsManagementClient?: CredentialsManagementClient;

    /**
     * * Schedule Management Client
     *
     * @returns {ScheduleManagementClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetScheduleManagementClient(): ScheduleManagementClient {
        this._scheduleGroupManagementClient =
            this._scheduleGroupManagementClient || new ScheduleManagementClient(this._authenticator);
        return this._scheduleGroupManagementClient;
    }

    private _scheduleGroupManagementClient?: ScheduleManagementClient;

    /**
     * * DCME Client
     *
     * @returns {DCMEConnectionClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetDCMEConnectionClient(): DCMEConnectionClient {
        this._dcmeClient =
            this._dcmeClient || new DCMEConnectionClient(this._authenticator);
        return this._dcmeClient;
    }

    private _dcmeClient?: DCMEConnectionClient;

    /**
     * * Get Server Connection Client
     *
     * @returns {ServerConnectionClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetServerConnectionClient(): ServerConnectionClient {
        this._sercerConnectionClient =
            this._sercerConnectionClient || new ServerConnectionClient(this._authenticator);
        return this._sercerConnectionClient;
    }

    private _sercerConnectionClient?: ServerConnectionClient;

    /**
     * * Get Job Management Client
     *
     * @returns {JobManagementClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetJobManagementClient(): JobManagementClient {
        this._jobConnectionClient =
            this._jobConnectionClient || new JobManagementClient(this._authenticator);
        return this._jobConnectionClient;
    }
    private _jobConnectionClient?: JobManagementClient;

    /**
     * * Get Admin Management Client
     *
     * @returns {AdminManagementClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetAdminManagementClient(): AdminManagementClient {
        this._adminManagementClient =
            this._adminManagementClient || new AdminManagementClient(this._authenticator);
        return this._adminManagementClient;
    }
    private _adminManagementClient?: AdminManagementClient;

    /**
     * * Get Collection Management Client
     *
     * @returns {CollectionManagementClient}
     *
     * @memberOf AlteryxSdk
     */
     public GetCollectionManagementClient(): CollectionManagementClient {
        this._collectionManagementClient =
            this._collectionManagementClient || new CollectionManagementClient(this._authenticator);
        return this._collectionManagementClient;
    }
    private _collectionManagementClient?: CollectionManagementClient;
}
