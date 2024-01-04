import ID from "../../../../../common/interfaces/ID";

export interface IProviderProductMock extends ID {
  deliveryDays: number;
}

export const providerProductsID: IProviderProductMock[][] = [
  [
    /* Admin haven't got products */
  ],
  [
    /* User haven't got products */
  ],
  [
    {
      id: 0,
      deliveryDays: 10,
    },
  ],
];
