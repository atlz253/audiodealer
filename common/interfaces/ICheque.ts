import ID from "./ID";
import IStatus from "./IStatus";

interface ICheque extends ID, IStatus {
    deliveryDate: string,
    type: string
}

export default ICheque;