import IQueriesCategory from "../../../common/interfaces/IQueriesCategory";
import DataGateway from "../../../common/src/dataGateway/DataGateway";
import useFetchData from "./useFetchData";

const useQueriesCategory = () =>
  useFetchData<IQueriesCategory[]>(() => DataGateway.Queries.Get(), []);

export default useQueriesCategory;
