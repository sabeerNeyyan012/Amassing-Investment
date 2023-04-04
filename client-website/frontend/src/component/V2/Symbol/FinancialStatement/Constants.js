export const TYPE = {
  balanceSheet: { label: 'Balance Sheet', value: 'BALANCE_SHEET' },
  incomeStatement: { label: 'Income Statement', value: 'INCOME_STATEMENT' },
  cashFlow: { label: 'Cash Flow', value: 'CASH_FLOW' },
};

// export const BALANCE_SHEET_COLUMNS = [
//   'cashAndCashEquivalents',
//   'shortTermInvestments',
//   'cashAndShortTermInvestments',
//   'netReceivables',
//   'inventory',
//   'otherCurrentAssets',
//   'totalCurrentAssets',
//   'propertyPlantEquipmentNet',
//   'goodwill',
//   'intangibleAssets',
//   'goodwillAndIntangibleAssets',
//   'longTermInvestments',
//   'taxAssets',
//   'otherNonCurrentAssets',
//   'totalNonCurrentAssets',
//   'otherAssets',
//   'totalAssets',
//   'accountPayables',
//   'shortTermDebt',
//   'taxPayables',
//   'deferredRevenue',
//   'otherCurrentLiabilities',
//   'totalCurrentLiabilities',
//   'longTermDebt',
//   'deferredRevenueNonCurrent',
//   'deferredTaxLiabilitiesNonCurrent',
//   'otherNonCurrentLiabilities',
//   'totalNonCurrentLiabilities',
//   'otherLiabilities',
//   'capitalLeaseObligations',
//   'totalLiabilities',
//   'preferredStock',
//   'commonStock',
//   'retainedEarnings',
//   'accumulatedOtherComprehensiveIncomeLoss',
//   'othertotalStockholdersEquity',
//   'totalStockholdersEquity',
//   'totalLiabilitiesAndStockholdersEquity',
//   'minorityInterest',
//   'totalEquity',
//   'totalLiabilitiesAndTotalEquity',
//   'totalInvestments',
//   'totalDebt',
//   'netDebt',
// ];

export const CURRENT_ASSETS_COLUMNS = [
  { key: 'cashAndCashEquivalents', label: 'Cash And Cash Equivalents' },
  { key: 'shortTermInvestments', label: 'Short Term Investments' },
  {
    key: 'cashAndShortTermInvestments',
    label: 'Cash And Short Term Investments',
  },
  { key: 'netReceivables', label: 'Net Receivables' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'otherCurrentAssets', label: 'Other Current Assets' },
  { key: 'totalCurrentAssets', label: 'Total Current Assets' },
];

export const NON_CURRENT_ASSETS_COLUMNS = [
  { key: 'propertyPlantEquipmentNet', label: 'Property Plant Equipment Net' },
  { key: 'goodwill', label: 'Goodwill' },
  { key: 'intangibleAssets', label: 'Intangible Assets' },
  {
    key: 'goodwillAndIntangibleAssets',
    label: 'Goodwill And Intangible Assets',
  },
  { key: 'longTermInvestments', label: 'Long Term Investments' },
  { key: 'taxAssets', label: 'Tax Assets' },

  { key: 'otherNonCurrentAssets', label: 'Other Non Current Assets' },

  { key: 'totalNonCurrentAssets', label: 'Total Non Current Assets' },

  { key: 'otherAssets', label: 'Other Assets' },

  { key: 'totalAssets', label: 'Total Assets' },
];

export const CURRENT_LIABILITIES_COLUMNS = [
  { key: 'accountPayables', label: 'Account Payables' },

  { key: 'shortTermDebt', label: 'Short Term Debt' },

  { key: 'taxPayables', label: 'Tax Payables' },

  { key: 'deferredRevenue', label: 'Deferred Revenue' },

  { key: 'otherCurrentLiabilities', label: 'Other Current Liabilities' },

  { key: 'totalCurrentLiabilities', label: 'Total Current Liabilities' },
];

export const NON_CURRENT_LIABILITIES_COLUMNS = [
  { key: 'longTermDebt', label: 'Long Term Debt' },

  { key: 'deferredRevenueNonCurrent', label: 'Deferred Revenue Non Current' },

  {
    key: 'deferredTaxLiabilitiesNonCurrent',
    label: 'Deferred Tax Liabilities Non Current',
  },

  { key: 'otherNonCurrentLiabilities', label: 'Other Non Current Liabilities' },

  { key: 'totalNonCurrentLiabilities', label: 'Total Non Current Liabilities' },

  { key: 'otherLiabilities', label: 'Other Liabilities' },

  { key: 'capitalLeaseObligations', label: 'Capital Lease Obligations' },

  { key: 'totalLiabilities', label: 'Total Liabilities' },
];

export const SHAREHOLDERS_EQUITY_COLUMNS = [
  { key: 'preferredStock', label: 'preferredStock' },

  { key: 'commonStock', label: 'commonStock' },

  { key: 'retainedEarnings', label: 'retainedEarnings' },

  {
    key: 'accumulatedOtherComprehensiveIncomeLoss',
    label: 'accumulatedOtherComprehensiveIncomeLoss',
  },

  {
    key: 'othertotalStockholdersEquity',
    label: 'othertotalStockholdersEquity',
  },

  { key: 'totalStockholdersEquity', label: 'totalStockholdersEquity' },

  {
    key: 'totalLiabilitiesAndStockholdersEquity',
    label: 'totalLiabilitiesAndStockholdersEquity',
  },

  { key: 'minorityInterest', label: 'minorityInterest' },

  { key: 'totalEquity', label: 'totalEquity' },

  {
    key: 'totalLiabilitiesAndTotalEquity',
    label: 'totalLiabilitiesAndTotalEquity',
  },
];

export const OTHER_BALANCE_COLUMN = [
  { key: 'totalInvestments', label: 'totalInvestments' },
  { key: 'totalDebt', label: 'totalDebt' },
  { key: 'netDebt', label: 'netDebt' },
];

export const BALANCE_SHEET_COLUMNS = [
  ...CURRENT_ASSETS_COLUMNS,
  ...NON_CURRENT_ASSETS_COLUMNS,
  ...CURRENT_LIABILITIES_COLUMNS,
  ...NON_CURRENT_LIABILITIES_COLUMNS,
  ...SHAREHOLDERS_EQUITY_COLUMNS,
  ...OTHER_BALANCE_COLUMN,
];

export const INCOME_STATEMENT_COLUMNS = [
  { key: 'revenue', label: 'Revenue', type: 'CURRENCY' },
  { key: 'costOfRevenue', label: 'costOfRevenue', type: 'CURRENCY' },

  { key: 'grossProfit', label: 'grossProfit', type: 'CURRENCY' },

  { key: 'grossProfitRatio', label: 'grossProfitRatio', type: 'CURRENCY' },

  {
    key: 'researchAndDevelopmentExpenses',
    label: 'researchAndDevelopmentExpenses',
    type: 'CURRENCY',
  },

  {
    key: 'generalAndAdministrativeExpenses',
    label: 'generalAndAdministrativeExpenses',
    type: 'CURRENCY',
  },

  {
    key: 'sellingAndMarketingExpenses',
    label: 'sellingAndMarketingExpenses',
    type: 'CURRENCY',
  },

  {
    key: 'sellingGeneralAndAdministrativeExpenses',
    label: 'sellingGeneralAndAdministrativeExpenses',
    type: 'CURRENCY',
  },

  { key: 'otherExpenses', label: 'otherExpenses', type: 'CURRENCY' },

  { key: 'operatingExpenses', label: 'operatingExpenses', type: 'CURRENCY' },

  { key: 'costAndExpenses', label: 'costAndExpenses', type: 'CURRENCY' },

  { key: 'interestIncome', label: 'interestIncome', type: 'CURRENCY' },

  { key: 'interestExpense', label: 'interestExpense', type: 'CURRENCY' },

  {
    key: 'depreciationAndAmortization',
    label: 'depreciationAndAmortization',
    type: 'CURRENCY',
  },

  { key: 'ebitda', label: 'ebitda', type: 'CURRENCY' },

  { key: 'ebitdaratio', label: 'ebitdaratio', type: 'CURRENCY' },

  { key: 'operatingIncome', label: 'operatingIncome', type: 'CURRENCY' },

  {
    key: 'operatingIncomeRatio',
    label: 'operatingIncomeRatio',
    type: 'CURRENCY',
  },

  {
    key: 'totalOtherIncomeExpensesNet',
    label: 'totalOtherIncomeExpensesNet',
    type: 'CURRENCY',
  },

  { key: 'incomeBeforeTax', label: 'incomeBeforeTax', type: 'CURRENCY' },

  {
    key: 'incomeBeforeTaxRatio',
    label: 'incomeBeforeTaxRatio',
    type: 'CURRENCY',
  },

  { key: 'incomeTaxExpense', label: 'incomeTaxExpense', type: 'CURRENCY' },

  { key: 'netIncome', label: 'netIncome', type: 'CURRENCY' },

  { key: 'netIncomeRatio', label: 'netIncomeRatio', type: 'CURRENCY' },

  { key: 'eps', label: 'eps', type: 'CURRENCY' },

  { key: 'epsdiluted', label: 'epsdiluted', type: 'CURRENCY' },

  {
    key: 'weightedAverageShsOut',
    label: 'weightedAverage Shs Out',
    type: 'CURRENCY',
  },

  {
    key: 'weightedAverageShsOutDil',
    label: 'weighted Average Shs Out Dil',
    type: 'CURRENCY',
  },
];

export const OPERATING_CASH_FLOW_COLUMNS = [
  'netIncome',
  'depreciationAndAmortization',
  'deferredIncomeTax',
  'stockBasedCompensation',
  'changeInWorkingCapital',
  'accountsReceivables',
  'inventory',
  'accountsPayables',
  'otherWorkingCapital',
  'otherNonCashItems',
  'netCashProvidedByOperatingActivities',
];

export const INVESTING_CASH_FLOW_COLUMNS = [
  'investmentsInPropertyPlantAndEquipment',
  'acquisitionsNet',
  'purchasesOfInvestments',
  'salesMaturitiesOfInvestments',
  'otherInvestingActivites',
  'netCashUsedForInvestingActivites',
];

export const FINANCING_CASH_FLOW_COLUMNS = [
  'debtRepayment',
  'commonStockIssued',
  'commonStockRepurchased',
  'dividendsPaid',
  'otherFinancingActivites',
  'netCashUsedProvidedByFinancingActivities',
];

export const OTHER_CASH_FLOW_COLUMNS = [
  'effectOfForexChangesOnCash',
  'netChangeInCash',
  'cashAtEndOfPeriod',
  'cashAtBeginningOfPeriod',
  'operatingCashFlow',
  'capitalExpenditure',
  'freeCashFlow',
];

export const CASH_FLOW_COLUMNS = [
  ...OPERATING_CASH_FLOW_COLUMNS,
  ...INVESTING_CASH_FLOW_COLUMNS,
  ...FINANCING_CASH_FLOW_COLUMNS,
  ...OTHER_CASH_FLOW_COLUMNS,
];
