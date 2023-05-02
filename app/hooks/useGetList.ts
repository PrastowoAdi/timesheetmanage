import { useQuery } from "@tanstack/react-query";
import * as services from "../services";

const useGetList = () => {
  const data = useQuery<any>(
    ["dailylist"],
    async () => {
      const filter = {
        // paged: true,
        // PageNumber: 1,
        // PageSize: 200
        // QuerySearch: param
      };

      const { data: axiosData } = await services.getList(filter);
      return axiosData.data;
    },
    { keepPreviousData: true }
  );
  return data;
};

export default useGetList;
