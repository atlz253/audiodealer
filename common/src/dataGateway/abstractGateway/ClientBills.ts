import IBill from "../../../../common/interfaces/IBill";
import AuthTokenKeeper from "./AuthTokenKeeper";
import ID from "../../../../common/interfaces/ID";
import IBaseBill from "../../../../common/interfaces/IBaseBill";
import IBillNumber from "../../../../common/interfaces/IBillNumber";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

class ClientBills extends AuthTokenKeeper {
  public static async Get(
    clientID: number,
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
    clientID: number,
    billID: number,
  ): Promise<IBill> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetByID.name,
      ),
    );
  }

  public static async Create(clientID: number, bill: IBill): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async Delete(clientID: number, billID: number): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Delete.name,
      ),
    );
  }

  public static async Save(clientID: number, bill: IBill): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Save.name,
      ),
    );
  }
}

export default ClientBills;
