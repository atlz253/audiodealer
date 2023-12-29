import AuthTokenKeeper from "./AuthTokenKeeper";
import IQueriesCategory from "../../../../common/interfaces/IQueriesCategory";

class Queries extends AuthTokenKeeper {
  public static async Get(): Promise<IQueriesCategory[]> {
    throw new Error("Not implemented");
  }
}

export default Queries;
