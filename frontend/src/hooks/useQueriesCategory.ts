import IQueriesCategory from "../../../common/interfaces/IQueriesCategory";
import useFetchData from "./useFetchData";
import DataGateway from "../dataGateway/DataGateway";

const useQueriesCategory = () =>
  useFetchData<IQueriesCategory[]>(() => DataGateway.Queries.Get(), []);

export default useQueriesCategory;
