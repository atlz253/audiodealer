import IBaseContract from "../../../../common/interfaces/IBaseContract";
import IContract from "../../../../common/interfaces/IContract";
import AuthTokenKeeper from "./AuthTokenKeeper";
import INewContract from "../../../../common/interfaces/INewContract";
import ID from "../../../../common/interfaces/ID";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";
import { Status } from "../../../interfaces/IStatus";

class Contracts extends AuthTokenKeeper {
  public static async Get(): Promise<IBaseContract[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async GetByID(id: number): Promise<IContract> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetByID.name,
      ),
    );
  }

  public static async GetCount(contractStatus?: Status): Promise<number> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetCount.name,
      ),
    );
  }

  public static async Create(contract: INewContract): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async UpdateStatus(
    contractID: number,
    status: string,
  ): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.UpdateStatus.name,
      ),
    );
  }
}

export default Contracts;
