import { ServiceCP1V2 } from '../../services/apiService'

export const getFinancialStatisticsV2 = async (param) => {
  var { data } = await ServiceCP1V2.get(`/statistics`, { params: param })
  return data
}
