export default {
  getBillWithGivenIDNotFoundErrorMessage: (id: number) =>
    `Bill with ID ${id} not found`,
  getBillStorageForUserWithGivenIDAlreadyCreatedMessage: (id: number) =>
    `Bill storage for user with ID ${id} already created`,
  getBillWithGivenIDNotFoundForUserWithGivenIDMessage: (
    billID: number,
    userID: number,
  ) => `Bill with ID ${billID} not found for user with ID ${userID}`,
  getBillsForUserWithGivenIDNotFoundMessage: (id: number) =>
    `Bills for user with ID ${id} not found`,
} as const;
