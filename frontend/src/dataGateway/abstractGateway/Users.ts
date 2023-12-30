import IUser from "../../../../common/interfaces/IUser";
import AuthTokenKeeper from "./AuthTokenKeeper";
import ID from "../../../../common/interfaces/ID";

class Users extends AuthTokenKeeper {
  public static async Get(): Promise<IUser[]> {
    throw new Error("Not implemented");
  }

  public static async GetByID(id: number): Promise<IUser> {
    throw new Error("Not implemented");
  }

  public static async Create(user: IUser): Promise<ID> {
    throw new Error("Not implemented");
  }

  public static async Save(user: IUser): Promise<void> {
    throw new Error("Not implemented");
  }

  public static async Delete(id: number): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default Users;
