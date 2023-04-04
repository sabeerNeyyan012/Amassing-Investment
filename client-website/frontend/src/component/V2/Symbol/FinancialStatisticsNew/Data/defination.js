export const CapitalStructureDef = {
  enterpriseValue:
    'Enterprise value (EV) is a measure of a company’s total value, often used as a more comprehensive alternative to equity market capitalization',
  marketCapPeriodEnd: 'Market Cap at Period End',
  netDebt: 'Net Debt (including cash)',
  investedCapital:
    'Net working Capital plus net fixed assets plus net intangible assets',
  netWorkingCapital:
    'The difference between a company’s current assets and current liabilities.',
  ppAndENet:
    'Property, plant, and equipment, net, a fixed asset on the balance sheet.',
  priceAccountingPeriodEnd: 'Share price at the end of the accounting period',
  totalCapital: 'Total Capital of the firm (Debt, Equity and Minorities)',
  totalDebt: 'Short and Long Term Debt',
  wabso: 'Basic weighted average shares (not split-adjusted).',
  wabsoSplitAdjusted:
    'Weighted average basic shares oustanding as reported on the income statment, adjusted for stock splits.',
  wadso: 'Diluted weighted average shares (not split-adjusted).',
  wadsoSplitAdjusted:
    'Weighted average diluted shares oustanding as reported on the income statment, adjusted for stock splits.',
  bookValuePerShare: 'Basic Book Value per Share',
  taxBurden: 'Net Income / EBT',
  altmanZScore:
    'The Altman Z-score is the output of a credit-strength test that gauges a publicly-traded manufacturing company’s likelihood of bankruptcy.',
};

export const PricingDef = {
  evToEbit: 'Enterprise Value to EBIT Ratio',
  evToEbitda: 'Enterprise Value to EBITDA Ratio',
  evToFcf: 'Enterprise Value to Free Cash Flow Ratio',
  evToInvestedCapital: 'Enterprise Value to Invested Capital Ratio',
  evToNopat: 'Enterprise Value to NOPAT Ratio',
  // evToNopat: 'Enterprise Value to NOPAT Ratio',
  evToOcf: 'Enterprise Value to Operating Cash Flow Ratio',
  evToSales: 'Enterprise Value to Sales Ratio',
  fcfYield: 'Free Cash flow divided by Market Cap',
  pToBv: 'Price to Book Value',
  pToE: 'Price to Earnings Ratio',
  priceToRevenue: 'Price to Revenue',
};

export const EfficiencyRatioDef = {
  accountsPayableTurnover:
    'The accounts payable turnover ratio shows how many times a company pays off its accounts payable during the period.',
  accountsReceivableTurnover:
    'he accounts receivable turnover ratio shows how quickly the company is paid for the credit it extends to customers.',
  assetTurnover: 'Revenue/average total assets',
  fixedAssetTurnover: 'Revenue divided by Fixed Assets',
  inventoryTurnover:
    'Inventory turnover shows how many times a company has sold and replaced inventory during the period.',
  investedCapitalTurnover: 'Revenue divided by Invested Capital',
  nibclRevenueDeferredTurnover: 'Deferred revenue turnover',
  researchDevelopmentToRevenue:
    'Research and development expensed divided by Revenue',
  sgaToRevenue: 'SG&A expense divided by Revenue',
  workingCapitalTurnover: 'Revenue divided by average working capital',
  cashConversionCycle:
    'The cash conversion cycle show the number of days it takes for a company to convert its inventory and other resources into revenue.',
  daysInAccountsPayable:
    'Days in accounts payable shows the average number of days it takes a company to pay its bills.',
  daysInInventory:
    'The days in inventory ratio shows how quickly, in days, a company is converting its inventory into revenue.',
  daysInRevenueDeferred:
    'Days in deferred revenue shows the average number of days it takes a company to collect on deferred revenue.',
  daysRevenueOutstanding:
    'Days in revenue outstanding shows the average number of days it takes a compnay to collect payment after a sale has been made.',
};

export const GrowthDef = {
  ebitGrowth: 'EBIT growth',
  ebitdaGrowth: 'EBITDA growth',
  freeCashFlowGrowth: 'Free Cash Flow Firm Growth',
  incomeNetPerWabsoSplitAdjustedYoyDeltaPercent:
    'Percent growth in basic earnings per share year over year.',
  investedCapitalGrowth: 'Invested Capital Growth',
  netIncomeGrowth: 'Net Profit growth',
  netWorkingCapitalGrowth: 'Net Working Capital growth',
  nopatGrowth: 'NOPAT Growth',
  operatingCashFlowGrowth: 'Operating Cash Flow Growth',
  revenueGrowth: 'Revenue growth',
};

export const ReturnDef = {
  operatingReturnOnAssets: 'Operating Return on Assets (OROA)',
  returnOnAssets: 'Return on Assets (ROA)',
  returnOnEquity: 'Return on Equity (ROE)',
  roce: 'Return on Capital Employed (ROCE)',
  roic: 'Return on Invested Capital (ROIC)',
};

export const ProfitMarginDef = {
  ebitdaMargin: 'EBITDA divided by Revenue',
  freeCashFlowToRevenue: 'Free Cashflow Margin',
  netIncomeToRevenue: 'Net Income divided by Revenue',
  nopatMargin: 'NOPAT divided by Revenue',
  operatingCfToRevenue: 'Operating Cashflow divided by Revenue',
  operatingIncomeToRevenue: 'Operating Income divided by Revenue',
  pretaxIncomeMargin: 'Pretax Income divided by Revenue',
  profitGrossToRevenue: 'Gross Profit divided by Revenue',
};

export const LeverageRatioDef = {
  debtToAssets: 'Short term plus long term debt divided by total assets',
  debtToCapitalization: 'Total Debt divided by total debt & capital',
  debtToEbitda: 'Total Debt divided by EBITDA',
  debtToEquity: 'Total Liabilities divided by Shareholders Equity',
  netDebtToEbitda: 'Net Debt divided by EBITDA',
};

export const LiquidityRatioDef = {
  currentRatio: 'Current assets divided by current liabilities',
  quickRatio:
    'Cash and marketable securities plus accounts receivable all divided by current liabilities',
  assetsToEquity: 'Total Assets divided by average equity.',
  preferredEquityToCapital: 'Preferred equity divided by Total Capital',
  ebitToInterestExpense: 'EBIT divided by net interest expense',
  operatingCashFlowInterestCoverage:
    'Operating Cashflow divided by Interest cost',
  interestBurden: 'EBT/EBIT',
};

export const EarningsDividendsDef = {
  dividendPerShare: 'Dividend paid per share of the accounting period',
  dividendYield: 'Historic annual return from dividends',
  earningsYield:
    'Earnings Yield = EPS / Price = 1 / (P/E Ratio), expressed as a percentage.',
  incomeNetPerWabso: 'Basic earnings per share (not split-adjusted).',
  incomeNetPerWabsoSplitAdjusted: 'Basic earnings per share.',
  incomeNetPerWadso: 'Diluted earnings per share (not split-adjusted).',
  incomeNetPerWadsoSplitAdjusted: 'Diluted earnings per share.',
};

export const CurrentFinancialHighlightsDef = {
  ebitdaReported:
    'Reported operating earnings before interest, taxes, depreciation and amortization. This version of EBITDA uses only reported data from the income statment and is not adjusted for unusual gains/losses found only in the footnotes or MD&A.',
  expenseOperating: 'Total operating expenses (SG&A, R&D and Depreciation)',
  freeCashFlow:
    'Cash Flow from Operating Activities less Interest expense (net of tax shield) and less Capex',
  goodwillTotal:
    'The difference between the fair market value of the assets and liabilities',
  incomeNetPreTax: 'Pre-tax income.',
  interestMinority:
    'Minority interests, a component of shareholder’s equity representing a significant but non-controlling ownership of a company’s voting shares by either an investor or another company.',
  nopat:
    'Net Operating Profit after Tax, or EBIT taxed at the effective tax rate',
  operatingIncome:
    'Profit realized from operations, after deducting operating expenses such as wages, depreciation, and cost of goods sold (COGS).',
};
