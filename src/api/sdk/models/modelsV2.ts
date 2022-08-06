export namespace SDKModelsV2 {
    /**
     *
     * @export
     * @class RequiredError
     * @extends {Error}
     */
     export class RequiredError extends Error {
        name: "RequiredError" = "RequiredError";
        constructor(public field: string, msg?: string) {
            super(msg);
        }
    }

    /**
     * 
     * @export
     * @interface AdminApiSubscriptionView
     */
    export interface AdminApiSubscriptionView {
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiSubscriptionView
         */
        active?: boolean;
        /**
         * 
         * @type {string}
         * @memberof AdminApiSubscriptionView
         */
        expirationDate?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiSubscriptionView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiSubscriptionView
         */
        defaultWorkflowCredentialId?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiSubscriptionView
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface AdminApiUserView
     */
    export interface AdminApiUserView {
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        accountLocked?: boolean;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        accountLockedAt?: string;
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        active?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        anonymous?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        canSchedule?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        canSetPriority?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        canSetWorkerAssignment?: boolean;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        dateAdded?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        dateUpdated?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        expirationDate?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        lastName?: string;
        /**
         * 
         * @type {number}
         * @memberof AdminApiUserView
         */
        numFailedLogins?: number;
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        pending?: boolean;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        subscriptionId?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        updateLastLoginDate?: string;
        /**
         * 
         * @type {UserProfile}
         * @memberof AdminApiUserView
         */
        userProfile?: UserProfile;
        /**
         * 
         * @type {boolean}
         * @memberof AdminApiUserView
         */
        validated?: boolean;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        timezone?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        role?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        language?: string;
        /**
         * 
         * @type {string}
         * @memberof AdminApiUserView
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface AppValue
     */
    export interface AppValue {
        /**
         * 
         * @type {string}
         * @memberof AppValue
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof AppValue
         */
        value?: string;
    }

    /**
     * 
     * @export
     * @interface AppValuesV2
     */
    export interface AppValuesV2 {
        /**
         * 
         * @type {string}
         * @memberof AppValuesV2
         */
        credentialId?: string;
        /**
         * 
         * @type {Array<AppValue>}
         * @memberof AppValuesV2
         */
        questions?: Array<AppValue>;
        /**
         * 
         * @type {string}
         * @memberof AppValuesV2
         */
        priority?: string;
    }

    /**
     * 
     * @export
     * @interface CredentialApiView
     */
    export interface CredentialApiView {
        /**
         * 
         * @type {string}
         * @memberof CredentialApiView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof CredentialApiView
         */
        userName?: string;
    }

    /**
     * 
     * @export
     * @interface DefaultUserCredential
     */
    export interface DefaultUserCredential {
        /**
         * 
         * @type {string}
         * @memberof DefaultUserCredential
         */
        username?: string;
        /**
         * 
         * @type {string}
         * @memberof DefaultUserCredential
         */
        passwordId?: string;
        /**
         * 
         * @type {string}
         * @memberof DefaultUserCredential
         */
        credentialId?: string;
    }

    /**
     * 
     * @export
     * @interface EngineMessageApiView
     */
    export interface EngineMessageApiView {
        /**
         * 
         * @type {number}
         * @memberof EngineMessageApiView
         */
        status?: number;
        /**
         * 
         * @type {string}
         * @memberof EngineMessageApiView
         */
        text?: string;
        /**
         * 
         * @type {number}
         * @memberof EngineMessageApiView
         */
        toolId?: number;
    }

    /**
     * 
     * @export
     * @interface InsightMetaInfo
     */
    export interface InsightMetaInfo {
        /**
         * 
         * @type {User}
         * @memberof InsightMetaInfo
         */
        owner?: User;
        /**
         * 
         * @type {string}
         * @memberof InsightMetaInfo
         */
        insightId?: string;
        /**
         * 
         * @type {string}
         * @memberof InsightMetaInfo
         */
        name?: string;
        /**
         * 
         * @type {Date}
         * @memberof InsightMetaInfo
         */
        lastUpdated?: Date;
        /**
         * 
         * @type {string}
         * @memberof InsightMetaInfo
         */
        ownerId?: string;
        /**
         * 
         * @type {string}
         * @memberof InsightMetaInfo
         */
        iconId?: string;
        /**
         * 
         * @type {string}
         * @memberof InsightMetaInfo
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface JobApiView
     */
    export interface JobApiView {
        /**
         * 
         * @type {string}
         * @memberof JobApiView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof JobApiView
         */
        appId?: string;
        /**
         * 
         * @type {Date}
         * @memberof JobApiView
         */
        createDate?: Date;
        /**
         * 
         * @type {string}
         * @memberof JobApiView
         */
        status?: string;
        /**
         * 
         * @type {string}
         * @memberof JobApiView
         */
        disposition?: string;
        /**
         * 
         * @type {Array<OutputDataApiView>}
         * @memberof JobApiView
         */
        outputs?: Array<OutputDataApiView>;
        /**
         * 
         * @type {Array<EngineMessageApiView>}
         * @memberof JobApiView
         */
        messages?: Array<EngineMessageApiView>;
        /**
         * 
         * @type {string}
         * @memberof JobApiView
         */
        priority?: JobApiView.PriorityEnum;
        /**
         * 
         * @type {string}
         * @memberof JobApiView
         */
        workerTag?: string;
        /**
         * 
         * @type {boolean}
         * @memberof JobApiView
         */
        runWithE2?: boolean;
    }

    /**
     * @export
     * @namespace JobApiView
     */
    export namespace JobApiView {
        /**
         * @export
         * @enum {string}
         */
        export enum PriorityEnum {
            Default = <any> 'Default',
            Low = <any> 'Low',
            Medium = <any> 'Medium',
            High = <any> 'High',
            Critical = <any> 'Critical'
        }
    }

    /**
     * 
     * @export
     * @interface OutputDataApiView
     */
    export interface OutputDataApiView {
        /**
         * 
         * @type {string}
         * @memberof OutputDataApiView
         */
        id?: string;
        /**
         * 
         * @type {Array<string>}
         * @memberof OutputDataApiView
         */
        formats?: Array<string>;
        /**
         * 
         * @type {string}
         * @memberof OutputDataApiView
         */
        name?: string;
    }

    /**
     * 
     * @export
     * @interface OwnerView
     */
    export interface OwnerView {
        /**
         * 
         * @type {string}
         * @memberof OwnerView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof OwnerView
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof OwnerView
         */
        lastName?: string;
        /**
         * 
         * @type {string}
         * @memberof OwnerView
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof OwnerView
         */
        subscriptionId?: string;
    }

    /**
     * 
     * @export
     * @interface ScheduleForecastView
     */
    export interface ScheduleForecastView {
        /**
         * 
         * @type {string}
         * @memberof ScheduleForecastView
         */
        id?: string;
        /**
         * 
         * @type {number}
         * @memberof ScheduleForecastView
         */
        appEstimatedCompletionTime?: number;
        /**
         * 
         * @type {string}
         * @memberof ScheduleForecastView
         */
        scheduleName?: string;
        /**
         * 
         * @type {Date}
         * @memberof ScheduleForecastView
         */
        startTime?: Date;
        /**
         * 
         * @type {string}
         * @memberof ScheduleForecastView
         */
        frequency?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleForecastView
         */
        workflowName?: string;
        /**
         * 
         * @type {OwnerView}
         * @memberof ScheduleForecastView
         */
        owner?: OwnerView;
        /**
         * 
         * @type {number}
         * @memberof ScheduleForecastView
         */
        priority?: number;
    }

    /**
     * 
     * @export
     * @interface SecurityInfo
     */
    export interface SecurityInfo {
        /**
         * 
         * @type {string}
         * @memberof SecurityInfo
         */
        password?: string;
        /**
         * 
         * @type {string}
         * @memberof SecurityInfo
         */
        hmacKey?: string;
        /**
         * 
         * @type {string}
         * @memberof SecurityInfo
         */
        salt?: string;
    }

    /**
     * 
     * @export
     * @interface User
     */
    export interface User {
        /**
         * 
         * @type {string}
         * @memberof User
         */
        role?: string;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        anonymous?: boolean;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        lastName?: string;
        /**
         * 
         * @type {Date}
         * @memberof User
         */
        dateAdded?: Date;
        /**
         * 
         * @type {Date}
         * @memberof User
         */
        dateUpdated?: Date;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        validated?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        pending?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        active?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        apiEnabled?: boolean;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        apiKey?: string;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        apiSecret?: string;
        /**
         * 
         * @type {SecurityInfo}
         * @memberof User
         */
        securityInfo?: SecurityInfo;
        /**
         * 
         * @type {number}
         * @memberof User
         */
        numFailedLogins?: number;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        accountLocked?: boolean;
        /**
         * 
         * @type {Date}
         * @memberof User
         */
        accountLockedAt?: Date;
        /**
         * 
         * @type {UserProfile}
         * @memberof User
         */
        userProfile?: UserProfile;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        subscriptionId?: string;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        expirationDate?: string;
        /**
         * 
         * @type {Date}
         * @memberof User
         */
        expDate?: Date;
        /**
         * 
         * @type {Date}
         * @memberof User
         */
        updateLastLoginDate?: Date;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        isPasswordMigrated?: boolean;
        /**
         * 
         * @type {WindowsIdentity}
         * @memberof User
         */
        windowsIdentity?: WindowsIdentity;
        /**
         * 
         * @type {DefaultUserCredential}
         * @memberof User
         */
        defaultCredential?: DefaultUserCredential;
        /**
         * 
         * @type {Array<string>}
         * @memberof User
         */
        credentials?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof User
         */
        dataConnections?: Array<string>;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        canSchedule?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        canSetPriority?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        canSetWorkerAssignment?: boolean;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        timezone?: string;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        canCreateCollections?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof User
         */
        isDeleted?: boolean;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        deletedById?: string;
        /**
         * 
         * @type {Date}
         * @memberof User
         */
        deletedDateTime?: Date;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        defaultWorkerTag?: string;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        language?: string;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        studio?: string;
        /**
         * 
         * @type {string}
         * @memberof User
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface UserProfile
     */
    export interface UserProfile {
        /**
         * 
         * @type {string}
         * @memberof UserProfile
         */
        picture?: string;
        /**
         * 
         * @type {string}
         * @memberof UserProfile
         */
        iconId?: string;
    }

    /**
     * 
     * @export
     * @interface WfaAdminApiAppView
     */
    export interface WfaAdminApiAppView {
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiAppView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiAppView
         */
        filename?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiAppView
         */
        nextApp?: string;
    }

    /**
     * 
     * @export
     * @interface WfaAdminApiEventView
     */
    export interface WfaAdminApiEventView {
        /**
         * 
         * @type {WfaAdminApiUserView}
         * @memberof WfaAdminApiEventView
         */
        user?: WfaAdminApiUserView;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiEventView
         */
        timestamp?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiEventView
         */
        event?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiEventView
         */
        oldValues?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiEventView
         */
        newValues?: string;
    }

    /**
     * 
     * @export
     * @interface WfaAdminApiRevisionView
     */
    export interface WfaAdminApiRevisionView {
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiRevisionView
         */
        id?: string;
        /**
         * 
         * @type {number}
         * @memberof WfaAdminApiRevisionView
         */
        version?: number;
        /**
         * 
         * @type {WfaAdminApiUserView}
         * @memberof WfaAdminApiRevisionView
         */
        author?: WfaAdminApiUserView;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiRevisionView
         */
        dateCreated?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiRevisionView
         */
        executionMode?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WfaAdminApiRevisionView
         */
        isChunkedPackage?: boolean;
        /**
         * 
         * @type {number}
         * @memberof WfaAdminApiRevisionView
         */
        runCount?: number;
        /**
         * 
         * @type {number}
         * @memberof WfaAdminApiRevisionView
         */
        downloadCount?: number;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiRevisionView
         */
        packageType?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WfaAdminApiRevisionView
         */
        hasPrivateDataExemption?: boolean;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiRevisionView
         */
        uploadDate?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiRevisionView
         */
        credentialType?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WfaAdminApiRevisionView
         */
        isE2?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WfaAdminApiRevisionView
         */
        canDownload?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WfaAdminApiRevisionView
         */
        allowVersionHistory?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WfaAdminApiRevisionView
         */
        showVersionHistory?: boolean;
        /**
         * 
         * @type {Array<WfaAdminApiAppView>}
         * @memberof WfaAdminApiRevisionView
         */
        applications?: Array<WfaAdminApiAppView>;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiRevisionView
         */
        comments?: string;
    }

    /**
     * 
     * @export
     * @interface WfaAdminApiSubView
     */
    export interface WfaAdminApiSubView {
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiSubView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiSubView
         */
        name?: string;
    }

    /**
     * 
     * @export
     * @interface WfaAdminApiUserView
     */
    export interface WfaAdminApiUserView {
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiUserView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiUserView
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiUserView
         */
        lastName?: string;
        /**
         * 
         * @type {string}
         * @memberof WfaAdminApiUserView
         */
        email?: string;
        /**
         * 
         * @type {WfaAdminApiSubView}
         * @memberof WfaAdminApiUserView
         */
        subscription?: WfaAdminApiSubView;
    }

    /**
     * 
     * @export
     * @interface WindowsIdentity
     */
    export interface WindowsIdentity {
        /**
         * 
         * @type {string}
         * @memberof WindowsIdentity
         */
        sId?: string;
        /**
         * 
         * @type {string}
         * @memberof WindowsIdentity
         */
        displayName?: string;
        /**
         * 
         * @type {string}
         * @memberof WindowsIdentity
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof WindowsIdentity
         */
        samAccountName?: string;
    }

    /**
     * 
     * @export
     * @interface WorkflowAllAdminApiView
     */
    export interface WorkflowAllAdminApiView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowAllAdminApiView
         */
        id?: string;
        /**
         * 
         * @type {Array<WfaAdminApiRevisionView>}
         * @memberof WorkflowAllAdminApiView
         */
        revisions?: Array<WfaAdminApiRevisionView>;
        /**
         * 
         * @type {WfaAdminApiUserView}
         * @memberof WorkflowAllAdminApiView
         */
        creator?: WfaAdminApiUserView;
        /**
         * 
         * @type {WfaAdminApiSubView}
         * @memberof WorkflowAllAdminApiView
         */
        subscription?: WfaAdminApiSubView;
        /**
         * 
         * @type {Array<WfaAdminApiEventView>}
         * @memberof WorkflowAllAdminApiView
         */
        events?: Array<WfaAdminApiEventView>;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAllAdminApiView
         */
        runDisabled?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAllAdminApiView
         */
        isPublic?: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAllAdminApiView
         */
        dateMadePublic?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAllAdminApiView
         */
        isDeleted?: boolean;
        /**
         * 
         * @type {number}
         * @memberof WorkflowAllAdminApiView
         */
        runCount?: number;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAllAdminApiView
         */
        iconId?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAllAdminApiView
         */
        workerTag?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAllAdminApiView
         */
        isReadyForMigration?: boolean;
    }
}