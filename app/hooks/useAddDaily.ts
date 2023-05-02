import { useMutation } from "@tanstack/react-query";
import * as services from "../services";
import React from "react";

const useAddDaily = () => {
  const data = useMutation(async (payload: any) => {
    return await services.addDaily(payload);
  });
  return data;
};

export default useAddDaily;
