import IBaseContract from "../../../../common/interfaces/IBaseContract";
import IContract from "../../../../common/interfaces/IContract";
import AuthTokenKeeper from "./AuthTokenKeeper";
import INewContract from "../../../../common/interfaces/INewContract";
import ID from "../../../../common/interfaces/ID";
import Cheques from "./Cheques";

class Contracts extends AuthTokenKeeper {
  public static SetAuthToken(token: string): void {
    super.SetAuthToken(token);

    this.Cheques.SetAuthToken(token);
  }

  public static get Cheques(): typeof Cheques {
    return Cheques;
  }

  public static async Get(): Promise<IBaseContract[]> {
    throw new Error("Not implemented");
  }

  public static async GetByID(id: number): Promise<IContract> {
    throw new Error("Not implemented");
  }

  public static async GetCount(contractStatus?: string): Promise<number> {
    throw new Error("Not implemented");
  }

  public static async Create(contract: INewContract): Promise<ID> {
    throw new Error("Not implemented");
  }
}

export default Contracts;
