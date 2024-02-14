export default {
  getProviderWithGivenIDNotFoundMessage: (id: number) =>
    `Provider with ID ${id} not found`,
} as const;
