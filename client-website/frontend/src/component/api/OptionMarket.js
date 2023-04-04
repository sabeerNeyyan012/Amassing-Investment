import { ServiceV2 } from '../../services/apiService';

export const getHighestImpliedVolatility = async (payload) => {
  var { data } = await ServiceV2.post('/highest_implied_volatility', payload);
  return data;
};

export const getExplodingIV = async (payload) => {
  var { data } = await ServiceV2.post('/exploding_IV', payload);
  return data;
};

export const getImplodingIV = async (payload) => {
  var { data } = await ServiceV2.post('/imploding_IV', payload);
  return data;
};

export const getOptionVolumeGainers = async (payload) => {
  var { data } = await ServiceV2.post('/option_volume_gainers', payload);
  return data;
};

export const getOptionVolumeLoosers = async (payload) => {
  var { data } = await ServiceV2.post('/option_volume_losers', payload);
  return data;
};

export const getOptionOpenInterestGainers = async (payload) => {
  var { data } = await ServiceV2.post('/option_open_interest_gainers', payload);
  return data;
};

export const getOptionOpenInterestLosers = async (payload) => {
  var { data } = await ServiceV2.post('/option_open_interest_losers', payload);
  return data;
};

export const getDefaultMarketOption = async (payload) => {
  var { data } = await ServiceV2.post('/website_market', payload);
  return data;
};
