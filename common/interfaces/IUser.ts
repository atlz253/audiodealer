import ID from "./ID";

interface IUser extends ID {
    type: string,
    firstName: string,
    login?: string,
    password?: string
}

export default IUser;