import ID from "./ID";
import IStatus from "./IStatus";

interface IBaseContract extends ID, IStatus {
  sellerName?: string;
  buyerName?: string;
  price: number;
  created: string;
  type: string;
}

export default IBaseContract;
