import * as chai from "chai";
import { readFileSync } from "fs";
import "url-search-params-polyfill";
import { UserManagementClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest } from "./test-utils";
chai.should();

describe("[SDK] User Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk({
        ...auth,
        basicAuth: decrypt(auth, getPasskeyForUnitTest()),
    });
    const userClient = sdk.GetUserManagementClient();
    const wClient = sdk.GetWorkflowManagementClient();
    const usermail = `${new Date().getTime()}@unit.test.alteryx.rocks`;
    const group = `unit.test.alteryx.rocks.${new Date().getTime()}`;
    const dummyWorkflowFileBuffer = readFileSync("test/data/Dummy_Workflows.yxzp", {flag:'r',encoding:null});
    // Generate extId
    const extId = new Date().getTime().toString();

    before(async () => {
        await cleanup(userClient);
    });

    after(async () => {
        await cleanup(userClient);
    });

    it("1. should instantiate", async () => {
        userClient.should.not.be.undefined;
    });

    it("2. should list all users @sanity", async () => {
        const users = await userClient.GetUsers();
        users.length!.should.be.greaterThan(0);
    });

    it("3. should list all users that are active", async () => {
        const users = await userClient.GetUsers({ active: true });
        users.length!.should.be.greaterThan(0);
    });

    it("4. should list all users with full view", async () => {
        const users = await userClient.GetUsers({ view: "Full" });
        users.length!.should.be.greaterThan(0);
    });

    it("5. should list all user's assets with full view", async () => {
        const users = await userClient.GetUsers({ view: "Full" });
        users.length!.should.be.greaterThan(0);
        const user = users[0];

        const assets = await userClient.GetUsersAssets(user.id!, "All");
        assets.workflows?.length!.should.be.greaterThan(0);
    });

    /*
    it("6. the user crud operations on Users should work", async () => {
        // Create new user
        const createdUser = await userClient.CreateUser(getDummyUserContract(usermail));
        createdUser.should.not.be.null;
        createdUser.email!.should.equal(usermail);

        // Update user
        const extId = `${new Date().getTime()}-updated`;
        createdUser.lastName = extId;
        createdUser.firstName = extId;
        const updatedUser = await userClient.UpdateUser(
            createdUser.id!,
            createdUser as SDKModels.UpdateUserContract
        );
        (updatedUser as any).firstName!.should.equal(extId);
        
        // Read updated user
        const user = await userClient.GetUser(updatedUser.id!);
        user.email!.should.equal(usermail);

        // Deactivate user
        await userClient.DeactivateUser(updatedUser.id!);

        // Delete user
        const result = await userClient.DeleteUser(createdUser.id!);
        result.status!.should.equal(200);
    });
    */

    it("6. should list all shared credentials of the first user using V2 API", async () => {
        const tmps = await userClient.GetSharedCredentialsV2();
        tmps?.length!.should.be.greaterThanOrEqual(0);
    });

    it("7. should create a new job using V2 API", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);

        const workflow = workflows[0];
        const newJob = await userClient.PostNewJobV2(workflow?.id?workflow.id:"", {});        
        newJob.status!.should.be.equals("Queued");
    });

    /* TODO: 2022-08-03 seems not to work
    it("8. should create a temporay file on the server using the V2 API", async () => {
        const dummyFile = await userClient.publishTempFileV2(dummyWorkflowFileBuffer, `${extId}.unit.test.alteryx.rocks.yxzp`);
        dummyFile.should.not.be.undefined
        dummyFile.should.not.be.empty
    });
    */
});
async function cleanup(userSDK: UserManagementClient) {

    const users = await (
        await userSDK.GetUsers({
            view: 'Full'
        })
    ).filter(
        (x) => x.email?.endsWith("unit.test.alteryx.rocks"));

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        // Show all assets of users
        const assets = await userSDK.GetUsersAssets(element.id!, "All");

        // Deactivate user
        await userSDK.DeactivateUser(element.id!);

        // Delete User
        // console.log(element.id);
        //await userSDK.DeleteUser(element.id!);
    }
}

function getDummyUserContract(email:string){
    return {
        firstName: "string",
        lastName: "string",
        email: email,
    }
}
