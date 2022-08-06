export namespace SDKModelsV1 {
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
     * @interface ActiveDirectoryObject
     */
    export interface ActiveDirectoryObject {
        /**
         * 
         * @type {string}
         * @memberof ActiveDirectoryObject
         */
        sid?: string;
        /**
         * 
         * @type {string}
         * @memberof ActiveDirectoryObject
         */
        category?: ActiveDirectoryObject.CategoryEnum;
        /**
         * 
         * @type {string}
         * @memberof ActiveDirectoryObject
         */
        displayName?: string;
        /**
         * 
         * @type {string}
         * @memberof ActiveDirectoryObject
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof ActiveDirectoryObject
         */
        samAccountName?: string;
    }

    /**
     * @export
     * @namespace ActiveDirectoryObject
     */
    export namespace ActiveDirectoryObject {
        /**
         * @export
         * @enum {string}
         */
        export enum CategoryEnum {
            Person = <any> 'Person',
            Group = <any> 'Group'
        }
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
     * @interface AppValues
     */
    export interface AppValues {
        /**
         * 
         * @type {Array<AppValue>}
         * @memberof AppValues
         */
        questions?: Array<AppValue>;
        /**
         * 
         * @type {string}
         * @memberof AppValues
         */
        priority?: string;
    }

    /**
     * 
     * @export
     * @interface ApplicationCollectionShare
     */
    export interface ApplicationCollectionShare {
        /**
         * 
         * @type {string}
         * @memberof ApplicationCollectionShare
         */
        appId?: string;
        /**
         * 
         * @type {Date}
         * @memberof ApplicationCollectionShare
         */
        dateAdded?: Date;
        /**
         * 
         * @type {string}
         * @memberof ApplicationCollectionShare
         */
        addedById?: string;
    }

    /**
     * 
     * @export
     * @interface AuditEvent
     */
    export interface AuditEvent {
        /**
         * 
         * @type {string}
         * @memberof AuditEvent
         */
        entity?: string;
        /**
         * 
         * @type {string}
         * @memberof AuditEvent
         */
        entityId?: string;
        /**
         * 
         * @type {string}
         * @memberof AuditEvent
         */
        userId?: string;
        /**
         * 
         * @type {Date}
         * @memberof AuditEvent
         */
        timestamp?: Date;
        /**
         * 
         * @type {string}
         * @memberof AuditEvent
         */
        event?: string;
        /**
         * 
         * @type {string}
         * @memberof AuditEvent
         */
        oldValues?: string;
        /**
         * 
         * @type {string}
         * @memberof AuditEvent
         */
        newValues?: string;
        /**
         * 
         * @type {string}
         * @memberof AuditEvent
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface BasicApplicationView
     */
    export interface BasicApplicationView {
        /**
         * 
         * @type {boolean}
         * @memberof BasicApplicationView
         */
        canExecute?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof BasicApplicationView
         */
        amp?: boolean;
        /**
         * 
         * @type {string}
         * @memberof BasicApplicationView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicApplicationView
         */
        revisionId?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicApplicationView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicApplicationView
         */
        iconId?: string;
    }

    /**
     * 
     * @export
     * @interface BasicUserView
     */
    export interface BasicUserView {
        /**
         * 
         * @type {string}
         * @memberof BasicUserView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicUserView
         */
        role?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicUserView
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicUserView
         */
        lastName?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicUserView
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof BasicUserView
         */
        sortName?: string;
        /**
         * 
         * @type {boolean}
         * @memberof BasicUserView
         */
        isActive?: boolean;
        /**
         * 
         * @type {number}
         * @memberof BasicUserView
         */
        credentialWorkFlowCount?: number;
    }

    /**
     * 
     * @export
     * @interface Collection
     */
    export interface Collection {
        /**
         * 
         * @type {string}
         * @memberof Collection
         */
        collectionId?: string;
        /**
         * 
         * @type {string}
         * @memberof Collection
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof Collection
         */
        ownerId?: string;
        /**
         * 
         * @type {Date}
         * @memberof Collection
         */
        dateAdded?: Date;
        /**
         * 
         * @type {Array<ApplicationCollectionShare>}
         * @memberof Collection
         */
        apps?: Array<ApplicationCollectionShare>;
        /**
         * 
         * @type {Array<ScheduleCollectionShare>}
         * @memberof Collection
         */
        schedules?: Array<ScheduleCollectionShare>;
        /**
         * 
         * @type {Array<InsightCollectionShare>}
         * @memberof Collection
         */
        insights?: Array<InsightCollectionShare>;
        /**
         * 
         * @type {Array<UserCollectionShare>}
         * @memberof Collection
         */
        users?: Array<UserCollectionShare>;
        /**
         * 
         * @type {Array<SubscriptionCollectionShare>}
         * @memberof Collection
         */
        subscriptions?: Array<SubscriptionCollectionShare>;
        /**
         * 
         * @type {Array<UserGroupCollectionShare>}
         * @memberof Collection
         */
        userGroups?: Array<UserGroupCollectionShare>;
        /**
         * 
         * @type {string}
         * @memberof Collection
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface CollectionPermissions
     */
    export interface CollectionPermissions {
        /**
         * 
         * @type {LocalCollectionPermissions}
         * @memberof CollectionPermissions
         */
        collection?: LocalCollectionPermissions;
        /**
         * 
         * @type {UpdatePermissions}
         * @memberof CollectionPermissions
         */
        applications?: UpdatePermissions;
        /**
         * 
         * @type {GenericPermissions}
         * @memberof CollectionPermissions
         */
        users?: GenericPermissions;
    }

    /**
     * 
     * @export
     * @interface ContactInfo
     */
    export interface ContactInfo {
        /**
         * 
         * @type {string}
         * @memberof ContactInfo
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof ContactInfo
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof ContactInfo
         */
        company?: string;
        /**
         * 
         * @type {MailingAddress}
         * @memberof ContactInfo
         */
        address?: MailingAddress;
    }

    /**
     * 
     * @export
     * @interface DataConnectionSearchView
     */
    export interface DataConnectionSearchView {
        /**
         * 
         * @type {number}
         * @memberof DataConnectionSearchView
         */
        subscriptionCount?: number;
        /**
         * 
         * @type {number}
         * @memberof DataConnectionSearchView
         */
        userCount?: number;
        /**
         * 
         * @type {number}
         * @memberof DataConnectionSearchView
         */
        userGroupCount?: number;
        /**
         * 
         * @type {Array<string>}
         * @memberof DataConnectionSearchView
         */
        userIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof DataConnectionSearchView
         */
        userGroupIds?: Array<string>;
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSearchView
         */
        connectionId?: string;
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSearchView
         */
        connectionString?: string;
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSearchView
         */
        connectionName?: string;
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSearchView
         */
        connectionType?: string;
    }

    /**
     * 
     * @export
     * @interface DataConnectionSummaryView
     */
    export interface DataConnectionSummaryView {
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSummaryView
         */
        connectionId?: string;
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSummaryView
         */
        connectionString?: string;
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSummaryView
         */
        connectionName?: string;
        /**
         * 
         * @type {string}
         * @memberof DataConnectionSummaryView
         */
        connectionType?: string;
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
     * @interface DeprecatedAdminApiSubscriptionView
     */
    export interface DeprecatedAdminApiSubscriptionView {
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiSubscriptionView
         */
        active?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiSubscriptionView
         */
        expirationDate?: string;
        /**
         * 
         * @type {number}
         * @memberof DeprecatedAdminApiSubscriptionView
         */
        memberPassesPurchased?: number;
        /**
         * 
         * @type {number}
         * @memberof DeprecatedAdminApiSubscriptionView
         */
        memberPassesUsed?: number;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiSubscriptionView
         */
        name?: string;
        /**
         * 
         * @type {ContactInfo}
         * @memberof DeprecatedAdminApiSubscriptionView
         */
        primaryContactInfo?: ContactInfo;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiSubscriptionView
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface DeprecatedAdminApiUserView
     */
    export interface DeprecatedAdminApiUserView {
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        accountLocked?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        accountLockedAt?: string;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        active?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        anonymous?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        canSchedule?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        canSetPriority?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        canSetWorkerAssignment?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        curator?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        dateAdded?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        dateUpdated?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        expirationDate?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        lastName?: string;
        /**
         * 
         * @type {number}
         * @memberof DeprecatedAdminApiUserView
         */
        numFailedLogins?: number;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        pending?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        subscriptionId?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        updateLastLoginDate?: string;
        /**
         * 
         * @type {UserProfile}
         * @memberof DeprecatedAdminApiUserView
         */
        userProfile?: UserProfile;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedAdminApiUserView
         */
        validated?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        timezone?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        language?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedAdminApiUserView
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface DeprecatedInsightMetaInfo
     */
    export interface DeprecatedInsightMetaInfo {
        /**
         * 
         * @type {DeprecatedUserBaseModel}
         * @memberof DeprecatedInsightMetaInfo
         */
        owner?: DeprecatedUserBaseModel;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedInsightMetaInfo
         */
        insightId?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedInsightMetaInfo
         */
        name?: string;
        /**
         * 
         * @type {Date}
         * @memberof DeprecatedInsightMetaInfo
         */
        lastUpdated?: Date;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedInsightMetaInfo
         */
        ownerId?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedInsightMetaInfo
         */
        iconId?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedInsightMetaInfo
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface DeprecatedUserBaseModel
     */
    export interface DeprecatedUserBaseModel {
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        curator?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        anonymous?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        licenseCurator?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        sponsor?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        lastName?: string;
        /**
         * 
         * @type {Date}
         * @memberof DeprecatedUserBaseModel
         */
        dateAdded?: Date;
        /**
         * 
         * @type {Date}
         * @memberof DeprecatedUserBaseModel
         */
        dateUpdated?: Date;
        /**
         * 
         * @type {Date}
         * @memberof DeprecatedUserBaseModel
         */
        dateTermsAgreed?: Date;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        validated?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        pending?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        active?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        apiEnabled?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        apiKey?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        apiSecret?: string;
        /**
         * 
         * @type {SecurityInfo}
         * @memberof DeprecatedUserBaseModel
         */
        securityInfo?: SecurityInfo;
        /**
         * 
         * @type {number}
         * @memberof DeprecatedUserBaseModel
         */
        numFailedLogins?: number;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        accountLocked?: boolean;
        /**
         * 
         * @type {Date}
         * @memberof DeprecatedUserBaseModel
         */
        accountLockedAt?: Date;
        /**
         * 
         * @type {UserProfile}
         * @memberof DeprecatedUserBaseModel
         */
        userProfile?: UserProfile;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        subscriptionId?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        leadSourceDetail?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        industry?: string;
        /**
         * 
         * @type {{ [key: string]: string; }}
         * @memberof DeprecatedUserBaseModel
         */
        options?: { [key: string]: string; };
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        referrer?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        expirationDate?: string;
        /**
         * 
         * @type {Date}
         * @memberof DeprecatedUserBaseModel
         */
        expDate?: Date;
        /**
         * 
         * @type {Date}
         * @memberof DeprecatedUserBaseModel
         */
        updateLastLoginDate?: Date;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        sId?: string;
        /**
         * 
         * @type {DefaultUserCredential}
         * @memberof DeprecatedUserBaseModel
         */
        defaultCredential?: DefaultUserCredential;
        /**
         * 
         * @type {Array<string>}
         * @memberof DeprecatedUserBaseModel
         */
        credentials?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof DeprecatedUserBaseModel
         */
        dataConnections?: Array<string>;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        canSchedule?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        canSetPriority?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        canSetWorkerAssignment?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        recaptchaResponse?: string;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        timezone?: string;
        /**
         * 
         * @type {boolean}
         * @memberof DeprecatedUserBaseModel
         */
        canCreateCollections?: boolean;
        /**
         * 
         * @type {string}
         * @memberof DeprecatedUserBaseModel
         */
        id?: string;
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
     * @interface GenericPermissions
     */
    export interface GenericPermissions {
        /**
         * 
         * @type {boolean}
         * @memberof GenericPermissions
         */
        canAdd?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof GenericPermissions
         */
        canRemove?: boolean;
    }

    /**
     * 
     * @export
     * @interface InsightCollectionShare
     */
    export interface InsightCollectionShare {
        /**
         * 
         * @type {string}
         * @memberof InsightCollectionShare
         */
        insightId?: string;
        /**
         * 
         * @type {Date}
         * @memberof InsightCollectionShare
         */
        dateAdded?: Date;
        /**
         * 
         * @type {string}
         * @memberof InsightCollectionShare
         */
        addedById?: string;
    }

    /**
     * 
     * @export
     * @interface IterationBase
     */
    export interface IterationBase {
        /**
         * 
         * @type {string}
         * @memberof IterationBase
         */
        startTime?: string;
        /**
         * 
         * @type {string}
         * @memberof IterationBase
         */
        endTime?: string;
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
     * @interface JobListApiView
     */
    export interface JobListApiView {
        /**
         * 
         * @type {string}
         * @memberof JobListApiView
         */
        id?: string;
        /**
         * 
         * @type {Date}
         * @memberof JobListApiView
         */
        createDate?: Date;
        /**
         * 
         * @type {string}
         * @memberof JobListApiView
         */
        status?: string;
        /**
         * 
         * @type {string}
         * @memberof JobListApiView
         */
        disposition?: string;
        /**
         * 
         * @type {string}
         * @memberof JobListApiView
         */
        priority?: JobListApiView.PriorityEnum;
        /**
         * 
         * @type {string}
         * @memberof JobListApiView
         */
        workerTag?: string;
        /**
         * 
         * @type {string}
         * @memberof JobListApiView
         */
        runWithE2?: string;
    }

    /**
     * @export
     * @namespace JobListApiView
     */
    export namespace JobListApiView {
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
     * @interface LocalCollectionPermissions
     */
    export interface LocalCollectionPermissions {
        /**
         * 
         * @type {boolean}
         * @memberof LocalCollectionPermissions
         */
        isAdmin?: boolean;
    }

    /**
     * 
     * @export
     * @interface MailingAddress
     */
    export interface MailingAddress {
        /**
         * 
         * @type {string}
         * @memberof MailingAddress
         */
        country?: string;
        /**
         * 
         * @type {string}
         * @memberof MailingAddress
         */
        addressLine1?: string;
        /**
         * 
         * @type {string}
         * @memberof MailingAddress
         */
        addressLine2?: string;
        /**
         * 
         * @type {string}
         * @memberof MailingAddress
         */
        city?: string;
        /**
         * 
         * @type {string}
         * @memberof MailingAddress
         */
        state?: string;
        /**
         * 
         * @type {string}
         * @memberof MailingAddress
         */
        postalCode?: string;
    }

    /**
     * 
     * @export
     * @interface MigratableWorkflowView
     */
    export interface MigratableWorkflowView {
        /**
         * 
         * @type {string}
         * @memberof MigratableWorkflowView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof MigratableWorkflowView
         */
        publishedVersionId?: string;
        /**
         * 
         * @type {string}
         * @memberof MigratableWorkflowView
         */
        subscriptionId?: string;
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
     * @interface QuestionApiView
     */
    export interface QuestionApiView {
        /**
         * 
         * @type {string}
         * @memberof QuestionApiView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof QuestionApiView
         */
        type?: string;
        /**
         * 
         * @type {string}
         * @memberof QuestionApiView
         */
        description?: string;
        /**
         * 
         * @type {string}
         * @memberof QuestionApiView
         */
        value?: string;
        /**
         * 
         * @type {Array<QuestionItem>}
         * @memberof QuestionApiView
         */
        items?: Array<QuestionItem>;
        /**
         * 
         * @type {string}
         * @memberof QuestionApiView
         */
        multiple?: string;
    }

    /**
     * 
     * @export
     * @interface QuestionItem
     */
    export interface QuestionItem {
        /**
         * 
         * @type {string}
         * @memberof QuestionItem
         */
        key?: string;
        /**
         * 
         * @type {string}
         * @memberof QuestionItem
         */
        value?: string;
    }

    /**
     * 
     * @export
     * @interface ScheduleCollectionShare
     */
    export interface ScheduleCollectionShare {
        /**
         * 
         * @type {string}
         * @memberof ScheduleCollectionShare
         */
        scheduleId?: string;
        /**
         * 
         * @type {Date}
         * @memberof ScheduleCollectionShare
         */
        dateAdded?: Date;
        /**
         * 
         * @type {string}
         * @memberof ScheduleCollectionShare
         */
        addedById?: string;
    }

    /**
     * 
     * @export
     * @interface ScheduleView
     */
    export interface ScheduleView {
        /**
         * 
         * @type {boolean}
         * @memberof ScheduleView
         */
        canEdit?: boolean;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        id?: string;
        /**
         * 
         * @type {BasicApplicationView}
         * @memberof ScheduleView
         */
        application?: BasicApplicationView;
        /**
         * 
         * @type {BasicUserView}
         * @memberof ScheduleView
         */
        owner?: BasicUserView;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        comment?: string;
        /**
         * 
         * @type {boolean}
         * @memberof ScheduleView
         */
        enabled?: boolean;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        priority?: ScheduleView.PriorityEnum;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        workerTag?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        status?: string;
        /**
         * 
         * @type {SourcedCredentialView}
         * @memberof ScheduleView
         */
        credential?: SourcedCredentialView;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        creationTime?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        lastRunTime?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        nextRunTime?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        state?: string;
        /**
         * 
         * @type {number}
         * @memberof ScheduleView
         */
        runCount?: number;
        /**
         * 
         * @type {IterationBase}
         * @memberof ScheduleView
         */
        iteration?: IterationBase;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        frequency?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        timezone?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        lastError?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        cpuName?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        lastModifiedId?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        lastModifiedDate?: string;
    }

    /**
     * @export
     * @namespace ScheduleView
     */
    export namespace ScheduleView {
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
     * @interface SourcedCredentialView
     */
    export interface SourcedCredentialView {
        /**
         * 
         * @type {string}
         * @memberof SourcedCredentialView
         */
        credentialId?: string;
        /**
         * 
         * @type {string}
         * @memberof SourcedCredentialView
         */
        username?: string;
        /**
         * 
         * @type {string}
         * @memberof SourcedCredentialView
         */
        source?: string;
    }

    /**
     * 
     * @export
     * @interface SubscriptionCollectionShare
     */
    export interface SubscriptionCollectionShare {
        /**
         * 
         * @type {string}
         * @memberof SubscriptionCollectionShare
         */
        subscriptionId?: string;
        /**
         * 
         * @type {Date}
         * @memberof SubscriptionCollectionShare
         */
        dateAdded?: Date;
        /**
         * 
         * @type {string}
         * @memberof SubscriptionCollectionShare
         */
        addedById?: string;
        /**
         * 
         * @type {Date}
         * @memberof SubscriptionCollectionShare
         */
        expirationDate?: Date;
        /**
         * 
         * @type {Array<string>}
         * @memberof SubscriptionCollectionShare
         */
        optOutUsers?: Array<string>;
        /**
         * 
         * @type {CollectionPermissions}
         * @memberof SubscriptionCollectionShare
         */
        permissions?: CollectionPermissions;
    }

    /**
     * 
     * @export
     * @interface UpdatePermissions
     */
    export interface UpdatePermissions {
        /**
         * 
         * @type {boolean}
         * @memberof UpdatePermissions
         */
        canUpdate?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdatePermissions
         */
        canAdd?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdatePermissions
         */
        canRemove?: boolean;
    }

    /**
     * 
     * @export
     * @interface UserCollectionShare
     */
    export interface UserCollectionShare {
        /**
         * 
         * @type {string}
         * @memberof UserCollectionShare
         */
        userId?: string;
        /**
         * 
         * @type {Date}
         * @memberof UserCollectionShare
         */
        dateAdded?: Date;
        /**
         * 
         * @type {string}
         * @memberof UserCollectionShare
         */
        addedById?: string;
        /**
         * 
         * @type {ActiveDirectoryObject}
         * @memberof UserCollectionShare
         */
        activeDirectoryObject?: ActiveDirectoryObject;
        /**
         * 
         * @type {Date}
         * @memberof UserCollectionShare
         */
        expirationDate?: Date;
        /**
         * 
         * @type {CollectionPermissions}
         * @memberof UserCollectionShare
         */
        permissions?: CollectionPermissions;
    }

    /**
     * 
     * @export
     * @interface UserGroupCollectionShare
     */
    export interface UserGroupCollectionShare {
        /**
         * 
         * @type {string}
         * @memberof UserGroupCollectionShare
         */
        userGroupId?: string;
        /**
         * 
         * @type {Date}
         * @memberof UserGroupCollectionShare
         */
        dateAdded?: Date;
        /**
         * 
         * @type {string}
         * @memberof UserGroupCollectionShare
         */
        addedById?: string;
        /**
         * 
         * @type {Date}
         * @memberof UserGroupCollectionShare
         */
        expirationDate?: Date;
        /**
         * 
         * @type {CollectionPermissions}
         * @memberof UserGroupCollectionShare
         */
        permissions?: CollectionPermissions;
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
     * @interface WorkflowAdminApiView
     */
    export interface WorkflowAdminApiView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowAdminApiView
         */
        publishedVersionId?: string;
        /**
         * 
         * @type {number}
         * @memberof WorkflowAdminApiView
         */
        publishedVersionNumber?: number;
        /**
         * 
         * @type {WorkflowOwnerAdminView}
         * @memberof WorkflowAdminApiView
         */
        publishedVersionOwner?: WorkflowOwnerAdminView;
        /**
         * 
         * @type {Array<WorkflowCollectionView>}
         * @memberof WorkflowAdminApiView
         */
        collections?: Array<WorkflowCollectionView>;
        /**
         * 
         * @type {Date}
         * @memberof WorkflowAdminApiView
         */
        lastRunDate?: Date;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAdminApiView
         */
        subscriptionName?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAdminApiView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAdminApiView
         */
        subscriptionId?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAdminApiView
         */
        _public?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAdminApiView
         */
        runDisabled?: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAdminApiView
         */
        packageType?: WorkflowAdminApiView.PackageTypeEnum;
        /**
         * 
         * @type {Date}
         * @memberof WorkflowAdminApiView
         */
        uploadDate?: Date;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAdminApiView
         */
        fileName?: string;
        /**
         * 
         * @type {WorkflowMetaInfoApiView}
         * @memberof WorkflowAdminApiView
         */
        metaInfo?: WorkflowMetaInfoApiView;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAdminApiView
         */
        isChained?: boolean;
        /**
         * 
         * @type {number}
         * @memberof WorkflowAdminApiView
         */
        version?: number;
        /**
         * 
         * @type {number}
         * @memberof WorkflowAdminApiView
         */
        runCount?: number;
        /**
         * 
         * @type {string}
         * @memberof WorkflowAdminApiView
         */
        workerTag?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowAdminApiView
         */
        isE2?: boolean;
    }

    /**
     * @export
     * @namespace WorkflowAdminApiView
     */
    export namespace WorkflowAdminApiView {
        /**
         * @export
         * @enum {string}
         */
        export enum PackageTypeEnum {
            App = <any> 'App',
            Module = <any> 'Module',
            Macro = <any> 'Macro'
        }
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

    /**
     * 
     * @export
     * @interface WorkflowApiView
     */
    export interface WorkflowApiView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowApiView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowApiView
         */
        subscriptionId?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowApiView
         */
        _public?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowApiView
         */
        runDisabled?: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowApiView
         */
        packageType?: WorkflowApiView.PackageTypeEnum;
        /**
         * 
         * @type {Date}
         * @memberof WorkflowApiView
         */
        uploadDate?: Date;
        /**
         * 
         * @type {string}
         * @memberof WorkflowApiView
         */
        fileName?: string;
        /**
         * 
         * @type {WorkflowMetaInfoApiView}
         * @memberof WorkflowApiView
         */
        metaInfo?: WorkflowMetaInfoApiView;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowApiView
         */
        isChained?: boolean;
        /**
         * 
         * @type {number}
         * @memberof WorkflowApiView
         */
        version?: number;
        /**
         * 
         * @type {number}
         * @memberof WorkflowApiView
         */
        runCount?: number;
        /**
         * 
         * @type {string}
         * @memberof WorkflowApiView
         */
        workerTag?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowApiView
         */
        isE2?: boolean;
    }

    /**
     * @export
     * @namespace WorkflowApiView
     */
    export namespace WorkflowApiView {
        /**
         * @export
         * @enum {string}
         */
        export enum PackageTypeEnum {
            App = <any> 'App',
            Module = <any> 'Module',
            Macro = <any> 'Macro'
        }
    }

    /**
     * 
     * @export
     * @interface WorkflowCollectionView
     */
    export interface WorkflowCollectionView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowCollectionView
         */
        collectionName?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowCollectionView
         */
        collectionId?: string;
    }

    /**
     * 
     * @export
     * @interface WorkflowMetaInfoApiView
     */
    export interface WorkflowMetaInfoApiView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        description?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        author?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        copyright?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        url?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        urlText?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        outputMessage?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowMetaInfoApiView
         */
        noOutputFilesMessage?: string;
    }

    /**
     * 
     * @export
     * @interface WorkflowOwnerAdminView
     */
    export interface WorkflowOwnerAdminView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowOwnerAdminView
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowOwnerAdminView
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowOwnerAdminView
         */
        lastName?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowOwnerAdminView
         */
        sId?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowOwnerAdminView
         */
        subscriptionId?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowOwnerAdminView
         */
        email?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowOwnerAdminView
         */
        active?: boolean;
    }
}