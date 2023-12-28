import IBillNumber from "./IBillNumber";

interface IBaseBill extends IBillNumber {
  ownerName: string;
  bankName: string;
  expireDate: string;
}

export default IBaseBill;
