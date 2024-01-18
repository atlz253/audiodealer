import ID from "../../../../common/interfaces/ID";
import IUser from "../../../../common/interfaces/IUser";
import Users from "../abstractGateway/Users";
import MockDb from "./MockDb/MockDb";
import { getNextBillUserID } from "./mockID";

class MockGatewayUsers extends Users {
  public static async Get(): Promise<IUser[]> {
    const usersClone = structuredClone(MockDb.Users);
    return usersClone;
  }

  public static async GetByID(id: number): Promise<IUser> {
    const user = MockDb.Users.find((user) => user.id === id);

    if (user) {
      return user;
    }

    throw new Error(`User with ID ${id} not found`);
  }

  public static async Create(user: IUser): Promise<ID> {
    user.id = getNextBillUserID();
    const userClone = structuredClone(user);
    MockDb.Users.push(userClone);
    return user;
  }

  public static async Save(user: IUser): Promise<void> {
    const userIndex = MockDb.Users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${user.id} not found in users array`);
    }

    MockDb.Users[userIndex] = user;
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

export default MockGatewayUsers;
