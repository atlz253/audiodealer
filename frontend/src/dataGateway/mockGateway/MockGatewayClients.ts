import IClient from "../../../../common/interfaces/IClient";
import Clients from "../abstractGateway/Clients";
import MockGatewayClientsBills from "./MockGatewayClientsBills";
import { getNextBillUserID } from "./mockID";
import { clients } from "./mocks/clients";

class MockGatewayClients extends Clients {
  public static get Bills() {
    return MockGatewayClientsBills;
  }

  public static async Get(onlyNames?: boolean) {
    return structuredClone(clients);
  }

  public static async GetByID(id: number) {
    const client = clients.find((client) => client.id === id);

    if (client) {
      return structuredClone(client);
    } else {
      throw new Error(`Client with ID ${id} not found`);
    }
  }

  public static async GetCount() {
    return clients.length;
  }

  public static async Create(client: IClient) {
    client.id = getNextBillUserID();
    const clientClone = structuredClone(client);
    clients.push(clientClone);
    return client;
  }

  public static async Save(client: IClient) {
    // TODO: save added time
    const clientIndex = this.TryFindClientIndexByID(client.id);
    const clientClone = structuredClone(client);
    clients[clientIndex] = clientClone;
  }

  public static async Delete(id: number): Promise<void> {
    const clientIndex = this.TryFindClientIndexByID(id);
    clients.splice(clientIndex, 1);
  }

  private static TryFindClientIndexByID(clientID: number): number {
    const clientIndex = clients.findIndex((client) => client.id === clientID);

    if (clientIndex === -1) {
      throw new Error(`Client with ID ${clientID} not found`);
    } else {
      return clientIndex;
    }
  }
}

export default MockGatewayClients;
