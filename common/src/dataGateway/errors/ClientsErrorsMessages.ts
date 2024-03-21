export default {
  getClientWithGivenIDNotFoundMessage: (id: number) =>
    `Client with ID ${id} not found`,
} as const;
