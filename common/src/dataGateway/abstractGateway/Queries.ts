import AuthTokenKeeper from "./AuthTokenKeeper";
import IQueriesCategory from "../../../../common/interfaces/IQueriesCategory";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

class Queries extends AuthTokenKeeper {
  public static async Get(): Promise<IQueriesCategory[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }
}

export default Queries;
