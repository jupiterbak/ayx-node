'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@jupiterbak/ayx-node</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AdminManagementClient.html" data-type="entity-link" >AdminManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminManagementClientV1.html" data-type="entity-link" >AdminManagementClientV1</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminManagementClientV2.html" data-type="entity-link" >AdminManagementClientV2</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlteryxConnectBase.html" data-type="entity-link" >AlteryxConnectBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlteryxSdk.html" data-type="entity-link" >AlteryxSdk</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthBase.html" data-type="entity-link" >AuthBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/CollectionManagementClient.html" data-type="entity-link" >CollectionManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/CredentialAuth.html" data-type="entity-link" >CredentialAuth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CredentialsManagementClient.html" data-type="entity-link" >CredentialsManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/DCMEConnectionClient.html" data-type="entity-link" >DCMEConnectionClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/JobManagementClient.html" data-type="entity-link" >JobManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/JobManagementClientV1.html" data-type="entity-link" >JobManagementClientV1</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequiredError.html" data-type="entity-link" >RequiredError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequiredError-1.html" data-type="entity-link" >RequiredError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequiredError-2.html" data-type="entity-link" >RequiredError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScheduleManagementClient.html" data-type="entity-link" >ScheduleManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/SdkClient.html" data-type="entity-link" >SdkClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/SecretCredentialAuth.html" data-type="entity-link" >SecretCredentialAuth</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerConnectionClient.html" data-type="entity-link" >ServerConnectionClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenManagerAuth.html" data-type="entity-link" >TokenManagerAuth</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAuth.html" data-type="entity-link" >UserAuth</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserGroupManagementClient.html" data-type="entity-link" >UserGroupManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserManagementClient.html" data-type="entity-link" >UserManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserManagementClientV2.html" data-type="entity-link" >UserManagementClientV2</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkflowManagementClient.html" data-type="entity-link" >WorkflowManagementClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkflowManagementClientV1.html" data-type="entity-link" >WorkflowManagementClientV1</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddCredentialsUserContract.html" data-type="entity-link" >AddCredentialsUserContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCredentialsUserGroupContract.html" data-type="entity-link" >AddCredentialsUserGroupContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddInsightContract.html" data-type="entity-link" >AddInsightContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddScheduleContract.html" data-type="entity-link" >AddScheduleContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddServerConnectionUserContract.html" data-type="entity-link" >AddServerConnectionUserContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddServerConnectionUserGroupContract.html" data-type="entity-link" >AddServerConnectionUserGroupContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddUserContract.html" data-type="entity-link" >AddUserContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddUserGroupContract.html" data-type="entity-link" >AddUserGroupContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddWorkflowContract.html" data-type="entity-link" >AddWorkflowContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminApiSubscriptionView.html" data-type="entity-link" >AdminApiSubscriptionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminApiUserView.html" data-type="entity-link" >AdminApiUserView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlteryxCredentials.html" data-type="entity-link" >AlteryxCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApplicationCollectionShare.html" data-type="entity-link" >ApplicationCollectionShare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppValue.html" data-type="entity-link" >AppValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppValue-1.html" data-type="entity-link" >AppValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppValues.html" data-type="entity-link" >AppValues</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppValuesV2.html" data-type="entity-link" >AppValuesV2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssetDataView.html" data-type="entity-link" >AssetDataView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssetsView.html" data-type="entity-link" >AssetsView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuditEvent.html" data-type="entity-link" >AuditEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicApplicationView.html" data-type="entity-link" >BasicApplicationView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicUserView.html" data-type="entity-link" >BasicUserView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientCredentials.html" data-type="entity-link" >ClientCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Collection.html" data-type="entity-link" >Collection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollectionPermissions.html" data-type="entity-link" >CollectionPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollectionsPermissionsViewContract.html" data-type="entity-link" >CollectionsPermissionsViewContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollectionUserView.html" data-type="entity-link" >CollectionUserView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollectionView.html" data-type="entity-link" >CollectionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContactInfo.html" data-type="entity-link" >ContactInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateCollectionContract.html" data-type="entity-link" >CreateCollectionContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateUserContract.html" data-type="entity-link" >CreateUserContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CredentialApiView.html" data-type="entity-link" >CredentialApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CredentialsView.html" data-type="entity-link" >CredentialsView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataConnectionSearchView.html" data-type="entity-link" >DataConnectionSearchView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataConnectionSummaryView.html" data-type="entity-link" >DataConnectionSummaryView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DCMEConnectionConnectView.html" data-type="entity-link" >DCMEConnectionConnectView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultUserCredential.html" data-type="entity-link" >DefaultUserCredential</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultUserCredential-1.html" data-type="entity-link" >DefaultUserCredential</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeprecatedAdminApiSubscriptionView.html" data-type="entity-link" >DeprecatedAdminApiSubscriptionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeprecatedAdminApiUserView.html" data-type="entity-link" >DeprecatedAdminApiUserView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeprecatedInsightMetaInfo.html" data-type="entity-link" >DeprecatedInsightMetaInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeprecatedUserBaseModel.html" data-type="entity-link" >DeprecatedUserBaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EngineMessageApiView.html" data-type="entity-link" >EngineMessageApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EngineMessageApiView-1.html" data-type="entity-link" >EngineMessageApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericPermissions.html" data-type="entity-link" >GenericPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InsightCollectionShare.html" data-type="entity-link" >InsightCollectionShare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InsightMetaInfo.html" data-type="entity-link" >InsightMetaInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvalidRequestResponseBody.html" data-type="entity-link" >InvalidRequestResponseBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IterationBase.html" data-type="entity-link" >IterationBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IterationBase-1.html" data-type="entity-link" >IterationBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IterationCustomContract.html" data-type="entity-link" >IterationCustomContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IterationDailyContract.html" data-type="entity-link" >IterationDailyContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IterationHourlyContract.html" data-type="entity-link" >IterationHourlyContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalCollectionPermissions.html" data-type="entity-link" >LocalCollectionPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailingAddress.html" data-type="entity-link" >MailingAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Member.html" data-type="entity-link" >Member</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MigratableWorkflowView.html" data-type="entity-link" >MigratableWorkflowView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutputDataApiView.html" data-type="entity-link" >OutputDataApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutputDataApiView-1.html" data-type="entity-link" >OutputDataApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OwnerView.html" data-type="entity-link" >OwnerView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuestionApiView.html" data-type="entity-link" >QuestionApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuestionItem.html" data-type="entity-link" >QuestionItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReducedCollectionView.html" data-type="entity-link" >ReducedCollectionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReducedCredentialsView.html" data-type="entity-link" >ReducedCredentialsView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReducedScheduleView.html" data-type="entity-link" >ReducedScheduleView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReducedServerConnectionView.html" data-type="entity-link" >ReducedServerConnectionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScheduleCollectionShare.html" data-type="entity-link" >ScheduleCollectionShare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScheduleForecastView.html" data-type="entity-link" >ScheduleForecastView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchScheduleContract.html" data-type="entity-link" >SearchScheduleContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SecretCredentials.html" data-type="entity-link" >SecretCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SecurityInfo.html" data-type="entity-link" >SecurityInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SecurityInfo-1.html" data-type="entity-link" >SecurityInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServerConnectionView.html" data-type="entity-link" >ServerConnectionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SourcedCredentialView.html" data-type="entity-link" >SourcedCredentialView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscriptionCollectionShare.html" data-type="entity-link" >SubscriptionCollectionShare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenCredentials.html" data-type="entity-link" >TokenCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenRotation.html" data-type="entity-link" >TokenRotation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateCollectionContract.html" data-type="entity-link" >UpdateCollectionContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdatePermissions.html" data-type="entity-link" >UpdatePermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdatePermissionsContract.html" data-type="entity-link" >UpdatePermissionsContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateServerConnectionContract.html" data-type="entity-link" >UpdateServerConnectionContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCollectionShare.html" data-type="entity-link" >UserCollectionShare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCredentials.html" data-type="entity-link" >UserCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserGroupAddedUsersView.html" data-type="entity-link" >UserGroupAddedUsersView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserGroupCollectionShare.html" data-type="entity-link" >UserGroupCollectionShare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserProfile.html" data-type="entity-link" >UserProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserProfile-1.html" data-type="entity-link" >UserProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiAppView.html" data-type="entity-link" >WfaAdminApiAppView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiAppView-1.html" data-type="entity-link" >WfaAdminApiAppView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiEventView.html" data-type="entity-link" >WfaAdminApiEventView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiEventView-1.html" data-type="entity-link" >WfaAdminApiEventView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiRevisionView.html" data-type="entity-link" >WfaAdminApiRevisionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiRevisionView-1.html" data-type="entity-link" >WfaAdminApiRevisionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiSubView.html" data-type="entity-link" >WfaAdminApiSubView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiSubView-1.html" data-type="entity-link" >WfaAdminApiSubView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiUserView.html" data-type="entity-link" >WfaAdminApiUserView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WfaAdminApiUserView-1.html" data-type="entity-link" >WfaAdminApiUserView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WindowsIdentity.html" data-type="entity-link" >WindowsIdentity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowAllAdminApiView.html" data-type="entity-link" >WorkflowAllAdminApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowAllAdminApiView-1.html" data-type="entity-link" >WorkflowAllAdminApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowCollectionView.html" data-type="entity-link" >WorkflowCollectionView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowDetails.html" data-type="entity-link" >WorkflowDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowMetaInfoApiView.html" data-type="entity-link" >WorkflowMetaInfoApiView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowOwnerAdminView.html" data-type="entity-link" >WorkflowOwnerAdminView</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});