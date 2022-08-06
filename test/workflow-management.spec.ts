import * as chai from "chai";
import "url-search-params-polyfill";
import { WorkflowManagementClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest} from "./test-utils";
import { existsSync, readFileSync, unlinkSync, writeFileSync} from 'fs';

chai.should();

describe("[SDK] Workflow Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk({
        ...auth,
        basicAuth: decrypt(auth, getPasskeyForUnitTest()),
    });
    const wClient = sdk.GetWorkflowManagementClient();
    const userClient = sdk.GetUserManagementClient();
    const dummyWorkflowFileBuffer = readFileSync("test/data/Dummy_Workflows.yxzp", {flag:'r',encoding:null});
    // Generate extId
    const extId = new Date().getTime().toString();
    

    before(async () => {
        await cleanup(wClient);
    });

    after(async () => {
        await cleanup(wClient);
    });

    it("1. should instantiate", async () => {
        wClient.should.not.be.undefined;
    });

    it("2. should list all existing workflows @sanity", async () => {
        const workflows = await wClient.GetWorkflows();
        workflows.length!.should.be.greaterThan(0);
    });

    it("3. should list all workflows with the name 'Dummy_Workflows'", async () => {
        const workflows = await wClient.GetWorkflows({ name: "Dummy_Workflows" });
        workflows.length!.should.be.greaterThan(0);
    });

    it("4. should list all workflows with full view", async () => {
        const workflows = await wClient.GetWorkflows({ view: "Full" });
        workflows.length!.should.be.greaterThan(0);
    });

    it("5. should list all workflows with full view", async () => {
        const workflows = await wClient.GetWorkflows({ view: "Full" });
        workflows.length!.should.be.greaterThan(0);
    });

    
    it("6. the crud operations on workflows should work", async () => {
        // Get a user
        const users = await userClient.GetUsers();
        users.length!.should.be.greaterThan(0);
        const targetUser = users[0];

        // generate DummyWorkflow
        const dummyWorkflow = getDummyWorkflow(`${extId}.unit.test.alteryx.rocks.yxzp`, Buffer.from(dummyWorkflowFileBuffer), targetUser.id);

        // const fs = require('fs');
        // fs.writeFileSync("EDRBodyFile.txt.yxzp", dummyWorkflowFileBuffer)

        // Create a new workflow
        const createdWorkflowId = await wClient.CreateWorkflow(dummyWorkflow);
        createdWorkflowId.should.not.be.null;

        // Read newly created workflow 
        const createdworkflow = await wClient.GetWorkflow(createdWorkflowId)
        createdworkflow.name!.should.equal(`${extId}.unit.test.alteryx.rocks.yxzp`);

        // Update Workflow
        createdworkflow.name = `updated.${extId}.unit.test.alteryx.rocks.yxmd`;
        const updatedWorkflow = await wClient.UpdateWorkflow(
            createdworkflow.id!,
            converWorkflowViewToWorkflowUpdateContract(createdworkflow)
        );
        updatedWorkflow.should.not.be.null;
        updatedWorkflow.name!.should.equal( `updated.${extId}.unit.test.alteryx.rocks.yxmd`);

        // Create new Version
        const newVersionWorkflow = await wClient.AddVersionToWorkflow(
            updatedWorkflow.id!,
            {
                name: updatedWorkflow.name, 
                ownerId: updatedWorkflow.ownerId, 
                othersMayDownload: updatedWorkflow.othersMayDownload, 
                othersCanExecute: updatedWorkflow.othersCanExecute,
                makePublished: true,
                executionMode: updatedWorkflow.executionMode?updatedWorkflow.executionMode.toString():SDKModels.WorkflowView.ExecutionModeEnum.Standard.toString(), 
               }
        );
        newVersionWorkflow.should.not.be.null;
        newVersionWorkflow.name!.should.equal( `updated.${extId}.unit.test.alteryx.rocks.yxmd`);
        newVersionWorkflow.versions!.length.should.greaterThan(updatedWorkflow.versions!.length);

        // Read workflow
        const workflow = await wClient.GetWorkflow(newVersionWorkflow.id!)
        workflow.name!.should.equal(newVersionWorkflow.name!);

        // Delete workflow
        const result = await wClient.DeleteWorkflow(newVersionWorkflow.id!);
        result.status!.should.equal(200);
    });

    it("7. should list all workflows within my subscription", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);
    });

    it("8. should list all jobs for the first workflow within my subscription", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);

        const workflow = workflows[0];
        const jobs = await wClient.GetJobsForAppV1(workflow?.id?workflow.id:"", "","","0", "100");
        jobs.length!.should.be.greaterThan(0);
    });

    it("9. should list all the questions for the first workflow within my subscription", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);

        const workflow = workflows[0];
        const questions = await wClient.GetAppQuestionsV1(workflow.id?workflow.id:"");
        questions.length!.should.be.greaterThanOrEqual(0);
    });

    it("10. should return the original package containing the first workflow within my subscription", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);

        const workflow = workflows[0];
        const appInfoResponse = await wClient.GetAppInfoV1(workflow?.id?workflow.id:"");
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

    it("11. should start a job with the first workflow within my subscription", async () => {
        const workflows = await wClient.GetStudioAppsV1();
        workflows.length!.should.be.greaterThan(0);

        const workflow = workflows[0];
        const newJob = await wClient.PostNewJobV1(workflow?.id?workflow.id:"", {});        
        newJob.status!.should.be.equals("Queued");
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
