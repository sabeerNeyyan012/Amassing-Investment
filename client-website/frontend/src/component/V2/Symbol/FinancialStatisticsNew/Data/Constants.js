export const TYPE = {
  capitalStructure: { label: 'Capital Structure', value: 'CAPITAL_STRUCTURE' },
  pricing: { label: 'Pricing', value: 'PRICING' },
  efficiencyRatios: { label: 'Efficiency Ratios', value: 'EFFICIENCY_RATIOS' },
  returns: { label: 'Returns', value: 'RETURNS' },
  margins: { label: 'Margins', value: 'MARGINS' },
    // Growth,
  leverageRatios: { label: 'Leverage Ratios', value: 'LEVERAGE_RATIOS' },
  liquidityRatios: { label: 'Liquidity Ratios', value: 'LIQUIDITY_RATIOS' },
  earningsDividends: {
    label: 'Earnings Dividends',
    value: 'EARNINGS_DIVIDENDS',
  },
  cashFlowRatios: { label: 'Cash Flow Ratios', value: 'CASHFLOW_RATIOS' },
};

export const TYPE_C = {
  capitalStructure: { label: 'Capital Structure', value: 'CAPITAL_STRUCTURE' },
  pricing: { label: 'Price Multiples', value: 'PRICING' },
  efficiencyRatios: { label: 'Efficiency Ratios', value: 'EFFICIENCY_RATIOS' },
  returns: { label: 'Returns', value: 'RETURNS' },
  margins: { label: 'Margins', value: 'MARGINS' },
    // Growth,
  leverageRatios: { label: 'Leverage Ratios', value: 'LEVERAGE_RATIOS' },
  liquidityRatios: { label: 'Liquidity Ratios', value: 'LIQUIDITY_RATIOS' },
  earningsDividends: {
    label: 'Earnings Dividends',
    value: 'EARNINGS_DIVIDENDS',
  },
  cashFlowRatios: { label: 'Cash Flow Ratios', value: 'CASHFLOW_RATIOS' },
};

export const YEAR_FILTER = [
  { label: '5 Year', value: 5 },
  { label: '10 Year', value: 10 },
  { label: 'Max', value: 30 },
];

export const PERIOD_FILTER = [
  { label: 'Annual', value: 'annual' },
  { label: 'Quarterly', value: 'quarter' },
];

export const CAPITAL_STRUCTURE_COLUMNS = [
  {
    key: 'bookValuePerShare',
    label: 'Book Value Per Share',
    type: 'CURRENCY',
    tooltip: `The ratio of equity available to common shareholders divided by the total number of existing shares is known as book value per share (BVPS). This number calculates a company's book value per share and serves as the minimal measure of its equity.`,
  },
  {
    key: 'capexPerShare',
    label: 'Capex Per Share',
    type: 'CURRENCY',
    tooltip: `The amount of capital expenditure per share incurred by the corporation to maintain its operating assets is known as capital expenditure per share. It is determined by dividing the capital expenditure from the statement of cash flows by the typical number of outstanding shares for the same time period.`,
  },
  {
    key: 'capexToDepreciation',
    label: 'Capex To Depreciation',
    tooltip: `It is Capex/Depreciation`,
  },
  {
    key: 'capexToOperatingCashFlow',
    label: 'Capex To Operating Cash Flow',
    tooltip: `The CAPEX to Operating Cash Ratio measures how much of an organization's operating cash flow is going toward capital expenditures. Such investments comprise taking on capital-intensive initiatives like introducing a new product line, expanding a production facility, or organizing a division.`,
  },
  {
    key: 'capexToRevenue',
    label: 'Capex To Revenue',
    tooltip: `The Capex to Revenue ratio measures a company's investments in property, plant, equipment, and other capital assets to its total sales. The ratio shows how aggressively the company is re-investing its revenue back into productive assets.`,
  },
  {
    key: 'capitalExpenditureCoverageRatio',
    label: 'Capital Expenditure Coverage Ratio',
    tooltip: `=CapitalExpenditure/OperatingCashFlow​
The greater the operating cash flow coverage for these items, along with providing the company with more cash flow to expand its business, weather tough times, and not be burdened by debt servicing and the restrictions typically included in credit agreements, the greater the company's ability to meet its obligations.`,
  },
  {
    key: 'effectiveTaxRate',
    label: 'Effective Tax Rate',
    type: 'PERCENTAGE',
    tooltip: `=Income Before Tax/Provision For Income Taxes​
The percentage of income that an individual or corporation pays in taxes is known as the effective tax rate.`,
  },
  {
    key: 'enterpriseValue',
    label: 'Enterprise Value',
    type: 'CURRENCY',
    tooltip: `An alternative to stock market capitalization that is more comprehensive is enterprise value (EV), a measurement of a company's whole worth. EV calculates a company's market capitalization as well as its short- and long-term debt, as well as any cash on its balance sheet.`,
  },
  {
    key: 'intangiblesToTotalAssets',
    label: 'Intangibles To Total Assets',
    tooltip: `=Intangible Asset/Total Asset`,
  },
  {
    key: 'investedCapital',
    label: 'Invested Capital',
    type: 'CURRENCY',
    tooltip: `The total amount of money raised by a company through the sale of securities to equity investors and debt to bondholders is known as invested capital, and it is calculated by adding the total amount of debt and capital lease obligations to the amount of equity given to investors.`,
  },
  {
    key: 'marketCap',
    label: 'Market Cap',
    type: 'CURRENCY',
    tooltip: `Market cap—or market capitalization—refers to the total value of all a company's shares of stock. It is calculated by multiplying the price of a stock by its total number of outstanding shares.`,
  },
  {
    key: 'netCurrentAssetValue',
    label: 'Net Current Asset Value',
    type: 'CURRENCY',
    tooltip: `The total of all current assets minus the total of all current liabilities equals net current assets. Net current assets should be positive because this means that there are enough current assets on hand to cover all current liabilities. A business may be experiencing financial troubles and will likely require new capital soon if the net amount is negative.`,
  },
  {
    key: 'revenuePerShare',
    label: 'Revenue Per Share',
    type: 'CURRENCY',
    tooltip: `Revenue per share is a ratio that determines the total sales made per share for a certain time period, such as the preceding twelve months, quarterly, semi-annually, or annually (TTM). It is determined by dividing total income by the average number of outstanding shares. Another name for it is "revenue per share."`,
  },
  {
    key: 'stockBasedCompensationToRevenue',
    label: 'Stock Based Compensation To Revenue',
    tooltip: `=Stock Based Compensation/Revenue`,
  },
  {
    key: 'tangibleAssetValue',
    label: 'Tangible Asset Value',
    type: 'CURRENCY',
    tooltip: `Cash, inventory, vehicles, equipment, buildings, and investments are examples of tangible assets that are physical in nature. Accounts receivable, pre-paid expenses, patents, and goodwill are examples of intangible assets that do not have a physical form.`,
  },
  {
    key: 'tangibleBookValuePerShare',
    label: 'Tangible Book Value Per Share',
    type: 'CURRENCY',
    tooltip: `The value of a company's tangible assets divided by the number of shares it currently has outstanding results in tangible book value per share (TBVPS). TBVPS calculates a company's possible share price in the event that it has to sell its assets. Tangible assets include things like machinery and real estate.`,
  },
  {
    key: 'workingCapital',
    label: 'Working Capital',
    type: 'CURRENCY',
    tooltip: `The difference between a company's current assets—such as cash, accounts receivable/unpaid invoices from customers, and inventories of raw materials and completed goods—and its current liabilities—such as debts and accounts payable—is known as working capital, sometimes known as net working capital (NWC).`,
  },
];

export const PRICING_COLUMNS = [
  {
    key: 'enterpriseValueMultiple',
    label: 'Enterprise Value Multiple',
    tooltip: `=EntrepriseValue/EBITDA
In general, this measurement enables investors to evaluate a business using the same criteria as an acquirer. Enterprise value multiple can be used as an approximate estimate of the number of years it would take for an acquisition to generate enough funds to pay its costs (assuming no change in EBITDA).`,
  },
  {
    key: 'evToFreeCashFlow',
    label: 'EV To Free Cash Flow',
    tooltip: `Enterprise Value to Free Cash Flow compares the total valuation of the company with its ability to generate cashflow. The lower the ratio of enterprise value to the free cash flow figures, the faster a company can pay back the cost of its acquisition or generate cash to reinvest in its business.`,
  },
  {
    key: 'evToOperatingCashFlow',
    label: 'EV To Operating Cash Flow',
    tooltip: `=EV/OCF`,
  },
  {
    key: 'evToSales',
    label: 'EV To Sales',
    tooltip: `(EV/sales) is a financial metric that assesses the price required to acquire a company's worth in terms of sales. An investment in a firm is more desirable if the EV/sales multiple is lower since the company may be relatively undervalued.`,
  },
  {
    key: 'grahamNumber',
    label: 'Graham Number',
    tooltip: `The Graham number (or Benjamin Graham's number) measures a stock's fundamental value by taking into account the company's earnings per share (EPS) and book value per share (BVPS). The Graham number is the upper bound of the price range that a defensive investor should pay for the stock.`,
  },
  {
    key: 'priceEarningsRatio',
    label: 'Price Earnings Ratio',
    tooltip: `The price-to-earnings ratio essentially tells investors how much money they need put into a firm in order to get $1 of earnings from that company. Because it demonstrates the price that investors are prepared to pay for every dollar of earnings, the P/E is also sometimes referred to as the price multiple.`,
  },
  {
    key: 'priceEarningsToGrowthRatio',
    label: 'Price Earnings To Growth Ratio',
    tooltip: `The PEG ratio is an improvement on the P/E ratio that takes into account the anticipated earnings growth of a firm when determining its present valuation. According to common consensus, if the PEG ratio shows a value of 1, it signifies that the stock's present P/E ratio accurately reflects the stock's expected future growth in profits per share. When the PEG ratio falls below 1, it indicates that EPS growth may be greater than the market's current valuation. The stock price is, in other words, being undervalued. Stocks with high PEG ratios, on the other hand, may be an indication that the company is now overvalued.`,
  },
  {
    key: 'priceToBookRatio',
    label: 'Price To Book Ratio',
    tooltip: `The price-to-book value ratio, which is a measure of how much shareholders are paying for a company's net assets and is stated as a multiple (i.e., how many times a company's stock is trading per share compared to a company's book value per share), is one way to do this.`,
  },
  {
    key: 'priceToFreeCashFlowsRatio',
    label: 'Price To Free Cash Flows Ratio',
    tooltip: `Price to free cash flow is an equity valuation metric that indicates a company's ability to generate additional revenues. It is calculated by dividing its market capitalization by free cash flow values.`,
  },
  {
    key: 'priceToOperatingCashFlowsRatio',
    label: 'Price To Operating Cash Flows Ratio',
    tooltip: `Investors use the price to operating cash flow ratio to assess the shares of a company's investment appeal from a value perspective.`,
  },
  {
    key: 'priceToSalesRatio',
    label: 'Price To Sales Ratio',
    tooltip: `The price-to-sales (P/S) ratio is a measure of a company's value that contrasts its stock price with its sales. It serves as a gauge for the worth that the financial markets have assigned to each dollar of a company's sales or revenues.`,
  },
];

export const EFFICIENCY_RATIO_COLUMNS = [
  {
    key: 'assetTurnover',
    label: 'Asset Turnover',
    tooltip: `=Revenue/Total Average Assets
The asset turnover ratio is frequently used as a gauge of how effectively a business uses its assets to generate revenue.`,
  },
  {
    key: 'fixedAssetTurnover',
    label: 'Fixed Asset Turnover',
    tooltip: `=Revenue/Net PPE
Calculates the effectiveness of a company's machinery and equipment in generating sales.`,
  },
  {
    key: 'inventoryTurnover',
    label: 'Inventory Turnover',
    tooltip: `The inventory turnover ratio calculates how frequently inventory is sold and replaced during a specific time frame. Cost of Goods Sold divided by Average Inventory is the inventory turnover ratio.
Comments above copied from original document`,
  },
  {
    key: 'payablesTurnover',
    label: 'Payables Turnover',
    tooltip: `The accounts payable turnover ratio shows investors how many times per period a company pays its accounts payable. In other words, the ratio measures the speed at which a company pays its suppliers. Accounts payable is listed on the balance sheet under current liabilities.`,
  },
  {
    key: 'receivablesTurnover',
    label: 'Receivables Turnover',
    tooltip: `Receivables turnover ratio is the name of an accounting metric that measures how well a business collects its accounts receivable. This ratio assesses the efficiency with which a business uses and manages the credit it lends to consumers, as well as the speed at which short-term debt is collected or paid.`,
  },
];

export const RETURN_COLUMNS = [
  {
    key: 'returnOnAssets',
    label: 'Return On Assets',
    type: 'PERCENTAGE',
    tooltip: `=Net Income/Average Total Assets
Return on assets (ROA) is the name of a financial ratio that describes how profitable a business is in comparison to its total assets.`
  },
  {
    key: 'returnOnCapitalEmployed',
    label: 'Return On Capital Employed',
    type: 'PERCENTAGE',
    tooltip: `ROCE shows to investors how much profit each dollar of invested capital produces.`
  },
  {
    key: 'returnOnEquity',
    label: 'Return On Equity',
    type: 'PERCENTAGE',
    tooltip: `Return on equity (ROE) is the measure of a company's net income divided by its shareholders' equity. ROE is a gauge of a corporation's profitability and how efficiently it generates those profits.`
  },
  {
    key: 'returnOnTangibleAssets',
    label: 'Return On Tangible Assets',
    type: 'PERCENTAGE',
    tooltip: `Return-on-Tangible-Asset is calculated as Net Income divided by its average total tangible assets. Total tangible assets equals to Total Assets minus Intangible Assets.`
  }
]

export const MARGIN_COLUMNS = [
  {
    key: 'ebtPerEbit',
    label: 'EBT Per Ebit',
    type: 'PERCENTAGE',
    tooltip: `=EBT/EBIT`
  },
  {
    key: 'grossProfitMargin',
    label: 'Gross Profit Margin',
    type: 'PERCENTAGE',
    tooltip: `=Gross Profit/Revenue
It can be thought of as the remaining revenue from sales after all direct expenses for producing the product have been covered.`
  },
  {
    key: 'netIncomePerEBT',
    label: 'Net Income Per EBT',
    type: 'PERCENTAGE',
    tooltip: `=Net Income/EBT`
  },
  {
    key: 'netProfitMargin',
    label: 'Net Profit Margin',
    type: 'PERCENTAGE',
    tooltip: `=Net Income/Revenue
Profit margin, which is calculated by dividing income by revenues, effectively measures how profitable a firm or business activity is. Profit margin, expressed as a percentage, shows how many cents of profit were made for every dollar of sales.`
  },
  {
    key: 'operatingProfitMargin',
    label: 'Operating Profit Margin',
    type: 'PERCENTAGE',
    tooltip: `=Operating Income(EBIT)/Revenue
The operating margin measures how much profit a company makes on a dollar of sales after paying for variable costs of production, such as wages and raw materials, but before paying interest or tax.`
  },
  {
    key: 'pretaxProfitMargin',
    label: 'Pretax Profit Margin',
    type: 'PERCENTAGE',
    tooltip: `=Income Before Tax/Revenue`
  },
  {
    key: 'researchAndDdevelopementToRevenue',
    label: 'Research And Development To Revenue',
    type: 'PERCENTAGE',
    tooltip: `=R&D Expense/Revenue
It represents what part of it's sales a company spends in Research & Development.`
  },
  {
    key: 'salesGeneralAndAdministrativeToRevenue',
    label: 'Sales General And Administrative To Revenue',
    type: 'PERCENTAGE',
    tooltip: `=SG&A Expense/Revenue`
  }
]

export const LEVERAGE_RATIO_COLUMNS = [
  {
    key: 'cashFlowCoverageRatios',
    label: 'Cash Flow Coverage Ratios',
    tooltip: `=Operating Cash Flow/Total Debt
The cash flow coverage ratio is a financial metric that calculates the amount of cash flow generated by the company from its main operations available to cover debt payments.`,
  },
  {
    key: 'debtEquityRatio',
    label: 'Debt Equity Ratio',
    tooltip: `=Total Debt/Total Equity
The debt-to-equity (D/E) ratio assesses how much leverage a company is using by comparing its total liabilities to shareholder equity. A corporation or stock with a higher leverage ratio typically poses a greater risk to shareholders.`,
  },
  {
    key: 'debtToAssets',
    label: 'Debt To Assets',
    tooltip: `=Total Debt/Total Assets
A debt ratio calculates a company's leverage by comparing its total debt to its total assets. Since this ratio varies greatly between industries, capital-intensive enterprises typically have significantly larger debt ratios than other types of businesses.`,
  },
  {
    key: 'interestCoverage',
    label: 'Interest Coverage',
    tooltip: `=EBIT/Interest Expense
The interest coverage ratio is a debt and profitability ratio used to determine how easily a company can pay interest on its outstanding debt.`,
  },
  {
    key: 'interestDebtPerShare',
    label: 'Interest Debt Per Share',
    type: 'CURRENCY',
    tooltip: `=(debt + shortTermdebt + interestExpense)/
shareNumber`,
  },
  {
    key: 'longTermDebtToCapitalization',
    label: 'Long Term Debt To Capitalization',
    tooltip: `=LongTermDebt/(LongTermDebt+ ShareholdersEquity)`,
  },
  {
    key: 'netDebtToEBITDA',
    label: 'Net Debt To EBITDA',
    tooltip: `=(totalDebt - cashAndCashEquivalents)/
ebitda`,
  },
  {
    key: 'shortTermCoverageRatios',
    label: 'Short Term Coverage Ratios',
    tooltip: `=OperatingCashFlow/ShortTermDebt
The short-term debt coverage ratio evaluates a company's operating cash flow against the total of its short-term debt and the current component of its long-term debt.`,
  },
  {
    key: 'totalDebtToCapitalization',
    label: 'Total Debt To Capitalization',
    tooltip: `=TotalDebt/(TotalDebt+ShareholdersEquity)
The capitalization ratio explains to investors how much debt a company is employing to finance its operations and expansion plans.`,
  },
];

export const LIQUIDITY_RATIO_COLUMNS = [
  {
    key: 'cashConversionCycle',
    label: 'Cash Conversion Cycle (CCC)',
    tooltip: `=DSO+DIO-DPO
The cash conversion cycle show the number of days it takes for a company to convert its inventory and other resources into revenue.`,
  },
  {
    key: 'cashPerShare',
    label: 'Cash Per Share',
    tooltip: `=Total Cash/Shares Outstanding`,
  },
  {
    key: 'cashRatio',
    label: 'Cash Ratio',
    tooltip: `=cashAndCashEquivalents/
totalCurrentLiabilities
The cash ratio is practically a predictor of a company's value in the worst-case situation where the business is likely to fail.`,
  },
  {
    key: 'currentRatio',
    label: 'Current Ratio',
    tooltip: `=CurrentAssets/CurrentLiabilities
The current ratio is a liquidity ratio that assesses a company's capacity to meet short-term financial commitments with a one-year maturity.`,
  },
  {
    key: 'daysOfInventoryOutstanding',
    label: 'Days Of Inventory Outstanding (DIO)',
    tooltip: `=[(Inventories(start)+Inventories(end))/2]/(COGS/365)
The days in inventory ratio shows how quickly, in days, a company is converting its inventory into revenue.`,
  },
  {
    key: 'daysOfPayablesOutstanding',
    label: 'Days Of Payables Outstanding (DPO)',
    tooltip: `=[(AccountsPayable(start)+AccountsPayable(end))/2]/(COGS/365)
Days in accounts payable shows the average number of days it takes a company to pay its bills.`,
  },
  {
    key: 'daysOfSalesOutstanding',
    label: 'Days Of Sales Outstanding (DSO)',
    tooltip: `=[(AccountReceivable(start)+AccountReceivable(end))/2]/(revenue/365)
Days in sales outstanding shows the average number of days it takes a compnay to collect payment after a sale has been made.`,
  },
  {
    key: 'operatingCycle',
    label: 'Operating Cycle (OC)',
    tooltip: `=DSO+DIO
An operating cycle (OC) is the period of time needed for a company to receive goods, sell that inventory, and get paid for the sale of that inventory. This cycle plays a major role in determining the efficiency of a business.`,
  },
  {
    key: 'quickRatio',
    label: 'Quick Ratio',
    tooltip: `=(cashAndCashEquivalents + shortTermInvestments + accountReceivables)/totalCurrentLiabilities
Since inventory and other current assets, which are typically more challenging to convert into cash, are not included, the quick ratio is more cautious than the current ratio. A current position with a greater quick ratio is one that is more liquid.`,
  },
];

export const EARNING_DIVIDEND_COLUMNS = [
  {
    key: 'dividendPaidAndCapexCoverageRatio',
    label: 'Dividend Paid And Capex Coverage Ratio',
    tooltip: `=operatingCashFlow/(capex + dividendPaid)
Comparing the total of a company's capital expenditures and cash dividends to its operational cash flow is a demanding criterion that puts cash flow to the ultimate test for conservative investors concerned with cash flow coverage. A business is creating what could be referred to as "free cash flow on steroids" if it is able to cover both of these expenditures from internal resources and still have money left over. This situation has excellent investing qualities.`
  },
  {
    key: 'dividendPayoutRatio',
    label: 'Dividend Payout Ratio',
    type: 'PERCENTAGE',
    tooltip: `=dividendPaid/netIncome
The dividend payout ratio is an indicator of how well earnings support the dividend payment.`
  },
  {
    key: 'dividendYield',
    label: 'Dividend Yield',
    type: 'PERCENTAGE',
    tooltip: `=(dividendPaid / shareNumber)/price
While growth investors are less interested in dividends and would rather realise significant capital gains, income investors favour a stock that pays dividends. Whatever your preferred method of investing, the long-term performance of dividend-paying stocks has consistently outperformed non-paying-dividend equities.`
  },
  {
    key: 'earningsYield',
    label: 'Earnings Yield',
    type: 'PERCENTAGE',
    tooltip: `Earnings Yield = EPS / Price = 1 / (P/E Ratio), expressed as a percentage.`
  },
  {
    key: 'netIncomePerShare',
    label: 'Net Income Per Share',
    type: 'CURRENCY',
    tooltip: `=Net Income/Shares Outstanding`
  }
]

export const CASH_FLOW_RATIO_COLUMNS = [
  {
    key: 'freeCashFlowOperatingCashFlowRatio',
    label: 'Free Cash Flow Operating Cash Flow Ratio',
    tooltip: `=freeCashFlow/operatingCashFlow
The financial strength of a corporation is inversely correlated with the amount of free cash flow embedded in operating cash flow.`
  },
  {
    key: 'freeCashFlowPerShare',
    label: 'Free Cash Flow Per Share',
    type: 'CURRENCY',
    tooltip: `=FCF/Shares Outstanding`
  },
  {
    key: 'freeCashFlowYield',
    label: 'Free Cash Flow Yield',
    type: 'PERCENTAGE',
    tooltip: `=freeCashFlow/marketCap`
  },
  {
    key: 'incomeQuality',
    label: 'Income Quality',
    tooltip: `=operatingCashFlow/netIncome`
  },
  {
    key: 'operatingCashFlowPerShare',
    label: 'Operating Cash Flow Per Share',
    type: 'CURRENCY',
    tooltip: `=OCF/Shares Outstanding`
  },
  {
    key: 'operatingCashFlowSalesRatio',
    label: 'Operating Cash Flow Sales Ratio',
    tooltip: `=operatingCashFlow/revenue
It gives investors a sense of the business's capacity to generate revenue.`
  }
]


