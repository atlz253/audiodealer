export default {
  getUserWithGivenIDNotFoundMessage: (id: number) =>
    `User with ID ${id} not found`,
  getFirstAdminDeleteNotAllowedMessage: () =>
    "It's not allowed to delete the first admin",
} as const;
