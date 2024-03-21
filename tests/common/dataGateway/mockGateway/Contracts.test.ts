import Contracts from "../../../../common/src/dataGateway/mockGateway/Contracts";
import MockDb from "../../../../common/src/dataGateway/mockGateway/MockDb/MockDb";
import { default as mocks } from "./mocks/contractsMocks";
import { default as errorMessages } from "../../../../common/src/dataGateway/errors/ContractsErrorsMessages";

describe("Mock data gateway contracts", () => {
  beforeEach(() => {
    const mockDb = mocks.getContractsMockDb();
    MockDb.SetMockDbData(mockDb);
  });

  test("Get should return contracts array", async () => {
    const { getTestExpectResult } = mocks;
    const contracts = await Contracts.Get();
    expect(contracts).toEqual(getTestExpectResult);
  });

  test("GetByID should return contract", async () => {
    const { getByIDTestExpectResult, existContractID } = mocks;
    const contract = await Contracts.GetByID(existContractID);
    expect(contract).toEqual(getByIDTestExpectResult);
  });

  test("GetByID should throw error if contract not exists", async () => {
    const { notExistContractID } = mocks;
    const errorMessage =
      errorMessages.getContractWithGivenIDNotFoundMessage(notExistContractID);
    await expect(Contracts.GetByID(notExistContractID)).rejects.toThrow(
      errorMessage,
    );
  });

  test("GetCount should return actual contracts array length", async () => {
    await expect(Contracts.GetCount()).resolves.toBe(MockDb.Contracts.length);
  });

  test("GetCount should return contracts count with given status", async () => {
    const { openContractsCount } = mocks;
    await expect(Contracts.GetCount("open")).resolves.toBe(openContractsCount);
  });
});
