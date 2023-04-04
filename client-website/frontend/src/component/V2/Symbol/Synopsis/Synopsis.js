import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getCompanyProfileQuote,
  getCompanyStockPeers,
  getHistoricalPriceChart,
  getStockDividend,
  getEarnings,
  getStockPriceChange,
  getETFStockData,
} from '../../../api/Symbol';
import abbreviateNumber from '../../../Common/NumberFormat';
import ReadMore from '../../../Common/ReadMore/ReadMore';
import { TOP_COMPETITOR_COLUMNS } from '../Constants';
import { replaceEmpty } from '../../../Common/CommonFunctions';
import ArrowRight from '../../../Common/Images/arrow-right.png';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ComposedChart,
  Line,
  Scatter,
  Legend,
  ZAxis,
  PieChart,
  Cell,
  Pie,
  Sector,
} from 'recharts';
import InvexRoutes from '../../../../InvexRoutes';
import { CHART_TIME_DURATION, DATE_FORMAT } from '../../../Common/Constants';
import { convertDateFormat } from '../../../Common/DateFunctions';
import SynopsisNews from './SynopsisNews';
import { CustomizedScatterRoundShape } from '../../../Common/Chart/Recharts';
import InvexLoader from '../../../Common/InvexLoader';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_exporting from 'highcharts/modules/exporting'

const Synopsis = ({ onChangeTab }) => {
  HC_exporting(Highcharts)

  const { symbol } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [topCompetitors, setTopCompetitors] = useState(null)
  const [chartPeriod, setChartPeriod] = useState('1d') //1d,1w,1m,1y,5y,max
  const [companyEssentialsData, setCompanyEssentialsData] = useState(null)
  const [isChartLoading, setIsChartLoading] = useState(false)
  const [dividendChart, setDividendChart] = useState(null)
  const [earningsChart, setEarningsChart] = useState(null)
  const [dividendChartLoading, setDividendChartLoading] = useState(false)
  const [earningsChartLoading, setEarningsChartLoading] = useState(false)
  const [stockPriceData, setStockPriceData] = useState(null)
  const [absoluteReturn, setAbsoluteReturn] = useState(null)
  const [etfData, setEtfData] = useState(null)

  const PIE_CHART_COLORS = [
    '#12239E',
    '#E66C37',
    '#6B007B',
    '#E044A7',
    '#744EC2',
    '#D9B300',
    '#D64550',
    '#197278',
    '#1AAB40',
    '#118DFF'
  ]

  useEffect(() => {
    ;(async () => {
      if (symbol) {
        setIsLoading(true)

        try {
          const resp = await Promise.all([
            getCompanyProfileQuote({ symbol: symbol }),
            getCompanyStockPeers({ symbol: symbol })
          ])

          const data = resp[0]
          const data2 = resp[1]
          if (data && data.status == 200 && data.data) {
            setData(data.data)
          }
          if (
            data2 &&
            data2.status == 200 &&
            data2.data &&
            data2.data[0] &&
            data2.data[0].peersList
          ) {
            Promise.all(
              data2.data[0].peersList.map((company) => {
                return getCompanyProfileQuote({ symbol: company })
              })
            ).then((values) => {
              const tableData = values.map((value) => {
                return value.data
              })
              setTopCompetitors(tableData)
            })
          }
        } catch {
          setTopCompetitors(null)
        }

        setDividendChartLoading(true)

        try {
          const dividend = await getStockDividend({ symbol: symbol })
          if (
            dividend.status === 200 &&
            dividend.data &&
            dividend.data.historical
          ) {
            if (dividend.data.historical.length > 5) {
              const temp = dividend.data.historical.slice(0, 10)
              temp.reverse()
              setDividendChart(temp)
            }
          }
        } catch {
          setDividendChart(null)
        }

        setDividendChartLoading(false)

        setEarningsChartLoading(true)

        try {
          const earnings = await getEarnings({ symbol: symbol.toUpperCase() })

          if (earnings && earnings.status === 200 && earnings.data) {
            if (earnings.data.length > 5) {
              const temp = earnings.data.slice(0, 5)
              temp.reverse()
              setEarningsChart(temp)
            }
          }
        } catch {
          setEarningsChart(null)
        }

        try {
          const priceChange = await getStockPriceChange({ symbol: symbol })
          if (priceChange && priceChange.status === 200 && priceChange?.data) {
            setStockPriceData(priceChange?.data)
            const temp = priceChange?.data['1D']
              ? priceChange?.data['1D'].toFixed(2)
              : ''
            setAbsoluteReturn(temp)
          }
        } catch (error) {}

        try {
          const etf = await getETFStockData({ symbol: symbol })
          if (etf && etf.data && etf.status === 200) {
            const tempData = etf.data.slice(0, 10)
            setEtfData(tempData)
          }
        } catch (error) {}

        setIsLoading(false)

        setEarningsChartLoading(false)
      }
    })()
  }, [symbol])

  useEffect(() => {
    if (symbol) {
      getCompanyEssentialsChartData()
    }
    if (chartPeriod && stockPriceData) {
      if (chartPeriod === '1w') {
        setAbsoluteReturn(null)
      } else {
        const tempPeriod =
          chartPeriod === 'max' ? chartPeriod : chartPeriod.toUpperCase()
        const tempReturn = stockPriceData[tempPeriod]
        setAbsoluteReturn(tempReturn)
      }
    }
  }, [chartPeriod])

  const getCompanyEssentialsChartData = async () => {
    setIsChartLoading(true)

    try {
      const chartResp = await getHistoricalPriceChart({
        symbol: symbol,
        period: chartPeriod
      })

      if (chartResp && chartResp.status === 200) {
        if (chartPeriod === '1d') {
          const chart = chartResp?.data
          var tempArr = []
          const areaData = []

          tempArr = chart?.map((el, i) => {
            const temp = []
            el.close = el?.close ? el?.close.toFixed(2) : ''
            temp.push(Date.parse(el.date))
            temp.push(parseFloat(el?.close))
            areaData.push(temp)
          })
          let currentColor = `${
            data?.price > data?.open ? '#82ca9d' : '#DF0822'
          }`
          let areaChart = {
            title: {
              text: ''
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false
                },
                states: {
                  hover: {
                    enabled: false
                  }
                }
              }
            },
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: ''
              }
            },
            // tooltip: { pointFormat: '<b>{point.billion}</b>' },
            tooltip: {
              formatter: function () {
                return `${Highcharts.dateFormat(
                  '%e - %b - %Y %H:%M',
                  new Date(this.x)
                )}<br/> <big><b>${this.series.name}: ${this.y}</b></big>  `
              }
            },
            legend: {
              enabled: false
            },
            credits: {
              enabled: false
            },
            chart: {
              height: '300px'
            },
            series: [
              {
                name: symbol,
                type: 'area',
                data: areaData,
                gapSize: 5,
                tooltip: {
                  valueDecimals: 2
                },
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [
                    [0, currentColor],
                    [
                      1,
                      Highcharts.color(currentColor).setOpacity(0).get('rgba')
                    ]
                  ]
                },
                color: `${currentColor}`,
                threshold: null
              }
            ]
          }
          setCompanyEssentialsData({ ...areaChart })
        } else {
          const chart = chartResp?.data?.historical
          var tempArr = []
          const areaData = []

          tempArr = chart?.map((el, i) => {
            const temp = []
            temp.push(new Date(el?.date).getTime())
            temp.push(parseFloat(el?.close))
            areaData.push(temp)
          })
          let currentColor = `${
            data?.price > data?.open ? '#82ca9d' : '#DF0822'
          }`
          let areaChart = {
            title: {
              text: ''
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            chart: {
              height: '300px'
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false,
                  states: {
                    hover: {
                      enabled: false
                    }
                  }
                }
              }
            },
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: ''
              }
            },
            series: [
              {
                name: symbol,
                type: 'area',
                data: areaData,
                gapSize: 5,
                tooltip: {
                  valueDecimals: 2
                },
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [
                    [0, currentColor],
                    [
                      1,
                      Highcharts.color(currentColor).setOpacity(0).get('rgba')
                    ]
                  ]
                },
                color: `${currentColor}`,
                threshold: null
              }
            ]
          }
          setCompanyEssentialsData({ ...areaChart })
        }
      }
    } catch {
      setCompanyEssentialsData(null)
    }

    setIsChartLoading(false)
  }

  const CustomizedXAxisTick = (props) => {
    const { x, y, stroke, payload } = props

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={50}
          y={10}
          textAnchor='end'
          fill='#212121'
          fontSize={'10px'}
          transform='rotate(60)'
        >
          {convertDateFormat(payload.value)}
        </text>
      </g>
    )
  }

  const renderColorfulLegendText = (value, entry) => {
    return (
      <span
        style={{
          fontSize: 12,
          color: '#596579',
          fontWeight: 500,
          padding: '10px'
        }}
      >
        {entry.payload?.etfSymbol}
      </span>
    )
  }
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + outerRadius * cos
    const sy = cy + outerRadius * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <>
        <g>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke='#000'
            fill='none'
          />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill='#333'
          >
            {payload.payload.weightPercentage.toFixed(2)}%
          </text>
        </g>
      </>
    )
  }

  const CustomizedDot = (props) => {
    const { cx, cy, fill, payload, index } = props

    if (Object.keys(payload).length > 0) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r='12'
          stroke={fill}
          stroke-width='3'
          fill={
            payload.actualEarningResult < payload.estimatedEarning
              ? '#DF0822'
              : '#82ca9d'
          }
        />
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      {isLoading && <InvexLoader height='450px' />}

      {!isLoading && (
        <div>
          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='mt-4 mb-4'>
                  <h6 className='mb-4'>
                    <strong>Price Summary & Volume</strong>
                  </h6>
                  <div className='row border-bottom mb-3'>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>Open</div>
                      <span className='down'>
                        <b>{replaceEmpty(data?.open)}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        Previous Close
                      </div>
                      <span>
                        <b>{data?.previousClose}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>Today’s Low</div>
                      <span>
                        <b>{data?.dayLow}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>Today’s High</div>
                      <span>
                        <b>{data?.dayHigh}</b>
                      </span>
                    </div>
                  </div>
                  <div className='row border-bottom mb-3'>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>52 Week Low</div>
                      <span>
                        <b>{data?.yearLow ? data?.yearLow.toFixed(2) : '-'}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>52 Week High</div>
                      <span>
                        <b>
                          {data?.yearHigh ? data?.yearHigh.toFixed(2) : '-'}
                        </b>
                      </span>
                    </div>

                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin '>
                        Latest Volume
                      </div>
                      <span className='up'>
                        {/* up-light-bg */}
                        <b>{abbreviateNumber(data?.volume)}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        Average Volume
                      </div>
                      <span>
                        <b>{abbreviateNumber(data?.avgVolume)}</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='mt-4 mb-4'>
                  <h6 className='mb-4'>
                    <strong>Company Essentials</strong>
                  </h6>
                  <div className='row border-bottom mb-3'>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>Market Cap</div>
                      <span>
                        <b>{abbreviateNumber(data?.marketCap)}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        Shares Outstanding
                      </div>
                      <span>
                        <b>{abbreviateNumber(data?.sharesOutstanding)}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>EPS(TTM)</div>
                      <span>
                        <b>{data?.eps}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>Beta</div>
                      <span>
                        <b>{parseFloat(data?.beta).toFixed(2)}</b>
                      </span>
                    </div>
                  </div>
                  <div className='row border-bottom mb-3'>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        Enterprise Value
                      </div>
                      <span>
                        <b>
                          {data?.enterpriseValueMultipleTTM
                            ? data?.enterpriseValueMultipleTTM.toFixed(2)
                            : '-'}
                        </b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        Next Earnings Date
                      </div>
                      <span>
                        <b>{convertDateFormat(data?.earningsAnnouncement)}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        Dividend Rate(TTM)
                      </div>
                      <span>
                        <b>
                          {data?.dividendPerShareTTM
                            ? data?.dividendPerShareTTM.toFixed(2)
                            : '-'}
                        </b>
                      </span>
                    </div>

                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>PE Ratio</div>
                      <span>
                        <b>{parseFloat(data?.pe).toFixed(2)}</b>
                      </span>
                    </div>
                  </div>
                  <div className='row border-bottom mb-3'>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        52 Weeks Change
                      </div>
                      <span>
                        <b>
                          {stockPriceData && stockPriceData['1Y']
                            ? `${stockPriceData['1Y'].toFixed(2)}%`
                            : '-'}
                        </b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>
                        Ex-Dividend Date
                      </div>
                      <span>
                        <b>
                          {data?.exDividendDate
                            ? convertDateFormat(data?.exDividendDate)
                            : '-'}
                        </b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>IPO Date</div>
                      <span>
                        <b>{convertDateFormat(data?.ipoDate)}</b>
                      </span>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                      <div className='title-lt fixed-margin'>PB Ratio</div>
                      <span>
                        <b>
                          {data?.priceToBookRatioTTM
                            ? data?.priceToBookRatioTTM.toFixed(2)
                            : '-'}
                        </b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='price_chart mt-4 mb-4'>
                  <div className='d-flex align-items-center mb-4'>
                    <h5 className='me-auto'>
                      <strong>Price Chart</strong>
                    </h5>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='mb-3'>
                      <label htmlFor>Absolute Return</label>
                      <span
                        className={`p-1 ms-2 ${
                          absoluteReturn
                            ? absoluteReturn > 0
                              ? 'up-color up-bg-color'
                              : 'down-bg-color'
                            : ''
                        } `}
                      >
                        {absoluteReturn
                          ? absoluteReturn > 0
                            ? `+${absoluteReturn}%`
                            : `${absoluteReturn}%`
                          : '-'}
                      </span>
                    </div>
                    <div className='top_button_panel top_button_panel_light mb-3'>
                      {CHART_TIME_DURATION.map((duration, index) => {
                        return (
                          <button
                            key={index}
                            type='button'
                            className={`btn ${
                              chartPeriod === duration.value
                                ? 'btn-info'
                                : 'btn-light'
                            } `}
                            onClick={() => setChartPeriod(duration.value)}
                          >
                            {duration.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {isChartLoading && <InvexLoader height='250px' />}

                  {!isChartLoading && (
                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={companyEssentialsData}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-12 mb-4'>
            <div className='row'>
              <div className='col-lg-4 border-end pe-4'>
                {/* company profile box start*/}
                <div className='mb-4'>
                  <div className='description-para read-more-container'>
                    <h5 className='mb-4'>
                      <strong>Company Info</strong>
                    </h5>
                    <div className='key_status'>
                      <ReadMore text={data?.description} limit={250} />

                      <ul className='mt-3'>
                        <li>
                          <a href='javascript:void(0)'>Website</a>{' '}
                          <span>{data?.website}</span>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>Employees</a>{' '}
                          <span>
                            {abbreviateNumber(data?.fullTimeEmployees)}
                          </span>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>Country</a>{' '}
                          <span>{data?.country}</span>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>CEO</a>{' '}
                          <span>{data?.ceo}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* company profile box end*/}
              </div>
              <div className='col-lg-4 border-end pe-4'>
                <div className='d-flex align-items-center mb-4'>
                  <h5 className='me-auto'>
                    <strong>Earnings</strong>
                  </h5>
                  <div className='top_button_panel top_button_panel_light'>
                    <Link
                      to={InvexRoutes.Earnings.path.replace(':symbol', symbol)}
                    >
                      View More <img src={ArrowRight} />
                    </Link>
                  </div>
                </div>

                {earningsChartLoading && <InvexLoader height='200px' />}

                {!earningsChartLoading && (
                  <ResponsiveContainer width='100%' aspect={1} maxHeight={250}>
                    <ComposedChart
                      data={earningsChart}
                      margin={{
                        top: 20,
                        right: 40,
                        bottom: 20,
                        left: 20
                      }}
                    >
                      <XAxis
                        axisLine={false}
                        dataKey='date'
                        tick={{ fill: '#212121', fontSize: '10px' }}
                        tickFormatter={(date) => {
                          return convertDateFormat(date)
                        }}
                        padding={{ top: 20 }}
                        domain={['auto', 'auto']}
                        interval={0}
                      />
                      <YAxis
                        axisLine={false}
                        tick={{ fill: '#212121', fontSize: '10px' }}
                      />
                      <Tooltip />
                      <Legend wrapperStyle={{ bottom: -20, left: 25 }} />
                      <Line
                        connectNulls
                        name='Actual Value'
                        dataKey='actualEarningResult'
                        stroke='#82ca9d'
                        strokeWidth={3}
                        dot={<CustomizedDot />}
                      />
                      <Scatter
                        name='Assumption'
                        dataKey='estimatedEarning'
                        fill='#3751FF'
                        shape={<CustomizedScatterRoundShape />}
                      />
                      <ZAxis range={[400, 400]} />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className='col-lg-4'>
                <div className='d-flex align-items-center mb-4'>
                  <h5 className='me-auto'>
                    <strong>Dividends & Splits</strong>
                  </h5>
                  <div className='top_button_panel top_button_panel_light'>
                    <Link
                      to={InvexRoutes.Divident.path.replace(':symbol', symbol)}
                    >
                      View More <img src={ArrowRight} />
                    </Link>
                  </div>
                </div>

                {dividendChartLoading && <InvexLoader height='200px' />}

                {!dividendChartLoading && (
                  <ResponsiveContainer width='100%' aspect={1} maxHeight={250}>
                    <BarChart data={dividendChart} barSize={15} barGap={15}>
                      <XAxis
                        dataKey='date'
                        tickFormatter={(date) => {
                          return convertDateFormat(date)
                        }}
                        axisLine={false}
                        // tick={{ fill: '#212121', fontSize: '10px' }}
                        interval={0}
                        tick={<CustomizedXAxisTick />}
                      />
                      <YAxis
                        axisLine={false}
                        tick={{ fill: '#212121', fontSize: '10px' }}
                      />
                      <Tooltip />

                      <Legend wrapperStyle={{ bottom: -20, left: 25 }} />

                      <Bar dataKey='dividend' fill='#3751FF' name='Dividend' />
                      {/* {volume === 'VOLUME_CALL_PUT' && (
                      <Bar dataKey='put' fill='#82ca9d' />
                    )} */}
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='top_competitors'>
                  <div className='mb-5'>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                      <h5 className='me-auto font-bd'>
                        Alternative Ways (ETF) to Invest in{' '}
                        {symbol.toUpperCase()}
                      </h5>
                    </div>
                    {etfData && Array.isArray(etfData) && etfData.length > 0 && (
                      <div className='table-responsive'>
                        <table className='table table-bordered table-striped m-0 most_tables normal_table'>
                          <thead>
                            <tr>
                              <th scope='col'>ETF Symbol</th>
                              <th scope='col'>Shares No.</th>
                              <th scope='col'>Weight Percentage</th>
                              <th scope='col'>Market Value</th>
                            </tr>
                          </thead>
                          <tbody className='border-top-0'>
                            {etfData &&
                              etfData.map((etf, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <Link
                                        to={InvexRoutes.Symbol.path.replace(
                                          ':symbol',
                                          etf?.etfSymbol
                                        )}
                                      >
                                        {etf?.etfSymbol}
                                      </Link>
                                    </td>
                                    <td>{etf?.sharesNumber}</td>
                                    <td>
                                      {etf?.weightPercentage
                                        ? `${etf?.weightPercentage}%`
                                        : '-'}
                                    </td>
                                    <td>
                                      {etf?.marketValue
                                        ? etf?.marketValue.toFixed(2)
                                        : '-'}
                                    </td>
                                  </tr>
                                )
                              })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {(!etfData ||
                      (Array.isArray(etfData) && etfData.length === 0)) && (
                      <div className='d-flex justify-content-center align-items-center'>
                        <h6>No Data Available</h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                {etfData && (
                  <div className>
                    <ResponsiveContainer width='100%' height={500}>
                      <PieChart width={100} height={500}>
                        <Pie
                          activeIndex={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                          activeShape={renderActiveShape}
                          data={etfData}
                          innerRadius={80}
                          outerRadius={130}
                          dataKey='weightPercentage'
                        >
                          {etfData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={PIE_CHART_COLORS[index]}
                            />
                          ))}
                        </Pie>
                        <Legend
                          height={'auto'}
                          iconType='circle'
                          layout='vertical'
                          verticalAlign='middle'
                          align='right'
                          iconSize={20}
                          padding={5}
                          formatter={renderColorfulLegendText}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='col-lg-12'>
            <div className='top_competitors'>
              <div className='mb-4'>
                <div className='d-flex align-items-center justify-content-between'>
                  <h5 className='m-0 mb-3'>
                    <strong>Top Competitors</strong>
                  </h5>
                </div>
                <div className='table-responsive'>
                  {topCompetitors && (
                    <table className='table table-bordered table-striped m-0 most_tables normal_table'>
                      <thead>
                        <tr>
                          {TOP_COMPETITOR_COLUMNS &&
                            TOP_COMPETITOR_COLUMNS.map((heading, index) => {
                              return (
                                <th key={index} scope='col'>
                                  {heading}
                                </th>
                              )
                            })}
                        </tr>
                      </thead>
                      <tbody className='border-top-0'>
                        {topCompetitors.map((row, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <a href='javascript:void(0);'>
                                  {replaceEmpty(row?.symbol)}
                                </a>
                              </td>
                              <td>
                                {row?.price ? row?.price.toFixed(2) : '-'}
                              </td>
                              <td>
                                {row?.marketCap
                                  ? abbreviateNumber(row?.marketCap)
                                  : '-'}
                              </td>
                              <td>
                                {row?.beta
                                  ? parseFloat(row?.beta).toFixed(2)
                                  : '-'}
                              </td>
                              <td>
                                {row?.pe ? parseFloat(row?.pe).toFixed(2) : '-'}
                              </td>
                              <td>{replaceEmpty(row?.eps)}</td>
                              <td>
                                {row?.stockPriceChange &&
                                row?.stockPriceChange?.ytd
                                  ? row?.stockPriceChange?.ytd.toFixed(2)
                                  : '-'}
                              </td>
                              <td>
                                {row?.stockPriceChange &&
                                row?.stockPriceChange['1Y']
                                  ? row?.stockPriceChange['1Y'].toFixed(2)
                                  : '-'}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}

                  {(!topCompetitors ||
                    (Array.isArray(topCompetitors) &&
                      topCompetitors.length === 0)) && (
                    <div className='d-flex justify-content-center align-items-center'>
                      <h6>No Data Available</h6>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <SynopsisNews />
        </div>
      )}
    </>
  )
}

export default Synopsis;
