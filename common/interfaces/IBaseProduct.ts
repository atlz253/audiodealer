import IDeliveryDays from "./IDeliveryDays";
import ID from "./ID";
import IQuantity from "./IQuantity";

interface IBaseProduct extends ID, IQuantity, Partial<IDeliveryDays> {
  name: string;
  category: string;
  price: number;
  deliveryDate?: string;
}

export default IBaseProduct;
