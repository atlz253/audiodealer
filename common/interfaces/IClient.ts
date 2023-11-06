import IBaseClient from "./IBaseClient";

interface IClient extends IBaseClient {
    email: string,
    birthday: string
    address: string
}

export default IClient;