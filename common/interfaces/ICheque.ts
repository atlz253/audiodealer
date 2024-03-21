import ID from "./ID";
import IStatus from "./IStatus";

interface ICheque extends ID {
  deliveryDate: string;
  type: string;
  status: "paid" | "unpaid";
}

export default ICheque;
