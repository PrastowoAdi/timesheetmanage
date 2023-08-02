import { useQuery } from "@tanstack/react-query";
import * as services from "../services";

const useGetList = () => {
  let username: any;
  if (typeof window !== "undefined") {
    const tokenFromLocal = localStorage.getItem("username");
    username = JSON.parse(tokenFromLocal!);
  }
  const data = useQuery<any>(
    ["dailylist", username],
    async () => {
      if (username) {
        const filter = {
          // paged: true,
          // PageNumber: 1,
          // PageSize: 200
          // QuerySearch: param
          username,
        };
        const { data: axiosData } = await services.getList(filter);
        return axiosData.data;
      } else {
        return [];
      }
    },
    { keepPreviousData: true }
  );
  return data;
};

export default useGetList;
