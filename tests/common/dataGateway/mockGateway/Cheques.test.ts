import Cheques from "../../../../common/src/dataGateway/mockGateway/Cheques";
import MockDb from "../../../../common/src/dataGateway/mockGateway/MockDb/MockDb";
import { default as mocks } from "./mocks/contractsMocks";

describe("Mock data gateway cheques", () => {
  beforeEach(() => {
    const mockDb = mocks.getContractsMockDb();
    MockDb.SetMockDbData(mockDb);
  });

  test("Get without params should return all cheques copy", async () => {
    const { getChequesWithoutParamsExpectResult } = mocks;
    await expect(Cheques.Get()).resolves.toEqual(
      getChequesWithoutParamsExpectResult,
    );
  });

  test("Get with open status filter should return cheques with open status", async () => {
    const { getChequesWithOpenStatusParamsExpectResult } = mocks;
    await expect(Cheques.Get({ chequeStatus: "open" })).resolves.toEqual(
      getChequesWithOpenStatusParamsExpectResult,
    );
  });

  test("Get with close status filter should return cheques with close status", async () => {
    const { getChequesWithCloseStatusParamsExpectResult } = mocks;
    await expect(Cheques.Get({ chequeStatus: "close" })).resolves.toEqual(
      getChequesWithCloseStatusParamsExpectResult,
    );
  });

  test("Get with contractID param should return all cheques for contract with given ID", async () => {
    const { existContractID, getChequesWithGivenContractIDExpectResult } =
      mocks;
    await expect(Cheques.Get({ contractID: existContractID })).resolves.toEqual(
      getChequesWithGivenContractIDExpectResult,
    );
  });

  test("Get with contractID and open status param should return open cheques for contract with given ID", async () => {
    const {
      existContractID,
      getChequesWithOpenStatusAndGivenContractIDExpectResult,
    } = mocks;
    await expect(
      Cheques.Get({ contractID: existContractID, chequeStatus: "open" }),
    ).resolves.toEqual(getChequesWithOpenStatusAndGivenContractIDExpectResult);
  });
});
