import { ServiceCP1V2, ServiceV2 } from '../../../services/apiService'

export const getStockMarketGainers = async () => {
  var { data } = await ServiceCP1V2.get(`/stock-market-gainers`)
  return data
}

export const getStockMarketLosers = async () => {
  var { data } = await ServiceCP1V2.get(`/stock-market-losers`)
  return data
}

export const getEarningsCalender = async (param) => {
  var { data } = await ServiceCP1V2.get(`/earning-calendar`, {
    params: param,
  })
  return data
}
