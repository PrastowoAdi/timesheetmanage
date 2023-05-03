import * as utils from "../utils/httpClient";

export const getList = async (params: any) => {
  return await utils.HttpClient.get(`/api/daily`, { params });
};

export const addDaily = async (params: any) => {
  const payload = {
    activity: params.daily_field,
  };
  return await utils.HttpClient.post(`/api/daily`, payload);
};

export const updateDaily = async (params: any) => {
  const payload = {
    activity: params.daily_field,
  };
  return await utils.HttpClient.put(`/api/daily/${params.id}`, payload);
};
