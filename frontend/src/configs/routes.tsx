import { RouteObject, createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import ContractsPage from "../pages/ContractsPage";
import Providers from "../pages/Providers";
import Clients from "../pages/Clients";
import ProductsPage from "../pages/ProductsPage";
import BillsPage from "../pages/BillsPage";
import ContractPage from "../pages/ContractPage";
import Users from "../pages/Users";
import UserPage from "../pages/UserPage";
import ClientPage from "../pages/ClientPage";
import ProviderPage from "../pages/ProviderPage";
import StatisticsPage from "../pages/StatisticsPage";
import QueriesPage from "../pages/QueriesPage";
import HelpPage from "../pages/HelpPage";
import Index from "../components/Index";
import App from "../pages/App";

export const dealer_routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />
      },
      {
        path: "/statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/contracts",
        element: <ContractsPage />,
      },
      {
        path: "/contracts/new",
        element: <ContractPage newContract />,
      },
      {
        path: "/contracts/:contractID",
        element: <ContractPage />,
      },
      {
        path: "/providers",
        element: <Providers />,
      },
      {
        path: "/providers/new",
        element: <ProviderPage newProvider />,
      },
      {
        path: "/providers/:providerID",
        element: <ProviderPage />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/clients/new",
        element: <ClientPage newClient />,
      },
      {
        path: "/clients/:clientID",
        element: <ClientPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/bills",
        element: <BillsPage />,
      },
      {
        path: "/queries",
        element: <QueriesPage />,
      },
      {
        path: "/help",
        element: <HelpPage />,
      },
    ],
  },
];

export const admin_routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:userID",
        element: <UserPage />,
      },
      {
        path: "/users/new",
        element: <UserPage newUser />,
      },
    ],
  },
];
