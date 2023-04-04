import React, { useEffect, useState } from 'react';
import { NormalFormat } from '../../../Common/NumberFormat';
import {
  millionToBillionConvert,
  replaceEmpty,
  capitalizeFirstLetterOfEachWord,
  replaceEmptyWithNumberPreFix,
  replaceEmptyWithPostFix,
} from '../../../Common/CommonFunctions';
import { getManualValuationFCFFMData } from '../../../api/valuation';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Legend,
  LabelList,
  Scatter,
  ZAxis,
  Area,
  AreaChart,
} from 'recharts';
import {
  CustomizedGrowthRateLabelV2,
  CustomizedGrowthRateLabelV2AboveLine,
  CustomizedGrowthRateLabelV2Middle,
  CustomizedGrowthRateLabelV2MiddleWithData,
  CustomizedGrowthRateLabelV2MiddleWithData2,
  CustomizedScatterRoundShape
} from '../../../Common/Chart/Recharts'
import moment from 'moment'
import { convertDateFormat } from '../../../Common/DateFunctions'
import { CustomTooltip, CustomTooltip2 } from './TooltipChart'

const ValuationFCFFM = ({
  allData,
  companyQuote,
  revenueData,
  operatingMarginOfIndustry
}) => {
  const [data, setData] = useState()
  const [companyValuation, setCompanyValuation] = useState()
  const [roic, setROIC] = useState(null)
  const [invested, setInvested] = useState(null)
  const [valuationOutput, setValuationOutput] = useState(null)
  const [revenueGraphData, setRevenueGraphData] = useState(null)
  const [operatingIncomeData, setOperatingIncomeData] = useState(null)
  const [reinvestmentData, setReinvestmentData] = useState(null)
  const [freeCashFlowData, setFreeCashFlowData] = useState(null)
  const [investedCapitalData, setInvestedCapital] = useState(null)
  const [priceTargetData, setPriceTargetCapital] = useState(null)
  const [valuationOutputFilter, setValuationOutputFilter] = useState('best')
  const [pastPredictionGraphData, setPastPredictionGraphData] = useState(null)
  const [estimatedValue, setEstimatedValue] = useState(null)
  const [percent, setPercent] = useState(null)
  const [viewAs, setViewAs] = useState('chart')
  const [manualParam, setManualParam] = useState(null)
  const [manualChartData, setManualChartData] = useState(null)
  const [manualButtonVisible, setManualButtonVisible] = useState(false)
  const [costOfCapitalGraphData, setCostOfCapitalGraphData] = useState(null)
  const [calculatedPercentage, setCalculatedPercentage] = useState(null)
  const [marketSalesPercentage, setMarketSalesPercentage] = useState(null)
  const [terminalMarketSales, setTerminalMarketSales] = useState({
    best: '',
    base: '',
    worst: '',
    manual: ''
  })
  const [allManualData, setAllManualData] = useState(null)
  const yearArr = [
    'base_year',
    'year_1',
    'year_2',
    'year_3',
    'year_4',
    'year_5',
    'year_6',
    'year_7',
    'year_8',
    'year_9',
    'year_10',
    'terminal'
  ]
  const onlyYear = yearArr.slice(1, 11)
  const validTableColumns = [
    'Revenue growth rate',
    'Revenues',
    'EBIT (Operating) margin',
    'EBIT (Operating income)',
    'Reinvestment',
    'FCFF',
    'Invested capital',
    'Price Target',
    'PV(FCFF)',
    'ROIC',
    'Cost of capital'
  ]

  const CASE_FILTER = [
    { label: 'Best case', value: 'best' },
    { label: 'Base care', value: 'base' },
    { label: 'Worst care', value: 'worst' },
    { label: 'Manual', value: 'manual' }
  ]

  const VALUATION_DIAGNOSTICS_TOOLTIP =
    'It helps to determine wheather the Assumptions taken in the Valuation is IMPOSSIBLE, IMPLAUSIBLE or IMPROBABLE'

  useEffect(() => {
    if (companyValuation) {
      getValuationOutput()
      companyValuation?.YearlyValuationOutputs.forEach((element, index) => {
        if (
          element?.case &&
          element?.field_name &&
          element?.case === 'base' &&
          element?.field_name === 'ROIC'
        ) {
          setROIC(element?.base_year)
        }

        if (
          element?.case &&
          element?.field_name &&
          element?.case === 'base' &&
          element?.field_name === 'Invested capital'
        ) {
          setInvested(element?.base_year)
        }
      })
    }
  }, [companyValuation])

  useEffect(() => {
    getValuationOutput()
  }, [valuationOutputFilter])

  useEffect(() => {
    if (valuationOutput) {
      let tempMarketSalesPercentage = ''
      valuationOutput.forEach((valuation, index) => {
        if (valuation.field_name === 'Revenues' && revenueData) {
          tempMarketSalesPercentage = valuation.base_year / revenueData
          setMarketSalesPercentage(tempMarketSalesPercentage)
        }
        switch (valuation?.field_name) {
          case 'Revenue growth rate':
            const revenueGrowthData = getGraphData(valuation)

            const revenue = valuationOutput.find(
              (elem) => elem?.field_name === 'Revenues'
            )

            let tempArr = []
            Object.keys(revenue).forEach((key) => {
              if (yearArr.includes(key)) {
                tempArr.push(revenue[key])
              }
            })
            const temp = revenueGrowthData.map((row, index) => {
              row.data2 = tempArr[index]
              return row
            })
            setRevenueGraphData(temp)
            break

          case 'EBIT (Operating) margin':
            const oiData = getGraphData(valuation)

            const operatingIncome = valuationOutput.find(
              (elem) => elem?.field_name === 'EBIT (Operating income)'
            )

            let tempIncome = []
            Object.keys(operatingIncome).forEach((key) => {
              if (yearArr.includes(key)) {
                tempIncome.push(operatingIncome[key])
              }
            })
            const tempData = oiData.map((row, index) => {
              row.data2 = tempIncome[index]
              return row
            })
            setOperatingIncomeData(tempData)
            break

          case 'Reinvestment':
            const reinvestmentData = getGraphData(valuation).slice(1, 12)
            setReinvestmentData(reinvestmentData)
            break

          case 'FCFF':
            const fcffData = getGraphData(valuation).slice(1, 12)
            setFreeCashFlowData(fcffData)

            break

          case 'ROIC':
            const roic = getGraphData(valuation).slice(0, 11)

            const investedData = valuationOutput.find(
              (elem) => elem?.field_name === 'Invested capital'
            )

            let tempRoic = []
            Object.keys(investedData).forEach((key) => {
              if (yearArr.includes(key)) {
                tempRoic.push(investedData[key])
              }
            })
            const tempInvestedData = roic.map((row, index) => {
              row.data2 = tempRoic[index]
              return row
            })

            setInvestedCapital(tempInvestedData)

            break

          case 'Price Target':
            const priceData = getGraphData(valuation)
            priceData.map((price, index) => {
              if (index === 0) {
                price.data = companyQuote?.price
              }
              return price
            })
            setPriceTargetCapital(priceData)

          case 'Cost of capital':
            const costOfCapitalData = getGraphData(valuation).slice(1, 11)

            const fcff = valuationOutput.find(
              (elem) => elem?.field_name === 'PV(FCFF)'
            )

            let tempCapitalArr = []
            Object.keys(fcff).forEach((key) => {
              if (onlyYear.includes(key)) {
                tempCapitalArr.push(fcff[key])
              }
            })
            const temp2 = costOfCapitalData.map((row, index) => {
              row.data2 = tempCapitalArr[index]
              return row
            })
            setCostOfCapitalGraphData(temp2)

            break
        }
      })
    }
  }, [valuationOutput])

  useEffect(() => {
    ;(async () => {
      if (allData) {
        setData(allData)
        if (
          allData &&
          allData.CompanyValuations &&
          allData.CompanyValuations[0]
        ) {
          setCompanyValuation(allData.CompanyValuations[0])

          let pastPrediction = allData.CompanyValuations.map((val) => {
            let best, base, worst, actualPrice
            val &&
              val?.ValuationOutputs.forEach((ele) => {
                if (ele.case === 'base') {
                  base = ele.estimated_share
                  actualPrice = ele.price
                }
                if (ele.case === 'best') {
                  best = ele.estimated_share
                }
                if (ele.case === 'worst') {
                  worst = ele.estimated_share
                }
              })
            let tempObj = {}
            tempObj.year = `${convertDateFormat(val.publish_date)}(${
              val.fiscal_year
            } ${val.quarter})`
            tempObj.best = best
            tempObj.worst = worst
            tempObj.base = base
            tempObj.actualPrice = actualPrice
            tempObj.filterYear = val.fiscal_year
            tempObj.filterQuarter = val.quarter && val.quarter[1]

            return tempObj
          })

          pastPrediction.unshift({})

          if (pastPrediction && pastPrediction.length > 5) {
            pastPrediction = pastPrediction.slice(0, 5)
          }

          pastPrediction.sort(function (a, b) {
            return (
              a.filterYear - b.filterYear || a.filterQuarter - b.filterQuarter
            )
          })

          setPastPredictionGraphData(pastPrediction)
        }
      }
    })()
  }, [])

  useEffect(() => {
    if (manualParam) {
      getManualParamData()
    }
  }, [manualParam])

  useEffect(() => {
    if (manualChartData) {
      setValuationOutput([...manualChartData])
    }
  }, [manualChartData])

  useEffect(() => {
    const tempCalculatedPercentage = (
      ((companyQuote?.price - estimatedValue?.estimated_share) /
        companyQuote?.price) *
      100
    ).toFixed(2)
    setCalculatedPercentage(tempCalculatedPercentage)
  }, [estimatedValue])

  const getGraphData = (valuation) => {
    const publishDate = new Date(companyValuation?.publish_date)
    let year = moment(publishDate).format('YYYY')
    let tempArr = []
    Object.keys(valuation).forEach((key) => {
      if (yearArr.includes(key)) {
        if (key !== 'base_year') {
          year = parseInt(year) + 1
        }
        let newObj = {}
        newObj.year = year
        newObj.data = valuation[key]

        if (key === 'base_year') {
          newObj.year = 'Base'
        }

        if (key === 'terminal') {
          newObj.year = 'Terminal'
        }

        tempArr.push(newObj)
      }
    })
    return tempArr
  }

  const getValuationOutput = () => {
    if (valuationOutputFilter === 'manual') {
      setValuationOutput(manualChartData)
      setEstimatedValue(allManualData?.valuationOutput)
    } else {
      let newObj = {}

      const tempValuationOutput =
        companyValuation?.YearlyValuationOutputs.filter((element) => {
          if (element.case === 'base' && element.field_name === 'Revenues') {
            let temp = (element.terminal / revenueData) * Math.pow(1 + 2.8, 11)
            temp = temp ? temp.toFixed(2) : ''
            newObj.base = temp
          }
          if (element.case === 'best' && element.field_name === 'Revenues') {
            let temp = (element.terminal / revenueData) * Math.pow(1 + 2.8, 11)
            temp = temp ? temp.toFixed(2) : ''
            newObj.best = temp
          }
          if (element.case === 'worst' && element.field_name === 'Revenues') {
            let temp = (element.terminal / revenueData) * Math.pow(1 + 2.8, 11)
            temp = temp ? temp.toFixed(2) : ''
            newObj.worst = temp
          }
          return element.case === valuationOutputFilter
        })

      if (tempValuationOutput) {
        tempValuationOutput.sort((a, b) => a?.display_order - b?.display_order)
      }
      setTerminalMarketSales((prevValue) => {
        return { prevValue, ...newObj }
      })

      setValuationOutput(tempValuationOutput)

      companyValuation?.ValuationOutputs.forEach((element) => {
        if (element.case === valuationOutputFilter) {
          setEstimatedValue(element)
          setPercent(
            (
              ((element?.estimated_share - element?.price) / element?.price) *
              100
            ).toFixed(2)
          )
        }
      })
    }
  }

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props
    const radius = 10

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill='#000'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize={10}
        >
          {value ? `$${millionToBillionConvert(value)}` : ''}
        </text>
      </g>
    )
  }

  const renderCustomizedLabelPrice = (props) => {
    const { x, y, width, height, value } = props
    const radius = 10

    return (
      <g>
        <text
          x={x}
          y={y - 20}
          fill='#000'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize={10}
        >
          {value ? `$${value}` : ''}
        </text>
      </g>
    )
  }

  const renderCustomizedLabelWithoutBillion = (props) => {
    const { x, y, width, height, value } = props
    const radius = 10

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill='#000'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize={10}
        >
          {value ? `$${value}` : ''}
        </text>
      </g>
    )
  }

  const handleManualParamChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setManualParam({ ...manualParam, [name]: parseInt(value) })
  }

  const getManualParamData = async () => {
    const manualData = await getManualValuationFCFFMData({
      ...manualParam,
      valuation_id: companyValuation.id
    })
    setAllManualData(manualData)
    if (manualData?.yearlyValuationOutput) {
      manualData?.yearlyValuationOutput.map((element) => {
        if (element.field_name === 'Revenues') {
          if (element.terminal) {
            let temp = (element.terminal / revenueData) * Math.pow(1 + 2.8, 11)
            temp = temp ? temp.toFixed(2) : ''
            setTerminalMarketSales((prevValue) => {
              return { ...prevValue, manual: temp }
            })
          }
        }
      })
      setManualChartData([...manualData?.yearlyValuationOutput])
      setManualButtonVisible(true)
    }
  }

  const CustomizedXAxisTick = (props) => {
    const { x, y, stroke, payload } = props

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={30} y={15} textAnchor='end' fill='#212121' fontSize={'12px'}>
          {payload.value}
        </text>
      </g>
    )
  }

  return (
    <>
      <div>
        <div className='col-lg-12'>
          <div className='row'>
            <div className='col-lg-12 mt-4'>
              <div className='d-flex align-items-center mb-3'>
                <h4 className='me-auto font-bd'>
                  Stock Forecast, Predictions &amp; Price Target
                </h4>
              </div>
            </div>
            <div className='col-lg-6'>
              <div>
                <div className='d-flex align-items-center mb-2'>
                  <h5 className='me-auto font-bd'>Basic Company Facts</h5>
                </div>
                <div className='row border-bottom mb-3'>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>Fiscal Year</div>
                    <span>
                      <b>
                        {companyValuation?.fiscal_year}{' '}
                        {companyValuation?.quarter}
                      </b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>Company Ticker</div>
                    <span>
                      <b>{data?.ticker}</b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Incorporation Cou...
                    </div>
                    <span>
                      <b>{data?.incorporation_country}</b>
                    </span>
                  </div>
                </div>
                <div className='row border-bottom mb-3'>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Valuation Currency
                    </div>
                    <span>
                      <b>{data?.valuation_currency}</b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>Sector (US)</div>
                    <span>
                      <a href='javascript:void(0)'>{companyQuote?.sector}</a>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>Industry (US)</div>
                    <span>
                      <a href='javascript:void(0)'>{companyQuote?.industry}</a>
                    </span>
                  </div>
                </div>
                <div className='row border-bottom mb-3'>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>Market Cap</div>
                    <span>
                      <b>
                        {companyQuote?.marketCap
                          ? `$${NormalFormat(companyQuote?.marketCap)}`
                          : '-'}
                      </b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Current Stock Price
                    </div>
                    <span>
                      <b>
                        {companyQuote?.price
                          ? `$${NormalFormat(companyQuote?.price)}`
                          : '-'}
                      </b>
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-2 mb-3'>
                <div className='d-flex align-items-center mb-2'>
                  <h5 className='me-auto font-bd'>
                    Current Fundamental Metrices
                  </h5>
                </div>
                <div className='row border-bottom mb-3'>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Pre-tax operating margin
                    </div>
                    <span>
                      <b>
                        {companyValuation &&
                        companyValuation.CompanyGrowths[0] &&
                        companyValuation.CompanyGrowths[0]
                          ?.pre_tax_op_margin_base
                          ? `${companyValuation.CompanyGrowths[0]?.pre_tax_op_margin_base}%`
                          : ''}
                      </b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Sales to capital ratio
                    </div>
                    <span>
                      <b>{companyValuation?.sales_capital_ratio}</b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Return on invested capital
                    </div>
                    <span>
                      <b>{roic ? `${roic}%` : '-'}</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-2 mb-3'>
                <div className='d-flex align-items-center mb-2'>
                  <h5 className='me-auto font-bd'>Current Financials</h5>
                </div>
                <div className='row border-bottom mb-3'>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>Revenues</div>
                    <span>
                      <b>
                        {companyValuation?.revenues
                          ? `$${millionToBillionConvert(
                              companyValuation?.revenues
                            )}`
                          : '-'}
                      </b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Income Before Interest & Tax
                    </div>
                    <span>
                      <b>
                        {companyValuation?.operating_income_ebit
                          ? `$${millionToBillionConvert(
                              companyValuation?.operating_income_ebit
                            )}`
                          : '-'}
                      </b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Shareholders Equity
                    </div>
                    <span>
                      <b>
                        {companyValuation?.equity_book_value
                          ? `$${millionToBillionConvert(
                              companyValuation?.equity_book_value
                            )}`
                          : '-'}
                      </b>
                    </span>
                  </div>
                </div>
                <div className='row border-bottom mb-3'>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>Total Debt</div>
                    <span>
                      <b>
                        {companyValuation?.debit_book_value
                          ? `$${millionToBillionConvert(
                              companyValuation?.debit_book_value
                            )}`
                          : '-'}
                      </b>
                    </span>
                  </div>
                  <div className='col-lg-4 col-md-4'>
                    <div className='title-lt fixed-margin'>
                      Invested capital
                    </div>
                    <span>
                      <b>
                        {invested
                          ? `$${millionToBillionConvert(invested)}`
                          : '-'}
                      </b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='price_chart mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>InvexAI Past Predictions</h5>
                </div>

                {pastPredictionGraphData && (
                  <ResponsiveContainer width='100%' aspect={1} maxHeight={440}>
                    <ComposedChart
                      data={pastPredictionGraphData}
                      tick={false}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}
                    >
                      <XAxis
                        tickLine={false}
                        dataKey='year'
                        domain={['auto', 'auto']}
                        tick={<CustomizedXAxisTick />}
                        height={60}
                        interval={0}
                      />
                      <YAxis
                        tickLine={false}
                        tick={{
                          fill: '#212121',
                          fontSize: '12px'
                        }}
                        domain={[
                          (dataMin) => Math.round(dataMin - 20),
                          (dataMax) => Math.round(dataMax + 20)
                        ]}
                      />
                      <Tooltip
                        labelStyle={{ fontSize: '12px' }}
                        itemStyle={{ fontSize: '12px' }}
                        contentStyle={{ padding: '10px' }}
                      />

                      <Scatter
                        name='Best'
                        dataKey='best'
                        fill='#13A41B'
                        shape={<CustomizedScatterRoundShape />}
                      />
                      <Scatter
                        name='Base'
                        dataKey='base'
                        fill='#F3C00E'
                        shape={<CustomizedScatterRoundShape />}
                      />
                      <Scatter
                        name='Worst'
                        dataKey='worst'
                        fill='#DF0822'
                        shape={<CustomizedScatterRoundShape />}
                      />
                      <Scatter
                        name='Actual Price'
                        dataKey='actualPrice'
                        fill='#3751FF'
                      />
                      <ZAxis range={[540, 540]} />
                      <Legend
                        wrapperStyle={{
                          fontSize: '12px'
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-6'>
            <div className='top_competitors'>
              <div className='mb-4'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <h5 className='me-auto font-bd'>Valuation Assumptions</h5>
                </div>
                <div className='table-responsive'>
                  <table className='table table-bordered table-striped m-0 most_tables normal_table'>
                    <thead className='bold-heading'>
                      <tr>
                        <th scope='col'>-</th>
                        <th scope='col'>Best</th>
                        <th scope='col'>Base</th>
                        <th scope='col'>Worst</th>
                        <th scope='col'>Manual</th>
                      </tr>
                    </thead>
                    <tbody className='border-top-0'>
                      <tr>
                        <td>Growth This Year</td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]?.gr_this_year_best
                            ? `${companyValuation.CompanyGrowths[0]?.gr_this_year_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]?.gr_this_year_base
                            ? `${companyValuation.CompanyGrowths[0]?.gr_this_year_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]?.gr_this_year_worst
                            ? `${companyValuation.CompanyGrowths[0]?.gr_this_year_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='gr_this_year_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Growth Next Year</td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]?.gr_next_year_best
                            ? `${companyValuation.CompanyGrowths[0]?.gr_next_year_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]?.gr_next_year_base
                            ? `${companyValuation.CompanyGrowths[0]?.gr_next_year_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]?.gr_next_year_worst
                            ? `${companyValuation.CompanyGrowths[0]?.gr_next_year_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='gr_next_year_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Compound Annual Revenue Growth Rate For Year 3-5
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.compounded_revenue_growth_best
                            ? `${companyValuation.CompanyGrowths[0]?.compounded_revenue_growth_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.compounded_revenue_growth_base
                            ? `${companyValuation.CompanyGrowths[0]?.compounded_revenue_growth_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.compounded_revenue_growth_worst
                            ? `${companyValuation.CompanyGrowths[0]?.compounded_revenue_growth_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='compounded_revenue_growth_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Operating Margin This Year</td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_first_year_best !== ''
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_first_year_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_first_year_base !== ''
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_first_year_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_first_year_worst !== ''
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_first_year_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='op_margin_first_year_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Operating Margin Next Year</td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_next_year_best
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_next_year_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_next_year_base
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_next_year_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_next_year_worst
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_next_year_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='op_margin_next_year_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Operating Margin Year 3-5</td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_five_year_best
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_five_year_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_five_year_base
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_five_year_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.op_margin_five_year_worst
                            ? `${companyValuation.CompanyGrowths[0]?.op_margin_five_year_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='op_margin_five_year_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Target Operating Margin</td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.pre_tax_op_margin_best
                            ? `${companyValuation.CompanyGrowths[0]?.pre_tax_op_margin_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.pre_tax_op_margin_base
                            ? `${companyValuation.CompanyGrowths[0]?.pre_tax_op_margin_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation.CompanyGrowths[0] &&
                          companyValuation.CompanyGrowths[0]
                            ?.pre_tax_op_margin_worst
                            ? `${companyValuation.CompanyGrowths[0]?.pre_tax_op_margin_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='pre_tax_op_margin_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Cost Of Capital</td>
                        <td>
                          {companyValuation && companyValuation?.cost_of_capital
                            ? `${companyValuation?.cost_of_capital}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation && companyValuation?.cost_of_capital
                            ? `${companyValuation?.cost_of_capital}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation && companyValuation?.cost_of_capital
                            ? `${companyValuation?.cost_of_capital}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='cost_of_capital'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Risk Free Rate</td>
                        <td>
                          {companyValuation &&
                          companyValuation?.CompanyGrowths[0] &&
                          companyValuation?.CompanyGrowths[0]
                            ?.risk_free_rate_best
                            ? `${companyValuation?.CompanyGrowths[0]?.risk_free_rate_best}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation?.CompanyGrowths[0] &&
                          companyValuation?.CompanyGrowths[0]
                            ?.risk_free_rate_base
                            ? `${companyValuation?.CompanyGrowths[0]?.risk_free_rate_base}%`
                            : '-'}
                        </td>
                        <td>
                          {companyValuation &&
                          companyValuation?.CompanyGrowths[0] &&
                          companyValuation?.CompanyGrowths[0]
                            ?.risk_free_rate_worst
                            ? `${companyValuation?.CompanyGrowths[0]?.risk_free_rate_worst}%`
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ width: '50px' }}
                            type='number'
                            name='risk_free_rate_man'
                            onChange={handleManualParamChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='top_competitors'>
              <div className='mb-4'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <h5 className='me-auto font-bd'>
                    Valuation Diagnostic
                    <i
                      className='bi bi-info-circle m-1'
                      data-toggle='tooltip'
                      title={VALUATION_DIAGNOSTICS_TOOLTIP}
                    ></i>
                  </h5>
                </div>
                <div className='table-responsive'>
                  <table className='table table-bordered table-striped m-0 most_tables normal_table'>
                    <thead className='bold-heading'>
                      <tr>
                        <th scope='col'>Total Market Sales Of the Industry</th>
                        <th scope='col'>
                          {revenueData ? NormalFormat(revenueData) : ''}
                        </th>
                        <th scope='col'></th>
                        <th scope='col'></th>
                        <th scope='col'> </th>
                      </tr>
                    </thead>
                    <tbody className='border-top-0'>
                      <tr>
                        <td>Current Market Sales Share of the Company</td>
                        <td>
                          {marketSalesPercentage
                            ? `${marketSalesPercentage.toFixed(2)}%`
                            : ''}{' '}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Expected Sales Growth of the Industry</td>
                        <td>
                          <input
                            style={{ width: '60px' }}
                            type='number'
                            value='0'
                          />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Terminal Market Sales Share of the Company</td>
                        <td className='font-weight-700'>Best</td>
                        <td className='font-weight-700'>Base</td>
                        <td className='font-weight-700'>Worst</td>
                        <td className='font-weight-700'>Manual</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          {terminalMarketSales.best
                            ? `${terminalMarketSales.best}%`
                            : ''}
                        </td>
                        <td>
                          {terminalMarketSales.base
                            ? `${terminalMarketSales.base}%`
                            : ''}
                        </td>
                        <td>
                          {terminalMarketSales.worst
                            ? `${terminalMarketSales.worst}%`
                            : ''}
                        </td>
                        <td>
                          {terminalMarketSales.manual
                            ? `${terminalMarketSales.manual}%`
                            : ''}
                        </td>
                      </tr>
                      <tr>
                        <td>Operating Margin Of the Industry</td>
                        <td className='font-weight-700'>25th</td>
                        <td className='font-weight-700'>50th(Median)</td>
                        <td className='font-weight-700'>75th</td>
                        <td className='font-weight-700'>90th</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          {operatingMarginOfIndustry.percentile25
                            ? `${operatingMarginOfIndustry.percentile25.toFixed(
                                2
                              )}%`
                            : ''}
                        </td>
                        <td>
                          {operatingMarginOfIndustry.percentile50
                            ? `${operatingMarginOfIndustry.percentile50.toFixed(
                                2
                              )}%`
                            : ''}
                        </td>
                        <td>
                          {operatingMarginOfIndustry.percentile75
                            ? `${operatingMarginOfIndustry.percentile75.toFixed(
                                2
                              )}%`
                            : ''}
                        </td>
                        <td>
                          {operatingMarginOfIndustry.percentile90
                            ? `${operatingMarginOfIndustry.percentile90.toFixed(
                                2
                              )}%`
                            : ''}
                        </td>
                      </tr>
                      <tr>
                        <td>10Y Treasury Rate</td>
                        <td>3.02%</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Real GDP Of US</td>
                        <td>2.80%</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-12 mb-4'>
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <h5 className='me-auto font-bd'>Valuation Output Base</h5>

            <div className='d-flex align-items-center justify-content-start'>
              <label className='mb-3 pb-2' htmlFor>
                Choose the case
              </label>
              <div className='top_button_panel top_button_panel_light mb-3'>
                {CASE_FILTER &&
                  CASE_FILTER.map((caseElement) => {
                    if (caseElement.value !== 'manual') {
                      return (
                        <button
                          type='button'
                          onClick={() =>
                            setValuationOutputFilter(caseElement.value)
                          }
                          className={`btn ${
                            valuationOutputFilter === caseElement.value
                              ? 'btn-info'
                              : 'btn-light'
                          }`}
                        >
                          {caseElement.label}
                        </button>
                      )
                    } else if (
                      caseElement.value === 'manual' &&
                      manualButtonVisible
                    ) {
                      return (
                        <button
                          type='button'
                          onClick={() =>
                            setValuationOutputFilter(caseElement.value)
                          }
                          className={`btn ${
                            valuationOutputFilter === caseElement.value
                              ? 'btn-info'
                              : 'btn-light'
                          }`}
                        >
                          {caseElement.label}
                        </button>
                      )
                    }
                  })}
              </div>
            </div>
          </div>
          <div
            className={`scenario justify-content-between ${
              calculatedPercentage > 0 ? 'down' : 'up'
            }`}
          >
            <span className='best_scena up-down-bg-color'>
              Estimated value / share
            </span>
            <div className='chart-text'>
              <p className='card-text up-down-color m-0'>
                <strong>
                  {estimatedValue?.estimated_share
                    ? `$${estimatedValue?.estimated_share.toFixed(2)}`
                    : '-'}
                </strong>
              </p>
              <p className='text up-down-color m-0 ms-2'>
                {calculatedPercentage
                  ? `(${
                      calculatedPercentage > 0
                        ? 'Overvalued by'
                        : 'Undervalued by'
                    } ${Math.abs(calculatedPercentage)}%)`
                  : ''}
              </p>
            </div>
            <div className='text-end text-black'>
              <p className='m-0'>
                <small>
                  Estimated value of equity:{' '}
                  {estimatedValue?.value_of_equity
                    ? `${millionToBillionConvert(
                        estimatedValue?.value_of_equity
                      )}`
                    : '-'}
                </small>
              </p>
              <p className='m-0'>
                <small>
                  Current price:{' '}
                  {companyQuote?.price
                    ? `$${NormalFormat(companyQuote?.price)}`
                    : '-'}
                </small>
              </p>
            </div>
          </div>
        </div>

        <div className='col-lg-12'>
          <div className='top_competitors'>
            <div className='mb-3'>
              <div className='table-responsive'>
                {valuationOutput && (
                  <table className='table table-bordered table-striped m-0 most_tables normal_table'>
                    <thead className='bold-heading'>
                      <tr>
                        <th scope='col'>-</th>
                        {operatingIncomeData &&
                          operatingIncomeData.map((heading) => {
                            return <th scope='col'>{heading.year}</th>
                          })}
                      </tr>
                    </thead>
                    <tbody className='border-top-0'>
                      {valuationOutput.map((row) => {
                        return (
                          <>
                            {validTableColumns.includes(row?.field_name) && (
                              <tr>
                                <td>
                                  {row?.field_name &&
                                  row?.field_name === 'PV(FCFF)'
                                    ? 'FCFF Present Value'
                                    : capitalizeFirstLetterOfEachWord(
                                        replaceEmpty(row?.field_name)
                                      )}
                                </td>
                                {yearArr &&
                                  yearArr.map((year) => {
                                    return (
                                      <td>
                                        {row[year] ? row[year].toFixed(2) : '-'}
                                      </td>
                                    )
                                  })}
                              </tr>
                            )}
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='price_chart mt-3 mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>Revenue & Growth Rate</h5>
                </div>
                {revenueGraphData && revenueGraphData.length > 0 && (
                  <div className='col-lg-12 mt-3'>
                    <ResponsiveContainer
                      width='100%'
                      aspect={1}
                      maxHeight={400}
                    >
                      <ComposedChart data={revenueGraphData} tick={false}>
                        <XAxis
                          tickLine={false}
                          dataKey='year'
                          domain={['auto', 'auto']}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          interval={0}
                        />
                        <YAxis
                          tickLine={false}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          domain={['auto', 'dataMax + 1000']}
                        />
                        <Tooltip
                          labelStyle={{ fontSize: '12px' }}
                          itemStyle={{ fontSize: '12px' }}
                          contentStyle={{ padding: '10px' }}
                          content={<CustomTooltip />}
                        />

                        <Bar
                          name='Revenues'
                          fill='#3751FF'
                          dataKey='data2'
                          barSize={25}
                        ></Bar>
                        <Line
                          name='Revenue growth rate'
                          type='monotone'
                          dataKey='data2'
                          stroke='#F3C00E'
                          label={
                            <CustomizedGrowthRateLabelV2MiddleWithData
                              data={revenueGraphData}
                            />
                          }
                        />

                        <Legend
                          wrapperStyle={{
                            bottom: -20,
                            left: 25,
                            fontSize: '12px'
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='price_chart mt-3 mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>
                    Operating Income & Operating Margin
                  </h5>
                </div>
                {operatingIncomeData && (
                  <div className='col-lg-12 mt-3'>
                    <ResponsiveContainer
                      width='100%'
                      aspect={1}
                      maxHeight={400}
                    >
                      <ComposedChart data={operatingIncomeData} tick={false}>
                        <XAxis
                          tickLine={false}
                          dataKey='year'
                          domain={['auto', 'auto']}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          interval={0}
                        />
                        <YAxis
                          tickLine={false}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          domain={['auto', 'dataMax + 1000']}
                        />
                        <Tooltip
                          labelStyle={{ fontSize: '12px' }}
                          itemStyle={{ fontSize: '12px' }}
                          contentStyle={{ padding: '10px' }}
                          content={<CustomTooltip2 />}
                        />

                        <Bar
                          name='Operating Income'
                          fill='#3751FF'
                          dataKey='data2'
                          barSize={25}
                        ></Bar>

                        <Line
                          name='Operating Margin'
                          type='monotone'
                          dataKey='data2'
                          stroke='#F3C00E'
                          label={
                            <CustomizedGrowthRateLabelV2AboveLine
                              data={operatingIncomeData}
                            />
                          }
                        />

                        <Legend
                          wrapperStyle={{
                            bottom: -20,
                            left: 25,
                            fontSize: '12px'
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='price_chart mt-1 mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>Reinvestments</h5>
                </div>
                {reinvestmentData && (
                  <div className='col-lg-12 mt-3'>
                    <ResponsiveContainer
                      width='100%'
                      aspect={1}
                      maxHeight={400}
                    >
                      <ComposedChart data={reinvestmentData} tick={false}>
                        <XAxis
                          tickLine={false}
                          dataKey='year'
                          domain={['auto', 'auto']}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          interval={0}
                        />
                        <YAxis
                          tickLine={false}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                        />
                        <Tooltip
                          labelStyle={{ fontSize: '12px' }}
                          itemStyle={{ fontSize: '12px' }}
                          contentStyle={{ padding: '10px' }}
                        />

                        <Bar
                          name='Reinvestments'
                          fill='#3751FF'
                          dataKey='data'
                          barSize={25}
                        >
                          <LabelList
                            dataKey='data'
                            content={renderCustomizedLabel}
                          />
                        </Bar>

                        <Line
                          name='Reinvestments'
                          type='monotone'
                          dataKey='data'
                          stroke='#f222f2'
                        />

                        <Legend
                          wrapperStyle={{
                            bottom: -20,
                            left: 25,
                            fontSize: '12px'
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='price_chart mt-1 mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>
                    Free Cash Flow To Firm (FCFF)
                  </h5>
                </div>
                {freeCashFlowData && (
                  <div className='col-lg-12 mt-3'>
                    <ResponsiveContainer
                      width='100%'
                      aspect={1}
                      maxHeight={400}
                    >
                      <ComposedChart data={freeCashFlowData} tick={false}>
                        <XAxis
                          tickLine={false}
                          dataKey='year'
                          domain={['auto', 'auto']}
                          // ticks={ticks}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          interval={0}
                        />
                        <YAxis
                          tickLine={false}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                        />
                        <Tooltip
                          labelStyle={{ fontSize: '12px' }}
                          itemStyle={{ fontSize: '12px' }}
                          contentStyle={{ padding: '10px' }}
                        />

                        <Bar
                          name='Free Cash Flow To Firm'
                          fill='#3751FF'
                          dataKey='data'
                          barSize={25}
                        >
                          <LabelList
                            dataKey='data'
                            content={renderCustomizedLabel}
                          />
                        </Bar>

                        <Line
                          name='Free Cash Flow To Firm'
                          tooltipType=''
                          type='monotone'
                          dataKey='data'
                          stroke='#f222f2'
                        />

                        <Legend
                          wrapperStyle={{
                            bottom: -20,
                            left: 25,
                            fontSize: '12px'
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='price_chart mt-1 mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>
                    FCFF Present Value & Cost of capital
                  </h5>
                </div>
                {costOfCapitalGraphData && costOfCapitalGraphData.length > 0 && (
                  <div className='col-lg-12 mt-3'>
                    <ResponsiveContainer
                      width='100%'
                      aspect={1}
                      maxHeight={400}
                    >
                      <ComposedChart data={costOfCapitalGraphData} tick={false}>
                        <XAxis
                          tickLine={false}
                          dataKey='year'
                          domain={['auto', 'auto']}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          interval={0}
                        />
                        <YAxis
                          tickLine={false}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          domain={['auto', 'dataMax + 3000']}
                        />
                        <Tooltip
                          labelStyle={{ fontSize: '12px' }}
                          itemStyle={{ fontSize: '12px' }}
                          contentStyle={{ padding: '10px' }}
                          content={<CustomTooltip />}
                        />

                        <Bar
                          name='Cost of capital'
                          fill='#3751FF'
                          dataKey='data2'
                          barSize={25}
                        ></Bar>
                        <Line
                          name='FCFF Present Value'
                          type='monotone'
                          dataKey='data2'
                          stroke='#F3C00E'
                          label={
                            <CustomizedGrowthRateLabelV2AboveLine
                              data={costOfCapitalGraphData}
                            />
                          }
                        />

                        <Legend
                          wrapperStyle={{
                            bottom: -20,
                            left: 25,
                            fontSize: '12px'
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='price_chart mt-1 mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>
                    Invested Capitals & Implied ROIC
                  </h5>
                </div>
                {investedCapitalData && (
                  <div className='col-lg-12 mt-3'>
                    <ResponsiveContainer
                      width='100%'
                      aspect={1}
                      maxHeight={400}
                    >
                      <ComposedChart data={investedCapitalData} tick={false}>
                        <XAxis
                          tickLine={false}
                          dataKey='year'
                          domain={['auto', 'auto']}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          interval={0}
                        />
                        <YAxis
                          tickLine={false}
                          tick={{
                            fill: '#212121',
                            fontSize: '12px'
                          }}
                          domain={['auto', 'dataMax + 8000']}
                        />
                        <Tooltip
                          labelStyle={{ fontSize: '12px' }}
                          itemStyle={{ fontSize: '12px' }}
                          contentStyle={{ padding: '10px' }}
                          content={<CustomTooltip2 />}
                        />

                        <Bar
                          name='Invested Capital'
                          fill='#3751FF'
                          dataKey='data2'
                          barSize={25}
                        ></Bar>

                        <Line
                          name='Implied ROIC'
                          type='monotone'
                          dataKey='data2'
                          stroke='#F3C00E'
                          label={
                            <CustomizedGrowthRateLabelV2AboveLine
                              data={investedCapitalData}
                            />
                          }
                        />

                        <Legend
                          wrapperStyle={{
                            bottom: -20,
                            left: 25,
                            fontSize: '12px'
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='price_chart mt-1 mb-5'>
                <div className='d-flex align-items-center mb-3'>
                  <h5 className='me-auto font-bd'>Price Target</h5>
                </div>
                {priceTargetData &&
                  Array.isArray(priceTargetData) &&
                  priceTargetData.length > 0 && (
                    <div className='col-lg-12 mt-3'>
                      <ResponsiveContainer
                        width='100%'
                        aspect={1}
                        maxHeight={400}
                      >
                        <AreaChart
                          data={priceTargetData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id='colorUv'
                              x1='0'
                              y1='0'
                              x2='0'
                              y2='1'
                            >
                              <stop
                                offset='5%'
                                stopColor='#8884d8'
                                stopOpacity={0.8}
                              />
                              <stop
                                offset='95%'
                                stopColor='#8884d8'
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id='colorPv'
                              x1='0'
                              y1='0'
                              x2='0'
                              y2='1'
                            >
                              <stop
                                offset='5%'
                                stopColor='#82ca9d'
                                stopOpacity={0.8}
                              />
                              <stop
                                offset='95%'
                                stopColor='#82ca9d'
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            tickLine={false}
                            dataKey='year'
                            tick={{
                              fill: '#212121',
                              fontSize: '12px'
                            }}
                            interval={0}
                          />
                          <YAxis
                            tickLine={false}
                            tick={{
                              fill: '#212121',
                              fontSize: '12px'
                            }}
                            domain={['auto', 'dataMax + 10']}
                          />
                          <Tooltip
                            labelStyle={{ fontSize: '12px' }}
                            itemStyle={{ fontSize: '12px' }}
                            contentStyle={{ padding: '10px' }}
                          />
                          <Area
                            name='Price Target'
                            connectNulls
                            type='monotone'
                            dataKey='data'
                            stroke='#82ca9d'
                            fillOpacity={1}
                            fill='url(#colorPv)'
                          >
                            <LabelList
                              dataKey='data'
                              content={renderCustomizedLabelPrice}
                            />
                          </Area>

                          <Legend
                            wrapperStyle={{
                              bottom: -20,
                              left: 25,
                              fontSize: '12px'
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='mb-4'>
                <div className=''>
                  <div className='d-flex align-items-center mb-3'>
                    <h5 className='me-auto font-bd'>
                      Revenue segment performance
                    </h5>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: companyValuation?.revenue_segments
                        ? companyValuation?.revenue_segments
                        : '-'
                    }}
                  />
                </div>
              </div>
              <div className='mb-4'>
                <div className=''>
                  <div className='d-flex align-items-center mb-3'>
                    <h5 className='me-auto font-bd'>Analyst Notes</h5>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: companyValuation?.valuation_notes
                        ? companyValuation?.valuation_notes
                        : '-'
                    }}
                  />
                </div>
              </div>

              <div className='mb-4'>
                <div className=''>
                  <div className='d-flex align-items-center mb-3'>
                    <h5 className='me-auto font-bd'>Risk</h5>
                  </div>
                  <div
                    className='mt-3'
                    dangerouslySetInnerHTML={{
                      __html: companyValuation?.risk
                        ? companyValuation?.risk
                        : '-'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-12 mb-5'>
          <div className='mb-4'>
            <div className=''>
              <div className='d-flex align-items-center mb-3'>
                <h5 className='me-auto font-bd'>Additional Notes</h5>
              </div>
              <div
                className='mt-3'
                dangerouslySetInnerHTML={{
                  __html: companyValuation?.additional_notes
                    ? companyValuation?.additional_notes
                    : '-'
                }}
              />
            </div>
          </div>
          <div className='mb-4'>
            <div className=''>
              <div className='d-flex align-items-center mb-3'>
                <h5 className='me-auto font-bd'>Notes For The Professionals</h5>
              </div>
              <ul className='mt-3'>
                <li>
                  The above estimations are derived from the Free Cash Flow To
                  Firm Valuation.
                </li>
                <li>
                  We considered the Research &amp; Development expenses as
                  Capital Expense rather than operating expense. Hence, we
                  capitalized the R&amp;D, therefore the current operating
                  margin shown by us may vary with the margin as reported by the
                  company.
                </li>
                <li>
                  The company’s Options outstanding(if any) has been taken into
                  account in the valuation.
                </li>
                <li>
                  Since we cannot estimate cash flows forever, we estimated cash
                  flows for a “growth period” and then estimated a TERMINAL
                  VALUE(not shown in cash flow), to capture the value at the end
                  of the period.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ValuationFCFFM;
