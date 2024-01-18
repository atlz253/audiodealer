import ID from "../../../../common/interfaces/ID";
import MockDb from "./MockDb/MockDb";

export function getNextBillUserID() {
  const usersNextID = getNextMockID(MockDb.Users);
  const providersNextID = getNextMockID(MockDb.Providers);
  const clientsNextID = getNextMockID(MockDb.Clients);
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
