import * as chai from "chai";
import "url-search-params-polyfill";
import { DCMEConnectionClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest} from "./test-utils";
import { readFileSync } from 'fs';

chai.should();

describe("[SDK] DCME Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk(auth);
    const dcmeClient = sdk.GetDCMEConnectionClient();
    const userClient = sdk.GetUserManagementClient();
    const workflowClient = sdk.GetWorkflowManagementClient();
    //const dummyScheduleFileBuffer = readFileSync("test/data/Dummy_Schedules.yxzp");
    const scheduleName = `${new Date().getTime()}.unit.test.alteryx.rocks`;
    let _scheduleId = "";

    before(async () => {
        await cleanup(dcmeClient);
    });

    after(async () => {
        await cleanup(dcmeClient);
    });

    it("1. should instantiate @sanity", async () => {
        dcmeClient.should.not.be.undefined;
    });
});
async function cleanup(dSDK: DCMEConnectionClient) {}


