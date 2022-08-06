import * as chai from "chai";
import "url-search-params-polyfill";
import { WorkflowManagementClient, JobManagementClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest} from "./test-utils";
import { readFileSync, writeFileSync} from 'fs';

chai.should();

describe("[SDK] Job Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk({
        ...auth,
        basicAuth: decrypt(auth, getPasskeyForUnitTest()),
    });
    const wClient = sdk.GetWorkflowManagementClient();
    const jClient = sdk.GetJobManagementClient();

    before(async () => {
        await cleanup(wClient);
    });

    after(async () => {
        await cleanup(wClient);
    });

    it("1. should instantiate", async () => {
        jClient.should.not.be.undefined;
    });

    it("2. should list all jobs for the first workflow within my subscription @sanity", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);

        const workflow = workflows[0];
        const jobs = await wClient.GetJobsForAppV1(workflow?.id?workflow.id:"", "","","0", "100");
        jobs.length!.should.be.greaterThan(0);
    });

    it("3. should retrieve the first job and its current state of the first workflow within my subscription", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);

        const workflow = workflows[0];
        const jobs = await wClient.GetJobsForAppV1(workflow?.id?workflow.id:"", "","","0", "100");
        jobs.length!.should.be.greaterThan(0);

        const job = jobs[0];
        const jobStatus = await jClient.GetJobDetailsV1(job.id?job.id:"", true);
        jobStatus.status!.should.not.be.undefined;
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

function getDummyWorkflow(fileName:string, content: Buffer, ownerId: string){
    return {
        file: content, 
        name: fileName,
        ownerId: ownerId, 
        isPublic: true, 
        isReadyForMigration: true, 
        othersMayDownload: true, 
        othersCanExecute: true, 
        executionMode: SDKModels.UpdateWorkflowContract.ExecutionModeEnum.Standard.toString(), 
        comments: "unit.test.alteryx.rocks", 
       }
}

function converWorkflowViewToWorkflowUpdateContract(view: SDKModels.WorkflowView): SDKModels.UpdateWorkflowContract{
    return {
        name: view.name,
        versionId: view.publishedVersionId, 
        makePublished: true, 
        ownerId: view.ownerId, 
        workerTag: view.workerTag, 
        districtTags: view.districtTags, 
        comments: view.comments, 
        isPublic: view.isPublic,
        isReadyForMigration: view.isReadyForMigration,
        othersMayDownload: view.othersMayDownload,
        othersCanExecute: view.othersCanExecute,
        executionMode: view.executionMode,
        hasPrivateDataExemption: view.hasPrivateDataExemption
       } as SDKModels.UpdateWorkflowContract
}
