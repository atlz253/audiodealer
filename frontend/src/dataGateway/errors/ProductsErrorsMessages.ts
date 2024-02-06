export default {
  getProductWithGivenIDNotFoundMessage: (id: number) =>
    `Product with ID ${id} not found`,
} as const;
