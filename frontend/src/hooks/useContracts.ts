import DataGateway from "../dataGateway/DataGateway";
import useFetchState from "./useFetchState";

const useContracts = () => useFetchState(() => DataGateway.Contracts.Get(), []);

export default useContracts;
