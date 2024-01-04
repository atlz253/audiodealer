import ID from "../../../../common/interfaces/ID";

// TODO: getNextUserID

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
