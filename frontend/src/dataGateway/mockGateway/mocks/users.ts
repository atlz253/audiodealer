import IUser from "../../../../../common/interfaces/IUser";

export const users: IUser[] = [
  {
    id: 0,
    type: "admin",
    firstName: "Administrator",
    login: "admin",
    password: "admin",
  },
  {
    id: 1,
    type: "user",
    firstName: "Demo user",
    login: "user",
    password: "user",
  },
];
