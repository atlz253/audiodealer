import IClient from "../../../../common/interfaces/IClient";
import Clients from "../abstractGateway/Clients";
import MockDb from "./MockDb/MockDb";
import MockGatewayClientsBills from "./MockGatewayClientsBills";
import { getNextBillUserID } from "./mockID";

class MockGatewayClients extends Clients {
  public static get Bills() {
    return MockGatewayClientsBills;
  }

  public static async Get(onlyNames?: boolean) {
    return structuredClone(MockDb.Clients);
  }

  public static async GetByID(id: number) {
    const client = MockDb.Clients.find((client) => client.id === id);

    if (client) {
      return structuredClone(client);
    } else {
      throw new Error(`Client with ID ${id} not found`);
    }
  }

  public static async GetCount() {
    return MockDb.Clients.length;
  }

  public static async Create(client: IClient) {
    client.id = getNextBillUserID();
    const clientClone = structuredClone(client);
    MockDb.Clients.push(clientClone);
    return client;
  }

  public static async Save(client: IClient) {
    // TODO: save added time
    const clientIndex = this.TryFindClientIndexByID(client.id);
    const clientClone = structuredClone(client);
    MockDb.Clients[clientIndex] = clientClone;
  }

  public static async Delete(id: number): Promise<void> {
    const clientIndex = this.TryFindClientIndexByID(id);
    MockDb.Clients.splice(clientIndex, 1);
  }

  private static TryFindClientIndexByID(clientID: number): number {
    const clientIndex = MockDb.Clients.findIndex((client) => client.id === clientID);

    if (clientIndex === -1) {
      throw new Error(`Client with ID ${clientID} not found`);
    } else {
      return clientIndex;
    }
  }
}

export default MockGatewayClients;
