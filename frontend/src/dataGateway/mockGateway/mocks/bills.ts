import IBill from "../../../../../common/interfaces/IBill";

export const bills: IBill[][] = [
  [
    /* Admin haven't got bills */
  ],
  [
    {
      id: 0,
      billNumber: "50779872200000002973",
      correspondentBill: "50759145900000009232",
      BIC: "405978688",
      INN: "255625630",
      ownerName: "Demo user",
      bankName: "Demo bank",
      expireDate: "2026-10-22T21:00:00.000Z",
    },
  ],
  [
    {
      id: 1,
      billNumber: "50779872200000002972",
      correspondentBill: "50759145900000009231",
      BIC: "405978687",
      INN: "255625639",
      ownerName: "Demo provider",
      bankName: "Demo bank",
      expireDate: "2026-11-22T21:00:00.000Z",
    },
  ],
  [
    {
      id: 2,
      billNumber: "50779872200000002973",
      correspondentBill: "50759145900000009232",
      BIC: "405978688",
      INN: "255625630",
      ownerName: "Demo client",
      bankName: "Demo bank",
      expireDate: "2026-09-22T21:00:00.000Z",
    },
  ]
];
