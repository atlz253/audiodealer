import ID from "../../../../../common/interfaces/ID";

// TODO: export default object instead of individual exports
export function getIDArrayMock(): ID[] {
  return [
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];
}

export const IDArrayMockMaxID = 2;
