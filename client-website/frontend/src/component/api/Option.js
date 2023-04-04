import { ServiceV2 } from '../../services/apiService'

export const getVolatality = async (symbol, date) => {
  var { data } = await ServiceV2.post(`/website_quote`, {
    ticker: symbol,
    date: date
  })
  return data
}

export const getTradingIdeasVolatility = async (params) => {
  var { data } = await ServiceV2.post(`/implied_volatility`, params)
  return data
}

export const getTradingIdeasVolume = async (params) => {
  var { data } = await ServiceV2.post(`/volume`, params)
  return data
}

export const getTradingIdeasOpenInterest = async (params) => {
  var { data } = await ServiceV2.post(`/open_interest`, params)
  return data
}

export const getOptionsChainData = async (params) => {
  var { data } = await ServiceV2.post(`/option_chain`, params)
  return data
}

export const getOptionsChainGraph = async (params) => {
  var { data } = await ServiceV2.post(`/option_chain_graph`, params)
  return data
}
