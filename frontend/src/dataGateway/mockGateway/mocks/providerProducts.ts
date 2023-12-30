import ID from "../../../../../common/interfaces/ID";

export interface IProviderProductMock extends ID {
  deliveryDays: number;
}

export const providerProductsID: IProviderProductMock[][] = [
  [
    {
      id: 0,
      deliveryDays: 10,
    },
  ],
];
