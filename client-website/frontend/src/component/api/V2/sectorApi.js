import { ServiceCP1V2, ServiceV2 } from '../../../services/apiService';

export const getSectorChartData = async (param) => {
  var { data } = await ServiceV2.post(`/screener_3`, param);
  return data;
};

export const getSectorTableData = async () => {
  var { data } = await ServiceV2.post(`/screener_2`);
  return data;
};

export const getSectorRevenueData = async (param) => {
  var { data } = await ServiceV2.post(`/screener_4`, param)
  return data
}
