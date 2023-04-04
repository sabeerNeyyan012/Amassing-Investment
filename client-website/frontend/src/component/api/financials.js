import { ServiceCP1V2 } from '../../services/apiService'

export const getBalanceSheetV2 = async (param) => {
  var { data } = await ServiceCP1V2.get(`/balance-sheet`, { params: param })
  return data
}

export const getIncomeStatementsV2 = async (param) => {
  var { data } = await ServiceCP1V2.get(`/income-statement`, { params: param })
  return data
}

export const getCashFlowV2 = async (param) => {
  var { data } = await ServiceCP1V2.get(`/cash-flow`, { params: param })
  return data
}
