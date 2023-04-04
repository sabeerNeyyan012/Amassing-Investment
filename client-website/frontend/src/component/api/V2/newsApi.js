import { ServiceCP1V2, ServiceV2 } from '../../../services/apiService'

export const getStockMarketNews = async (param) => {
  var { data } = await ServiceCP1V2.get(`/stock-news`, { params: param })
  return data
}

export const getGeneralNews = async (param) => {
  var { data } = await ServiceCP1V2.get(`/general-news`, { params: param })
  return data
}
