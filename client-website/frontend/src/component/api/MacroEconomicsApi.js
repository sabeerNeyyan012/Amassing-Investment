import { ServiceCP1V2 } from '../../services/apiService'

export const getMacroEconomicsEconomy = async (param) => {
  var { data } = await ServiceCP1V2.get(`/macroeconomics/economy`, {
    params: param
  })
  return data
}
