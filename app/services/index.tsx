import * as utils from "../utils/httpClient";

export const getList = async (params: any) => {
  return await utils.HttpClient.get(`/api/daily/${params.username}`, {
    params,
  });
};

export const addDaily = async (params: any) => {
  return await utils.HttpClient.post(`/api/daily`, params);
};

export const updateDaily = async (params: any) => {
  return await utils.HttpClient.put(`/api/daily/${params.id}`, params);
};
