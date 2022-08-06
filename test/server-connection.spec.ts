import * as chai from "chai";
import "url-search-params-polyfill";
import { ServerConnectionClient, SDKModels, AlteryxSdk } from "../src/api/sdk";
import { decrypt, loadAuth } from "../src/api/utils";
import { getPasskeyForUnitTest } from "./test-utils";
chai.should();

describe("[SDK] Server Connection Client", () => {
    const auth = loadAuth();
    const sdk = new AlteryxSdk({
        ...auth,
        basicAuth: decrypt(auth, getPasskeyForUnitTest()),
    });
    const serverConnectionClient = sdk.GetServerConnectionClient();
    const _serverDataConnectionName = `${new Date().getTime()}@unit.test.alteryx.rocks`;

    before(async () => {
        await cleanup(serverConnectionClient);
    });

    after(async () => {
        await cleanup(serverConnectionClient);
    });

    it("1. should instantiate", async () => {
        serverConnectionClient.should.not.be.undefined;
    });

    it("2. should list all server connections @sanity", async () => {
        const connections = await serverConnectionClient.GetServerDataConnections();
        connections.length!.should.be.greaterThanOrEqual(0);
    });

    
        
});
async function cleanup(scSDK: ServerConnectionClient) {}

