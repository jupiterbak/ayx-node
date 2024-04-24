export namespace SDKModels {
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
     * @interface ADObject
     */
    export interface ADObject {
        /**
         * 
         * @type {string}
         * @memberof ADObject
         */
        sid?: string;
        /**
         * 
         * @type {string}
         * @memberof ADObject
         */
        category?: ADObject.CategoryEnum;
        /**
         * 
         * @type {string}
         * @memberof ADObject
         */
        displayName?: string;
        /**
         * 
         * @type {string}
         * @memberof ADObject
         */
        domainName?: string;
        /**
         * 
         * @type {string}
         * @memberof ADObject
         */
        sidAccountName?: string;
    }

    /**
     * @export
     * @namespace ADObject
     */
    export namespace ADObject {
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
     * @interface AddCredentialsUserContract
     */
    export interface AddCredentialsUserContract {
        /**
         * 
         * @type {string}
         * @memberof AddCredentialsUserContract
         */
        userId: string;
    }

    /**
     * 
     * @export
     * @interface AddCredentialsUserGroupContract
     */
    export interface AddCredentialsUserGroupContract {
        /**
         * 
         * @type {string}
         * @memberof AddCredentialsUserGroupContract
         */
        userGroupId: string;
    }

    /**
     * 
     * @export
     * @interface AddInsightContract
     */
    export interface AddInsightContract {
        /**
         * 
         * @type {string}
         * @memberof AddInsightContract
         */
        insightId: string;
    }

    /**
     * 
     * @export
     * @interface AddScheduleContract
     */
    export interface AddScheduleContract {
        /**
         * 
         * @type {string}
         * @memberof AddScheduleContract
         */
        scheduleId: string;
    }

    /**
     * 
     * @export
     * @interface AddServerConnectionUserContract
     */
    export interface AddServerConnectionUserContract {
        /**
         * 
         * @type {string}
         * @memberof AddServerConnectionUserContract
         */
        userId: string;
    }

    /**
     * 
     * @export
     * @interface AddServerConnectionUserGroupContract
     */
    export interface AddServerConnectionUserGroupContract {
        /**
         * 
         * @type {string}
         * @memberof AddServerConnectionUserGroupContract
         */
        userGroupId: string;
    }

    /**
     * 
     * @export
     * @interface AddUserContract
     */
    export interface AddUserContract {
        /**
         * 
         * @type {string}
         * @memberof AddUserContract
         */
        userId: string;
        /**
         * 
         * @type {Date}
         * @memberof AddUserContract
         */
        expirationDate?: Date;
        /**
         * 
         * @type {CollectionsPermissionsViewContract}
         * @memberof AddUserContract
         */
        collectionsPermissions: CollectionsPermissionsViewContract;
    }

    /**
     * 
     * @export
     * @interface AddUserGroupContract
     */
    export interface AddUserGroupContract {
        /**
         * 
         * @type {string}
         * @memberof AddUserGroupContract
         */
        userGroupId: string;
        /**
         * 
         * @type {Date}
         * @memberof AddUserGroupContract
         */
        expirationDate?: Date;
        /**
         * 
         * @type {CollectionsPermissionsViewContract}
         * @memberof AddUserGroupContract
         */
        collectionsPermissions: CollectionsPermissionsViewContract;
    }

    /**
     * 
     * @export
     * @interface AddWorkflowContract
     */
    export interface AddWorkflowContract {
        /**
         * 
         * @type {string}
         * @memberof AddWorkflowContract
         */
        workflowId: string;
    }

    /**
     * 
     * @export
     * @interface AssetDataView
     */
    export interface AssetDataView {
        /**
         * 
         * @type {string}
         * @memberof AssetDataView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof AssetDataView
         */
        id?: string;
    }

    /**
     * 
     * @export
     * @interface AssetsView
     */
    export interface AssetsView {
        /**
         * 
         * @type {Array<AssetDataView>}
         * @memberof AssetsView
         */
        workflows?: Array<AssetDataView>;
        /**
         * 
         * @type {Array<AssetDataView>}
         * @memberof AssetsView
         */
        schedules?: Array<AssetDataView>;
        /**
         * 
         * @type {Array<AssetDataView>}
         * @memberof AssetsView
         */
        collections?: Array<AssetDataView>;
        /**
         * 
         * @type {Array<AssetDataView>}
         * @memberof AssetsView
         */
        insights?: Array<AssetDataView>;
    }

    /**
     * 
     * @export
     * @interface CollectionUserView
     */
    export interface CollectionUserView {
        /**
         * 
         * @type {string}
         * @memberof CollectionUserView
         */
        userId?: string;
        /**
         * 
         * @type {ActiveDirectoryObject}
         * @memberof CollectionUserView
         */
        activeDirectoryObject?: ActiveDirectoryObject;
    }

    /**
     * 
     * @export
     * @interface CollectionView
     */
    export interface CollectionView {
        /**
         * 
         * @type {string}
         * @memberof CollectionView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof CollectionView
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof CollectionView
         */
        ownerId: string;
        /**
         * 
         * @type {Date}
         * @memberof CollectionView
         */
        dateAdded: Date;
        /**
         * 
         * @type {Array<string>}
         * @memberof CollectionView
         */
        workflowIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof CollectionView
         */
        insightIds?: Array<string>;
        /**
         * 
         * @type {Array<CollectionUserView>}
         * @memberof CollectionView
         */
        users?: Array<CollectionUserView>;
        /**
         * 
         * @type {Array<string>}
         * @memberof CollectionView
         */
        subscriptionIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof CollectionView
         */
        userGroupIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof CollectionView
         */
        scheduleIds?: Array<string>;
    }

    /**
     * 
     * @export
     * @interface CollectionsPermissionsViewContract
     */
    export interface CollectionsPermissionsViewContract {
        /**
         * 
         * @type {boolean}
         * @memberof CollectionsPermissionsViewContract
         */
        isAdmin?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CollectionsPermissionsViewContract
         */
        canAddAssets?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CollectionsPermissionsViewContract
         */
        canRemoveAssets?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CollectionsPermissionsViewContract
         */
        canUpdateAssets?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CollectionsPermissionsViewContract
         */
        canAddUsers?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CollectionsPermissionsViewContract
         */
        canRemoveUsers?: boolean;
    }

    /**
     * 
     * @export
     * @interface CreateCollectionContract
     */
    export interface CreateCollectionContract {
        /**
         * The name of the new collection.
         * @type {string}
         * @memberof CreateCollectionContract
         */
        name: string;
    }

    /**
     * 
     * @export
     * @interface CreateScheduleContract
     */
    export interface CreateScheduleContract {
        /**
         * 
         * @type {string}
         * @memberof CreateScheduleContract
         */
        workflowId: string;
        /**
         * Contains a property corresponding to each IterationType value.
         * @type {IterationContract}
         * @memberof CreateScheduleContract
         */
        iteration: IterationContract;
        /**
         * 
         * @type {string}
         * @memberof CreateScheduleContract
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof CreateScheduleContract
         */
        comment?: string;
        /**
         * Optional Priority of schedule execution.   Authenticated user must be enabled to set priority or be a Curator, else this property is ignored.
         * @type {string}
         * @memberof CreateScheduleContract
         */
        priority?: CreateScheduleContract.PriorityEnum;
        /**
         * Optional WorkerTag for schedule execution.  Authenticated user must be enabled to set worker tags, else this property is ignored.
         * @type {string}
         * @memberof CreateScheduleContract
         */
        workerTag?: string;
        /**
         * Optional Credential to be used for schedule execution.
         * @type {string}
         * @memberof CreateScheduleContract
         */
        credentialId?: string;
    }

    /**
     * @export
     * @namespace CreateScheduleContract
     */
    export namespace CreateScheduleContract {
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
     * @interface CreateUserContract
     */
    export interface CreateUserContract {
        /**
         * 
         * @type {string}
         * @memberof CreateUserContract
         */
        firstName: string;
        /**
         * 
         * @type {string}
         * @memberof CreateUserContract
         */
        lastName: string;
        /**
         * 
         * @type {string}
         * @memberof CreateUserContract
         */
        email: string;
        /**
         * If no role is provided, the user will be set as Evaluated.    Accepted values are \"NoAccess\", \"Viewer\", \"Member\", \"Artisan\", \"Curator\", \"Evaluated\"
         * @type {string}
         * @memberof CreateUserContract
         */
        role?: string;
        /**
         * 
         * @type {string}
         * @memberof CreateUserContract
         */
        defaultWorkerTag?: string;
        /**
         * 
         * @type {boolean}
         * @memberof CreateUserContract
         */
        canScheduleJobs?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CreateUserContract
         */
        canPrioritizeJobs?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CreateUserContract
         */
        canAssignJobs?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CreateUserContract
         */
        canCreateCollections?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof CreateUserContract
         */
        isApiEnabled?: boolean;
        /**
         * 
         * @type {string}
         * @memberof CreateUserContract
         */
        defaultCredentialId?: string;
        /**
         * 
         * @type {boolean}
         * @memberof CreateUserContract
         */
        isActive?: boolean;
        /**
         * 
         * @type {string}
         * @memberof CreateUserContract
         */
        timeZone?: string;
    }

    /**
     * 
     * @export
     * @interface CreateUserGroupContract
     */
    export interface CreateUserGroupContract {
        /**
         * 
         * @type {string}
         * @memberof CreateUserGroupContract
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof CreateUserGroupContract
         */
        role: CreateUserGroupContract.RoleEnum;
    }

    /**
     * @export
     * @namespace CreateUserGroupContract
     */
    export namespace CreateUserGroupContract {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * 
     * @export
     * @interface CredentialsView
     */
    export interface CredentialsView {
        /**
         * 
         * @type {string}
         * @memberof CredentialsView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof CredentialsView
         */
        userName: string;
        /**
         * 
         * @type {Array<string>}
         * @memberof CredentialsView
         */
        userIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof CredentialsView
         */
        userGroupIds?: Array<string>;
    }

    /**
     * 
     * @export
     * @interface DCMEConnectionConnectView
     */
    export interface DCMEConnectionConnectView {
        /**
         * 
         * @type {string}
         * @memberof DCMEConnectionConnectView
         */
        objectId?: string;
        /**
         * 
         * @type {string}
         * @memberof DCMEConnectionConnectView
         */
        name?: string;
        /**
         * 
         * @type {any}
         * @memberof DCMEConnectionConnectView
         */
        dataSource?: any;
    }

    /**
     * SwaggerResponse-friendly object representing the response body structure of a BadRequest's ModelState
     * @export
     * @interface InvalidRequestResponseBody
     */
    export interface InvalidRequestResponseBody {
        /**
         * 
         * @type {string}
         * @memberof InvalidRequestResponseBody
         */
        message?: string;
        /**
         * 
         * @type {{ [key: string]: Array<string>; }}
         * @memberof InvalidRequestResponseBody
         */
        modelState?: { [key: string]: Array<string>; };
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
     * @interface IterationContract
     */
    export interface IterationContract {
        /**
         * 
         * @type {string}
         * @memberof IterationContract
         */
        iterationType: IterationContract.IterationTypeEnum;
        /**
         * Start Date Time as UTC-0
         * @type {Date}
         * @memberof IterationContract
         */
        startTime: Date;
        /**
         * End Date Time as UTC-0  Optional, if excluded the iteration will be indefinite.   Ignored for \"Single\" IterationType
         * @type {Date}
         * @memberof IterationContract
         */
        endTime?: Date;
        /**
         * Required when the IterationType is Hourly
         * @type {IterationHourlyContract}
         * @memberof IterationContract
         */
        hourlyContract?: IterationHourlyContract;
        /**
         * Required when the IterationType is Daily
         * @type {IterationDailyContract}
         * @memberof IterationContract
         */
        dailyContract?: IterationDailyContract;
        /**
         * Required when the IterationType is Weekly
         * @type {IterationWeeklyContract}
         * @memberof IterationContract
         */
        weeklyContract?: IterationWeeklyContract;
        /**
         * Required when the IterationType is Monthly
         * @type {IterationMonthlyContract}
         * @memberof IterationContract
         */
        monthlyContract?: IterationMonthlyContract;
        /**
         * Required when the IterationType is Custom
         * @type {IterationCustomContract}
         * @memberof IterationContract
         */
        customContract?: IterationCustomContract;
    }

    /**
     * @export
     * @namespace IterationContract
     */
    export namespace IterationContract {
        /**
         * @export
         * @enum {string}
         */
        export enum IterationTypeEnum {
            Once = <any> 'Once',
            Hourly = <any> 'Hourly',
            Weekly = <any> 'Weekly',
            Monthly = <any> 'Monthly',
            Custom = <any> 'Custom',
            Daily = <any> 'Daily'
        }
    }

    /**
     * 
     * @export
     * @interface IterationCustomContract
     */
    export interface IterationCustomContract {
        /**
         * 1, 4, 14 is the 1st, 4th, and 14th of each month.
         * @type {Array<number>}
         * @memberof IterationCustomContract
         */
        daysOfMonth: Array<number>;
        /**
         * Calendar months where January = 1 and December = 12
         * @type {Array<number>}
         * @memberof IterationCustomContract
         */
        months: Array<number>;
    }

    /**
     * 
     * @export
     * @interface IterationDailyContract
     */
    export interface IterationDailyContract {
        /**
         * 
         * @type {boolean}
         * @memberof IterationDailyContract
         */
        runOnlyWorkWeek?: boolean;
    }

    /**
     * 
     * @export
     * @interface IterationHourlyContract
     */
    export interface IterationHourlyContract {
        /**
         * 
         * @type {number}
         * @memberof IterationHourlyContract
         */
        hours: number;
        /**
         * 
         * @type {number}
         * @memberof IterationHourlyContract
         */
        minutes: number;
    }

    /**
     * 
     * @export
     * @interface IterationMonthlyContract
     */
    export interface IterationMonthlyContract {
        /**
         * 
         * @type {boolean}
         * @memberof IterationMonthlyContract
         */
        simpleDayOfMonth: boolean;
        /**
         * 15 would be the 15th of each month.  Required when SimpleDayOfMonth is true.
         * @type {number}
         * @memberof IterationMonthlyContract
         */
        dayOfMonth?: number;
        /**
         * 3 would imply the 3rd X of every month.  Required when SimpleDayOfMonth is false.
         * @type {number}
         * @memberof IterationMonthlyContract
         */
        occurrence?: number;
        /**
         * 0 = \"Sunday\"  0 implies the Xth Sunday of every month.  Required when SimpleDayOfMonth is false.
         * @type {string}
         * @memberof IterationMonthlyContract
         */
        dayOfWeek?: IterationMonthlyContract.DayOfWeekEnum;
    }

    /**
     * @export
     * @namespace IterationMonthlyContract
     */
    export namespace IterationMonthlyContract {
        /**
         * @export
         * @enum {string}
         */
        export enum DayOfWeekEnum {
            Sunday = <any> 'Sunday',
            Monday = <any> 'Monday',
            Tuesday = <any> 'Tuesday',
            Wednesday = <any> 'Wednesday',
            Thursday = <any> 'Thursday',
            Friday = <any> 'Friday',
            Saturday = <any> 'Saturday'
        }
    }

    /**
     * 
     * @export
     * @interface IterationWeeklyContract
     */
    export interface IterationWeeklyContract {
        /**
         * 
         * @type {Array<string>}
         * @memberof IterationWeeklyContract
         */
        daysOfWeek: Array<IterationWeeklyContract.DaysOfWeekEnum>;
    }

    /**
     * @export
     * @namespace IterationWeeklyContract
     */
    export namespace IterationWeeklyContract {
        /**
         * @export
         * @enum {string}
         */
        export enum DaysOfWeekEnum {
            Sunday = <any> 'Sunday',
            Monday = <any> 'Monday',
            Tuesday = <any> 'Tuesday',
            Wednesday = <any> 'Wednesday',
            Thursday = <any> 'Thursday',
            Friday = <any> 'Friday',
            Saturday = <any> 'Saturday'
        }
    }

    /**
     * 
     * @export
     * @interface Member
     */
    export interface Member {
        /**
         * 
         * @type {ADObject}
         * @memberof Member
         */
        activeDirectoryObject?: ADObject;
        /**
         * 
         * @type {string}
         * @memberof Member
         */
        userId?: string;
        /**
         * 
         * @type {Date}
         * @memberof Member
         */
        dateAddedToGroup?: Date;
        /**
         * 
         * @type {string}
         * @memberof Member
         */
        addedByUserId?: string;
    }

    /**
     * 
     * @export
     * @interface ReducedCollectionView
     */
    export interface ReducedCollectionView {
        /**
         * 
         * @type {string}
         * @memberof ReducedCollectionView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedCollectionView
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedCollectionView
         */
        ownerId: string;
        /**
         * 
         * @type {Date}
         * @memberof ReducedCollectionView
         */
        dateAdded: Date;
    }

    /**
     * 
     * @export
     * @interface ReducedCredentialsView
     */
    export interface ReducedCredentialsView {
        /**
         * 
         * @type {string}
         * @memberof ReducedCredentialsView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedCredentialsView
         */
        userName: string;
    }

    /**
     * 
     * @export
     * @interface ReducedScheduleView
     */
    export interface ReducedScheduleView {
        /**
         * 
         * @type {string}
         * @memberof ReducedScheduleView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedScheduleView
         */
        name: string;
        /**
         * The application id for the workflow in the gallery DB.    Will be null if the workflow has been deleted.
         * @type {string}
         * @memberof ReducedScheduleView
         */
        workflowId: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedScheduleView
         */
        ownerId: string;
        /**
         * RunDateTime will either be the next time the schedule will be run, OR  the next run time in the specified window of a search range
         * @type {string}
         * @memberof ReducedScheduleView
         */
        runDateTime: string;
    }

    /**
     * 
     * @export
     * @interface ReducedServerConnectionView
     */
    export interface ReducedServerConnectionView {
        /**
         * 
         * @type {string}
         * @memberof ReducedServerConnectionView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedServerConnectionView
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedServerConnectionView
         */
        connectionString: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedServerConnectionView
         */
        connectionType: string;
    }

    /**
     * 
     * @export
     * @interface ReducedUserGroupView
     */
    export interface ReducedUserGroupView {
        /**
         * 
         * @type {string}
         * @memberof ReducedUserGroupView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedUserGroupView
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedUserGroupView
         */
        role: ReducedUserGroupView.RoleEnum;
    }

    /**
     * @export
     * @namespace ReducedUserGroupView
     */
    export namespace ReducedUserGroupView {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * A subset of UserView properties to be returned for smaller payloads
     * @export
     * @interface ReducedUserView
     */
    export interface ReducedUserView {
        /**
         * 
         * @type {string}
         * @memberof ReducedUserView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedUserView
         */
        firstName: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedUserView
         */
        lastName: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedUserView
         */
        email: string;
        /**
         * 
         * @type {boolean}
         * @memberof ReducedUserView
         */
        isActive: boolean;
        /**
         * 
         * @type {string}
         * @memberof ReducedUserView
         */
        role: ReducedUserView.RoleEnum;
        /**
         * 
         * @type {Date}
         * @memberof ReducedUserView
         */
        dateCreated: Date;
    }

    /**
     * @export
     * @namespace ReducedUserView
     */
    export namespace ReducedUserView {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * 
     * @export
     * @interface ReducedWorkflowView
     */
    export interface ReducedWorkflowView {
        /**
         * 
         * @type {string}
         * @memberof ReducedWorkflowView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedWorkflowView
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof ReducedWorkflowView
         */
        ownerId: string;
        /**
         * 
         * @type {Date}
         * @memberof ReducedWorkflowView
         */
        dateCreated: Date;
        /**
         * 
         * @type {number}
         * @memberof ReducedWorkflowView
         */
        publishedVersionNumber: number;
        /**
         * 
         * @type {boolean}
         * @memberof ReducedWorkflowView
         */
        isAmp: boolean;
        /**
         * 
         * @type {string}
         * @memberof ReducedWorkflowView
         */
        executionMode: ReducedWorkflowView.ExecutionModeEnum;
    }

    /**
     * @export
     * @namespace ReducedWorkflowView
     */
    export namespace ReducedWorkflowView {
        /**
         * @export
         * @enum {string}
         */
        export enum ExecutionModeEnum {
            Safe = <any> 'Safe',
            SemiSafe = <any> 'SemiSafe',
            Standard = <any> 'Standard'
        }
    }

    /**
     * 
     * @export
     * @interface ScheduleView
     */
    export interface ScheduleView {
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        name: string;
        /**
         * Will be null if the workflow has been deleted.
         * @type {string}
         * @memberof ScheduleView
         */
        workflowId: string;
        /**
         * Will be null if the workflow has been deleted.
         * @type {string}
         * @memberof ScheduleView
         */
        versionId: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        ownerId: string;
        /**
         * RunDateTime will either be the next time the schedule will be run, OR  the next run time in the specified window of a search range.  UTC-0.
         * @type {string}
         * @memberof ScheduleView
         */
        runDateTime: string;
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
        enabled: boolean;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        priority: ScheduleView.PriorityEnum;
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
         * @type {string}
         * @memberof ScheduleView
         */
        credentialId?: string;
        /**
         * 
         * @type {string}
         * @memberof ScheduleView
         */
        creationTime: string;
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
        state?: string;
        /**
         * 
         * @type {number}
         * @memberof ScheduleView
         */
        runCount?: number;
        /**
         * All times are in UTC-0
         * @type {IterationBase}
         * @memberof ScheduleView
         */
        iteration: IterationBase;
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
        /**
         * 
         * @type {boolean}
         * @memberof ScheduleView
         */
        canEdit: boolean;
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
     * @interface SearchScheduleContract
     */
    export interface SearchScheduleContract {
        /**
         * 
         * @type {string}
         * @memberof SearchScheduleContract
         */
        ownerId?: string;
        /**
         * 
         * @type {string}
         * @memberof SearchScheduleContract
         */
        workflowId?: string;
        /**
         * 
         * @type {Date}
         * @memberof SearchScheduleContract
         */
        runsAfter?: Date;
        /**
         * 
         * @type {Date}
         * @memberof SearchScheduleContract
         */
        runsBefore?: Date;
    }

    /**
     * 
     * @export
     * @interface SearchUserContract
     */
    export interface SearchUserContract {
        /**
         * 
         * @type {boolean}
         * @memberof SearchUserContract
         */
        active?: boolean;
        /**
         * 
         * @type {string}
         * @memberof SearchUserContract
         */
        email?: string;
        /**
         * 
         * @type {string}
         * @memberof SearchUserContract
         */
        role?: SearchUserContract.RoleEnum;
        /**
         * 
         * @type {string}
         * @memberof SearchUserContract
         */
        firstName?: string;
        /**
         * 
         * @type {string}
         * @memberof SearchUserContract
         */
        lastName?: string;
        /**
         * 
         * @type {Date}
         * @memberof SearchUserContract
         */
        createdAfter?: Date;
        /**
         * 
         * @type {Date}
         * @memberof SearchUserContract
         */
        createdBefore?: Date;
    }

    /**
     * @export
     * @namespace SearchUserContract
     */
    export namespace SearchUserContract {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * 
     * @export
     * @interface ServerConnectionView
     */
    export interface ServerConnectionView {
        /**
         * 
         * @type {string}
         * @memberof ServerConnectionView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof ServerConnectionView
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof ServerConnectionView
         */
        connectionString: string;
        /**
         * 
         * @type {string}
         * @memberof ServerConnectionView
         */
        connectionType: string;
        /**
         * 
         * @type {Array<string>}
         * @memberof ServerConnectionView
         */
        userIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof ServerConnectionView
         */
        userGroupIds?: Array<string>;
    }

    /**
     * 
     * @export
     * @interface UpdateCollectionContract
     */
    export interface UpdateCollectionContract {
        /**
         * 
         * @type {string}
         * @memberof UpdateCollectionContract
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateCollectionContract
         */
        ownerId: string;
    }

    /**
     * 
     * @export
     * @interface UpdatePermissionsContract
     */
    export interface UpdatePermissionsContract {
        /**
         * 
         * @type {Date}
         * @memberof UpdatePermissionsContract
         */
        expirationDate?: Date;
        /**
         * 
         * @type {CollectionsPermissionsViewContract}
         * @memberof UpdatePermissionsContract
         */
        collectionsPermissions: CollectionsPermissionsViewContract;
    }

    /**
     * 
     * @export
     * @interface UpdateScheduleContract
     */
    export interface UpdateScheduleContract {
        /**
         * 
         * @type {string}
         * @memberof UpdateScheduleContract
         */
        workflowId: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateScheduleContract
         */
        ownerId: string;
        /**
         * Contains properties for each IterationType value
         * @type {IterationContract}
         * @memberof UpdateScheduleContract
         */
        iteration: IterationContract;
        /**
         * 
         * @type {string}
         * @memberof UpdateScheduleContract
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateScheduleContract
         */
        comment: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateScheduleContract
         */
        priority: UpdateScheduleContract.PriorityEnum;
        /**
         * 
         * @type {string}
         * @memberof UpdateScheduleContract
         */
        workerTag: string;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateScheduleContract
         */
        enabled: boolean;
        /**
         * 
         * @type {string}
         * @memberof UpdateScheduleContract
         */
        credentialId: string;
    }

    /**
     * @export
     * @namespace UpdateScheduleContract
     */
    export namespace UpdateScheduleContract {
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
     * @interface UpdateServerConnectionContract
     */
    export interface UpdateServerConnectionContract {
        /**
         * 
         * @type {string}
         * @memberof UpdateServerConnectionContract
         */
        name: string;
    }

    /**
     * 
     * @export
     * @interface UpdateUserContract
     */
    export interface UpdateUserContract {
        /**
         * The id of the user to be updated. Optional as will be set via the controller path parameter.
         * @type {string}
         * @memberof UpdateUserContract
         */
        id?: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserContract
         */
        firstName: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserContract
         */
        lastName: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserContract
         */
        email: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserContract
         */
        role: UpdateUserContract.RoleEnum;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserContract
         */
        defaultWorkerTag: string;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        canScheduleJobs: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        canPrioritizeJobs: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        canAssignJobs: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        canCreateCollections: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        isApiEnabled: boolean;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserContract
         */
        defaultCredentialId: string;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        isAccountLocked: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        isActive: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateUserContract
         */
        isValidated: boolean;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserContract
         */
        timeZone: string;
        /**
         * Supported Language values are \"de-de\", \"en-us\", \"es-es\", \"fr-fr\", \"it-it\", \"ja-jp\", \"pt-br\", \"zh-cn\"
         * @type {string}
         * @memberof UpdateUserContract
         */
        language: string;
    }

    /**
     * @export
     * @namespace UpdateUserContract
     */
    export namespace UpdateUserContract {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * 
     * @export
     * @interface UpdateUserGroupContract
     */
    export interface UpdateUserGroupContract {
        /**
         * 
         * @type {string}
         * @memberof UpdateUserGroupContract
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateUserGroupContract
         */
        role: UpdateUserGroupContract.RoleEnum;
    }

    /**
     * @export
     * @namespace UpdateUserGroupContract
     */
    export namespace UpdateUserGroupContract {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * 
     * @export
     * @interface UpdateWorkflowContract
     */
    export interface UpdateWorkflowContract {
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        versionId: string;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateWorkflowContract
         */
        makePublished: boolean;
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        ownerId: string;
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        workerTag: string;
        /**
         * 
         * @type {Array<string>}
         * @memberof UpdateWorkflowContract
         */
        districtTags: Array<string>;
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        comments: string;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateWorkflowContract
         */
        isPublic: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateWorkflowContract
         */
        isReadyForMigration: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateWorkflowContract
         */
        othersMayDownload: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateWorkflowContract
         */
        othersCanExecute: boolean;
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        executionMode: UpdateWorkflowContract.ExecutionModeEnum;
        /**
         * 
         * @type {boolean}
         * @memberof UpdateWorkflowContract
         */
        hasPrivateDataExemption?: boolean;
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        workflowCredentialType: UpdateWorkflowContract.WorkflowCredentialTypeEnum;
        /**
         * 
         * @type {string}
         * @memberof UpdateWorkflowContract
         */
        credentialId: string;
    }

    /**
     * @export
     * @namespace UpdateWorkflowContract
     */
    export namespace UpdateWorkflowContract {
        /**
         * @export
         * @enum {string}
         */
        export enum ExecutionModeEnum {
            Safe = <any> 'Safe',
            SemiSafe = <any> 'SemiSafe',
            Standard = <any> 'Standard'
        }

        /**
         * @export
         * @enum {string}
         */
        export enum WorkflowCredentialTypeEnum {
            Default = <any> 'Default',
            Required = <any> 'Required',
            Specific = <any> 'Specific'
        }
    }

    /**
     * 
     * @export
     * @interface WorkflowQuestionItemView
     */
    export interface WorkflowQuestionItemView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowQuestionItemView
         */
        key?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowQuestionItemView
         */
        value?: string;
    }

    /**
     * 
     * @export
     * @interface WorkflowQuestionView
     */
    export interface WorkflowQuestionView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowQuestionView
         */
        name?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowQuestionView
         */
        questionType?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowQuestionView
         */
        description?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowQuestionView
         */
        value?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowQuestionView
         */
        multiple?: boolean;
        /**
         * 
         * @type {Array<WorkflowQuestionItemView>}
         * @memberof WorkflowQuestionView
         */
        items?: Array<WorkflowQuestionItemView>;
    }

    /**
     * Represents limited information about a workflow's job
     * @export
     * @interface WorkflowJobView
     */
    export interface WorkflowJobView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowJobView
         */
        id?: string;
        /**
         * 
         * @type {Date}
         * @memberof WorkflowJobView
         */
        createDate?: Date;
        /**
         * 
         * @type {string}
         * @memberof WorkflowJobView
         */
        status?: WorkflowJobView.StatusEnum;
        /**
         * 
         * @type {string}
         * @memberof WorkflowJobView
         */
        priority?: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowJobView
         */
        workerTag?: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowJobView
         */
        runWithE2?: boolean;
    }

    /**
     * @export
     * @namespace WorkflowJobView
     */
    export namespace WorkflowJobView {
        /**
         * @export
         * @enum {string}
         */
        export enum StatusEnum {
            Created = <any> 'Created',
            Cancelled = <any> 'Cancelled',
            Running = <any> 'Running',
            Queued = <any> 'Queued',
            Completed = <any> 'Completed'
        }
    }

    /**
     * 
     * @export
     * @interface UserGroupAddedUsersView
     */
    export interface UserGroupAddedUsersView {
        /**
         * 
         * @type {number}
         * @memberof UserGroupAddedUsersView
         */
        successfullyAddedUserCount: number;
        /**
         * 
         * @type {number}
         * @memberof UserGroupAddedUsersView
         */
        totalUsersSubmittedCount: number;
        /**
         * 
         * @type {{ [key: string]: string; }}
         * @memberof UserGroupAddedUsersView
         */
        failedUserReasons?: { [key: string]: string; };
    }

    /**
     * 
     * @export
     * @interface UserGroupView
     */
    export interface UserGroupView {
        /**
         * 
         * @type {string}
         * @memberof UserGroupView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof UserGroupView
         */
        name: string;
        /**
         * 
         * @type {Date}
         * @memberof UserGroupView
         */
        dateAdded: Date;
        /**
         * 
         * @type {string}
         * @memberof UserGroupView
         */
        role: UserGroupView.RoleEnum;
        /**
         * 
         * @type {Array<string>}
         * @memberof UserGroupView
         */
        credentialIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof UserGroupView
         */
        connectionIds?: Array<string>;
        /**
         * 
         * @type {Array<Member>}
         * @memberof UserGroupView
         */
        members?: Array<Member>;
    }

    /**
     * @export
     * @namespace UserGroupView
     */
    export namespace UserGroupView {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * 
     * @export
     * @interface UserView
     */
    export interface UserView {
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        id: string;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        firstName: string;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        lastName: string;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        email: string;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        role: UserView.RoleEnum;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        defaultWorkerTag: string;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        canScheduleJobs: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        canPrioritizeJobs: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        canAssignJobs: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        canCreateCollections: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        isApiEnabled: boolean;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        defaultCredentialId?: string;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        isAccountLocked: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        isActive: boolean;
        /**
         * 
         * @type {Date}
         * @memberof UserView
         */
        lastLoginDateTime?: Date;
        /**
         * 
         * @type {boolean}
         * @memberof UserView
         */
        isValidated: boolean;
        /**
         * 
         * @type {Array<string>}
         * @memberof UserView
         */
        sharedCredentialIds?: Array<string>;
        /**
         * 
         * @type {Array<string>}
         * @memberof UserView
         */
        dataConnectionIds?: Array<string>;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        timeZone?: string;
        /**
         * 
         * @type {string}
         * @memberof UserView
         */
        language?: string;
    }

    /**
     * @export
     * @namespace UserView
     */
    export namespace UserView {
        /**
         * @export
         * @enum {string}
         */
        export enum RoleEnum {
            NoAccess = <any> 'NoAccess',
            Viewer = <any> 'Viewer',
            Member = <any> 'Member',
            Artisan = <any> 'Artisan',
            Curator = <any> 'Curator',
            Evaluated = <any> 'Evaluated'
        }
    }

    /**
     * 
     * @export
     * @interface WorkflowDetails
     */
    export interface WorkflowDetails {
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowDetails
         */
        isAmp: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        fileName: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        author: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        copyright: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        description: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        noOutputFilesMessage: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        outputMessage: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        url: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowDetails
         */
        urlText: string;
    }

    /**
     * 
     * @export
     * @interface WorkflowVersionView
     */
    export interface WorkflowVersionView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowVersionView
         */
        versionId: string;
        /**
         * 
         * @type {number}
         * @memberof WorkflowVersionView
         */
        versionNumber: number;
        /**
         * 
         * @type {Date}
         * @memberof WorkflowVersionView
         */
        dateCreated: Date;
        /**
         * 
         * @type {string}
         * @memberof WorkflowVersionView
         */
        uploadSource: WorkflowVersionView.UploadSourceEnum;
        /**
         * 
         * @type {Date}
         * @memberof WorkflowVersionView
         */
        uploadDate: Date;
        /**
         * 
         * @type {string}
         * @memberof WorkflowVersionView
         */
        packageWorkflowType: WorkflowVersionView.PackageWorkflowTypeEnum;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowVersionView
         */
        published: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowVersionView
         */
        comments: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowVersionView
         */
        runDisabled: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowVersionView
         */
        executionMode: WorkflowVersionView.ExecutionModeEnum;
        /**
         * 
         * @type {string}
         * @memberof WorkflowVersionView
         */
        workflowCredentialType: WorkflowVersionView.WorkflowCredentialTypeEnum;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowVersionView
         */
        hasPrivateDataExemption?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowVersionView
         */
        othersMayDownload: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowVersionView
         */
        othersCanViewHistory: boolean;
        /**
         * 
         * @type {WorkflowDetails}
         * @memberof WorkflowVersionView
         */
        details: WorkflowDetails;
    }

    /**
     * @export
     * @namespace WorkflowVersionView
     */
    export namespace WorkflowVersionView {
        /**
         * @export
         * @enum {string}
         */
        export enum UploadSourceEnum {
            Designer = <any> 'Designer',
            Direct = <any> 'Direct'
        }
        /**
         * @export
         * @enum {string}
         */
        export enum PackageWorkflowTypeEnum {
            App = <any> 'App',
            Module = <any> 'Module',
            Macro = <any> 'Macro'
        }
        /**
         * @export
         * @enum {string}
         */
        export enum ExecutionModeEnum {
            Safe = <any> 'Safe',
            SemiSafe = <any> 'SemiSafe',
            Standard = <any> 'Standard'
        }
        /**
         * @export
         * @enum {string}
         */
        export enum WorkflowCredentialTypeEnum {
            Default = <any> 'Default',
            Required = <any> 'Required',
            Specific = <any> 'Specific'
        }
    }

    /**
     * 
     * @export
     * @interface WorkflowView
     */
    export interface WorkflowView {
        /**
         * 
         * @type {string}
         * @memberof WorkflowView
         */
        id: string;
        /**
         * 
         * @type {Date}
         * @memberof WorkflowView
         */
        dateCreated: Date;
        /**
         * 
         * @type {number}
         * @memberof WorkflowView
         */
        runCount: number;
        /**
         * 
         * @type {Array<WorkflowVersionView>}
         * @memberof WorkflowView
         */
        versions: Array<WorkflowVersionView>;
        /**
         * 
         * @type {string}
         * @memberof WorkflowView
         */
        name: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowView
         */
        ownerId: string;
        /**
         * 
         * @type {string}
         * @memberof WorkflowView
         */
        workerTag: string;
        /**
         * 
         * @type {Array<string>}
         * @memberof WorkflowView
         */
        districtTags: Array<string>;
        /**
         * 
         * @type {string}
         * @memberof WorkflowView
         */
        comments: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowView
         */
        isPublic: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowView
         */
        isReadyForMigration: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowView
         */
        publishedVersionId: string;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowView
         */
        othersMayDownload: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowView
         */
        othersCanViewHistory: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowView
         */
        othersCanExecute: boolean;
        /**
         * 
         * @type {string}
         * @memberof WorkflowView
         */
        executionMode?: WorkflowView.ExecutionModeEnum;
        /**
         * 
         * @type {boolean}
         * @memberof WorkflowView
         */
        hasPrivateDataExemption?: boolean;
    }

    /**
     * @export
     * @namespace WorkflowView
     */
    export namespace WorkflowView {
        /**
         * @export
         * @enum {string}
         */
        export enum ExecutionModeEnum {
            Safe = <any> 'Safe',
            SemiSafe = <any> 'SemiSafe',
            Standard = <any> 'Standard'
        }
    }
}
