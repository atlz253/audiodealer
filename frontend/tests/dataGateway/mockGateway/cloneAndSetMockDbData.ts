import MockDb from "../../../src/dataGateway/mockGateway/MockDb/MockDb";
import { MockDbData } from "../../../src/dataGateway/mockGateway/MockDb/mockDbData";

export function cloneAndSetMockDbData(mockDbData: MockDbData): MockDbData {
  const mockDbDataClone = structuredClone(mockDbData);
  MockDb.SetMockDbData(mockDbDataClone);
  return mockDbDataClone;
}
