import React, { useState, useEffect } from 'react'
import { getMacroEconomicsEconomy } from '../../api/MacroEconomicsApi'
import { getHistoricalPriceChart } from '../../api/Symbol'
import {
  DUMMY_TEXT,
  MACRO_ECONOMICS_SECTION,
  CHART_FILTERS,
  CHART_TYPE_FILTERS,
  DEFINITIONS
} from './Constants'
import {
  convertCamelCaseToSpaceSeparatedString,
  getCurrentDate
} from '../../Common/CommonFunctions'
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar
} from 'recharts'
import { RemoveDot } from '../../Common/Chart/Recharts'
import { getBeforeDate } from '../../Common/DateFunctions'
import moment from 'moment'
import InvexLoader from '../../Common/InvexLoader'
import { useNavigate, useParams } from 'react-router-dom'

const MacroEconomics = () => {
  const navigate = useNavigate()
  const { tab, id } = useParams()
  const checkActiveTab = Object.entries(MACRO_ECONOMICS_SECTION).filter((data) => data[0] === tab)
  const subCheckActiveTab = tab === 'commodities' ? checkActiveTab[0]?.[1].filter((data) => data.value === id) : checkActiveTab[0]?.[1].filter((data) => data === id)
  const [activeTab, setActiveTab] = useState({
    tab:  tab === undefined ?  'economicData' : checkActiveTab[0][0],
    subTab: id === undefined ? 'GDP' : tab === 'commodities' ? subCheckActiveTab[0]?.value : subCheckActiveTab[0]
  })
  const [chartParam, setChartParam] = useState('5y')
  const [chartData, setChartData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [chartLoading, setChartLoading] = useState(false)
  const [chartType, setChartType] = useState('BAR_CHART')
  const [label, setLabel] = useState('')

  useEffect(() => {
    navigate(`${activeTab?.tab}/${activeTab?.subTab}`)
  },[])
  useEffect(() => {
    if (activeTab?.tab === 'commodities') {
      getCommodities()
    } else {
      getOtherData()
    }
  }, [chartParam, activeTab])

  const getCommodities = async () => {
    try {
      if (activeTab?.subTab) {
        setChartLoading(true)
        const data = await getHistoricalPriceChart({
          symbol: activeTab?.subTab,
          period: chartParam
        })

        if (
          data &&
          data?.status === 200 &&
          data?.data &&
          data?.data?.historical
        ) {
          const temp = data?.data?.historical
          temp.reverse()
          setChartData(temp)
        }
      }
    } catch {
    } finally {
      setChartLoading(false)
    }
  }

  const getOtherData = async () => {
    try {
      if (activeTab?.subTab) {
        setChartLoading(true)
        const resp = await getMacroEconomicsEconomy({
          symbol: activeTab?.subTab
        })

        if (resp && resp.data && resp.status === 200) {
          const data = resp.data

          let tempData = data
          if (chartParam !== 'max') {
            let currentDate = getCurrentDate()
            let startDate
            if (chartParam === '3m') {
              startDate = getBeforeDate(3, 'months')
            }
            if (chartParam === '6m') {
              startDate = getBeforeDate(6, 'months')
            }
            if (chartParam === '1y') {
              startDate = getBeforeDate(1, 'years')
            }
            if (chartParam === '5y') {
              startDate = getBeforeDate(5, 'years')
            }

            tempData = data.filter((row) => {
              return (
                moment(new Date(row.date)).isSameOrAfter(startDate) &&
                moment(new Date(row.date)).isSameOrBefore(moment(currentDate))
              )
            })
          }
          tempData.reverse()
          setChartData(tempData)
        }
      }
    } catch {
      setChartData(null)
    } finally {
      setChartLoading(false)
    }
  }

  const handleAccordianChange = (active, subActive, subActiveLabel) => {
    if (active !== activeTab?.tab || subActive !== activeTab?.subTab) {
      setActiveTab({
        tab: active,
        subTab: subActive
      })
      setLabel(subActiveLabel)
    } else {
      setActiveTab(null)
      setLabel(null)
    }
    navigate(`${active}/${subActive}`)
  }

  return (
    <>
      {!isLoading && (
        <div className='main'>
          <section className='sectors_sec sector_sec_margin_top'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className='leftsidefilter mb-5'>
                    <div className='new_scenr_btn'>
                      <h4 className='m-0'>Macro Economics</h4>
                    </div>

                    <div className='accordion' id='acc_sidefilter'>
                      {Object.entries(MACRO_ECONOMICS_SECTION).map(
                        (data, index) => {
                          // let currentActiveTab = data[0] === 'commodities' ? data[0]['value'] : data[0];
                          let subActiveTab =
                            data[0] === 'commodities'
                              ? data[1][0]['value']
                              : data[1][0]
                          let subActiveTabLabel =
                            data[0] === 'commodities' ? data[1][0]['label'] : ''
                          return (
                            <div className='in_acc_item' key={index}>
                              <h2 className='in_acc_header' id='acc_commu_serv'>
                                <button
                                  className={`accordion-button ${
                                    activeTab?.tab === data[0]
                                      ? 'active'
                                      : 'collapsed'
                                  }`}
                                  onClick={() => {
                                    handleAccordianChange(
                                      data[0],
                                      subActiveTab,
                                      subActiveTabLabel
                                    )
                                  }}
                                  // type='button'
                                >
                                  <span className='d-block w-100'>
                                    {convertCamelCaseToSpaceSeparatedString(
                                      data[0]
                                    )}
                                    <a className='float-end me-3 pe-3 text-secondary'>
                                      {data[1].length}
                                    </a>
                                  </span>
                                </button>
                              </h2>
                              <div
                                id='coll_commu_serv'
                                className={`accordion-collapse collapse ${
                                  activeTab?.tab === data[0] ? 'show' : ''
                                }`}
                                aria-labelledby='acc_commu_serv'
                                data-bs-parent='#acc_sidefilter'
                              >
                                <div className='in_acc_body'>
                                  <ul>
                                    {data[1].map((row, i) => {
                                      let currentSubTabValue =
                                        data[0] === 'commodities'
                                          ? row.value
                                          : row
                                      let currentSubTabLabel =
                                        data[0] === 'commodities'
                                          ? row.label
                                          : row
                                      return (
                                        <li
                                          key={i}
                                          className={`${
                                            activeTab?.tab === data[0] &&
                                            activeTab?.subTab ===
                                              currentSubTabValue
                                              ? 'active'
                                              : ''
                                          }`}
                                          onClick={() => {
                                            setActiveTab({
                                              tab: data[0],
                                              subTab: currentSubTabValue
                                            });navigate(`${data[0]}/${currentSubTabValue}`)
                                            if (data[0] === 'commodities') {
                                              setLabel(row.label)
                                            } else {
                                              setLabel('')
                                            }
                                          }}
                                        >
                                          <a href='javascript:void(0)'>
                                            {convertCamelCaseToSpaceSeparatedString(
                                              currentSubTabLabel
                                            )}
                                          </a>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>
                </div>
                <>
                  <div className='col-lg-8'>
                    {(label || activeTab?.subTab) && (
                      <div className='row'>
                        <div className='col-lg-12 mb-5'>
                          <div className='card companyviewblk compprofile_block mb-5'>
                            <div className='card-header'>
                              <div className='d-flex align-items-center justify-content-left bg-light p-2 border-bottom-0'>
                                <h6 className='m-0'>
                                  <strong>
                                    {label
                                      ? label
                                      : convertCamelCaseToSpaceSeparatedString(
                                          activeTab?.subTab
                                        )}
                                  </strong>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className='mt-5 mb-5'>
                            <div className='top_button_panel top_button_panel_light justify-content-between mt-4 mb-3'>
                              <div className='d-flex align-items-center'>
                                {CHART_FILTERS.map((duration, index) => {
                                  return (
                                    <button
                                      key={index}
                                      type='button'
                                      className={`btn ${
                                        duration.value === chartParam
                                          ? 'btn-info'
                                          : 'btn-light'
                                      }`}
                                      onClick={() =>
                                        setChartParam(duration.value)
                                      }
                                    >
                                      {duration.label}
                                    </button>
                                  )
                                })}
                              </div>

                              <div className='d-flex align-items-center'>
                                {CHART_TYPE_FILTERS.map((chart, index) => {
                                  return (
                                    <button
                                      key={index}
                                      type='button'
                                      className={`btn ${
                                        chart.value === chartType
                                          ? 'btn-info'
                                          : 'btn-light'
                                      }`}
                                      onClick={() => setChartType(chart.value)}
                                    >
                                      {chart.label}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            {chartData &&
                              !chartLoading &&
                              Array.isArray(chartData) &&
                              chartData.length > 0 && (
                                <>
                                  {chartType === 'BAR_CHART' && (
                                    <ResponsiveContainer
                                      width='100%'
                                      aspect={1}
                                      maxHeight={500}
                                    >
                                      <BarChart data={chartData} tick={false}>
                                        <XAxis
                                          dataKey='date'
                                          axisLine={false}
                                          domain={['auto', 'auto']}
                                          tick={{
                                            fill: '#212121',
                                            fontSize: '10px'
                                          }}
                                        />
                                        <YAxis
                                          axisLine={false}
                                          tick={{
                                            fill: '#212121',
                                            fontSize: '10px'
                                          }}
                                        />
                                        <Tooltip />

                                        <Bar
                                          fill='#7D8EFE'
                                          dataKey={`${
                                            activeTab?.tab === 'commodities'
                                              ? 'open'
                                              : 'value'
                                          }`}
                                          barSize={30}
                                          name='value'
                                        ></Bar>
                                      </BarChart>
                                    </ResponsiveContainer>
                                  )}

                                  {chartType === 'LINE_CHART' && (
                                    <ResponsiveContainer
                                      width='100%'
                                      aspect={1}
                                      maxHeight={500}
                                    >
                                      <LineChart data={chartData} tick={false}>
                                        <XAxis
                                          dataKey='date'
                                          axisLine={false}
                                          domain={['auto', 'auto']}
                                          tick={{
                                            fill: '#212121',
                                            fontSize: '10px'
                                          }}
                                        />
                                        <YAxis
                                          axisLine={false}
                                          tick={{
                                            fill: '#212121',
                                            fontSize: '10px'
                                          }}
                                        />
                                        <Tooltip />

                                        <Line
                                          stroke='#7D8EFE'
                                          dataKey={`${
                                            activeTab?.tab === 'commodities'
                                              ? 'open'
                                              : 'value'
                                          }`}
                                          name='value'
                                          dot={<RemoveDot />}
                                        ></Line>
                                      </LineChart>
                                    </ResponsiveContainer>
                                  )}
                                </>
                              )}

                            {chartLoading && <InvexLoader height='500px' />}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {(label || activeTab?.subTab) && (
                    <div className='col-lg-12'>
                      <div className='card companyviewblk compprofile_block mb-5'>
                        <div className='card-header'>
                          <div className='d-flex align-items-center justify-content-left bg-light p-2 border-bottom-0'>
                            <h6 className='m-0'>
                              <strong>
                                Notes On{' '}
                                {label
                                  ? label
                                  : convertCamelCaseToSpaceSeparatedString(
                                      activeTab?.subTab
                                    )}
                              </strong>
                            </h6>
                          </div>
                        </div>
                        <div className='card-body'>
                          <div className=''>
                            <div className=''>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DEFINITIONS[activeTab?.subTab]
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>
            </div>
          </section>
        </div>
      )}

      {isLoading && <InvexLoader height='600px' />}
    </>
  )
}

export default MacroEconomics
