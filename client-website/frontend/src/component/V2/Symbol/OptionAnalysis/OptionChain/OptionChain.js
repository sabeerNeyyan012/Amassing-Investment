import React, { useState, useEffect, PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import {
  getOptionsChainData,
  getOptionsChainGraph,
} from '../../../../api/Option';
import { getOneDayBeforeDate } from '../../../../Common/CommonFunctions';
import ArrowDownImg from '../../../../Common/Images/arrow-down.svg';
import Dialog from '@mui/material/Dialog';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
} from 'recharts';
import { RemoveDot } from '../../../../Common/Chart/Recharts';
import moment from 'moment';
import InvexLoader from '../../../../Common/InvexLoader';

const OptionsChain = () => {
  const { symbol } = useParams()
  const [optionChainData, setOptionChainData] = useState(null)
  const [expDates, setExpDates] = useState([])
  const [expDateOption, setExpDateOption] = useState(null) // option list to load in select library
  const [selectedDatesOption, setSelectedDatesOption] = useState(null) // list of selected dates in form for {label: "", value: ""}
  const [selectedDates, setSelectedDates] = useState(null) // list of selected dates values
  const [columnList, setColumnList] = useState(null)
  const [columnOption, setColumnOption] = useState(null)
  const [selectedColumnOption, setSelectedColumnOption] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [isChartDialogVisible, setChartDialogVisible] = useState(false)
  const [chartData, setChartData] = useState([])
  const [isChartLoading, setChartLoading] = useState(false)
  const [isNoChartData, setNoChartData] = useState(false)
  const [chartLine, setChartLine] = useState('CALL_PUT')
  const [inputRange, setInputRange] = useState({
    low_strike: '',
    high_strike: ''
  })

  const currentDate = getOneDayBeforeDate()
  const excludeColumnList = ['Strike', 'Symbol', 'Change', 'Mid']

  const CHART_LINES = [
    { label: 'Call & Put', value: 'CALL_PUT' },
    { label: 'Call', value: 'CALL' },
    { label: 'Put', value: 'PUT' }
  ]

  // useEffect(() => {
  //   ;(async () => {

  //   })()
  // }, [])

  useEffect(() => {
    if (expDates) {
      const allDates = expDates.map((exp) => {
        const newObj = {
          label: convertDate(exp),
          value: exp
        }
        return newObj
      })

      setExpDateOption(allDates)
      setSelectedDatesOption([allDates[0]])
      setSelectedDates([expDates[0]])
    }
  }, [expDates])

  useEffect(() => {
    if (optionChainData) {
      const temp = Object.values(optionChainData).map((val) => val)
      if (temp && temp[0]) {
        const keys = Object.keys(temp[0]).filter((val) => {
          if (firstIsUppercase(val)) {
            if (excludeColumnList.includes(val)) {
              return false
            } else {
              return true
            }
          } else {
            return false
          }
        })
        setColumnList(keys)

        const tempList = keys.map((column) => {
          return { label: column, value: column }
        })

        setColumnOption(tempList)
        setSelectedColumnOption(tempList)
      }
    }
  }, [optionChainData])

  const convertDate = (date) => {
    return moment(date).format('MMM, DD YY')
  }

  const handleChange = (values) => {
    if (values && values.length > 0) {
      setSelectedDatesOption(values)
      const temp = values.map((row) => row.value)
      setSelectedDates([...temp])
    } else {
      setSelectedDates([...values])
      setSelectedDatesOption(values)
    }
  }

  const handleExpandDetails = (value) => {
    if (value && !selectedDates.includes(value)) {
      const temp = selectedDates
      temp.push(value)
      setSelectedDates([...temp])

      const tempOptions = selectedDatesOption
      tempOptions.push({
        label: convertDate(value),
        value: value
      })
      setSelectedDatesOption([...tempOptions])
    } else {
      const temp = selectedDates.filter((date) => date !== value)
      setSelectedDates([...temp])

      const tempOptions = selectedDatesOption.filter(
        (option) => option.value !== value
      )
      setSelectedDatesOption([...tempOptions])
    }
  }

  /** removed from design so commented
  const handleColumnListChange = (values) => {
    if (values) {
      setSelectedColumnOption(values);
      const temp = values.map((row) => row.value);
      setColumnList([...temp]);
    }
  };
   */

  function firstIsUppercase(str) {
    if (typeof str !== 'string' || str.length === 0) {
      return false
    }

    if (str[0].toUpperCase() === str[0]) {
      return true
    }

    return false
  }

  const showOptionSymbolChart = async (symbol) => {
    if (symbol) {
      setChartDialogVisible(true)
      setChartLoading(true)
      const param = {
        date: currentDate,
        option_symbol: symbol
      }
      const data = await getOptionsChainGraph(param)

      if (data && data?.date && data?.date.length > 0) {
        const tempChartData = data?.date.map((date, index) => {
          const tempObj = {}
          tempObj.mid = data?.mid && data?.mid[index]
          tempObj.close = data?.close && data?.close[index]
          tempObj.date = date
          return tempObj
        })
        setChartData(tempChartData)
        setNoChartData(false)
      } else {
        setNoChartData(true)
        setChartData([])
      }
      setChartLoading(false)
    }
  }

  class CustomizedXAxisTick extends PureComponent {
    render() {
      const { x, y, stroke, payload } = this.props

      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={60}
            y={2}
            textAnchor='end'
            fill='#212121'
            fontSize={'10px'}
            transform='rotate(90)'
          >
            {payload.value}
          </text>
        </g>
      )
    }
  }

  const calculateOptionChain = async () => {
    if (symbol) {
      setLoading(true)
      const param = {
        date: currentDate,
        symbol: symbol,
        ...inputRange
      }
      var chainData = await getOptionsChainData(param)
      setExpDates(chainData?.exp_date)
      setOptionChainData(chainData?.data)

      setLoading(false)
    }
  }

  return (
    <>
      <div className='row d-flex align-items-end'>
        <div className='col-lg-4 mb-4'>
          <span>Low</span>

          <input
            type='number'
            onChange={(e) =>
              setInputRange((prevValue) => {
                return { ...prevValue, low_strike: e.target.value }
              })
            }
            className='form-control w-50'
          />
        </div>
        <div className='col-lg-4 mb-4'>
          <span>High</span>

          <input
            type='number'
            onChange={(e) =>
              setInputRange((prevValue) => {
                return { ...prevValue, high_strike: e.target.value }
              })
            }
            className='form-control w-50'
          />
        </div>

        <div className='col-lg-4 mb-4'>
          <button
            className='btn btn-primary'
            onClick={() => calculateOptionChain()}
          >
            Calculate
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 mb-4'>
          {!Loading && expDateOption && optionChainData && (
            <div className='card p-3'>
              <form
                className='form-group'
                role='search'
                method='get'
                id='searchform'
                action
              >
                <Select
                  isMulti
                  defaultValue={selectedDatesOption}
                  value={selectedDatesOption}
                  name='expDate'
                  options={expDateOption}
                  classNamePrefix='select'
                  placeholder='Select Date'
                  width='100%'
                  onChange={handleChange}
                  hideSelectedOptions={false}
                />

                {/* removed from design so commented */}
                {/* <div className='mt-4'>
                  <Select
                    isMulti
                    defaultValue={selectedColumnOption}
                    name='columnList'
                    options={columnOption}
                    classNamePrefix='select'
                    placeholder='Select Columns'
                    width='100%'
                    isClearable={false}
                    onChange={handleColumnListChange}
                    hideSelectedOptions={false}
                  />
                </div> */}
              </form>
            </div>
          )}
        </div>
        {!Loading && optionChainData && (
          <div className='table-responsive mt-4 mb-5 option-chain-table'>
            <table className='table table-bordered m-0 cmplx-tbl'>
              {optionChainData &&
                Object.values(optionChainData).map((row, index) => {
                  return (
                    <>
                      <thead className='labels'>
                        <tr>
                          <th
                            colSpan={columnList.length - 1}
                            className='text-center'
                          >
                            <b className='text-success font-lbd'>Calls</b>
                            <span className='font-md font14 float-start'>
                              {/* <label htmlFor='accounting'>
                                Atribute selectior
                              </label> */}
                              <img
                                style={{ cursor: 'pointer' }}
                                src={ArrowDownImg}
                                className='img-fluid'
                                alt='Toggle'
                                onClick={() =>
                                  handleExpandDetails(expDates[index])
                                }
                              />
                            </span>
                          </th>
                          <th className='text-center border-left-right border-bottom-0'>
                            {expDates[index]
                              ? convertDate(expDates[index])
                              : '-'}
                          </th>
                          <th
                            colSpan={columnList.length}
                            className='text-center'
                          >
                            <b className='text-danger font-lbd'>Puts</b>
                            <span className='font-md font14 float-end'>
                              {/* <label htmlFor='accounting'>
                                Atribute selectior
                              </label> */}
                              <img
                                style={{ cursor: 'pointer' }}
                                src={ArrowDownImg}
                                className='img-fluid'
                                alt='Toggle'
                                onClick={() =>
                                  handleExpandDetails(expDates[index])
                                }
                              />
                            </span>
                          </th>
                        </tr>
                      </thead>

                      {/* {index === 0 && ( */}
                      {selectedDates.includes(expDates[index]) && (
                        <thead>
                          <tr>
                            {/* {columnList.includes('Symbol') && <th>Symbol</th>} */}
                            {columnList.includes('Last') && <th>Last</th>}
                            {/* {columnList.includes('Change') && <th>Change</th>} */}
                            {columnList.includes('Bid') && <th>Bid</th>}
                            {columnList.includes('Ask') && <th>Ask</th>}
                            {columnList.includes('Volume') && <th>Volume</th>}
                            {columnList.includes('OpenInterest') && (
                              <th>Open Int</th>
                            )}
                            {columnList.includes('IVMean') && <th>Imp Vol</th>}
                            {columnList.includes('Delta') && <th>Delta</th>}
                            {columnList.includes('Theta') && <th>Theta</th>}
                            {columnList.includes('Gamma') && <th>Gamma</th>}
                            {columnList.includes('Vega') && <th>Vega</th>}
                            <th className='text-center border-left-right border-top-bottom-0'>
                              Strike
                            </th>
                            {/* {columnList.includes('Symbol') && <th>Symbol</th>} */}
                            {columnList.includes('Last') && <th>Last</th>}
                            {/* {columnList.includes('Change') && <th>Change</th>} */}
                            {columnList.includes('Bid') && <th>Bid</th>}
                            {columnList.includes('Ask') && <th>Ask</th>}
                            {columnList.includes('Volume') && <th>Volume</th>}
                            {columnList.includes('OpenInterest') && (
                              <th>Open Int</th>
                            )}
                            {columnList.includes('IVMean') && <th>Imp Vol</th>}
                            {columnList.includes('Delta') && <th>Delta</th>}
                            {columnList.includes('Theta') && <th>Theta</th>}
                            {columnList.includes('Gamma') && <th>Gamma</th>}
                            {columnList.includes('Vega') && <th>Vega</th>}
                          </tr>
                        </thead>
                      )}
                      {/* )} */}

                      <tbody className='hide'>
                        {row &&
                          row?.Symbol &&
                          selectedDates.includes(expDates[index]) &&
                          Object.values(row?.Symbol).map((ele, i) => {
                            return (
                              <>
                                <tr
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    showOptionSymbolChart(row?.Symbol[i])
                                  }
                                >
                                  {/* {columnList.includes('Symbol') && (
                                    <td className='lup'>
                                      {row?.Symbol[i] ? row?.Symbol[i] : '-'}
                                    </td>
                                  )} */}
                                  {columnList.includes('Last') && (
                                    <td className='lup'>
                                      {row?.Last[i] ? row?.Last[i] : '-'}
                                    </td>
                                  )}
                                  {/* {columnList.includes('Change') && (
                                    <td className='lup'>
                                      {row?.Change[i] ? row?.Change[i] : '-'}
                                    </td>
                                  )} */}
                                  {columnList.includes('Bid') && (
                                    <td className='lup'>
                                      {row?.Bid[i] ? row?.Bid[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Ask') && (
                                    <td className='lup'>
                                      {row?.Ask[i] ? row?.Ask[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Volume') && (
                                    <td className='lup'>
                                      {row?.Volume[i] ? row?.Volume[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('OpenInterest') && (
                                    <td className='lup'>
                                      {row?.OpenInterest[i]
                                        ? row?.OpenInterest[i]
                                        : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('IVMean') && (
                                    <td className='lup'>
                                      {row?.IVMean[i]
                                        ? `${row?.IVMean[i]}%`
                                        : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Delta') && (
                                    <td className='lup'>
                                      {row?.Delta[i] ? row?.Delta[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Theta') && (
                                    <td className='lup'>
                                      {row?.Theta[i] ? row?.Theta[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Gamma') && (
                                    <td className='lup'>
                                      {row?.Gamma[i] ? row?.Gamma[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Vega') && (
                                    <td className='lup'>
                                      {row?.Vega[i] ? row?.Vega[i] : '-'}
                                    </td>
                                  )}
                                  <td className='text-center border-left-right border-top-bottom-0'>
                                    {row?.Strike[i] ? row?.Strike[i] : '-'}
                                  </td>
                                  {/* {columnList.includes('Symbol') && (
                                    <td>
                                      {row?.symbol[i] ? row?.symbol[i] : '-'}
                                    </td>
                                  )} */}
                                  {columnList.includes('Last') && (
                                    <td>{row?.last[i] ? row?.last[i] : '-'}</td>
                                  )}
                                  {/* {columnList.includes('Change') && (
                                    <td>
                                      {row?.change[i] ? row?.change[i] : '-'}
                                    </td>
                                  )} */}
                                  {columnList.includes('Bid') && (
                                    <td>{row?.bid[i] ? row?.bid[i] : '-'}</td>
                                  )}
                                  {columnList.includes('Ask') && (
                                    <td>{row?.ask[i] ? row?.ask[i] : '-'}</td>
                                  )}
                                  {columnList.includes('Volume') && (
                                    <td>
                                      {row?.volume[i] ? row?.volume[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('OpenInterest') && (
                                    <td>
                                      {row?.openInterest[i]
                                        ? row?.openInterest[i]
                                        : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('IVMean') && (
                                    <td>
                                      {row?.iVMean[i]
                                        ? `${row?.iVMean[i]}%`
                                        : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Delta') && (
                                    <td>
                                      {row?.delta[i] ? row?.delta[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Theta') && (
                                    <td>
                                      {row?.theta[i] ? row?.theta[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Gamma') && (
                                    <td>
                                      {row?.gamma[i] ? row?.gamma[i] : '-'}
                                    </td>
                                  )}
                                  {columnList.includes('Vega') && (
                                    <td>{row?.vega[i] ? row?.vega[i] : '-'}</td>
                                  )}
                                </tr>
                              </>
                            )
                          })}
                      </tbody>
                    </>
                  )
                })}
            </table>
          </div>
        )}
        <>{Loading && <InvexLoader height='450px' />}</>
        <Dialog
          open={isChartDialogVisible}
          onClose={() => setChartDialogVisible(false)}
          fullWidth={true}
          maxWidth='md'
          sx={{ m: 3 }}
        >
          {isChartLoading && <InvexLoader height='450px' />}
          {!isChartLoading && (
            <div className='dialogContent'>
              <div className='d-flex justify-content-between align-center'>
                <div>
                  <b>MID Chart</b>
                </div>
                <a
                  href='javascript:void(0))'
                  onClick={() => {
                    setChartDialogVisible(false)
                  }}
                >
                  <i class='bi bi-x-lg text-black'></i>
                </a>
              </div>

              {isNoChartData && (
                <div className='height400 d-flex align-items-center justify-content-center'>
                  <h2>No Data Available.</h2>
                </div>
              )}
              {!isNoChartData && (
                <ResponsiveContainer width='100%' aspect={1} maxHeight={400}>
                  <LineChart
                    data={chartData}
                    tick={false}
                    margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
                  >
                    <XAxis
                      dataKey='date'
                      axisLine={false}
                      domain={['auto', 'auto']}
                      tick={{
                        fill: '#212121',
                        fontSize: '10px'
                      }}
                      tick={<CustomizedXAxisTick />}
                      interval={0}
                      height={80}
                    />
                    <YAxis
                      axisLine={false}
                      tick={{
                        fill: '#212121',
                        fontSize: '10px'
                      }}
                    />
                    <Tooltip />

                    {(chartLine === 'CALL' || chartLine === 'CALL_PUT') && (
                      <Line
                        dataKey='mid'
                        dot={<RemoveDot />}
                        stroke='#7D8EFE'
                        name='Mid'
                      ></Line>
                    )}
                    {(chartLine === 'PUT' || chartLine === 'CALL_PUT') && (
                      <Line
                        dataKey='close'
                        dot={<RemoveDot />}
                        stroke='#FD8EFE'
                        name='Close'
                      ></Line>
                    )}
                    {/* <Line
                      stroke='#13A41B'
                      dataKey='price'
                      dot={<RemoveDot />}
                      name='Price'
                    ></Line> */}
                    <Legend wrapperStyle={{ bottom: -10, left: 25 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          )}
        </Dialog>
      </div>
    </>
  )
};

export default OptionsChain;
