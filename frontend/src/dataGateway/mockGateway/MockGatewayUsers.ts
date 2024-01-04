import ID from "../../../../common/interfaces/ID";
import IUser from "../../../../common/interfaces/IUser";
import Users from "../abstractGateway/Users";
import { getNextMockID } from "./mockID";
import { users } from "./mocks/users";

class MockGatewayUsers extends Users {
  public static async Get(): Promise<IUser[]> {
    return users;
  }

  public static async GetByID(id: number): Promise<IUser> {
    const user = users.find((user) => user.id === id);

    if (user) {
      return user;
    }

    throw new Error(`User with ID ${id} not found`);
  }

  public static async Create(user: IUser): Promise<ID> { // TODO: make clones before users push
    user.id = getNextMockID(users);
    users.push(user);
    return user;
  }

  public static async Save(user: IUser): Promise<void> {
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${user.id} not found in users array`);
    }

    users[userIndex] = user;
  }

  public static async Delete(id: number): Promise<void> {
    if (id === 0) {
      throw new Error("It's not allowed to delete the first admin");
    }

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found in users array`);
    }

    users.splice(userIndex, 1);
  }
}

export default MockGatewayUsers;
