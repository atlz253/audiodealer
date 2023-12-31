interface ILink {
  to: string;
  name: string;
}

export const dealer_links: ILink[] = [
  {
    to: "/statistics",
    name: "Статистика",
  },
  {
    to: "/contracts",
    name: "Договора",
  },
  {
    to: "/providers",
    name: "Поставщики",
  },
  {
    to: "/queries",
    name: "Документы",
  },
  {
    to: "/clients",
    name: "Клиенты",
  },
  {
    to: "/products",
    name: "Товары",
  },
  {
    to: "/bills",
    name: "Мои счета",
  },
  {
    to: "/help",
    name: "Справка",
  },
];

export const admin_links: ILink[] = [
  {
    to: "/users",
    name: "Пользователи",
  },
];
