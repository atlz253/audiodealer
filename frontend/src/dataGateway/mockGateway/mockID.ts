import ID from "../../../../common/interfaces/ID";
import { clients } from "./mocks/clients";
import { providers } from "./mocks/providers";
import { users } from "./mocks/users";

export function getNextBillUserID() {
  const usersNextID = getNextMockID(users);
  const providersNextID = getNextMockID(providers);
  const clientsNextID = getNextMockID(clients);
  const maxNextID = Math.max(usersNextID, providersNextID, clientsNextID);
  return maxNextID;
}

export function getNextMockID(objects: ID[]) {
  const maxID = getMaxMockID(objects);
  return maxID + 1;
}

export function getMaxMockID(objects: ID[]) {
  const maxID = objects.reduce(
    (maxID, obj) => (maxID > obj.id ? maxID : obj.id),
    0,
  );
  return maxID;
}
