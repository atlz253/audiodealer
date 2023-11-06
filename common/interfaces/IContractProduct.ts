import ID from "./ID";
import IDeliveryDays from "./IDeliveryDays";

interface IContractProduct extends ID, IDeliveryDays {
    quantity: number
}

export default IContractProduct;