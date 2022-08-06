import * as chai from "chai";
import "url-search-params-polyfill";
import { CredentialsManagementClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest} from "./test-utils";
import { readFileSync } from 'fs';

chai.should();

describe("[SDK] Credential Management Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk({
        ...auth,
        basicAuth: decrypt(auth, getPasskeyForUnitTest()),
    });
    const credentialsClient = sdk.GetCredentialsManagementClient();
    const userClient = sdk.GetUserManagementClient();
    const credentialName = `${new Date().getTime()}.unit.test.alteryx.rocks`;
    let _credentialId = "";

    before(async () => {
        await cleanup(credentialsClient);
    });

    after(async () => {
        await cleanup(credentialsClient);
    });

    it("1. should instantiate", async () => {
        credentialsClient.should.not.be.undefined;
    });

    it("2. should list all existing schedules @sanity", async () => {
        const schedules = await credentialsClient.GetCredentials();
        schedules.length!.should.be.greaterThanOrEqual(0);
    });

    it("3. should list all existing schedules with full view @sanity", async () => {
        const schedules = await credentialsClient.GetCredentials({ view: "Full" });
        schedules.length!.should.be.greaterThanOrEqual(0);
    });

    it("4. should add a new user to credential", async () => {
        
    });

    it("5. should add usergroup to credential", async () => {
        
    });

    it("6. should remove user to credential", async () => {
        
    });
    
    it("6. should remove usergroup to credential", async () => {
        
    });
});
async function cleanup(cSDK: CredentialsManagementClient) {
}

