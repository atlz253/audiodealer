import AuthTokenKeeper from "./AuthTokenKeeper";
import ICheque from "../../../../common/interfaces/ICheque";

class Cheques extends AuthTokenKeeper {
  public static async Save(contractID: number, cheque: ICheque): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default Cheques;
