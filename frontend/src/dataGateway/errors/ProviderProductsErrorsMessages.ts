export default {
  getProductWithGivenIDAlreadyBeenAddedForProviderWithGivenIDMessage: (
    productID: number,
    providerID: number,
  ) =>
    `Product with ID ${productID} already been added for provider with ID ${providerID}`,
  getProductWithGivenIDNotFoundForProviderWithGivenIDMessage: (
    productID: number,
    providerID: number,
  ) =>
    `Product with ID ${productID} not found for provider with ID ${providerID}`,
  getProductsNotFoundForProviderWithGivenID: (providerID: number) =>
    `Products not found for provider with ID ${providerID}`,
} as const;
