import IBaseBill from "./IBaseBill";

interface IBill extends IBaseBill {
  correspondentBill: string;
  BIC: string;
  INN: string;
}

export default IBill;
