import * as chai from "chai";
import "url-search-params-polyfill";
import { WorkflowManagementClient, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest} from "./test-utils";
import { readFileSync} from 'fs';

chai.should();

describe("[SDK] Admin Tasks Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk(auth);
    const aClient = sdk.GetAdminManagementClient();
    const wClient = sdk.GetWorkflowManagementClient();
    const dummyWorkflowFileBuffer = readFileSync("test/data/Dummy_Workflows.yxzp", {flag:'r',encoding:null});
    let suscriptionId = "";
    let createdWorkflowId = "";
    // Generate extId
    const extId = new Date().getTime().toString();

    before(async () => {
        await cleanup(wClient);
    });

    after(async () => {
        await cleanup(wClient);
    });

    it("1. should instantiate @sanity", async () => {
        aClient.should.not.be.undefined;
    });

    it("2. should find all users within the gallery using V1 @sanity", async () => {
        const users = await aClient.AdminGetPagedUsersV1();
        users.length!.should.be.greaterThan(0);
    });

    it("2a. should find all users within the gallery using V2 API", async () => {
        const users = await aClient.AdminGetPagedUsersV2();
        users.length!.should.be.greaterThan(0);
    });

    it("3. should find all schedules within the gallery", async () => {
        const tmps = await aClient.AdminGetPagedSchedulesV1();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("4. should find all collections within the gallery", async () => {
        const tmps = await aClient.AdminGetPagedCollectionsV1();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("5. should find all subscriptions within the gallery ", async () => {
        const tmps = await aClient.AdminGetPagedSubscriptionsV1();
        tmps.length!.should.be.greaterThan(0);

        suscriptionId = tmps[0].id!;
        suscriptionId.should.not.be.undefined;
        suscriptionId.should.not.be.empty;
    });

    it("5a. should find all subscriptions within the gallery using V2 API", async () => {
        const tmps = await aClient.AdminGetPagedSubscriptionsV2();
        tmps.length!.should.be.greaterThan(0);

        suscriptionId = tmps[0].id!;
        suscriptionId.should.not.be.undefined;
        suscriptionId.should.not.be.empty;
    });

    it("6. should find all server data connections within the gallery", async () => {
        const tmps = await aClient.AdminGetDataConnectionsV1();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("7. should find all system data connections within the gallery ", async () => {
        const tmps = await aClient.AdminGetSystemDataConnectionsV1();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("8. should find all insights ", async () => {
        const tmps = await aClient.AdminGetInsightsV1();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("8a. should find all insights using V2 API", async () => {
        const tmps = await aClient.AdminGetInsightsV2();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("9. should find all workflows using V1 API", async () => {
        const tmps = await aClient.AdminGetAllAppsV1();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("9a. should find all workflows using V2 API", async () => {
        const tmps = await aClient.AdminGetAllAppsV2();
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("10. should search for a specific workflow created in the test before", async () => {
        const tmps = await aClient.AdminGetAppsV1(`${extId}.unit.test.alteryx.rocks.yxzp`);
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    /* TODO: 2022-08-03 - Jupiter - Seems to not work properly
    it("11. should find all migratable workflows ", async () => {
        const tmps = await aClient.AdminGetMigratableAppsV1(suscriptionId);
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    it("12. should add a new workflow", async () => {
        // Get a user
        const users = await aClient.AdminGetPagedUsersV1();
        users.length!.should.be.greaterThan(0);
        const targetUser = users[0];

        // Create a new workflow
        createdWorkflowId = await aClient.AdminPublishYxzpV1(
            Buffer.from(dummyWorkflowFileBuffer), 
            `${extId}.unit.test.alteryx.rocks.yxzp`,
            targetUser.id!,
            false,
            false,
            true,
            "",
            "",
            ""
        );
        createdWorkflowId.should.not.be.null;
    });

    it("13. should search for a specific workflow created in the test before", async () => {
        const tmps = await aClient.AdminGetAppsV1(`${extId}.unit.test.alteryx.rocks.yxzp`);
        tmps.length!.should.be.greaterThan(0);
    });

    it("14. should download the newly created worflow from the server", async () => {
        const tmps = await aClient.AdminGetAppsV1(`${extId}.unit.test.alteryx.rocks.yxzp`);
        tmps.length!.should.be.greaterThan(0);

        const workflow = tmps[0];
        workflow.id?.should.not.be.undefined;

        const appInfoResponse = await aClient.AdminGetAppInfoV1(workflow.id!);
        appInfoResponse.should.not.be.undefined;
        const buffer = await appInfoResponse.arrayBuffer();
        buffer.should.not.be.undefined;
        writeFileSync(`test/data/${extId}.unit.test.alteryx.rocks.yxzp`, Buffer.from(buffer));
        
        let fileExists = existsSync(`test/data/${extId}.unit.test.alteryx.rocks.yxzp`);
        fileExists.should.be.true;

        if(fileExists){
            unlinkSync(`test/data/${extId}.unit.test.alteryx.rocks.yxzp`);
        }
        fileExists = existsSync(`test/data/${extId}.unit.test.alteryx.rocks.yxzp`);
        fileExists.should.be.false;
    });
    it("15. should update the newly created workflow", async () => {
        // Update Workflow
        const newName = `updated.${extId}.unit.test.alteryx.rocks.yxmd`;
        const updatedWorkflow = await aClient.AdminUpdateAppMigrationV1(
            createdWorkflowId,
            true
        );
        updatedWorkflow.should.not.be.undefined;
        updatedWorkflow.should.equal( `updated.${extId}.unit.test.alteryx.rocks.yxmd`);
    });

    */

    it("16. should forecast all jobs for the next 7 days using V2 API", async () => {
        const now = new Date();
        var nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const tmps = await aClient.AdminGetScheduleForecastV2(nextWeek, now);
        tmps.length!.should.be.greaterThanOrEqual(0);
    });

    
});
async function cleanup(wSDK: WorkflowManagementClient) {
    const workflows = await (
        await wSDK.GetWorkflows({ view: `Full` })
    ).filter(
        (x) => x.name?.includes("unit.test.alteryx.rocks"));


    for (let index = 0; index < workflows.length; index++) {
        const element = workflows[index];
        await wSDK.DeleteWorkflow(element.id!, true);
    }
}