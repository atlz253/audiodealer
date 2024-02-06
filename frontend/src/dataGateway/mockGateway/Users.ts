import ID from "../../../../common/interfaces/ID";
import IUser from "../../../../common/interfaces/IUser";
import { default as AbstractUsers } from "../abstractGateway/Users";
import Bills from "./Bills";
import MockDb from "./MockDb/MockDb";
import { getNewMockBillUserID } from "./mockObjectID";

class Users extends AbstractUsers {
  public static async Get(): Promise<IUser[]> {
    const usersClone = structuredClone(MockDb.Users);
    return usersClone;
  }

  public static async GetByID(id: number): Promise<IUser> {
    const user = MockDb.Users.find((user) => user.id === id);

    if (user) {
      return structuredClone(user);
    }

    throw new Error(`User with ID ${id} not found`);
  }

  public static async Create(user: IUser): Promise<ID> {
    user.id = getNewMockBillUserID();
    const userClone = structuredClone(user);
    MockDb.Users.push(userClone);
    Bills.CreateBillStorageForUserWithID(user.id);
    return user;
  }

  public static async Save(user: IUser): Promise<void> {
    const userIndex = MockDb.Users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${user.id} not found in users array`);
    }

    const userClone = structuredClone(user);
    MockDb.Users[userIndex] = userClone;
  }

  public static async Delete(id: number): Promise<void> {
    if (id === 0) {
      throw new Error("It's not allowed to delete the first admin");
    }

    const userIndex = MockDb.Users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found in users array`);
    }

    MockDb.Users.splice(userIndex, 1);
  }
}

export default Users;
