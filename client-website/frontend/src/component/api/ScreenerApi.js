import { ServiceV2 } from "../../services/apiService";

export const Controller = new AbortController();

export const getScreenerData = async (param) => {
  var { data } = await ServiceV2.post(`/screener_data`, param, {
    signal: Controller.signal,
  });
  return data;
};

export const getScreenerFilterRange = async (param) => {
  var { data } = await ServiceV2.get(`/screener_1`, param, {
    signal: Controller.signal,
  });
  return data;
};
