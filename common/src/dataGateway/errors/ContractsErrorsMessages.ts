export default {
  getContractWithGivenIDNotFoundMessage: (id: number) =>
    `Contract with ID ${id} not found`,
} as const;
