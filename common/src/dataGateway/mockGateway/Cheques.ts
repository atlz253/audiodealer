import ICheque from "../../../interfaces/ICheque";
import IContractProduct from "../../../interfaces/IContractProduct";
import {
  default as AbstractCheques,
  IChequeSelectParams,
} from "../abstractGateway/Cheques";
import DataGatewayError from "../errors/DataGatewayError";
import MockDb from "./MockDb/MockDb";
import { default as contractErrorMessages } from "../errors/ContractsErrorsMessages";

class Cheques extends AbstractCheques {
  public static async Get(params?: Partial<IChequeSelectParams>) {
    if (params === undefined) {
      return structuredClone(this.GetAllCheques());
    } else {
      return structuredClone(this.TryGetFilteredChequesByParams(params));
    }
  }

  private static TryGetFilteredChequesByParams(
    params: Partial<IChequeSelectParams>,
  ): ICheque[] {
    const { chequeStatus, contractID } = params;
    const cheques = this.TryGetChequesByContractIDOrAllCheques(contractID);
    return cheques.filter(
      (cheque) => chequeStatus === undefined || chequeStatus === cheque.status,
    );
  }

  private static TryGetChequesByContractIDOrAllCheques(
    contractID?: number,
  ): ICheque[] {
    if (contractID === undefined) {
      return this.GetAllCheques();
    } else {
      return this.TryGetChequesByContractID(contractID);
    }
  }

  private static GetAllCheques(): ICheque[] {
    const cheques: ICheque[] = [];

    for (const { cheques: contractCheques } of MockDb.Contracts) {
      cheques.push(...contractCheques);
    }

    return cheques;
  }

  private static TryGetChequesByContractID(id: number): ICheque[] {
    if (MockDb.Contracts[id] !== undefined) {
      return MockDb.Contracts[id].cheques;
    } else {
      throw new DataGatewayError(
        contractErrorMessages.getContractWithGivenIDNotFoundMessage(id),
      );
    }
  }

  // TODO: Cheques.Create
  // public static async Create(
  //   contractID: number,
  //   deliveryDate: string,
  //   products: IContractProduct[],
  // ) {}

  // TODO: Cheques.Save
  // public static async Save(
  //   contractID: number,
  //   cheque: ICheque,
  // ): Promise<void> {}
}

export default Cheques;
