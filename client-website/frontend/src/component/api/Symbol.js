import { ServiceCP1V2, ServiceV2 } from "../../services/apiService";

export const getCompanyProfileQuote = async (param) => {
  var { data } = await ServiceCP1V2.get(`/company-profile-quote`, {
    params: param,
  });
  return data;
};

export const getCompanyStockPeers = async (param) => {
  var { data } = await ServiceCP1V2.get(`/stock-peers`, {
    params: param,
  });
  return data;
};

export const getHistoricalPriceChart = async (param) => {
  var { data } = await ServiceCP1V2.get(`/historical-price-chart`, {
    params: param,
  });
  return data;
};

export const getStockDividend = async (param) => {
  var { data } = await ServiceCP1V2.get(`/stock-dividend`, {
    params: param,
  });
  return data;
};

export const getEarnings = async (param) => {
  var { data } = await ServiceCP1V2.get(`/earnings`, {
    params: param,
  });
  return data;
};

export const getStockMarketActives = async () => {
  var { data } = await ServiceCP1V2.get(`/stock-market-actives`);
  return data;
};

export const getSynopsisCompanyNews = async (param) => {
  var { data } = await ServiceCP1V2.get(`/company-news`, {
    params: param,
  });
  return data;
};

export const getHeaderMarqueeDetails = async (param) => {
  var { data } = await ServiceCP1V2.get(`/header2`, {
    params: param,
  });
  return data;
};

export const getStockPriceChange = async (param) => {
  var { data } = await ServiceCP1V2.get(`/stock-price-change`, {
    params: param,
  });
  return data;
};

export const getSearchResult = async (param) => {
  var { data } = await ServiceCP1V2.get(`/search`, {
    params: param,
  });
  return data;
};

export const getSecFillings = async (param) => {
  var { data } = await ServiceCP1V2.get(`/sec-filings`, {
    params: param,
  });
  return data;
};

export const getETFStockData = async (param) => {
  var { data } = await ServiceCP1V2.get(`/etf-stock-exposure`, {
    params: param,
  });
  return data;
};

export const getTechnicalAnalysisGraphData = async (param) => {
  var { data } = await ServiceV2.post(`/predict_price_graph`, param);
  return data;
};

export const getCompanyQuote = async (param) => {
  var { data } = await ServiceCP1V2.get(`/company-quote`, {
    params: param,
  });
  return data;
};

export const getCompanyProfile = async (param) => {
  var { data } = await ServiceCP1V2.get(`/company-profile`, {
    params: param,
  });
  return data;
};

export const getRelativeValuation = async (param) => {
  var { data } = await ServiceV2.post(`/relative_valuation_2`, param);
  return data;
};

export const getRelativeValuationBySymbol = async (param) => {
  var { data } = await ServiceV2.post(`/rv_symbol`, param);
  return data;
};

export const getRelativeValuationByIndustry = async (param) => {
  var { data } = await ServiceV2.post(`/get_company`, param);
  return data;
};

export const getComparativeValuation = async (param) => {
  var { data } = await ServiceV2.post(`/relative_valuation`, param);
  return data;
};

export const getComparativeValuationBySymbol = async (param) => {
  var { data } = await ServiceV2.post(`/rv_symbol`, param);
  return data;
};

export const getComparativeValuationByIndustry = async (param) => {
  var { data } = await ServiceV2.post(`/get_company`, param);
  return data;
};
