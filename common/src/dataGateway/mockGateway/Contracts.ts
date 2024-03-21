import IContract from "../../../interfaces/IContract";
import INewContract from "../../../interfaces/INewContract";
import { default as AbstractContracts } from "../abstractGateway/Contracts";
import DataGatewayError from "../errors/DataGatewayError";
import Bills from "./Bills";
import MockDb from "./MockDb/MockDb";
import { ContractMockDb } from "./MockDb/mockDbData";
import { default as errorMessages } from "../errors/ContractsErrorsMessages";
import { Status } from "../../../interfaces/IStatus";
import createContract from "../../contracts/createContract";

class Contracts extends AbstractContracts {
  public static async Get() {
    const contractPromises = MockDb.Contracts.map((contractMock) =>
      this.CreateContractFromContractMock(contractMock),
    );
    return Promise.all(contractPromises);
  }

  public static async GetByID(id: number) {
    if (this.IsContractExist(id)) {
      return this.CreateContractFromContractMock(MockDb.Contracts[id]);
    } else {
      throw new DataGatewayError(
        errorMessages.getContractWithGivenIDNotFoundMessage(id),
      );
    }
  }

  private static async CreateContractFromContractMock(
    contractMock: ContractMockDb,
  ): Promise<IContract> {
    const sellerBill = await Bills.GetBillCloneByUserIDAndBillID(
      contractMock.sellerBill.userID,
      contractMock.sellerBill.billID,
    );
    const buyerBill = await Bills.GetBillCloneByUserIDAndBillID(
      contractMock.buyerBill.userID,
      contractMock.buyerBill.billID,
    );
    return {
      ...structuredClone(contractMock),
      sellerBill,
      buyerBill,
    };
  }

  public static async GetCount(contractStatus?: Status) {
    if (contractStatus === undefined) {
      return MockDb.Contracts.length;
    } else {
      return this.GetContractsWithStatus(contractStatus).length;
    }
  }

  private static GetContractsWithStatus(contractStatus: Status) {
    return MockDb.Contracts.filter(
      (contract) => contract.status === contractStatus,
    );
  }

  // TODO: Contracts.Create
  public static async Create(contract: INewContract) {
    const createdContract = await createContract(contract);
    return createdContract;
  }

  // TODO: Contracts.UpdateStatus
  // public static async UpdateStatus(contractID: number, status: string) {}

  private static IsContractExist(contractID: number): boolean {
    return MockDb.Contracts[contractID] !== undefined;
  }
}

export default Contracts;
