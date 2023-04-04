import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import debounce from 'debounce'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InvexLoader from '../../../../Common/InvexLoader'
import CustomBarChart from '../../../../Graph/CustomBarChart'
import { getSearchResult } from '../../../../api/Symbol'
import { ListItemText, Typography } from '@mui/material'
import { getRelativeValuationBySymbol } from '../../../../api/Symbol'
import abbreviateNumber from '../../../../Common/NumberFormat'
import Chart from '../../../../Graph/Chart'

const RelativeValuationGenerator = ({
  data,
  columnList,
  loading,
  industry,
  fullIndustryData,
  sectorData
}) => {
  const { symbol } = useParams()
  const [tableData, setTableData] = useState()
  const [checkedValues, setCheckedValues] = useState([])
  const [checkedChildValues, setCheckedChildValues] = useState([])
  const [columns, setColumnList] = useState()
  const [chartData, setChartData] = useState(null)
  const [barChartData, setBarChartData] = useState(null)
  const [barChartData2, setBarChartData2] = useState(null)
  // const [fixedData, setFixedData] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [currentClickedColumn, setCurrentClickedColumn] = useState(null)
  const debounceSearch = useCallback(debounce(handleSearch, 500), [])
  const open = Boolean(anchorEl)
  const dataChildCheckBox = ['relative_worst', 'relative_best', 'relative_base'];
  const ITEM_HEIGHT = 48
  const INDEX = {
    key: 0,
    heading: 3,
    dataStart: 6,
    median: 4,
    baseSymbol: 5
  }
  useEffect(() => {
    if (data && columnList && industry && sectorData) {
      const topSymbols = data?.top_10.filter((ticker) => ticker !== symbol)
      setColumnList(topSymbols)
      const tempData = columnList.map((column, i) => {
        const newObj = {}
        newObj.key = column.key
        newObj.tooltip = column?.tooltip
        newObj.type = column?.type
        newObj.heading = column.label
          if(sectorData[column.key][industry] === '-'){
            newObj.industryMedian =
            sectorData &&
            sectorData[column.key] &&
            sectorData[column.key][industry]
          }else{
            newObj.industryMedian =
            sectorData &&
            sectorData[column.key] &&
            sectorData[column.key][industry]
            parseFloat(sectorData[column.key][industry])
          }
          // newObj.industryMedian =
          // sectorData &&
          // sectorData[column.key] &&
          // sectorData[column.key][industry] &&
          // parseFloat(sectorData[column.key][industry])
        let key = ''
        if (data[symbol]?.[column.key]) {
          key = Object.values(data[symbol][column.key])
        }
        newObj[`baseSymbol`] = key && key[0] && parseFloat(key[0].toFixed(2))
        if (topSymbols) {
          topSymbols.map((symbol, index) => {
            let key = ''
            if (data[symbol][column.key]) {
              key = Object.values(data[symbol][column.key])
            }
            newObj[`col${index + 1}`] =
              key && key[0] && parseFloat(key[0].toFixed(2))
          })
        }
        return newObj
      })
      setTableData(tempData)
      setCheckedValues([])
    }
  }, [data, columnList, industry, sectorData])

  useEffect(() => {
    if (
      checkedValues &&
      Array.isArray(checkedValues) &&
      checkedValues.length > 0
    ) {
      const chartDataSets = checkedValues.flatMap((index) => {
        const row = Object.values(tableData[index])
        const temp = row.slice(INDEX.dataStart, row.length)
        const temp2 = temp.slice()
        const medianData = [...temp2.fill(INDEX.median)]
        const baseData = [...temp2.fill(INDEX.baseSymbol)]
        const data25 = [
          ...temp2.fill(sectorDataPrepare('0.25', row[INDEX.key]))
        ]
        const data75 = [
          ...temp2.fill(sectorDataPrepare('0.75', row[INDEX.key]))
        ]
        const data90 = [...temp2.fill(sectorDataPrepare('0.9', row[INDEX.key]))]

        const medianLine = {
          type: 'line',
          label: `Median ${row[INDEX.heading]}`,
          data: medianData,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const line25 = {
          type: 'line',
          label: `25% ${row[INDEX.heading]}`,
          data: data25,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const line75 = {
          type: 'line',
          label: `75% ${row[INDEX.heading]}`,
          data: data75,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const line90 = {
          type: 'line',
          label: `90% ${row[INDEX.heading]}`,
          data: data90,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const baseSymbolLine = {
          type: 'line',
          label: `${symbol} ${row[INDEX.heading]}`,
          data: baseData,

          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const barChart = {
          type: 'bar',
          label: row[INDEX.heading],
          data: [...temp],
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        return [medianLine, baseSymbolLine, barChart, line25, line75, line90]
      })
      setBarChartData([...chartDataSets])
    } else {
      setBarChartData(null)
    }
  }, [checkedValues, tableData])

  useEffect(()=>{
    if (  checkedChildValues &&
      Array.isArray(checkedChildValues) &&
      checkedChildValues.length > 0
    ) {
      const chartDataSets = checkedChildValues.flatMap((index) => {
        const row = Object.values(tableData[index])
        const temp = row.slice(INDEX.dataStart, row.length)
        const temp2 = temp.slice()
        const medianData = [...temp2.fill(INDEX.median)]
        const baseData = [...temp2.fill(INDEX.baseSymbol)]
        const data25 = [
          ...temp2.fill(sectorDataPrepare('0.25', row[INDEX.key]))
        ]
        const data75 = [
          ...temp2.fill(sectorDataPrepare('0.75', row[INDEX.key]))
        ]
        const data90 = [...temp2.fill(sectorDataPrepare('0.9', row[INDEX.key]))]

        const medianLine = {
          type: 'line',
          label: `Median ${row[INDEX.heading]}`,
          data: medianData,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const line25 = {
          type: 'line',
          label: `25% ${row[INDEX.heading]}`,
          data: data25,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const line75 = {
          type: 'line',
          label: `75% ${row[INDEX.heading]}`,
          data: data75,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const line90 = {
          type: 'line',
          label: `90% ${row[INDEX.heading]}`,
          data: data90,
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const baseSymbolLine = {
          type: 'line',
          label: `${symbol} ${row[INDEX.heading]}`,
          data: baseData,

          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }
        const tempValues = [...temp];

        const finalData = tempValues?.map((items)=> items !== null ? items : null);

        const barChart = {
          type: 'bar',
          label: row[INDEX.heading],
          data: [...finalData],
          borderColor: generateColor(),
          backgroundColor: generateBackgroundColor()
        }

        return [medianLine, baseSymbolLine, barChart, line25, line75, line90]
      })
      setBarChartData2([...chartDataSets])
    } else {
      setBarChartData2(null)
    }
  },[checkedChildValues, tableData])

  // Industry Data
  useEffect(() => {
    if (fullIndustryData && fullIndustryData.symbol) {
      const allSymbols = Object.values(fullIndustryData.symbol).filter(
        (val) => val !== symbol
      )

      setColumnList([...allSymbols])

      setTableData((prevValue) => {
        const temp = prevValue.map((row, i) => {
          allSymbols.map((symbol, index) => {
            let key = ''
            if (fullIndustryData[row.key]) {
              key = Object.values(fullIndustryData[row.key])
            }
            row[`col${index + 1}`] =
              key && key[index] && parseFloat(key[index].toFixed(2))
          })
          return row
        })
        return [...temp]
      })
    }
  }, [fullIndustryData])
  // Industry Data

  useEffect(() => {
    if (loading) {
      setBarChartData(null)
      setCheckedValues([])
    }
  }, [loading])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSearchResult(null)
    setSearchInput('')
  }

  const onChange = (event, index) => {
    if (event.target.checked) {
      if (!checkedValues.includes(index)) {
        const tempArr = checkedValues
        tempArr.push(index)
        setCheckedValues([...tempArr])
      }
    } else {
      const tempArr = checkedValues
      const i = tempArr.indexOf(index)
      if (i > -1) {
        tempArr.splice(i, 1)
      }
      setCheckedValues([...tempArr])
    }
  }
  const onChangeChildCheckbox = (event, index) => {
    if (event.target.checked) {
      if (!checkedChildValues.includes(index)) {
        const tempArr = checkedChildValues
        tempArr.push(index)
        setCheckedChildValues([...tempArr])
      }
    } else {
      const tempArr = checkedChildValues
      const i = tempArr.indexOf(index)
      if (i > -1) {
        tempArr.splice(i, 1)
      }
      setCheckedChildValues([...tempArr])
    }
  }

  async function handleSearch(val) {
    try {
      if (val) {
        var data = await getSearchResult({ keyword: val })
        if (
          data &&
          data?.status === 200 &&
          data?.data &&
          data?.data.length > 0
        ) {
          const tempData = data?.data?.slice(0, 100)
          setSearchResult(tempData)
        }
      }
    } catch (err) {
      setSearchResult(null)
    }
  }

  const onSearchInput = (value) => {
    setSearchInput(value)
    debounceSearch(value)
  }

  const changeColumn = async (ticker) => {
    if (ticker && currentClickedColumn) {
      try {
        const resp = await getRelativeValuationBySymbol({ symbol: ticker })
        if (resp) {
          prepareTableWithNewSymbol(resp)
          setColumnList((prevValue) => {
            const temp = prevValue.map((val, index) =>
              index === currentClickedColumn - 1 ? ticker : val
            )
            return [...temp]
          })
        }
      } catch { }
    }
  }

  function generateBackgroundColor() {
    return (
      'rgba(' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ', 0.5)'
    )
  }

  function generateColor() {
    return (
      'rgb(' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ')'
    )
  }

  const prepareTableWithNewSymbol = (columnData) => {
    if (columnData && currentClickedColumn) {
      setTableData((prevValue) => {
        const temp = prevValue.map((row) => {
          let key = ''
          if (columnData[row.key]) {
            key = Object.values(columnData[row.key])
          }
          row[`col${currentClickedColumn}`] =
            key && key[0] && parseFloat(key[0].toFixed(2))
          return row
        })
        return [...temp]
      })
    }
  }

  const removeTableColumn = () => {
    if (currentClickedColumn !== null) {
      removeAndPrepareTableData()
      setColumnList((prevValue) => {
        const temp = prevValue.filter(
          (val, i) => i !== currentClickedColumn - 1
        )
        return [...temp]
      })
      handleClose()
    }
  }

  const sectorDataPrepare = (number, key) => {
    const resp =
      sectorData &&
      sectorData['industry'] &&
      sectorData['industry'][number] &&
      sectorData['industry'][number][key] &&
      sectorData['industry'][number][key][industry] &&
      parseFloat(sectorData['industry'][number][key][industry].toFixed(2))
    return resp
  }

  const removeAndPrepareTableData = () => {
    setTableData((prevValue) => {
      const preparedData = prevValue.map((element) => {
        const temp = Object.values(element)
        temp.splice(currentClickedColumn + INDEX.baseSymbol, 1)
        let newObj = {}
        temp.map((row, index) => {
          const keyName = prepareKeyNameFromIndex(index)
          newObj[keyName] = row
        })
        return newObj
      })
      return [...preparedData]
    })
  }

  const prepareKeyNameFromIndex = (index) => {
    if (index === 0) {
      return 'key'
    } else if (index === 1) {
      return 'tooltip'
    } else if (index === 2) {
      return 'heading'
    } else if (index === 3) {
      return 'industryMedian'
    } else if (index === 4) {
      return 'baseSymbol'
    } else {
      return `col${index - 4}`
    }
  }

  const generateRowColor = ({val,row}) => {
    let color;
    if(row?.key === 'relative_base'){
      if(val > 0){
       return color ='red'
      }else if(val < 0){
        return color = 'lightgreen'
      }else{
        return color = ''
      }
    }
    if(row?.key === 'relative_worst'){
      if(val > 0){
       return color ='red'
      }else if(val < 0){
        return color = 'lightgreen'
      }else{
        return color = ''
      }
    }
    if(row?.key === 'relative_best'){
      if(val > 0){
       return color ='red'
      }else if(val < 0){
        return color = 'lightgreen'
      }else{
        return color = ''
      }
    }
    return color;
  }


  // const generateRowData = ({row,val}) => {
  //   let value;
  //   if(row?.type === 'CURRENCY'){
  //     if(row?.industryMedian !== '-'){
  //       return value = abbreviateNumber(val) ;
  //     }else{
  //       return val
  //     }
  //   }
  //   if ( row?.type === 'PERCENTAGE' && row?.industryMedian !== '-'){
  //     return value =`${(val).toFixed(2)}%`;  
  //   }

  //   if(row?.type === 'PERCENTAGE' && row?.industryMedian === '-'){
  //     return value = '-'
  //   }

  //   if( row?.type === 'PERCENTAGE' && row?.key === 'relative_base'){
  //     return value =`${(val).toFixed(2)}%`;  
  //   }
  //   if(row?.type === 'PERCENTAGE' && row?.key === 'relative_worst'){
  //     return value =`${(val).toFixed(2)}%`;  
  //   }
  //   if(row?.type === 'PERCENTAGE' && row?.key === 'relative_best'){
  //     return value =`${(val).toFixed(2)}%`;  
  //   }

  //   return value;
  // }

  return (
    <>
      <div className='col-lg-12'>
        <div className='top_competitors'>
          <div className='mb-5'>
            {loading && <InvexLoader height='450px' />}
            {!loading && tableData && (
              <div className='table-responsive sticky-first-column-container'>
                <table className='table table-bordered table-striped m-0 most_tables relative_table normal_table first_fixed_width'>
                  <thead>
                    <tr>
                      <th scope='col'>-</th>
                      <th scope='col'>Visualization</th>
                      <th scope='col' className='font-weight-700'>
                        Industry Median
                      </th>
                      <th scope='col' className='font-weight-700'>
                        {symbol}
                      </th>
                      {columns &&
                        columns.map((col, index) => {
                          return (
                            <th key={index}>
                              {col}
                              <IconButton
                                aria-label='more'
                                id='long-button'
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup='true'
                                onClick={(e) => {
                                  handleClick(e)
                                  setCurrentClickedColumn(index + 1)
                                }}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id='long-menu'
                                MenuListProps={{
                                  'aria-labelledby': 'long-button'
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 7,
                                    width: '30ch',
                                    height: '100ch',
                                    boxShadow: `2px 2px 12px rgba(0, 0, 0, 0.12)`
                                  }
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center'
                                }}
                              >
                                <div
                                  style={{ padding: '10px' }}
                                  className='row'
                                >
                                  <div className='col-sm-8'>
                                    <input
                                      type='text'
                                      value={searchInput}
                                      onChange={(e) => {
                                        onSearchInput(e.target.value)
                                      }}
                                      name='symbolName'
                                      className='form-control search-input'
                                      placeholder='Search for symbol'
                                      id='example-search-input'
                                      autoComplete='off'
                                    />
                                  </div>
                                  <div className='col-sm-4'>
                                    <button
                                      className='btn btn-danger'
                                      onClick={() => {
                                        removeTableColumn()
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                                {searchResult &&
                                  searchResult.length > 0 &&
                                  searchResult.map((list, i) => {
                                    return (
                                      <MenuItem
                                        key={i}
                                        alignItems='flex-start'
                                        onClick={() => {
                                          changeColumn(list.symbol)
                                        }}
                                      >
                                        <ListItemText
                                          primary={
                                            list.symbol + ' - ' + list.name
                                          }
                                          secondary={
                                            <>
                                              <Typography
                                                sx={{ display: 'inline' }}
                                                component='span'
                                                variant='body2'
                                                color='text.primary'
                                              >
                                                {list.stockExchange}
                                              </Typography>
                                            </>
                                          }
                                        />
                                      </MenuItem>
                                    )
                                  })}
                              </Menu>
                            </th>
                          )
                        })}
                    </tr>
                  </thead>
                  <tbody className='border-top-0'>
                    {tableData?.map((row, index) => {
                      return (
                        <tr key={index}>
                          {Object.values(row)
                            .slice(INDEX.heading, Object.values(row).length)
                            .map((val, i) => {
                                  return (
                                    <>
                                      {i === 0 ? (
                                        <td key={i}>
                                          {val}
                                          {row?.tooltip && (
                                            <i
                                              className='bi bi-info-circle m-1'
                                              data-toggle='tooltip'
                                              title={row?.tooltip}
                                            ></i>
                                          )}
                                        </td>
                                      ) : (
                                        <td key={i} style={{backgroundColor: `${generateRowColor({row,val})}`}}>
                                          {val && val !== '-'
                                            ? row?.type === 'CURRENCY' && i !== 1
                                              ? abbreviateNumber(val)
                                              : row?.type === 'PERCENTAGE'
                                                ? `${(val)?.toFixed(2)}%`
                                                : val?.toFixed(2)
                                            : row?.type === 'PERCENTAGE' && i !== 1
                                              ? `0%`
                                              : i === 1 && val === '-' 
                                              ? '-' 
                                              : 0}
                                        </td>
                                      )}
                                       {i === 0 && (
                                            <td key={val}>
                                              <input
                                              key={`checkbox${val}`}
                                              className='form-check-input'
                                             type='checkbox'
                                             defaultValue
                                             id='flexCheckChecked'
                                             onChange={(e) => onChange(e, index)}
                                             disabled={
                                               checkedValues &&
                                               Array.isArray(checkedValues) &&
                                               checkedValues.length > 0 &&
                                               !checkedValues.includes(index)
                                              }
                                              />
                                              </td>
                                         )
                                       }
                                    </>
                                  )
                            })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {barChartData &&
              !loading &&
              Array.isArray(barChartData) &&
              barChartData.length > 0 && (
                <CustomBarChart
                  title='Invex Chart'
                  chartLables={columns}
                  dataSets={barChartData}
                />
              )}

{
  !loading && (
<>

    <Chart
    title='Invex Chart'
    chartLables={columns}
    dataSets={barChartData2}
    loading={loading}
    checkedValues = {checkedChildValues}
    onChange={onChangeChildCheckbox}
    setCheckedValues={setCheckedChildValues}
    tableData = {tableData}
    />
    </>
    )}
       
  
          </div>
          <b>**NOTE**</b><br />
          <quote>
            Relative valuation is quick and easy, perhaps. But since it's based on nothing more than casual observations of multiples, it can easily go awry.
            Full of traps and pitfalls, relative valuation needs to be used in conjunction with other tools like DCF for a more accurate gauge of how much a firm's shares are really worth.
            Multiples are based on the possibility that the market may presently be making a comparative analysis error, whether overvaluation or undervaluation. A relative value trap is a company
            that looks like a bargain compared to its peers, but it's not. Investors can get so caught up on multiples that they fail to spot fundamental problems with the balance sheet, historical valuations,
            and most importantly, the business plan.
            The key to keeping free from relative value traps is extra homework. The challenge for investors is to spot the difference between companies and figure out whether a company deserves
            a higher or lower multiple than its peers.
            Any fundamental differences between comparable firms that might affect the firms' multiples need to be thoroughly analyzed in relative valuation. All companies, even those in the same industry,
            contain unique variables—such as growth, risk, and cash flow patterns—that determine the multiple.
          </quote><br />
        </div>
      </div>
    </>
  )
}

export default RelativeValuationGenerator
