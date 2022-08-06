import * as chai from "chai";
import "url-search-params-polyfill";
import { ScheduleManagementClient, WorkflowManagementClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest} from "./test-utils";
import { readFileSync } from 'fs';

chai.should();

describe("[SDK] Schedule Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk(auth);
    const scheduleClient = sdk.GetScheduleManagementClient();
    const userClient = sdk.GetUserManagementClient();
    const workflowClient = sdk.GetWorkflowManagementClient();
    //const dummyScheduleFileBuffer = readFileSync("test/data/Dummy_Schedules.yxzp");
    const scheduleName = `${new Date().getTime()}.unit.test.alteryx.rocks`;
    let _scheduleId = "";

    before(async () => {
        await cleanup(scheduleClient);
    });

    after(async () => {
        await cleanup(scheduleClient);
    });

    it("1. should instantiate", async () => {
        scheduleClient.should.not.be.undefined;
    });

    it("2. should list all existing schedules @sanity", async () => {
        const schedules = await scheduleClient.GetSchedules();
        schedules.length!.should.be.greaterThanOrEqual(0);
    });

    it("3. should list all existing schedules with full view @sanity", async () => {
        const schedules = await scheduleClient.GetSchedules({ view: "Full" });
        schedules.length!.should.be.greaterThanOrEqual(0);
    });

    it("4. should add a new schedule", async () => {
        // Get one accessible workflow
        const workflows = await workflowClient.GetWorkflows({view:"Full"});
        workflows.length!.should.be.greaterThan(0);
        const workflow = workflows[0];
        // Add a new schedule with the workflow
        const schedule = await scheduleClient.CreateSchedule(getDummyScheduleContract(
            workflow.id!,
            scheduleName,
            "Created")
        );
        schedule.should.not.be.null;
        schedule!.should.not.be.empty;
        _scheduleId = schedule.id!;
    });

    it("5. should read schedule", async () => {
        // Update schedule
        const schedule = await scheduleClient.GetSchedule(_scheduleId);
        schedule.should.not.be.null;
        schedule.name!.should.not.be.empty;
    });

    it("6. should update schedule", async () => {
        // read a schedule
        const schedule = await scheduleClient.GetSchedule(_scheduleId);
        schedule.should.not.be.null;
        schedule.name!.should.not.be.empty;

        // Update schedule
        const updatedName = `Updated-${scheduleName}`;
        const updatedSchedule = await scheduleClient.UpdateSchedule(
            _scheduleId, 
            getDummyUpdateScheduleContract(
            schedule,
            updatedName,
            `Updated-${new Date().getTime()}`)
        );
        updatedSchedule.should.not.be.null;
        updatedSchedule.name!.should.equal(updatedName);
    });
    
    it("6. should delete/remove a schedule", async () => {
        // remove schedule
        const result = await scheduleClient.DeleteSchedule(_scheduleId);
        (result as Response).status!.should.equal(200);
    });
});
async function cleanup(wSDK: ScheduleManagementClient) {
    const schedules = await (
        await wSDK.GetSchedules({ view: `Full` })
    ).filter(
        (x) => x.name?.endsWith("unit.test.alteryx.rocks"));

    for (let index = 0; index < schedules.length; index++) {
        const element = schedules[index];
        await wSDK.DeleteSchedule(element.id!);
    }
}

function getDummyScheduleContract(workflowId:string, name: string, comment: string){
   const currentDate = Date.now();
    return {
        workflowId: workflowId,
        iteration: {
          iterationType: SDKModels.IterationContract.IterationTypeEnum.Once,
          startTime: new Date(currentDate + 60*1000*30),
        },
        name: name,
        comment: comment,
        priority: SDKModels.CreateScheduleContract.PriorityEnum.Default,
      } as SDKModels.CreateScheduleContract
}

function getDummyUpdateScheduleContract(schedule:SDKModels.ScheduleView, name: string, comment: string){
    const currentDate = Date.now();
     return {
        workflowId: schedule.workflowId,
        ownerId: schedule.ownerId,
        iteration: {
            iterationType: SDKModels.IterationContract.IterationTypeEnum.Once,
            startTime: new Date(currentDate + 60*1000*30),
          },
        name: name,
        comment: comment,
        priority: SDKModels.UpdateScheduleContract.PriorityEnum.Default,
        workerTag: schedule.workerTag??"",
        enabled: schedule.enabled??true,
        credentialId: schedule.credentialId??""
    } as SDKModels.UpdateScheduleContract
 }

