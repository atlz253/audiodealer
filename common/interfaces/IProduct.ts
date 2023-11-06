import IBaseProduct from "./IBaseProduct";

interface IProduct extends IBaseProduct {
    manufacturer: string,
    description: string
}

export default IProduct;