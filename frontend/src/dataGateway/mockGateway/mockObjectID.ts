import ID from "../../../../common/interfaces/ID";
import MockDb from "./MockDb/MockDb";

export function getNewMockBillUserID() {
  const usersNextID = getNewMockObjectID(structuredClone(MockDb.Users));
  const providersNextID = getNewMockObjectID(MockDb.Providers);
  const clientsNextID = getNewMockObjectID(MockDb.Clients);
  return Math.max(usersNextID, providersNextID, clientsNextID);
}

export function getNewMockObjectID(objects: ID[]) {
  const maxID = findMaxMockObjectID(objects);
  return maxID + 1;
}

export function findMaxMockObjectID(objects: ID[]) {
  const maxID = objects.reduce(
    (maxID, obj) => (maxID > obj.id ? maxID : obj.id),
    -1,
  );
  return maxID;
}
