import IBaseBill from "../../../../common/interfaces/IBaseBill";
import IBill from "../../../../common/interfaces/IBill";
import IBillNumber from "../../../../common/interfaces/IBillNumber";
import ID from "../../../../common/interfaces/ID";
import AuthTokenKeeper from "./AuthTokenKeeper";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

class ProviderBills extends AuthTokenKeeper {
  public static async Get(
    providerID: number,
    onlyBillNumbers?: boolean,
  ): Promise<IBaseBill[] | IBillNumber[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async GetByID(
    providerID: number,
    billID: number,
  ): Promise<IBill> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetByID.name,
      ),
    );
  }

  public static async Create(providerID: number, bill: IBill): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async Delete(
    providerID: number,
    billID: number,
  ): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Delete.name,
      ),
    );
  }

  public static async Save(providerID: number, bill: IBill): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Save.name,
      ),
    );
  }
}

export default ProviderBills;
