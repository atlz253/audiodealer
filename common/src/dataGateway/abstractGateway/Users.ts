import IUser from "../../../../common/interfaces/IUser";
import AuthTokenKeeper from "./AuthTokenKeeper";
import ID from "../../../../common/interfaces/ID";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

class Users extends AuthTokenKeeper {
  public static async Get(): Promise<IUser[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async GetByID(id: number): Promise<IUser> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetByID.name,
      ),
    );
  }

  public static async Create(user: IUser): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async Save(user: IUser): Promise<void> {
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

export default Users;
