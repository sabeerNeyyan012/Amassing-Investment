export const BalanceSheetDef = {
  currentAssets:
    'Represents cash and other assets that are reasonably expected to be realized in cash, sold or consumed within one year or one operating cycle. Generally, the sum of cash and equivalents, receivables, inventories, prepaid expenses, and other current assets. For non-U.S. companies, long term receivables are excluded from current assets even though included in net receivables.',
  currentCash:
    'Represents current cash excluding short-term investments. Current cash excludes commercial paper issued by unconsolidated subsidiaries to the parent company, amount due from sale of debentures, checks written by the company but not yet deposited and charged to the company’s bank account, and promissory notes.',
  receivables:
    'Represents net claims against customers for merchandise sold or services performed in the ordinary course of business.',
  inventory:
    'Represents tangible items or merchandise net of advances and obsolescence acquired for either resale directly or included in the production of finished goods manufactured for sale in the normal course of operation. Excludes tools that are listed in current assets, supplies and prepaid expenses for companies that lump these items together, advances from customers, and contract billings. For non-U.S. companies, if negative inventories arise from advances from customers greater than costs on long-term contracts, it is reclassified to current liabilities.',
  otherCurrentAssets: 'Represents other current assets for the period.',
  propertyPlantEquipment:
    'Represents gross property, plant, and equipment less accumulated reserves for depreciation, depletion, and ammortization.',
  intangibleAssets:
    'Represents other assets not having a physical existence. The value of these assets lie in their expected future return. This excludes goodwill.',
  goodwill:
    'Represents the excess cost over the fair market value of the net assets purchased. Is excluded from other intangible assets.',
  //non current assets and long term investment both are same
  longTermInvestments:
    'Represents total investments and advances for the period. Calculated as long term investment minus affiliate companies and other long term investments.',
  otherNonCurrentAssets:
    'Returns other assets for the period calculated as other assets including intangibles minus intangible other assets.',
  totalAssets:
    'Represents the sum of total current assets, long-term receivables, investment in unconsolidated subsidiaries, other investments, net property plant and equipment, deferred tax assets, and other assets.',
  liability: {
    current: {
      accountsPayable:
        'Represents the claims of trade creditors for unpaid goods and services that are due within the normal operating cycle of the company.',
      currentLongTermDebt:
        'Returns null as of December 1, 2020. Represents the amount of long term debt due within the next twelve months. Excludes notes payable arising from short term borrowings, current maturities of participation and entertainment obligation, contracts payable for broadcast rights, current portion of advances and production payments Bank overdrafts, advances from subsidiaries/associated companies, and current portion of preferred stock of a subsidiary.',
      otherCurrentLiabilities:
        'Returns null as of December 1, 2020. Represents other current liabilities and calculated as the sum of misc current liabilities, dividends payable, and accrued payroll.',
      totalCurrentLiabilities:
        'Represents debt or other obligations that the company expects to satisfy within one year.',
    },
    nonCurrent: {
      longTermDebt:
        'Represents all interest-bearing financial obligations, excluding amounts due within one year, net of premium or discount. Excludes current portion of long-term debt, pensions, deferred taxes, and minority interest.',
      nonCurrent: 'Non current',
      nonCurrentLiabilitiesTotal: 'Non-Current Liabilities Total',
      totalAssets:
        'Represents the sum of total current assets, long-term receivables, investment in unconsolidated subsidiaries, other investments, net property plant and equipment, deferred tax assets, and other assets.',
      minorityInterest:
        'Represents the portion of earnings/losses of a subsidiary pertaining to common stock not owned by the controlling company or other members of the consolidated group.',
      shareholderEquity:
        'Total shareholders’ equity for the period calculated as the sum of total common equity and preferred stock carrying value.',
      liabilitiesAndShareholderEquityTotal: `LIABILITIES & SHAREHOLDER'S EQUITY TOTAL`,
      commonSharesOutstanding:
        'Number of shares outstanding as the difference between issued shares and treasury shares.',
      fiscalDate: 'The last day of the relevant fiscal period.',
      reportDate: 'Date financials were reported.',
    },
  },
};

export const IncomeStatementDef = {
  netIncome:
    'Represents income before extraordinary items and preferred and common dividends, but after operating and non-operating income and expenses, minority interest and equity in earnings.',
  totalRevenue:
    'Calculated as the sum of gross income (the difference between sales or revenues and cost of goods sold and depreciation) and cost of goods sold for the period.',
  costOfRevenue:
    'Represents the cost of goods sold for the period including depletion and amortization.',
  grossProfit:
    'Represents the difference between sales or revenues and cost of goods sold and depreciation.',
  sellingGeneralAndAdmin:
    'Represents expenses not directly attributable to the production process but relating to selling, general and administrative functions. Excludes research and development.',
  researchAndDevelopment:
    'Represents all direct and indirect costs related to the creation and development of new processes, techniques, applications and products with commercial possibilities. Excludes customer or government sponsored research, purchase of mineral rights (for oil, gas, coal, drilling and mining companies), engineering expense, and contributions by government, customers, partnerships or other corporations to the company’s research and development expense',
  operatingIncome:
    'Represents operating income for the period calculated as (net sales or revenue) - (cost of goods sold) - (selling, general & administrative expenses) - (other operating expenses).',
  interestIncome:
    'Represents interest expense, net of interest capitalized for the period calculated as (interest expense on debt) - (interest capitalized)',
  interestAndOtherExpenses: 'Interest And Other Expenses',
  pretaxIncome:
    'Represents all income/loss before any federal, state or local taxes. Extraordinary items reported net of taxes are excluded.',
  incomeTax:
    'Represents all income taxes levied on the income of a company by federal, state and foreign governments. Excludes domestic international sales corporation taxes, ad valorem taxes, excise taxes, windfall profit taxes, taxes other than income, and general and services taxes.',
  minorityInterest:
    'Represents the portion of earnings/losses of a subsidiary pertaining to common stock not owned by the controlling company or other members of the consolidated group.',
  netIncomeBasic:
    'Represents net income available to common basic EPS before extraordinaries for the period calculated as (net income after preferred dividends) - (discontinued operations)',
  fiscalDate: 'The last day of the relevant fiscal period.',
  reportDate: 'Date financials were reported.',
};

export const CashFlowDef = {
  operatingActivities: {
    netIncome:
      'Represents income before extraordinary items and preferred and common dividends, but after operating and non-operating income and expenses, minority interest and equity in earnings.',
    depreciation:
      'Depreciation represents the process of allocating the cost of a depreciable asset to the accounting periods covered during its expected useful life to a business. Depletion refers to cost allocation for natural resources such as oil and mineral deposits. Amortization relates to cost allocation for intangible assets such as patents and leasehold improvements, trademarks, book plates, tools & film costs. This item includes dry-hole expense, abandonments and oil and gas property valuation provision for extractive companies. This item excludes amortization of discounts or premiums on financial instruments owned or outstanding and depreciation on discontinued operations.',
    changesInReceivables:
      'Represents the change in the amount of inventories from one year to the next as reported in the cash flow statement.',
    changesInInventories:
      'Represents the change in the amount of inventories from one year to the next as reported in the cash flow statement.',
    otherOperatingActivities: 'Other Operating Activities',
    cashFlow:
      'net cash from operating activities for the period calculated as the sum of funds from operations, extraordinary items, and funds from other operating activities.',
  },
  investing: {
    capitalExpenditures:
      'total capital expenditures for the period calculated as the sum of capital expenditures additions to fixed assets, and additions to other assets.',
    otherInvestingActivity:
      'Represents any other funds employed in investing activities and not included in capital expenditures, net assets from acquisitions, increase in investments, decrease in investments or additions to property.',
    totalInvestingCashFlows:
      'net cash from investing activities for the period calculated as (Cash Flow from Investing Activity) - Net. If this is not available, then it is calculated as (Other Uses/(Sources) Investing) + (Disposal of fixed assets) + (decrease in investments) - (net assets from acquisitions) - (capital expenditures other assets) - (increase in investments) - (capital expenditures additions to fixed assets)',
  },
  financing: {
    netBorrowings:
      'net issuance/reduction of debt for the period calculated as (increase/decrease in short term borrowings) + (long term borrowings - reduction in long term debt)',
    otherInvestingActivities:
      'Represents any other funds employed in investing activities and not included in capital expenditures, net assets from acquisitions, increase in investments, decrease in investments or additions to property.',
    cashFlowFinancing: 'net cash from financing activities for the period.',
    changeCashEquivalents: 'Change in Cash and Cash Equivalents',
    cashChange:
      'Represents the change in cash and short term investments from one year to the next. This item is available only when the Statement of Changes in Financial Position is based on cash and short term investments.',
  },
};
