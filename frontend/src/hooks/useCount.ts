import DataGateway from "../dataGateway/DataGateway";
import useFetchData from "./useFetchData";

export const useContractsCount = (contractStatus?: string) =>
  useFetchData(() => DataGateway.Contracts.GetCount(contractStatus), 0);

export const useClientsCount = () =>
  useFetchData(() => DataGateway.Clients.GetCount(), 0);

export const useProvidersCount = () =>
  useFetchData(() => DataGateway.Providers.GetCount(), 0);

export const useProductsCount = () =>
  useFetchData(() => DataGateway.Products.GetCount(), 0);
