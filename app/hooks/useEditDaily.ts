import { useMutation } from "@tanstack/react-query";
import * as services from "../services";

const useEditDaily = () => {
  const data = useMutation(async (payload: any) => {
    return await services.updateDaily(payload);
  });
  return data;
};

export default useEditDaily;
