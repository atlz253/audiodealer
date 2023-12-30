import IBaseClient from "../../../../common/interfaces/IBaseClient";
import AuthTokenKeeper from "./AuthTokenKeeper";
import ID from "../../../../common/interfaces/ID";
import IClient from "../../../../common/interfaces/IClient";
import ClientBills from "./ClientBills";
import IName from "../../../../common/interfaces/IName";

class Clients extends AuthTokenKeeper {
  public static SetAuthToken(token: string): void {
    super.SetAuthToken(token);

    this.Bills.SetAuthToken(token);
  }

  public static get Bills(): typeof ClientBills {
    return ClientBills;
  }

  public static async Get(
    onlyNames?: boolean,
  ): Promise<IBaseClient[] | IName[]> {
    throw new Error("Not implemented");
  }

  public static async GetByID(id: number): Promise<IClient> {
    throw new Error("Not implemented");
  }

  public static async GetCount(): Promise<number> {
    throw new Error("Not implemented");
  }

  public static async Create(client: IClient): Promise<ID> {
    throw new Error("Not implemented");
  }

  public static async Save(client: IClient): Promise<void> {
    throw new Error("Not implemented");
  }

  public static async Delete(id: number): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default Clients;
