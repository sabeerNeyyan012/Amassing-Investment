import IPODate from "./utils";

export const NEW_FILTERS_TO_BE_FILTERED = [
  "salesGeneralAndAdministrativeToRevenueTTM",
  "bookValuePerShareTTM",
  "capexPerShareTTM",
  "capexToDepreciationTTM",
  "capexToOperatingCashFlowTTM",
  "capexToRevenueTTM",
  "capitalExpenditureCoverageRatioTTM",
  "effectiveTaxRateTTM",
  "enterpriseValueTTM",
  "intangiblesToTotalAssetsTTM",
  "investedCapitalTTM",
  "marketCapTTM",
  "netCurrentAssetValueTTM",
  "revenuePerShareTTM",
  "stockBasedCompensationToRevenueTTM",
  "tangibleAssetValueTTM",
  "tangibleBookValuePerShareTTM",
  "workingCapitalTTM",
  "enterpriseValueMultipleTTM",
  "evToFreeCashFlowTTM",
  "evToOperatingCashFlowTTM",
  "evToSalesTTM",
  "grahamNumberTTM",
  "priceEarningsRatioTTM",
  "priceEarningsToGrowthRatioTTM",
  "priceToBookRatioTTM",
  "priceToFreeCashFlowsRatioTTM",
  "priceToOperatingCashFlowsRatioTTM",
  "priceToSalesRatioTTM_x",
  "assetTurnoverTTM",
  "fixedAssetTurnoverTTM",
  "inventoryTurnoverTTM_x",
  "payablesTurnoverTTM_x",
  "receivablesTurnoverTTM_x",
  "returnOnAssetsTTM",
  "returnOnCapitalEmployedTTM",
  "returnOnEquityTTM",
  "returnOnTangibleAssetsTTM",
  "ebtPerEbitTTM",
  "grossProfitMarginTTM",
  "netIncomePerEBTTTM",
  "netProfitMarginTTM",
  "operatingProfitMarginTTM",
  "pretaxProfitMarginTTM",
  "researchAndDevelopementToRevenueTTM",
  "cashFlowCoverageRatiosTTM",
  "debtEquityRatioTTM",
  "debtToAssetsTTM",
  "interestCoverageTTM_x",
  "interestDebtPerShareTTM",
  "longTermDebtToCapitalizationTTM",
  "netDebtToEBITDATTM",
  "shortTermCoverageRatiosTTM",
  "totalDebtToCapitalizationTTM",
  "roicTTM",
  "cashConversionCycleTTM",
  "cashPerShareTTM_y",
  "cashRatioTTM",
  "currentRatioTTM_y",
  "daysOfInventoryOutstandingTTM",
  "daysOfPayablesOutstandingTTM",
  "daysOfSalesOutstandingTTM",
  "operatingCycleTTM",
  "quickRatioTTM",
  "dividendPaidAndCapexCoverageRatioTTM",

  "dividendPayoutRatio",

  "dividendYieldTTM_x",
  "earningsYieldTTM",
  "netIncomePerShareTTM",
 "freeCashFlowOperatingCashFlowRatioTTM",
 "freeCashFlowPerShareTTM_x",
 "freeCashFlowYieldTTM",
 "incomeQualityTTM",
 "operatingCashFlowPerShareTTM_x",
 "operatingCashFlowSalesRatioTTM",
];

export const Currency = {
  "USD": {
      "exchange": ["HKSE", "London Stock Exchange", "LSE", "CCC", "Shanghai", "New York Stock Exchange", "Nasdaq", "Other OTC", "NASDAQ Global Market", "Nasdaq Capital Market", "NASDAQ Capital Market", "NASDAQ Global Select", "American Stock Exchange", "Nasdaq Global Select", "New York Stock Exchange Arca", "IOB", "BATS", "Brussels", "SES", "Toronto Stock Exchange", "NasdaqGS", "Amsterdam", "Swiss Exchange"], 
      "country": ["HK", "CN", "US", "LU", "CA", "NL", "BM", "SE", "DE", "FR", "TW", "AR", "GB", "IL", "CH", "IE", "VI", "BR", "KY", "NZ", "ES", "AU", "AT", "JP", "PE", "SG", "GI", "BE", "ZA", "TR", "CL", "GR", "IS", "DK", "MX", "AE", "UY", "IT", "JE", "RU", "CO", "TH", "IN", "PH", "MY", "PA", "PR", "GG", "EG", "CY", "MC", "NO", "MO", "PT", "CR", "FI", "BS", "IM", "MT", "KR", "KZ", "JO", "ID", "SK", "AI", "PL", "VG", "LT"]
      }, 
  "CNY": {
      "exchange": ["Shenzhen", "Shanghai", "HKSE", "FTSE Index"], 
      "country": ["CN", "MN", "HK", "US"]
      }, 
  "KRW": {
      "exchange": ["KSE", "KOSDAQ"], 
      "country": ["US", "KR", "SG"]
      }, 
  "HKD": {
      "exchange": ["HKSE", "London Stock Exchange", "Shenzhen"], 
      "country": ["HK", "GB", "CN", "DE", "VN", "CY", "MO", "SG", "CA", "LU", "MN", "US", "AU", "KY", "JP", "IL", "IT", "TH", "MY", "KH", "TW", "KR"]
      }, 
  "EUR": {
      "exchange": ["Frankfurt", "XETRA", "London Stock Exchange", "IOB", "Milan", "Stuttgart", "Irish", "Dusseldorf", "Madrid Stock Exchange", "Paris", "Amsterdam", "Helsinki", "Vienna", "Brussels", "Athens", "Stockholm Stock Exchange", "Lisbon", "SES", "Munich", "Tallinn", "Swiss Exchange", "Hamburg", "Berlin"], 
      "country": ["CN", "US", "DE", "FI", "FR", "NL", "BE", "PT", "ES", "GB", "AT", "GA", "IT", "LU", "MC", "ZA", "CA", "IE", "TH", "BM", "TR", "SE", "GR", "CH", "GG", "JE", "DK", "SG", "NO", "EE", "VG", "SN", "MA", "KZ", "MT", "IS", "AR", "UY", "ZM", "CW", "IM", "HK", "IL", "RO", "IN", "LV", "MX"]
      }, 
  "PLN": {
      "exchange": ["Warsaw Stock Exchange"], 
      "country": ["PL", "CY", "LU", "NL", "US", "LT", "ES", "BG", "EE", "AU", "AT", "UA", "SI", "FR", "HU", "GB", "SE", "JE", "DE", "SK", "IT"]
      },
  "CHF": {
      "exchange": ["London Stock Exchange", "Swiss Exchange", "IOB"], 
      "country": ["CH", "US", "IT", "NL", "LI", "IE", "GB", "AT", "CA", "FR", "IL"]}, 
  "SEK": {
      "exchange": ["IOB", "London Stock Exchange", "Stockholm Stock Exchange", "Stockholm"], 
      "country": ["SE", "CH", "CA", "DK", "DE", "MT", "IS", "PL", "GB", "JE", "FI", "US", "LI", "IE", "NO", "LU"]
      }, 
  "CAD": {
      "exchange": ["London Stock Exchange", "Toronto Stock Exchange", "TSXV", "NEO", "Canadian Sec"], 
      "country": ["CA", "US", "IL", "MU", "AU", "CL", "CY", "CO", "BM", "PA", "JE", "HK", "GB", "CK", "FR", "IE", "IM", "PE", "SG", "BB", "BR", "MN", "VG", "KY", "BS"]
      }, 
  "NOK": {
      "exchange": ["London Stock Exchange", "Oslo Stock Exchange", "OSE"], 
      "country": ["NO", "GB", "DK", "BM", "CY", "US", "CH", "SG", "SE", "AU", "NL", "MT", "IS", "HK", "FI", "CA", "AE", "LU"]
      }, 
  "DKK": {
      "exchange": ["London Stock Exchange", "IOB", "Copenhagen"], 
      "country": ["DK", "SE", "GL", "FI", "IS", "CH", "GB", "MT"]
  }, 
  "JPY": {
      "exchange": ["Tokyo", "London Stock Exchange", "Fukuoka"], 
      "country": ["US", "JP"]
      }, 
  "GBp": {
      "exchange": ["London Stock Exchange"], 
      "country": ["US", "GB", "IE", "LU", "JE", "GI", "AU", "GG", "AZ", "IM", "FI", "RU", "VG", "FK", "CA", "NL", "CY", "SG", "LT", "ZA", "ES", "IL", "BD", "UA", "MU", "CH", "KY", "BM", "NZ", "MX", "IN", "CN", "AE", "HK", "MN", "MY", "FR", "TG", "AT", "NG", "GE", "DK", "DE", "VN", "ZM"]
      }, 
  "AUD": {
      "exchange": ["Berlin", "London Stock Exchange", "Australian Securities Exchange", "ASX"], 
      "country": ["US", "AU", "SG", "NZ", "GB", "CH", "HK", "PG", "IL", "IE", "MY", "ES", "LU", "VG", "DE", "CA", "RU", "NL", "FR", "MN", "BM", "GG"]
      }, 
  "ILS": {
      "exchange": ["London Stock Exchange"], 
      "country": ["IL"]
      }, 
  "SAR": {
      "exchange": ["Saudi"], 
      "country": ["SA", "AE"]
      }, 
  "TWD": {
      "exchange": ["Taiwan", "Taipei Exchange"], 
      "country": ["TW", "CN", "KY", "US", "TH", "HK", "SG"]
      }, 
  "INR": {
      "exchange": ["National Stock Exchange of India"], 
      "country": ["IN", "US"]
      }, 
  "HUF": {
      "exchange": ["Budapest"], 
      "country": ["HU"]
      }, 
  "ZAc": {
      "exchange": ["Johannesburg"], 
      "country": ["MU", "ZA", "MT", "BW", "GG", "US", "JE", "IM", "CY"]
      }, 
  "SGD": {
      "exchange": ["SES"], 
      "country": ["SG", "CN", "US", "MY", "ID", "AU", "TH"]
      }, 
  "IDR": {
      "exchange": ["Jakarta Stock Exchange"], 
      "country": ["ID"]
      }, 
  "BRL": {
      "exchange": ["S\u00e3o Paulo"], 
      "country": ["BR", "US"]
  }, 
  "MXN": {
      "exchange": ["Mexico"], 
      "country": ["US", "MX", "CN", "ES"]
      }, 
  "THB": {
      "exchange": ["Thailand"], 
      "country": ["TH"]
      }, 
  "ILA": {
      "exchange": ["Tel Aviv"], 
      "country": ["IL", "NL", "SG", "US", "CY", "CA"]
      }, 
  "TRY": {
      "exchange": ["Istanbul Stock Exchange"], 
      "country": ["TR"]
      }, 
  "CLP": {
      "exchange": ["Santiago"], 
      "country": ["CL"]
      }, 
  "QAR": {
      "exchange": ["Qatar"], 
      "country": ["QA"]
      }, 
  "NZD": {
      "exchange": ["NZSE"], 
      "country": ["NZ", "AU"]
      }, 
  "ARS": {
      "exchange": ["Buenos Aires"], 
      "country": ["US", "CA", "AR"]
      }, 
  "AED": {
      "exchange": ["Dubai"], 
      "country": ["AE"]
      }, 
  "ISK": {
      "exchange": ["Iceland"], 
      "country": ["IS"]
      }, 
  "CZK": {
      "exchange": ["Prague"], 
      "country": ["US", "SE"]
      }, 
  "GBP": {
      "exchange": ["Amsterdam", "London Stock Exchange"], 
      "country": ["GG", "GB"]
      }
}

export const EXCHANGE_NAME = [
  { label: "AMEX", value: "AMEX" },
  { label: "NASDAQ", value: "NASDAQ" },
  { label: "NYSE", value: "NYSE" },
  { label: "OTC", value: "OTC" },
];

export const PRICE = [
  { label: "Any", value: "0_10000000" },
  { label: "Under $1", value: "0_1" },
  { label: "$1 to $5", value: "1_5" },
  { label: "$5 to $10", value: "5_10" },
  { label: "$10 to $20", value: "10_20" },
  { label: "$20 to $50", value: "20_50" },
  { label: "$50 to $100", value: "50_100" },
  { label: "$100 to $500", value: "100_500" },
  { label: "Above $500", value: "500_10000000" },
];

export const CURRENCY = [
  { label: "USD", value: "USD" },
  { label: "CNY", value: "CNY" },
  { label: "KRW", value: "KRW" },
  { label: "HKD", value: "HKD" },
  { label: "EUR", value: "EUR" },
  { label: "PLN", value: "PLN" },
  { label: "CHF", value: "CHF" },
  { label: "SEK", value: "SEK" },
  { label: "CAD", value: "CAD" },
  { label: "NOK", value: "NOK" },
  { label: "DKK", value: "DKK" },
  { label: "JPY", value: "JPY" },
  { label: "GBP", value: "GBP" },
  { label: "AUD", value: "AUD" },
  { label: "ILS", value: "ILS" },
  { label: "SAR", value: "SAR" },
  { label: "TWD", value: "TWD" },
  { label: "INR", value: "INR" },
  { label: "HUF", value: "HUF" },
  { label: "ZAC", value: "ZAC" },
  { label: "SGD", value: "SGD" },
  { label: "IDR", value: "IDR" },
  { label: "BRL", value: "BRL" },
  { label: "MXN", value: "MXN" },
  { label: "THB", value: "THB" },
  { label: "ILA", value: "ILA" },
  { label: "TRY", value: "TRY" },
  { label: "CLP", value: "CLP" },
  { label: "OAR", value: "OAR" },
  { label: "NZD", value: "NZD" },
  { label: "ARS", value: "ARS" },
  { label: "AED", value: "AED" },
  { label: "ISK", value: "ISK" },
  { label: "CZK", value: "CZK" },
];

export const BETA = [
  { label: "Any", value: "-10000000_10000000" },
  { label: "Under 0", value: "-10000000_0" },
  { label: "0 to 0.5", value: "0_0.5" },
  { label: "0.5 to 1", value: "0.5_1" },
  { label: "1 to 1.5", value: "1_1.5" },
  { label: "1.5 to 2", value: "1.5_2" },
  { label: "Above 2", value: "2_10000000" },
];

export const VOLAVG = [
  { label: "Any", value: "0_219557650" },
  { label: "Under 50K", value: "0_50000" },
  { label: "50K to 200K", value: "50000_200000" },
  { label: "200K to 500K", value: "200000_500000" },
  { label: "500K to 1M", value: "500000_1000000" },
  { label: "1M to 5M", value: "1000000_5000000" },
  { label: "5M to 10M", value: "5000000_10000000" },
  { label: "10M to 20M", value: "10000000_20000000" },
  { label: "Over 20M", value: "20000000_219557650" },
];

export const MKTCAP = [
  { label: "Any", value: "0_2385896800256" },
  { label: "Mega Cap (170B and above)", value: "170000000000_2385896800256" },
  { label: "Large Cap (35B to 170B)", value: "35000000000_170000000000" },
  { label: "Medium Cap (6B and 35B)", value: "6000000000_35000000000" },
  { label: "Small Cap (1.8B and 6B)", value: "1800000000_6000000000" },
  { label: "Micro Cap (0 and 1.8B)", value: "0_1800000000" },
];

export const LASTDIV = [
  { label: "Any", value: "0_380" },
  { label: "Very High ($1.0 and above)", value: "1_380" },
  { label: "High ($0.5 to $1)", value: "0.5_1" },
  { label: "Medium ($0.3 to $0.5)", value: "0.3_0.5" },
  { label: "Low ($0.1 to $0.3)", value: "0.1_0.3" },
  { label: "Very Low ($0.1 and below)", value: "0.1_0" },
];

export const CHANGES = [
  { label: "Any", value: "0_100" },
  { label: "Above 10%", value: "10_100" },
  { label: "5% to 10%", value: "5_10" },
  { label: "0 to 5% ", value: "0_5" },
  { label: "-5% to 0", value: "-5_0" },
  { label: "-10% to -5%", value: "-10_-5" },
  { label: "Below -10%", value: "-10_-100" },
];

export const FULLTIMEEMPLOYEES = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High (16K and above)", value: "16000_2300000" },
  { label: "High (4K to 16K)", value: "4000_16000" },
  { label: "Medium (1.5K to 4K)", value: "1500_4000" },
  { label: "Low (500 to 1.5K)", value: "500_1500" },
  { label: "Very Low (0 to 500)", value: "0_500" },
];

export const IPODATE = [
  { label: "Any", value: `${IPODate('any')}` },
  { label: "Today", value: `${IPODate('today')}` },
  { label: "Yesterday", value: `${IPODate('yesterday')}` },
  { label: "This Week", value: `${IPODate('week')}` },
  { label: "This Month", value: `${IPODate('month')}` },
  { label: " This Year", value: `${IPODate('year')}` },
  { label: "More than a year ago", value: `${IPODate('morethanayear')}` },
  { label: "More than 5 year", value: `${IPODate('morethan5year')}` },
  { label: "More than 10 year", value: `${IPODate('morethan10year')}` },
  { label: "More than 25 year", value: `${IPODate('morethan25year')}` },
];

//Capital Structure

export const BOOKVALUE_PERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_500" },
];

export const CAPEX_PERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
];

export const CAPEX_TO_DEPRECIATION = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
];

export const CAPEX_TO_OPERATING_CASHFLOW = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
];

export const CAPEX_TO_REVENUE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
];

export const CAPITAL_EXPENDITURE_COVERAGERATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const EFFECTIVE_TAXRATE = [
  { label: "Any", value: "0_246" },
  { label: "Above 30%", value: "0_30" },
  { label: "20% to 30%", value: "20_30" },
  { label: "10% to 20%", value: "10_20" },
  { label: "Below 10%", value: "10_246" },
];

export const ENTER_PRISEVALUE = [
  { label: "Any", value: "0_171720340937299" },
  { label: "Very High", value: "170000000000_171720340937299" },
  { label: "High", value: "35000000000_170000000000" },
  { label: "Medium", value: "6000000000_35000000000" },
  { label: "Low", value: "1800000000_6000000000" },
  { label: "Very Low", value: "0_1800000000" },
  { label: "Negative", value: "0_-59386576646030" },
];

export const INTANGIBLES_TO_TOTALASSETS = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const INVESTED_CAPITAL = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const NET_CURRENT_ASSETVALUE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const REVENUE_PERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const STOCKBASED_COMPENSATION_TO_REVENUE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const TANGIBLE_ASSETVALUE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const TANGIBLE_BOOKVALUE_PERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const WORKING_CAPITAL = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

//Pricing

export const ENTERPRISE_VALUEMULTIPLE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const EV_TOFREECASHFLOW = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const EVTOOPERATINGCASHFLOW = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const EVTOSALES = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const GRAHAMNUMBER = [
  { label: "Any", value: "0_10000000" },
  { label: "Under $1", value: "0_1" },
  { label: "$1 to $5", value: "1_5" },
  { label: "$5 to $10", value: "5_10" },
  { label: "$10 to $20", value: "10_20" },
  { label: "$20 to $50", value: "20_50" },
  { label: "$50 to $100", value: "50_100" },
  { label: "$100 to $500", value: "100_500" },
  { label: "Above $500", value: "500_10000000" },
];

export const PRICEEARNINGSRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const PRICEEARNINGSTOGROWTHRATION = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const PRICETOBOOKRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const PRICETOFREECASEFLOWSRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const PRICETOOPERATINGCASHFLOWSRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const PRICETOSALESRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

//Efficiencv Ratios

export const ASSETTURNOVER = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const FIXEDASSETTURNOVER = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const INVENTORYTURNOVER = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const PAYABLESTURNOVER = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const RECEIVABLESTURNOVER = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

//Returns

export const RETURNONASSETS = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const RETURNONCAPITALEMPLOYED = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const RETURNONEQUITY = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const RETURNONTANGIBLEASSETS = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

//Margins

export const EBTPEREBIT = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const GROSSPROFITMARGING = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const NETINCOMEPEREBT = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const NETPROFITMARGIN = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const OPERATINGPROFITMARGIN = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const PRETAXPROFITMARGIN = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const RESEARCHANDDDEVELOPEMENTTOREVENUE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const SALESGENERALANDADMINISTRATIVETOREVENUE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

//Leverage Ratios

export const CASEFLOWCOVERAGERATIOS = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const DEBTEQUITYRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const DEBTTOASSETS = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const INTERESTCOVERAGE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const INTERESTDEBTPERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const LONGTERMDEBTTOCAPITALIZATION = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const NETDEBTTOEBITDA = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const SHORTTERMCOVERAGERATIOS = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const TOTALDEBTTOCAPITALIZATION = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

// Liquidity Ratios

export const CASHCONVERSION_CYCLE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const CASHPERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const CASHRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];
export const CURRENTRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const DAYS_OF_INVENTORY_OUTSTANDING = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];
export const DAYS_OF_PAY_ABLES_OUTSTANDING = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const DAYS_OF_SALES_OUTSTANDING = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const OPERATING_CYCLE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const QUICKRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

// Earnings & Dividends

export const DIVIDEND_PAID_AND_CAPEX_COVERAGERATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const DIVIDEND_PAYOUT_RATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const DIVIDEND_YIEND = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];
export const EARNINGS_YIELD = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const NET_INCOMEPERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

// Cash Flow Ratios

export const FREE_CASHFLLOW_OPERATINGCASH_FLOWRATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const FREECASH_FLOWPERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const FREE_CASH_FLOWYIELD = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const INCOME_QUALITY = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const OPERATINGCASH_FLOWPERSHARE = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

export const OPERATING_CASH_FLOW_SALES_RATIO = [
  { label: "Any", value: "0_2300000" },
  { label: "Very High", value: "16000_2300000" },
  { label: "High", value: "4000_16000" },
  { label: "Medium", value: "1500_4000" },
  { label: "Low", value: "500_1500" },
  { label: "Very Low", value: "0_500" },
  { label: "Negative", value: "0_2300000" },
];

//type => (1 => range), (2 => dropdown)

export const BASIC_COMPANY_FACTS = [
  {
    label: "Price",
    value: "price",
    type: 2,
    tooltip: "A share price is the price of a single share of a number of saleable equity shares of a company."
  },
  {
    label: "Beta",
    value: "beta",
    type: 2,
    tooltip: "A stock's anticipated movement in relation to changes in the entire market is measured by the concept of beta. A stock with a beta larger than 1.0 is thought to be more volatile than the overall market, whereas one with a beta below 1.0 is thought to be less volatile."
  },
  { label: "Volume Average", value: "volavg", type: 2, tooltip: "It's nothing but the average number of shares traded within a day in a given stock." },
  { label: "Market Cap", value: "MktCap", type: 2, tooltip: "Market cap—or market capitalization—refers to the total value of all a company's shares of stock." },
  { label: "Last Div", value: "LastDiv", type: 2, tooltip: "It's the dividend paid in the last quarter." },
  { label: "Changes", value: "Changes", type: 2, tooltip: "It's the one day percentage change in the stock price." },
  { label: "Exchange", value: "exchangeShortName", type: 2, tooltip: "A stock exchange is a marketplace, where financial securities issued by companies are bought and sold." },
  { label: "Sector", value: "sector", type: 2, tooltip: "In order to make it simple to compare businesses with comparable business concepts, we group stocks into sectors. You can choose companies in the sectors that interest you when investing." },
  { label: "Full Time Employees", value: "fullTimeEmployees", type: 2, tooltip: "It's the total number of employees that a company has at present." },
  { label: "Country", value: "country", type: 2, tooltip: "It's the country where the company is incorporated." },
  { label: "Industry", value: "industry", type: 2, tooltip: "The definition of a 'industry' is more specific than sector and refers to a group of businesses that engage in comparable commercial activities." },
  { label: 'IPO Date', value: 'ipoDate', type: 2, tooltip: "An initial public offering (IPO) is the event when a privately held organization initially offers stock shares in the company on a public stock exchange." },
  { label: 'Currency', value: 'currency', type: 2, tooltip: "An initial public offering (IPO) is the event when a privately held organization initially offers stock shares in the company on a public stock exchange." },
];

export const CAPITAL_STRUCTURE_COLUMNS = [
  {
    value: "bookValuePerShareTTM",
    label: "Book Value Per Share",
    type: "CURRENCY",
    tooltip: `The ratio of equity available to common shareholders divided by the total number of existing shares is known as book value per share (BVPS). This number calculates a company's book value per share and serves as the minimal measure of its equity.`,
  },
  {
    value: "capexPerShareTTM",
    label: "Capex Per Share",
    type: "CURRENCY",
    tooltip: `The amount of capital expenditure per share incurred by the corporation to maintain its operating assets is known as capital expenditure per share. It is determined by dividing the capital expenditure from the statement of cash flows by the typical number of outstanding shares for the same time period.`,
  },
  {
    value: "capexToDepreciationTTM",
    label: "Capex To Depreciation",
    tooltip: `It is Capex/Depreciation`,
  },
  {
    value: "capexToOperatingCashFlowTTM",
    label: "Capex To Operating Cash Flow",
    tooltip: `The CAPEX to Operating Cash Ratio measures how much of an organization's operating cash flow is going toward capital expenditures. Such investments comprise taking on capital-intensive initiatives like introducing a new product line, expanding a production facility, or organizing a division.`,
  },
  {
    value: "capexToRevenueTTM",
    label: "Capex To Revenue",
    tooltip: `The Capex to Revenue ratio measures a company's investments in property, plant, equipment, and other capital assets to its total sales. The ratio shows how aggressively the company is re-investing its revenue back into productive assets.`,
  },
  {
    value: "capitalExpenditureCoverageRatioTTM",
    label: "Capital Expenditure Coverage Ratio",
    tooltip: `=CapitalExpenditure/OperatingCashFlow​
The greater the operating cash flow coverage for these items, along with providing the company with more cash flow to expand its business, weather tough times, and not be burdened by debt servicing and the restrictions typically included in credit agreements, the greater the company's ability to meet its obligations.`,
  },
  {
    value: "effectiveTaxRateTTM",
    label: "Effective Tax Rate",
    type: "PERCENTAGE",
    tooltip: `=Income Before Tax/Provision For Income Taxes​
The percentage of income that an individual or corporation pays in taxes is known as the effective tax rate.`,
  },
  {
    value: "enterpriseValueTTM",
    label: "Enterprise Value",
    type: "CURRENCY",
    tooltip: `An alternative to stock market capitalization that is more comprehensive is enterprise value (EV), a measurement of a company's whole worth. EV calculates a company's market capitalization as well as its short- and long-term debt, as well as any cash on its balance sheet.`,
  },
  {
    value: "intangiblesToTotalAssetsTTM",
    label: "Intangibles To Total Assets",
    tooltip: `=Intangible Asset/Total Asset`,
  },
  {
    value: "investedCapitalTTM",
    label: "Invested Capital",
    type: "CURRENCY",
    tooltip: `The total amount of money raised by a company through the sale of securities to equity investors and debt to bondholders is known as invested capital, and it is calculated by adding the total amount of debt and capital lease obligations to the amount of equity given to investors.`,
  },
  // {
  //   value: "marketCapTTM",
  //   label: "Market Cap",
  //   type: "CURRENCY",
  //   tooltip: `Market cap—or market capitalization—refers to the total value of all a company's shares of stock. It is calculated by multiplying the price of a stock by its total number of outstanding shares.`,
  // },
  {
    value: "netCurrentAssetValueTTM",
    label: "Net Current Asset Value",
    type: "CURRENCY",
    tooltip: `The total of all current assets minus the total of all current liabilities equals net current assets. Net current assets should be positive because this means that there are enough current assets on hand to cover all current liabilities. A business may be experiencing financial troubles and will likely require new capital soon if the net amount is negative.`,
  },
  {
    value: "revenuePerShareTTM",
    label: "Revenue Per Share",
    type: "CURRENCY",
    tooltip: `Revenue per share is a ratio that determines the total sales made per share for a certain time period, such as the preceding twelve months, quarterly, semi-annually, or annually (TTM). It is determined by dividing total income by the average number of outstanding shares. Another name for it is "revenue per share."`,
  },
  {
    value: "stockBasedCompensationToRevenueTTM",
    label: "Stock Based Compensation To Revenue",
    tooltip: `=Stock Based Compensation/Revenue`,
  },
  {
    value: "tangibleAssetValueTTM",
    label: "Tangible Asset Value",
    type: "CURRENCY",
    tooltip: `Cash, inventory, vehicles, equipment, buildings, and investments are examples of tangible assets that are physical in nature. Accounts receivable, pre-paid expenses, patents, and goodwill are examples of intangible assets that do not have a physical form.`,
  },
  {
    value: "tangibleBookValuePerShareTTM",
    label: "Tangible Book Value Per Share",
    type: "CURRENCY",
    tooltip: `The value of a company's tangible assets divided by the number of shares it currently has outstanding results in tangible book value per share (TBVPS). TBVPS calculates a company's possible share price in the event that it has to sell its assets. Tangible assets include things like machinery and real estate.`,
  },
  {
    value: "workingCapitalTTM",
    label: "Working Capital",
    type: "CURRENCY",
    tooltip: `The difference between a company's current assets—such as cash, accounts receivable/unpaid invoices from customers, and inventories of raw materials and completed goods—and its current liabilities—such as debts and accounts payable—is known as working capital, sometimes known as net working capital (NWC).`,
  },
];

export const PRICING_COLUMNS = [
  {
    value: "enterpriseValueMultipleTTM",
    label: "Enterprise Value Multiple",
    tooltip: `=EntrepriseValue/EBITDA
In general, this measurement enables investors to evaluate a business using the same criteria as an acquirer. Enterprise value multiple can be used as an approximate estimate of the number of years it would take for an acquisition to generate enough funds to pay its costs (assuming no change in EBITDA).`,
  },
  {
    value: "evToFreeCashFlowTTM",
    label: "EV To Free Cash Flow",
    tooltip: `Enterprise Value to Free Cash Flow compares the total valuation of the company with its ability to generate cashflow. The lower the ratio of enterprise value to the free cash flow figures, the faster a company can pay back the cost of its acquisition or generate cash to reinvest in its business.`,
  },
  {
    value: "evToOperatingCashFlowTTM",
    label: "EV To Operating Cash Flow",
    tooltip: `=EV/OCF`,
  },
  {
    value: "evToSalesTTM",
    label: "EV To Sales",
    tooltip: `(EV/sales) is a financial metric that assesses the price required to acquire a company's worth in terms of sales. An investment in a firm is more desirable if the EV/sales multiple is lower since the company may be relatively undervalued.`,
  },
  {
    value: "grahamNumberTTM",
    label: "Graham Number",
    tooltip: `The Graham number (or Benjamin Graham's number) measures a stock's fundamental value by taking into account the company's earnings per share (EPS) and book value per share (BVPS). The Graham number is the upper bound of the price range that a defensive investor should pay for the stock.`,
  },
  {
    value: "priceEarningsRatioTTM",
    label: "Price Earnings Ratio",
    tooltip: `The price-to-earnings ratio essentially tells investors how much money they need put into a firm in order to get $1 of earnings from that company. Because it demonstrates the price that investors are prepared to pay for every dollar of earnings, the P/E is also sometimes referred to as the price multiple.`,
  },
  {
    value: "priceEarningsToGrowthRatioTTM",
    label: "Price Earnings To Growth Ratio",
    tooltip: `The PEG ratio is an improvement on the P/E ratio that takes into account the anticipated earnings growth of a firm when determining its present valuation. According to common consensus, if the PEG ratio shows a value of 1, it signifies that the stock's present P/E ratio accurately reflects the stock's expected future growth in profits per share. When the PEG ratio falls below 1, it indicates that EPS growth may be greater than the market's current valuation. The stock price is, in other words, being undervalued. Stocks with high PEG ratios, on the other hand, may be an indication that the company is now overvalued.`,
  },
  {
    value: "priceToBookRatioTTM",
    label: "Price To Book Ratio",
    tooltip: `The price-to-book value ratio, which is a measure of how much shareholders are paying for a company's net assets and is stated as a multiple (i.e., how many times a company's stock is trading per share compared to a company's book value per share), is one way to do this.`,
  },
  {
    value: "priceToFreeCashFlowsRatioTTM",
    label: "Price To Free Cash Flows Ratio",
    tooltip: `Price to free cash flow is an equity valuation metric that indicates a company's ability to generate additional revenues. It is calculated by dividing its market capitalization by free cash flow values.`,
  },
  {
    value: "priceToOperatingCashFlowsRatioTTM",
    label: "Price To Operating Cash Flows Ratio",
    tooltip: `Investors use the price to operating cash flow ratio to assess the shares of a company's investment appeal from a value perspective.`,
  },
  {
    value: "priceToSalesRatioTTM_x",
    label: "Price To Sales Ratio",
    tooltip: `The price-to-sales (P/S) ratio is a measure of a company's value that contrasts its stock price with its sales. It serves as a gauge for the worth that the financial markets have assigned to each dollar of a company's sales or revenues.`,
  },
];

export const EFFICIENCY_RATIO_COLUMNS = [
  {
    value: "assetTurnoverTTM",
    label: "Asset Turnover",
    tooltip: `=Revenue/Total Average Assets
The asset turnover ratio is frequently used as a gauge of how effectively a business uses its assets to generate revenue.`,
  },
  {
    value: "fixedAssetTurnoverTTM",
    label: "Fixed Asset Turnover",
    tooltip: `=Revenue/Net PPE
Calculates the effectiveness of a company's machinery and equipment in generating sales.`,
  },
  {
    value: "inventoryTurnoverTTM_x",
    label: "Inventory Turnover",
    tooltip: `The inventory turnover ratio calculates how frequently inventory is sold and replaced during a specific time frame. Cost of Goods Sold divided by Average Inventory is the inventory turnover ratio.
Comments above copied from original document`,
  },
  {
    value: "payablesTurnoverTTM_x",
    label: "Payables Turnover",
    tooltip: `The accounts payable turnover ratio shows investors how many times per period a company pays its accounts payable. In other words, the ratio measures the speed at which a company pays its suppliers. Accounts payable is listed on the balance sheet under current liabilities.`,
  },
  {
    value: "receivablesTurnoverTTM_x",
    label: "Receivables Turnover",
    tooltip: `Receivables turnover ratio is the name of an accounting metric that measures how well a business collects its accounts receivable. This ratio assesses the efficiency with which a business uses and manages the credit it lends to consumers, as well as the speed at which short-term debt is collected or paid.`,
  },
];

export const RETURN_COLUMNS = [
  {
    value: "returnOnAssetsTTM",
    label: "Return On Assets",
    type: "PERCENTAGE",
    tooltip: `=Net Income/Average Total Assets
Return on assets (ROA) is the name of a financial ratio that describes how profitable a business is in comparison to its total assets.`,
  },
  {
    value: "returnOnCapitalEmployedTTM",
    label: "Return On Capital Employed",
    type: "PERCENTAGE",
    tooltip: `ROCE shows to investors how much profit each dollar of invested capital produces.`,
  },
  {
    value: "returnOnEquityTTM",
    label: "Return On Equity",
    type: "PERCENTAGE",
    tooltip: `Return on equity (ROE) is the measure of a company's net income divided by its shareholders' equity. ROE is a gauge of a corporation's profitability and how efficiently it generates those profits.`,
  },
  {
    value: "returnOnTangibleAssetsTTM",
    label: "Return On Tangible Assets",
    type: "PERCENTAGE",
    tooltip: `Return-on-Tangible-Asset is calculated as Net Income divided by its average total tangible assets. Total tangible assets equals to Total Assets minus Intangible Assets.`,
  },
  {
    value: "roicTTM",
    label: "ROIC",
    type: "PERCENTAGE",
    tooltip: `The computation of return on invested capital (ROIC) is used to assess how well a company allocates its resources to successful projects or investments.
    Net operating profit after tax (NOPAT) is divided by invested capital to get return on invested capital (ROIC).
    If a company's ROIC is more than its weighted average cost of capital, it is considered to be creating value.`,
  },
];

export const MARGIN_COLUMNS = [
  {
    value: "ebtPerEbitTTM",
    label: "EBT Per Ebit",
    type: "PERCENTAGE",
    tooltip: `=EBT/EBIT`,
  },
  {
    value: "grossProfitMarginTTM",
    label: "Gross Profit Margin",
    type: "PERCENTAGE",
    tooltip: `=Gross Profit/Revenue
It can be thought of as the remaining revenue from sales after all direct expenses for producing the product have been covered.`,
  },
  {
    value: "netIncomePerEBTTTM",
    label: "Net Income Per EBT",
    type: "PERCENTAGE",
    tooltip: `=Net Income/EBT`,
  },
  {
    value: "netProfitMarginTTM",
    label: "Net Profit Margin",
    type: "PERCENTAGE",
    tooltip: `=Net Income/Revenue
Profit margin, which is calculated by dividing income by revenues, effectively measures how profitable a firm or business activity is. Profit margin, expressed as a percentage, shows how many cents of profit were made for every dollar of sales.`,
  },
  {
    value: "operatingProfitMarginTTM",
    label: "Operating Profit Margin",
    type: "PERCENTAGE",
    tooltip: `=Operating Income(EBIT)/Revenue
The operating margin measures how much profit a company makes on a dollar of sales after paying for variable costs of production, such as wages and raw materials, but before paying interest or tax.`,
  },
  {
    value: "pretaxProfitMarginTTM",
    label: "Pretax Profit Margin",
    type: "PERCENTAGE",
    tooltip: `=Income Before Tax/Revenue`,
  },
  {
    value: "researchAndDevelopementToRevenueTTM",
    label: "Research And Development To Revenue",
    type: "PERCENTAGE",
    tooltip: `=R&D Expense/Revenue
It represents what part of it's sales a company spends in Research & Development.`,
  },
  {
    value: "salesGeneralAndAdministrativeToRevenueTTM",
    label: "Sales General And Administrative To Revenue",
    type: "PERCENTAGE",
    tooltip: `=SG&A Expense/Revenue`,
  },
];

export const LEVERAGE_RATIO_COLUMNS = [
  {
    value: "cashFlowCoverageRatiosTTM",
    label: "Cash Flow Coverage Ratios",
    tooltip: `=Operating Cash Flow/Total Debt
The cash flow coverage ratio is a financial metric that calculates the amount of cash flow generated by the company from its main operations available to cover debt payments.`,
  },
  {
    value: "debtEquityRatioTTM",
    label: "Debt Equity Ratio",
    tooltip: `=Total Debt/Total Equity
The debt-to-equity (D/E) ratio assesses how much leverage a company is using by comparing its total liabilities to shareholder equity. A corporation or stock with a higher leverage ratio typically poses a greater risk to shareholders.`,
  },
  {
    value: "debtToAssetsTTM",
    label: "Debt To Assets",
    tooltip: `=Total Debt/Total Assets
A debt ratio calculates a company's leverage by comparing its total debt to its total assets. Since this ratio varies greatly between industries, capital-intensive enterprises typically have significantly larger debt ratios than other types of businesses.`,
  },
  {
    value: "interestCoverageTTM_x",
    label: "Interest Coverage",
    tooltip: `=EBIT/Interest Expense
The interest coverage ratio is a debt and profitability ratio used to determine how easily a company can pay interest on its outstanding debt.`,
  },
  {
    value: "interestDebtPerShareTTM",
    label: "Interest Debt Per Share",
    type: "CURRENCY",
    tooltip: `=(debt + shortTermdebt + interestExpense)/
shareNumber`,
  },
  {
    value: "longTermDebtToCapitalizationTTM",
    label: "Long Term Debt To Capitalization",
    tooltip: `=LongTermDebt/(LongTermDebt+ ShareholdersEquity)`,
  },
  {
    value: "netDebtToEBITDATTM",
    label: "Net Debt To EBITDA",
    tooltip: `=(totalDebt - cashAndCashEquivalents)/
ebitda`,
  },
  {
    value: "shortTermCoverageRatiosTTM",
    label: "Short Term Coverage Ratios",
    tooltip: `=OperatingCashFlow/ShortTermDebt
The short-term debt coverage ratio evaluates a company's operating cash flow against the total of its short-term debt and the current component of its long-term debt.`,
  },
  {
    value: "totalDebtToCapitalizationTTM",
    label: "Total Debt To Capitalization",
    tooltip: `=TotalDebt/(TotalDebt+ShareholdersEquity)
The capitalization ratio explains to investors how much debt a company is employing to finance its operations and expansion plans.`,
  },
];

export const LIQUIDITY_RATIO_COLUMNS = [
  {
    value: "cashConversionCycleTTM",
    label: "Cash Conversion Cycle (CCC)",
    tooltip: `=DSO+DIO-DPO
The cash conversion cycle show the number of days it takes for a company to convert its inventory and other resources into revenue.`,
  },
  {
    value: "cashPerShareTTM_y",
    label: "Cash Per Share",
    tooltip: `=Total Cash/Shares Outstanding`,
  },
  {
    value: "cashRatioTTM",
    label: "Cash Ratio",
    tooltip: `=cashAndCashEquivalents/
totalCurrentLiabilities
The cash ratio is practically a predictor of a company's value in the worst-case situation where the business is likely to fail.`,
  },
  {
    value: "currentRatioTTM_y",
    label: "Current Ratio",
    tooltip: `=CurrentAssets/CurrentLiabilities
The current ratio is a liquidity ratio that assesses a company's capacity to meet short-term financial commitments with a one-year maturity.`,
  },
  {
    value: "daysOfInventoryOutstandingTTM",
    label: "Days Of Inventory Outstanding (DIO)",
    tooltip: `=[(Inventories(start)+Inventories(end))/2]/(COGS/365)
The days in inventory ratio shows how quickly, in days, a company is converting its inventory into revenue.`,
  },
  {
    value: "daysOfPayablesOutstandingTTM",
    label: "Days Of Payables Outstanding (DPO)",
    tooltip: `=[(AccountsPayable(start)+AccountsPayable(end))/2]/(COGS/365)
Days in accounts payable shows the average number of days it takes a company to pay its bills.`,
  },
  {
    value: "daysOfSalesOutstandingTTM",
    label: "Days Of Sales Outstanding (DSO)",
    tooltip: `=[(AccountReceivable(start)+AccountReceivable(end))/2]/(revenue/365)
Days in sales outstanding shows the average number of days it takes a compnay to collect payment after a sale has been made.`,
  },
  {
    value: "operatingCycleTTM",
    label: "Operating Cycle (OC)",
    tooltip: `=DSO+DIO
An operating cycle (OC) is the period of time needed for a company to receive goods, sell that inventory, and get paid for the sale of that inventory. This cycle plays a major role in determining the efficiency of a business.`,
  },
  {
    value: "quickRatioTTM",
    label: "Quick Ratio",
    tooltip: `=(cashAndCashEquivalents + shortTermInvestments + accountReceivables)/totalCurrentLiabilities
Since inventory and other current assets, which are typically more challenging to convert into cash, are not included, the quick ratio is more cautious than the current ratio. A current position with a greater quick ratio is one that is more liquid.`,
  },
];

export const EARNING_DIVIDEND_COLUMNS = [
  {
    value: "dividendPaidAndCapexCoverageRatioTTM",
    label: "Dividend Paid And Capex Coverage Ratio",
    tooltip: `=operatingCashFlow/(capex + dividendPaid)
Comparing the total of a company's capital expenditures and cash dividends to its operational cash flow is a demanding criterion that puts cash flow to the ultimate test for conservative investors concerned with cash flow coverage. A business is creating what could be referred to as "free cash flow on steroids" if it is able to cover both of these expenditures from internal resources and still have money left over. This situation has excellent investing qualities.`,
  },
  {
    value: "dividendPayoutRatio",
    label: "Dividend Payout Ratio",
    type: "PERCENTAGE",
    tooltip: `=dividendPaid/netIncome
The dividend payout ratio is an indicator of how well earnings support the dividend payment.`,
  },
  {
    value: "dividendYieldTTM_x",
    label: "Dividend Yield",
    type: "PERCENTAGE",
    tooltip: `=(dividendPaid / shareNumber)/price
While growth investors are less interested in dividends and would rather realise significant capital gains, income investors favour a stock that pays dividends. Whatever your preferred method of investing, the long-term performance of dividend-paying stocks has consistently outperformed non-paying-dividend equities.`,
  },
  {
    value: "earningsYieldTTM",
    label: "Earnings Yield",
    type: "PERCENTAGE",
    tooltip: `Earnings Yield = EPS / Price = 1 / (P/E Ratio), expressed as a percentage.`,
  },
  {
    value: "netIncomePerShareTTM",
    label: "Net Income Per Share",
    type: "CURRENCY",
    tooltip: `=Net Income/Shares Outstanding`,
  },
];

export const CASH_FLOW_RATIO_COLUMNS = [
  {
    value: "freeCashFlowOperatingCashFlowRatioTTM",
    label: "Free Cash Flow Operating Cash Flow Ratio",
    tooltip: `=freeCashFlow/operatingCashFlow
The financial strength of a corporation is inversely correlated with the amount of free cash flow embedded in operating cash flow.`,
  },
  {
    value: "freeCashFlowPerShareTTM_x",
    label: "Free Cash Flow Per Share",
    type: "CURRENCY",
    tooltip: `=FCF/Shares Outstanding`,
  },
  {
    value: "freeCashFlowYieldTTM",
    label: "Free Cash Flow Yield",
    type: "PERCENTAGE",
    tooltip: `=freeCashFlow/marketCap`,
  },
  {
    value: "incomeQualityTTM",
    label: "Income Quality",
    tooltip: `=operatingCashFlow/netIncome`,
  },
  {
    value: "operatingCashFlowPerShareTTM_x",
    label: "Operating Cash Flow Per Share",
    type: "CURRENCY",
    tooltip: `=OCF/Shares Outstanding`,
  },
  {
    value: "operatingCashFlowSalesRatioTTM",
    label: "Operating Cash Flow Sales Ratio",
    tooltip: `=operatingCashFlow/revenue
It gives investors a sense of the business's capacity to generate revenue.`,
  },
];

export const RELATIVE_VALUATION = [
  {
    value: "commingSoon",
    label: "Comming Soon...",
  }
];
export const DCF_VALUATION = [
  {
    value: "commingSoon",
    label: "Comming Soon...",
  }
];

export const ALL_SCREENER_FILTERS = {
  basicCompanyFacts: BASIC_COMPANY_FACTS,
  capitalStructure: CAPITAL_STRUCTURE_COLUMNS,
  priceMultiples: PRICING_COLUMNS,
  efficiencyRatio: EFFICIENCY_RATIO_COLUMNS,
  return: RETURN_COLUMNS,
  margin: MARGIN_COLUMNS,
  leverageRatio: LEVERAGE_RATIO_COLUMNS,
  liquidityRatio: LIQUIDITY_RATIO_COLUMNS,
  earningDividend: EARNING_DIVIDEND_COLUMNS,
  cashFlowRatio: CASH_FLOW_RATIO_COLUMNS,
  relativeValuation: RELATIVE_VALUATION,
  DcfValuation: DCF_VALUATION,
};

const PAGE_NUMBER = 1;

export const INIT_PARAM = {
  price: "None",
  currency: "USD",
  beta: "None",
  volavg: "None",
  mktcap: "None",
  lastdiv: "None",
  changes: "None",
  exchangeShortName: "None",
  sector: "None",
  industry: "None",
  country: "None",
  fullTimeEmployees: "None",
  ipoDate: "None",
  bookValuePerShareTTM: "None",
  capexPerShareTTM: "None",
  capexToDepreciationTTM: "None",
  capexToOperatingCashFlowTTM: "None",
  capexToRevenueTTM: "None",
  capitalExpenditureCoverageRatioTTM: "None",
  effectiveTaxRateTTM: "None",
  enterpriseValueTTM: "None",
  intangiblesToTotalAssetsTTM: "None",
  investedCapitalTTM: "None",
  marketCapTTM: "None",
  netCurrentAssetValueTTM: "None",
  revenuePerShareTTM: "None",
  stockBasedCompensationToRevenueTTM: "None",
  tangibleAssetValueTTM: "None",
  tangibleBookValuePerShareTTM: "None",
  workingCapitalTTM: "None",
  enterpriseValueMultipleTTM: "None",
  evToFreeCashFlowTTM: "None",
  evToOperatingCashFlowTTM: "None",
  evToSalesTTM: "None",
  grahamNumberTTM: "None",
  priceEarningsRatioTTM: "None",
  priceEarningsToGrowthRatioTTM: "None",
  priceToBookRatioTTM: "None",
  priceToFreeCashFlowsRatioTTM: "None",
  priceToOperatingCashFlowsRatioTTM: "None",
  priceToSalesRatioTTM_x: "None",
  assetTurnoverTTM: "None",
  fixedAssetTurnoverTTM: "None",
  inventoryTurnoverTTM_x: "None",
  payablesTurnoverTTM_x: "None",
  receivablesTurnoverTTM_x: "None",
  returnOnAssetsTTM: "None",
  returnOnCapitalEmployedTTM: "None",
  returnOnEquityTTM: "None",
  returnOnTangibleAssetsTTM: "None",
  roicTTM: "None",
  ebtPerEbitTTM: "None",
  grossProfitMarginTTM: "None",
  netIncomePerEBTTTM: "None",
  netProfitMarginTTM: "None",
  operatingProfitMarginTTM: "None",
  pretaxProfitMarginTTM: "None",
  researchAndDevelopementToRevenueTTM: "None",
  salesGeneralAndAdministrativeToRevenueTTM: "None",
  cashFlowCoverageRatiosTTM: "None",
  debtEquityRatioTTM: "None",
  debtToAssetsTTM: "None",
  interestCoverageTTM_x: "None",
  interestDebtPerShareTTM: "None",
  longTermDebtToCapitalizationTTM: "None",
  netDebtToEBITDATTM: "None",
  shortTermCoverageRatiosTTM: "None",
  totalDebtToCapitalizationTTM: "None",
  cashConversionCycleTTM: "None",
  cashPerShareTTM_y: "None",
  cashRatioTTM: "None",
  currentRatioTTM_y: "None",
  daysOfInventoryOutstandingTTM: "None",
  daysOfPayablesOutstandingTTM: "None",
  daysOfSalesOutstandingTTM: "None",
  operatingCycleTTM: "None",
  quickRatioTTM: "None",
  dividendPaidAndCapexCoverageRatioTTM: "None",
  dividendYieldTTM_x: "None",
  earningsYieldTTM: "None",
  netIncomePerShareTTM: "None",
  freeCashFlowOperatingCashFlowRatioTTM: "None",
  freeCashFlowPerShareTTM_x: "None",
  freeCashFlowYieldTTM: "None",
  incomeQualityTTM: "None",
  operatingCashFlowPerShareTTM_x: "None",
  operatingCashFlowSalesRatioTTM: "None",
  returOnEquityTTM: "None",
};

export const INIT_PARAMS = {
  price: false,
  currency: true,
  beta: false,
  volavg: false,
  mktcap: false,
  lastdiv: false,
  changes: false,
  exchangeShortName: false,
  sector: false,
  industry: false,
  country: false,
  fullTimeEmployees: false,
  ipoDate: false,
  bookValuePerShareTTM: false,
  capexPerShareTTM: false,
  capexToDepreciationTTM: false,
  capexToOperatingCashFlowTTM: false,
  capexToRevenueTTM: false,
  capitalExpenditureCoverageRatioTTM: false,
  effectiveTaxRateTTM: false,
  enterpriseValueTTM: false,
  intangiblesToTotalAssetsTTM: false,
  investedCapitalTTM: false,
  marketCapTTM: false,
  netCurrentAssetValueTTM: false,
  revenuePerShareTTM: false,
  stockBasedCompensationToRevenueTTM: false,
  tangibleAssetValueTTM: false,
  tangibleBookValuePerShareTTM: false,
  workingCapitalTTM: false,
  enterpriseValueMultipleTTM: false,
  evToFreeCashFlowTTM: false,
  evToOperatingCashFlowTTM: false,
  evToSalesTTM: false,
  grahamNumberTTM: false,
  priceEarningsRatioTTM: false,
  priceEarningsToGrowthRatioTTM: false,
  priceToBookRatioTTM: false,
  priceToFreeCashFlowsRatioTTM: false,
  priceToOperatingCashFlowsRatioTTM: false,
  priceToSalesRatioTTM_x: false,
  assetTurnoverTTM: false,
  fixedAssetTurnoverTTM: false,
  inventoryTurnoverTTM_x: false,
  payablesTurnoverTTM_x: false,
  receivablesTurnoverTTM_x: false,
  returnOnAssetsTTM: false,
  returnOnCapitalEmployedTTM: false,
  returnOnEquityTTM: false,
  returnOnTangibleAssetsTTM: false,
  ebtPerEbitTTM: false,
  grossProfitMarginTTM: false,
  netIncomePerEBTTTM: false,
  netProfitMarginTTM: false,
  operatingProfitMarginTTM: false,
  pretaxProfitMarginTTM: false,
  researchAndDevelopementToRevenueTTM: false,
  salesGeneralAndAdministrativeToRevenueTTM: false,
  cashFlowCoverageRatiosTTM: false,
  debtEquityRatioTTM: false,
  debtToAssetsTTM: false,
  interestCoverageTTM_x: false,
  interestDebtPerShareTTM: false,
  longTermDebtToCapitalizationTTM: false,
  netDebtToEBITDATTM: false,
  shortTermCoverageRatiosTTM: false,
  totalDebtToCapitalizationTTM: false,
  cashConversionCycleTTM: false,
  cashPerShareTTM_y: false,
  cashRatioTTM: false,
  currentRatioTTM_y: false,
  daysOfInventoryOutstandingTTM: false,
  daysOfPayablesOutstandingTTM: false,
  daysOfSalesOutstandingTTM: false,
  operatingCycleTTM: false,
  quickRatioTTM: false,
  dividendPaidAndCapexCoverageRatioTTM: false,
  dividendYieldTTM_x: false,
  earningsYieldTTM: false,
  netIncomePerShareTTM: false,
  freeCashFlowOperatingCashFlowRatioTTM: false,
  freeCashFlowPerShareTTM_x: false,
  freeCashFlowYieldTTM: false,
  incomeQualityTTM: false,
  operatingCashFlowPerShareTTM_x: false,
  operatingCashFlowSalesRatioTTM: false,
  returOnEquityTTM: false,
};

export const COLUMNS = {
  Price: {},
  Beta: {},
  VolAvg: {},
  MktCap: {},
  LastDiv: {},
  Range: {},
  Changes: {},
  companyName: {},
  currency: {},
  cik: {},
  isin: {},
  cusip: {},
  exchange: {},
  exchangeShortName: {},
  industry: {},
  website: {},
  description: {},
  CEO: {},
  sector: {},
  country: {},
  fullTimeEmployees: {},
  phone: {},
  address: {},
  city: {},
  state: {},
  zip: {},
  DCF_diff: {},
  DCF: {},
  image: {},
  ipoDate: {},
  defaultImage: {},
  isEtf: {},
  isActivelyTrading: {},
  isFund: {},
  isAdr: {},
  symbol: {},
  revenuePerShareTTM: {},
  netIncomePerShareTTM: {},
  operatingCashFlowPerShareTTM_x: {},
  freeCashFlowPerShareTTM_x: {},
  cashPerShareTTM_x: {},
  bookValuePerShareTTM: {},
  tangibleBookValuePerShareTTM: {},
  shareholdersEquityPerShareTTM: {},
  interestDebtPerShareTTM: {},
  marketCapTTM: {},
  enterpriseValueTTM: {},
  peRatioTTM_x: {},
  priceToSalesRatioTTM_x: {},
  pocfratioTTM: {},
  pfcfRatioTTM: {},
  pbRatioTTM: {},
  ptbRatioTTM: {},
  evToSalesTTM: {},
  enterpriseValueOverEBITDATTM: {},
  evToOperatingCashFlowTTM: {},
  evToFreeCashFlowTTM: {},
  earningsYieldTTM: {},
  freeCashFlowYieldTTM: {},
  debtToEquityTTM: {},
  debtToAssetsTTM: {},
  netDebtToEBITDATTM: {},
  currentRatioTTM_x: {},
  interestCoverageTTM_x: {},
  incomeQualityTTM: {},
  dividendYieldTTM_x: {},
  dividendYieldPercentageTTM: {},
  payoutRatioTTM_x: {},
  salesGeneralAndAdministrativeToRevenueTTM: {},
  researchAndDevelopementToRevenueTTM: {},
  intangiblesToTotalAssetsTTM: {},
  capexToOperatingCashFlowTTM: {},
  capexToRevenueTTM: {},
  capexToDepreciationTTM: {},
  stockBasedCompensationToRevenueTTM: {},
  grahamNumberTTM: {},
  roicTTM: {},
  returnOnTangibleAssetsTTM: {},
  grahamNetNetTTM: {},
  workingCapitalTTM: {},
  tangibleAssetValueTTM: {},
  netCurrentAssetValueTTM: {},
  investedCapitalTTM: {},
  averageReceivablesTTM: {},
  averagePayablesTTM: {},
  averageInventoryTTM: {},
  daysSalesOutstandingTTM: {},
  daysPayablesOutstandingTTM: {},
  daysOfInventoryOnHandTTM: {},
  receivablesTurnoverTTM_x: {},
  payablesTurnoverTTM_x: {},
  inventoryTurnoverTTM_x: {},
  roeTTM: {},
  capexPerShareTTM: {},
  dividendPerShareTTM_x: {},
  debtToMarketCapTTM: {},
  dividendYielTTM: {},
  dividendYielPercentageTTM: {},
  peRatioTTM_y: {},
  pegRatioTTM: {},
  payoutRatioTTM_y: {},
  currentRatioTTM_y: {},
  quickRatioTTM: {},
  cashRatioTTM: {},
  daysOfSalesOutstandingTTM: {},
  daysOfInventoryOutstandingTTM: {},
  operatingCycleTTM: {},
  daysOfPayablesOutstandingTTM: {},
  cashConversionCycleTTM: {},
  grossProfitMarginTTM: {},
  operatingProfitMarginTTM: {},
  pretaxProfitMarginTTM: {},
  netProfitMarginTTM: {},
  effectiveTaxRateTTM: {},
  returnOnAssetsTTM: {},
  returnOnEquityTTM: {},
  returnOnCapitalEmployedTTM: {},
  netIncomePerEBTTTM: {},
  ebtPerEbitTTM: {},
  ebitPerRevenueTTM: {},
  debtRatioTTM: {},
  debtEquityRatioTTM: {},
  longTermDebtToCapitalizationTTM: {},
  totalDebtToCapitalizationTTM: {},
  interestCoverageTTM_y: {},
  cashFlowToDebtRatioTTM: {},
  companyEquityMultiplierTTM: {},
  receivablesTurnoverTTM_y: {},
  payablesTurnoverTTM_y: {},
  inventoryTurnoverTTM_y: {},
  fixedAssetTurnoverTTM: {},
  assetTurnoverTTM: {},
  operatingCashFlowPerShareTTM_y: {},
  freeCashFlowPerShareTTM_y: {},
  cashPerShareTTM_y: {},
  operatingCashFlowSalesRatioTTM: {},
  freeCashFlowOperatingCashFlowRatioTTM: {},
  cashFlowCoverageRatiosTTM: {},
  shortTermCoverageRatiosTTM: {},
  capitalExpenditureCoverageRatioTTM: {},
  dividendPaidAndCapexCoverageRatioTTM: {},
  priceBookValueRatioTTM: {},
  priceToBookRatioTTM: {},
  priceToSalesRatioTTM_y: {},
  priceEarningsRatioTTM: {},
  priceToFreeCashFlowsRatioTTM: {},
  priceToOperatingCashFlowsRatioTTM: {},
  priceCashFlowRatioTTM: {},
  priceEarningsToGrowthRatioTTM: {},
  priceSalesRatioTTM: {},
  dividendYieldTTM_y: {},
  enterpriseValueMultipleTTM: {},
  priceFairValueTTM: {},
  dividendPerShareTTM_y: {},
};

export const COUNTRY_LIST = [
  "AE",
  "AI",
  "AR",
  "AT",
  "AU",
  "BE",
  "BG",
  "BM",
  "BR",
  "BS",
  "CA",
  "CH",
  "CL",
  "CN",
  "CO",
  "CR",
  "CY",
  "DE",
  "DK",
  "DO",
  "EG",
  "ES",
  "FI",
  "FR",
  "GB",
  "GG",
  "GI",
  "GR",
  "HK",
  "ID",
  "IE",
  "IL",
  "IN",
  "IS",
  "IT",
  "JE",
  "JO",
  "JP",
  "KR",
  "KY",
  "KZ",
  "LT",
  "LU",
  "MC",
  "MO",
  "MT",
  "MX",
  "MY",
  "NL",
  "NO",
  "NZ",
  "PA",
  "PE",
  "PH",
  "PL",
  "PR",
  "PT",
  "RU",
  "SE",
  "SG",
  "SK",
  "TH",
  "TR",
  "TW",
  "US",
  "UY",
  "VI",
  "ZA",
];

export const SECTOR_LIST = [
  "Basic Materials",
  "Communication Services",
  "Conglomerates",
  "Consumer Cyclical",
  "Consumer Defensive",
  "Energy",
  "Financial",
  "Financial Services",
  "Healthcare",
  "Industrials",
  "Real Estate",
  "Technology",
  "Utilities",
];

export const INDUSTRY_LIST = [
  "Advertising Agencies",
  "Aerospace & Defense",
  "Agricultural Inputs",
  "Airlines",
  "Airports & Air Services",
  "Aluminum",
  "Apparel Manufacturing",
  "Apparel Retail",
  "Asset Management",
  "Auto & Truck Dealerships",
  "Auto Manufacturers",
  "Auto Parts",
  "Banks",
  "Banks—Diversified",
  "Banks—Regional",
  "Beverages—Brewers",
  "Beverages—Non-Alcoholic",
  "Beverages—Wineries & Distilleries",
  "Biotechnology",
  "Broadcasting",
  "Building Materials",
  "Building Products & Equipment",
  "Business Equipment & Supplies",
  "Capital Markets",
  "Chemicals",
  "Closed-End Fund - Equity",
  "Coking Coal",
  "Communication Equipment",
  "Computer Hardware",
  "Confectioners",
  "Conglomerates",
  "Consulting Services",
  "Consumer Electronics",
  "Copper",
  "Credit Services",
  "Department Stores",
  "Diagnostics & Research",
  "Discount Stores",
  "Drug Manufacturers—General",
  "Drug Manufacturers—Specialty & Generic",
  "Education & Training Services",
  "Electrical Equipment & Parts",
  "Electronic Components",
  "Electronic Gaming & Multimedia",
  "Electronics & Computer Distribution",
  "Engineering & Construction",
  "Entertainment",
  "Farm & Heavy Construction Machinery",
  "Farm Products",
  "Financial Conglomerates",
  "Financial Data & Stock Exchanges",
  "Food Distribution",
  "Footwear & Accessories",
  "Furnishings, Fixtures & Appliances",
  "Gambling",
  "Gold",
  "Grocery Stores",
  "Health Information Services",
  "Healthcare Plans",
  "Home Improvement Retail",
  "Homebuilding & Construction",
  "Household & Personal Products",
  "Independent Oil & Gas",
  "Industrial Distribution",
  "Information Technology Services",
  "Infrastructure Operations",
  "Insurance Brokers",
  "Insurance Specialty",
  "Insurance—Diversified",
  "Insurance—Life",
  "Insurance—Property & Casualty",
  "Insurance—Reinsurance",
  "Insurance—Specialty",
  "Integrated Freight & Logistics",
  "Internet Content & Information",
  "Internet Retail",
  "Leisure",
  "Lodging",
  "Lumber & Wood Production",
  "Luxury Goods",
  "Marine Shipping",
  "Medical Care Facilities",
  "Medical Devices",
  "Medical Distribution",
  "Medical Instruments & Supplies",
  "Metal Fabrication",
  "Mortgage Finance",
  "Oil & Gas Drilling",
  "Oil & Gas E&P",
  "Oil & Gas Equipment & Services",
  "Oil & Gas Integrated",
  "Oil & Gas Midstream",
  "Oil & Gas Refining & Marketing",
  "Other Industrial Metals & Mining",
  "Other Precious Metals & Mining",
  "Packaged Foods",
  "Packaging & Containers",
  "Paper & Paper Products",
  "Personal Services",
  "Pharmaceutical Retailers",
  "Pollution & Treatment Controls",
  "Publishing",
  "REIT—Diversified",
  "REIT—Healthcare Facilities",
  "REIT—Hotel & Motel",
  "REIT—Industrial",
  "REIT—Mortgage",
  "REIT—Office",
  "REIT—Residential",
  "REIT—Retail",
  "REIT—Specialty",
  "Railroads",
  "Real Estate Services",
  "Real Estate—Development",
  "Real Estate—Diversified",
  "Recreational Vehicles",
  "Rental & Leasing Services",
  "Residential Construction",
  "Resorts & Casinos",
  "Restaurants",
  "Retail Apparel & Specialty",
  "Scientific & Technical Instruments",
  "Security & Protection Services",
  "Semiconductor Equipment & Materials",
  "Semiconductors",
  "Shell Companies",
  "Silver",
  "Software—Application",
  "Software—Infrastructure",
  "Solar",
  "Specialty Business Services",
  "Specialty Chemicals",
  "Specialty Industrial Machinery",
  "Specialty Retail",
  "Staffing & Employment Services",
  "Steel",
  "Telecom Services",
  "Telecom Services - Foreign",
  "Textile Manufacturing",
  "Thermal Coal",
  "Tobacco",
  "Tools & Accessories",
  "Travel Services",
  "Trucking",
  "Uranium",
  "Utilities—Diversified",
  "Utilities—Independent Power Producers",
  "Utilities—Regulated Electric",
  "Utilities—Regulated Gas",
  "Utilities—Regulated Water",
  "Utilities—Renewable",
  "Waste Management",
];

//Response Column(key) List
export const COLUMN_LIST = [
  "Price",
  "Beta",
  "VolAvg",
  "MktCap",
  "LastDiv",
  "Range",
  "Changes",
  "companyName",
  "currency",
  "cik",
  "isin",
  "cusip",
  "exchange",
  "exchangeShortName",
  "industry",
  "website",
  "description",
  "CEO",
  "sector",
  "country",
  "fullTimeEmployees",
  "phone",
  "address",
  "city",
  "state",
  "zip",
  "DCF_diff",
  "DCF",
  "image",
  "ipoDate",
  "defaultImage",
  "isEtf",
  "isActivelyTrading",
  "isFund",
  "isAdr",
  "symbol",
  "revenuePerShareTTM",
  "netIncomePerShareTTM",
  "operatingCashFlowPerShareTTM_x",
  "freeCashFlowPerShareTTM_x",
  "cashPerShareTTM_x",
  "bookValuePerShareTTM",
  "tangibleBookValuePerShareTTM",
  "shareholdersEquityPerShareTTM",
  "interestDebtPerShareTTM",
  "marketCapTTM",
  "enterpriseValueTTM",
  "peRatioTTM_x",
  "priceToSalesRatioTTM_x",
  "pocfratioTTM",
  "pfcfRatioTTM",
  "pbRatioTTM",
  "ptbRatioTTM",
  "evToSalesTTM",
  "enterpriseValueOverEBITDATTM",
  "evToOperatingCashFlowTTM",
  "evToFreeCashFlowTTM",
  "earningsYieldTTM",
  "freeCashFlowYieldTTM",
  "debtToEquityTTM",
  "debtToAssetsTTM",
  "netDebtToEBITDATTM",
  "currentRatioTTM_x",
  "interestCoverageTTM_x",
  "incomeQualityTTM",
  "dividendYieldTTM_x",
  "dividendYieldPercentageTTM",
  "payoutRatioTTM_x",
  "salesGeneralAndAdministrativeToRevenueTTM",
  "researchAndDevelopementToRevenueTTM",
  "intangiblesToTotalAssetsTTM",
  "capexToOperatingCashFlowTTM",
  "capexToRevenueTTM",
  "capexToDepreciationTTM",
  "stockBasedCompensationToRevenueTTM",
  "grahamNumberTTM",
  "roicTTM",
  "returnOnTangibleAssetsTTM",
  "grahamNetNetTTM",
  "workingCapitalTTM",
  "tangibleAssetValueTTM",
  "netCurrentAssetValueTTM",
  "investedCapitalTTM",
  "averageReceivablesTTM",
  "averagePayablesTTM",
  "averageInventoryTTM",
  "daysSalesOutstandingTTM",
  "daysPayablesOutstandingTTM",
  "daysOfInventoryOnHandTTM",
  "receivablesTurnoverTTM_x",
  "payablesTurnoverTTM_x",
  "inventoryTurnoverTTM_x",
  "roeTTM",
  "capexPerShareTTM",
  "dividendPerShareTTM_x",
  "debtToMarketCapTTM",
  "dividendYielTTM",
  "dividendYielPercentageTTM",
  "peRatioTTM_y",
  "pegRatioTTM",
  "payoutRatioTTM_y",
  "currentRatioTTM_y",
  "quickRatioTTM",
  "cashRatioTTM",
  "daysOfSalesOutstandingTTM",
  "daysOfInventoryOutstandingTTM",
  "operatingCycleTTM",
  "daysOfPayablesOutstandingTTM",
  "cashConversionCycleTTM",
  "grossProfitMarginTTM",
  "operatingProfitMarginTTM",
  "pretaxProfitMarginTTM",
  "netProfitMarginTTM",
  "effectiveTaxRateTTM",
  "returnOnAssetsTTM",
  "returnOnEquityTTM",
  "returnOnCapitalEmployedTTM",
  "netIncomePerEBTTTM",
  "ebtPerEbitTTM",
  "ebitPerRevenueTTM",
  "debtRatioTTM",
  "debtEquityRatioTTM",
  "longTermDebtToCapitalizationTTM",
  "totalDebtToCapitalizationTTM",
  "interestCoverageTTM_y",
  "cashFlowToDebtRatioTTM",
  "companyEquityMultiplierTTM",
  "receivablesTurnoverTTM_y",
  "payablesTurnoverTTM_y",
  "inventoryTurnoverTTM_y",
  "fixedAssetTurnoverTTM",
  "assetTurnoverTTM",
  "operatingCashFlowPerShareTTM_y",
  "freeCashFlowPerShareTTM_y",
  "cashPerShareTTM_y",
  "operatingCashFlowSalesRatioTTM",
  "freeCashFlowOperatingCashFlowRatioTTM",
  "cashFlowCoverageRatiosTTM",
  "shortTermCoverageRatiosTTM",
  "capitalExpenditureCoverageRatioTTM",
  "dividendPaidAndCapexCoverageRatioTTM",
  "priceBookValueRatioTTM",
  "priceToBookRatioTTM",
  "priceToSalesRatioTTM_y",
  "priceEarningsRatioTTM",
  "priceToFreeCashFlowsRatioTTM",
  "priceToOperatingCashFlowsRatioTTM",
  "priceCashFlowRatioTTM",
  "priceEarningsToGrowthRatioTTM",
  "priceSalesRatioTTM",
  "dividendYieldTTM_y",
  "enterpriseValueMultipleTTM",
  "priceFairValueTTM",
  "dividendPerShareTTM_y",
];

export const REQUEST_FIRST_LETTER_CHANGE = [
  "Price",
  "Beta",
  "VolAvg",
  "MktCap",
  "LastDiv",
  "Range",
  "Changes",
];

export const SECTOR_WISE_INDUSTRY = {
  "Basic Materials": [
    "Aluminum",
    "Gold",
    "Other Industrial Metals & Mining",
    "Silver",
    "Building Materials",
    "Chemicals",
    "Other Precious Metals & Mining",
    "Copper",
    "Specialty Chemicals",
    "Coking Coal",
    "Steel",
    "Agricultural Inputs",
    "Paper & Paper Products",
    "Lumber & Wood Production",
    "Independent Oil & Gas",
  ],
  "Communication Services": [
    "Telecom Services",
    "Advertising Agencies",
    "Entertainment",
    "Internet Content & Information",
    "Electronic Gaming & Multimedia",
    "Broadcasting",
    "Publishing",
  ],
  Conglomerates: ["Conglomerates"],
  "Consumer Cyclical": [
    "Specialty Retail",
    "Auto & Truck Dealerships",
    "Travel Services",
    "Lodging",
    "Gambling",
    "Packaging & Containers",
    "Footwear & Accessories",
    "Auto Parts",
    "Apparel Retail",
    "Textile Manufacturing",
    "Internet Retail",
    "Leisure",
    "Restaurants",
    "Personal Services",
    "Furnishings, Fixtures & Appliances",
    "Department Stores",
    "Resorts & Casinos",
    "Home Improvement Retail",
    "Auto Manufacturers",
    "Residential Construction",
    "Recreational Vehicles",
    "Luxury Goods",
    "Apparel Manufacturing",
    "Entertainment",
    "Retail Apparel & Specialty",
    "Homebuilding & Construction",
    "Gold",
  ],
  "Consumer Defensive": [
    "Education & Training Services",
    "Household & Personal Products",
    "Beverages—Brewers",
    "Grocery Stores",
    "Farm Products",
    "Packaged Foods",
    "Beverages—Non-Alcoholic",
    "Food Distribution",
    "Beverages—Wineries & Distilleries",
    "Discount Stores",
    "Tobacco",
    "Confectioners",
  ],
  Energy: [
    "Oil & Gas Refining & Marketing",
    "Oil & Gas E&P",
    "Oil & Gas Midstream",
    "Thermal Coal",
    "Oil & Gas Equipment & Services",
    "Oil & Gas Integrated",
    "Uranium",
    "Oil & Gas Drilling",
  ],
  // Financial: ['Closed-End Fund - Equity'],
  "Financial Services": [
    "Shell Companies",
    "Insurance—Life",
    "Asset Management",
    "Banks—Diversified",
    "Banks—Regional",
    "Capital Markets",
    "Insurance—Diversified",
    "Insurance—Specialty",
    "Insurance—Property & Casualty",
    "Credit Services",
    "Insurance Brokers",
    "Financial Data & Stock Exchanges",
    "Mortgage Finance",
    "Insurance—Reinsurance",
    "Banks",
    "Financial Conglomerates",
    "Insurance Specialty",
  ],
  Healthcare: [
    "Diagnostics & Research",
    "Biotechnology",
    "Drug Manufacturers—General",
    "Medical Distribution",
    "Medical Devices",
    "Drug Manufacturers—Specialty & Generic",
    "Health Information Services",
    "Medical Care Facilities",
    "Medical Instruments & Supplies",
    "Healthcare Plans",
    "Pharmaceutical Retailers",
  ],
  Industrials: [
    "Airlines",
    "Rental & Leasing Services",
    "Building Products & Equipment",
    "Airports & Air Services",
    "Electrical Equipment & Parts",
    "Conglomerates",
    "Specialty Business Services",
    "Infrastructure Operations",
    "Business Equipment & Supplies",
    "Aerospace & Defense",
    "Engineering & Construction",
    "Pollution & Treatment Controls",
    "Staffing & Employment Services",
    "Industrial Distribution",
    "Security & Protection Services",
    "Farm & Heavy Construction Machinery",
    "Specialty Industrial Machinery",
    "Integrated Freight & Logistics",
    "Metal Fabrication",
    "Railroads",
    "Marine Shipping",
    "Consulting Services",
    "Waste Management",
    "Trucking",
    "Tools & Accessories",
  ],
  "Real Estate": [
    "REIT—Mortgage",
    "REIT—Diversified",
    "Real Estate Services",
    "REIT—Residential",
    "REIT—Retail",
    "Real Estate—Development",
    "REIT—Specialty",
    "REIT—Hotel & Motel",
    "REIT—Office",
    "Real Estate—Diversified",
    "REIT—Healthcare Facilities",
    "REIT—Industrial",
  ],
  Technology: [
    "Communication Equipment",
    "Semiconductors",
    "Consumer Electronics",
    "Scientific & Technical Instruments",
    "Solar",
    "Software—Application",
    "Software—Infrastructure",
    "Semiconductor Equipment & Materials",
    "Information Technology Services",
    "Electronics & Computer Distribution",
    "Computer Hardware",
    "Electronic Components",
    "Telecom Services - Foreign",
  ],
  Utilities: [
    "Utilities—Renewable",
    "Utilities—Regulated Electric",
    "Utilities—Diversified",
    "Utilities—Independent Power Producers",
    "Utilities—Regulated Water",
    "Utilities—Regulated Gas",
  ],
};
