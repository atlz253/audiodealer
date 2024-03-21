import { findMaxMockObjectID } from "../../../../common/src/dataGateway/mockGateway/mockObjectID";
import { IDArrayMockMaxID, getIDArrayMock } from "./mocks/mockObjectIDMocks";

describe("Mock data gateway max mock object ID in array find helper", () => {
  test("Find result in empty array should return -1", () => {
    const result = findMaxMockObjectID([]);
    expect(result).toEqual(-1);
  });

  test("Find result in array should be correct", () => {
    const IDs = getIDArrayMock();
    const result = findMaxMockObjectID(IDs);
    expect(result).toEqual(IDArrayMockMaxID);
  });
});
