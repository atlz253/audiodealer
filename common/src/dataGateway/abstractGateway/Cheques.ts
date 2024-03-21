import AuthTokenKeeper from "./AuthTokenKeeper";
import ICheque from "../../../../common/interfaces/ICheque";
import ID from "../../../../common/interfaces/ID";
import IContractProduct from "../../../../common/interfaces/IContractProduct";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

export interface IChequeSelectParams {
  contractID: number;
  chequeStatus: "paid" | "unpaid";
}

class Cheques extends AuthTokenKeeper {
  public static async Get(
    params?: Partial<IChequeSelectParams>,
  ): Promise<ICheque[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async Create(
    contractID: number,
    deliveryDate: string,
    products: IContractProduct[],
  ): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async Save(contractID: number, cheque: ICheque): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Save.name,
      ),
    );
  }
}

export default Cheques;
