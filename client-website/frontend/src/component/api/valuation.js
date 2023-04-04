import { ValuationService, ServiceV3 } from '../../services/apiService';

export const getValuationData = async (symbol) => {
  var { data } = await ValuationService.get(`/valuation?symbol=${symbol}`);
  return data;
};

export const getManualValuationDividendData = async (param) => {
  var { data } = await ServiceV3.post(
    `/Stock-Backend/api/v1/manual/valuation/dvds`,
    param
  );
  return data;
};

export const getManualValuationFCFFMData = async (param) => {
  var { data } = await ServiceV3.post(
    `/Stock-Backend/api/v1/manual/valuation/fcffm`,
    param
  );
  return data;
};
