import * as chai from "chai";
import "url-search-params-polyfill";
import { UserGroupManagementClient, UserManagementClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest } from "./test-utils";
chai.should();

describe("[SDK] User Group Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk(auth);
    const groupClient = sdk.GetUserGroupManagementClient();
    const userClient = sdk.GetUserManagementClient();
    const groupName = `unit.test.alteryx.rocks.${new Date().getTime()}`;
    let _createdGroupId = "";
    let _userId = "";

    before(async () => {
        await cleanup(groupClient);
    });

    after(async () => {
        await cleanup(groupClient);
    });

    it("1. should instantiate", async () => {
        groupClient.should.not.be.undefined;
    });

    it("2. should list all user groups @sanity", async () => {
        const groups = await groupClient.GetUserGroups();
        groups.length!.should.be.greaterThanOrEqual(0);
    });

    it("3. should create new user group", async () => {
        // Create new User Group
        const createdGroupId = await groupClient.CreateUserGroup(getDummyUserGroupContract(groupName));
        createdGroupId.should.not.be.null;
        createdGroupId!.should.not.be.empty;
        _createdGroupId = createdGroupId;
    });

    it("4. should update user group", async () => {
        // Update User Group
        const extName = `${groupName}-updated`;
        const updatedGroupResponse = await groupClient.UpdateUserGroup(
            _createdGroupId,
            getDummyUserGroupContract(extName)
        );
        (updatedGroupResponse as Response).status!.should.equal(200);
    });

    it("5. should add user to user group", async () => {
        // Add a user to the group
        const users = await userClient.GetUsers({view: 'Full'});
        users.length!.should.be.greaterThan(0);
        const user = users[0];
        _userId = user.id!;
        
        const addedUserView = await groupClient.AddUsersToGroup(
            _createdGroupId,
            [user.id!]
        );
        addedUserView.successfullyAddedUserCount!.should.be.greaterThan(0);
    });

    it("6. should remove user from user group", async () => {
        // Remove user from group
        const removeUserFromGroup = await groupClient.RemoveUserFromGroup(
            _createdGroupId,
            _userId
        );
        removeUserFromGroup.members?.length!.should.greaterThanOrEqual(0);
    });

    it("7. should delete user group", async () => {
        // Delete user group
        const result = await groupClient.DeleteUserGroup(_createdGroupId, true);
        result.status!.should.equal(200);
    });
    
    /*
    it("the user group crud operations on Groups should work", async () => {
        // Create new User Group
        const createdGroupId = await groupClient.CreateUserGroup(getDummyUserGroupContract(groupName));
        createdGroupId.should.not.be.null;
        createdGroupId!.should.not.be.empty;

        // Update User Group
        const extName = `${groupName}-updated`;
        const updatedGroupResponse = await groupClient.UpdateUserGroup(
            createdGroupId,
            getDummyUserGroupContract(extName)
        );
        (updatedGroupResponse as Response).status!.should.equal(200);

        // Add a user to the group
        const users = await userClient.GetUsers({view: 'Full'});
        users.length!.should.be.greaterThan(0);
        const user = users[0];
        
        const addedUserView = await groupClient.AddUsersToGroup(
            createdGroupId,
            [user.id!]
        );
        addedUserView.successfullyAddedUserCount!.should.be.greaterThan(0);

        // Remove user from group
        const removeUserFromGroup = await groupClient.RemoveUserFromGroup(
            createdGroupId,
            user.id!
        );
        removeUserFromGroup.members?.length!.should.greaterThanOrEqual(0);

        const result = await groupClient.DeleteUserGroup(createdGroupId, true);
        result.status!.should.equal(200);
    });
    */
});
async function cleanup(groupSDK: UserGroupManagementClient) {
    const groups = await (await groupSDK.GetUserGroups())
    .filter((x) => { var _a; return (_a = x.name) === null || _a === void 0 ? void 0 : _a.startsWith("unit.test.alteryx.rocks"); });

    for (let index = 0; index < groups.length; index++) {
        const element = groups[index];
        await groupSDK.DeleteUserGroup(element.id!,true);
    }
}

function getDummyUserGroupContract(name:string){
    return {
        name: name,
        role: SDKModels.CreateUserGroupContract.RoleEnum.Curator,
    }
}
