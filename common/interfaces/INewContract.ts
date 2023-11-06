import IContractProduct from "./IContractProduct";
import ID from "./ID";

interface INewContract extends ID {
    sellerBillID: number,
    buyerBillID: number,
    type: string,
    products: IContractProduct[]
}

export default INewContract;