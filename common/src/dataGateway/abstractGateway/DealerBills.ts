import IBaseBill from "../../../../common/interfaces/IBaseBill";
import AuthTokenKeeper from "./AuthTokenKeeper";
import IBill from "../../../../common/interfaces/IBill";
import ID from "../../../../common/interfaces/ID";
import IBillNumber from "../../../../common/interfaces/IBillNumber";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

class DealerBills extends AuthTokenKeeper {
  public static async Get(
    onlyBillNumbers?: boolean,
  ): Promise<IBaseBill[] | IBillNumber[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async GetByID(id: number): Promise<IBill> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetByID.name,
      ),
    );
  }

  public static async Create(bill: IBill): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async Save(bill: IBill): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Save.name,
      ),
    );
  }

  public static async Delete(id: number): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Delete.name,
      ),
    );
  }
}

export default DealerBills;
