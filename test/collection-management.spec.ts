import * as chai from "chai";
import "url-search-params-polyfill";
import { CollectionManagementClient, AlteryxSdk } from "../src/api/sdk";
import { loadAuth } from "../src/api/utils";

chai.should();

describe("[SDK] Collection Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk(auth);
    const colClient = sdk.GetCollectionManagementClient();
    const userClient = sdk.GetUserManagementClient();
    const wClient = sdk.GetWorkflowManagementClient();

    // Generate extId
    const extId = new Date().getTime().toString();
    let _createdCollectionId = "";
    let _collectionOwnerId = "";
    let _workflowId = "";

    before(async () => {
        await cleanup(colClient);
    });

    after(async () => {
        await cleanup(colClient);
    });

    it("1. should instantiate", async () => {
        colClient.should.not.be.undefined;
    });

    it("2. should list all collections @sanity", async () => {
        const collections = await colClient.GetCollections();
        collections.length!.should.be.greaterThanOrEqual(0);
    });

    it("2a. should list all collections with full view @sanity", async () => {
        const collections = await colClient.GetCollections("Full");
        collections.length!.should.be.greaterThanOrEqual(0);
    });

    it("3. should create new collection", async () => {
        // Create new collection
        const createdCollectionId = await colClient.CreateCollection(getDummyCollectionContract(`${extId}.unit.test.alteryx.rocks`));
        createdCollectionId.should.not.be.null;
        createdCollectionId!.should.not.be.empty;
        _createdCollectionId = createdCollectionId;
    });

    it("4. should read a specific collection view", async () => {
        // Create new User Group
        const collection = await colClient.GetCollection(_createdCollectionId);
        collection.should.not.be.null;
        collection.should.not.be.undefined;
        collection.id!.should.not.be.undefined;
        collection.ownerId!.should.not.be.undefined;
        _collectionOwnerId = collection.ownerId;
    });

    it("5. should update collection", async () => {
        // Update Collection Name
        const newName = `${extId}.unit.test.alteryx.rocks-updated`;
        const updatedCollection = await colClient.UpdateCollection(
            _createdCollectionId, 
            getDummyUpdateCollectionContract(newName, _collectionOwnerId)
            );
        updatedCollection.should.not.be.null;
        updatedCollection.should.not.be.undefined;
        updatedCollection.id!.should.not.be.undefined;
        updatedCollection.name!.should.be.equals(newName);
    });

    it("6. should add workflow to a collection", async () => {
        // Add a user to the collection
        const workflows = await wClient.GetWorkflows();
        workflows.length!.should.be.greaterThan(0);
        const workflow = workflows[0];
        _workflowId = workflow.id!;
        
        const addedUserView = await colClient.AddWorkflowToCollection(
            _createdCollectionId,
            getDummyAddWorkflowCollectionContract(_workflowId)
        );
        addedUserView.should.not.be.null;
        addedUserView.should.not.be.undefined;
        addedUserView.workflowIds!.length!.should.be.greaterThan(0);
        addedUserView.workflowIds!.length!.should.be.equals(1);
    });

    it("7. should remove workflow from a collection", async () => {
                
        const result = await colClient.RemoveWorkflowFromCollection(
            _createdCollectionId,
            _workflowId
        );
        result.should.not.be.null;
        result.should.not.be.undefined;
        result.workflowIds!.length!.should.be.greaterThanOrEqual(0);
        result.workflowIds!.length!.should.be.equals(0);
    });

    // it("8. should add user to a collection", async () => {
    //     // Add a user to the collection
    //     const users = await userClient.GetUsers({view: 'Full'});
    //     users.length!.should.be.greaterThan(0);
    //     const user = users[0];
    //     const _userId = user.id!;
        
    //     const addedUserView = await colClient.AddUserToCollection(
    //         _createdCollectionId,
    //         getDummyAddUserCollectionContract(_userId, new Date(Date.now() + 60*1000*30))
    //     );
    //     addedUserView.should.not.be.null;
    //     addedUserView.should.not.be.undefined;
    //     addedUserView.id!.should.not.be.undefined;
    // });

    it("9. should delete collection", async () => {
        // Delete user group
        const result = await colClient.DeleteCollection(_createdCollectionId, true);
        result.status!.should.equal(200);
    });

});
async function cleanup(colSDK: CollectionManagementClient) {
    const groups = await (await colSDK.GetCollections())
    .filter((x) => { var _a; return (_a = x.name) === null || _a === void 0 ? void 0 : _a.startsWith("unit.test.alteryx.rocks"); });

    for (let index = 0; index < groups.length; index++) {
        const element = groups[index];
        await colSDK.DeleteCollection(element.id!,true);
    }
}

function getDummyCollectionContract(name:string){
    return {
        name: name,
    }
}

function getDummyUpdateCollectionContract(name:string, ownerId: string){
    return {
        name: name,
        ownerId: ownerId
    }
}

function getDummyAddWorkflowCollectionContract(workflowId:string){
    return {
        workflowId: workflowId
    }
}

function getDummyAddUserCollectionContract(userId:string, expirationDate: Date){
    return {
        userId: userId,
        expirationDate: expirationDate,
        collectionsPermissions: getDummyCollectionsPermissionsViewContract()
    }
}

function getDummyCollectionsPermissionsViewContract(){
    return {
        
        isAdmin: true,
        canAddAssets: true,
        canRemoveAssets: true,
        canUpdateAssets: true,
        canAddUsers: true,
        canRemoveUsers: true
    }
}
