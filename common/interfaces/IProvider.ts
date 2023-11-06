import IBaseProvider from "./IBaseProvider";

interface IProvider extends IBaseProvider {
    phone: string,
    address: string
}

export default IProvider;