import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TYPE } from '../FinancialStatisticsNew/Data/Constants'
import {
  PRICING_COLUMNS,
} from './Constants'
import {
  getCompanyProfile,
  getRelativeValuation,
  getRelativeValuationByIndustry,
} from '../../../api/Symbol'
import RelativeValuationGenerator from './RelativeValuationGenerator/RelativeValuationGenerator'
import { getSectorTableData } from '../../../api/V2/sectorApi'

const RelativeValuation = () => {
  const [activeTab, setActiveTab] = useState(TYPE.pricing.value)
  const { symbol } = useParams()
  const [loading, setLoading] = useState(false)
  const [columnList, setColumnList] = useState(PRICING_COLUMNS)
  const [data, setData] = useState("")
  const [industry, setIndustry] = useState("")
  const [fullIndustryData, setFullIndustryData] = useState(null)
  const [sectorData, setSectorData] = useState("")
  const [country, setCountry] = useState("None")
  const [sectorLoading, setSectorLoading] = useState(false)

  useEffect(() => {
    if (symbol) {
      getRelativeValuationData()
      // getSectorData()
    }
  }, [symbol, country])

  useEffect(() => {
    getAndSetColumnList()
  }, [activeTab])

  const getRelativeValuationData = async () => {
    try {
      setLoading(true)
      const resp = await getCompanyProfile({ symbol: symbol })
      if (resp.status === 200) {
        const tempInfo = resp.data[0]
        if (tempInfo?.industry) {
          setIndustry(tempInfo?.industry)
          const response = await getRelativeValuation({
            industry: tempInfo?.industry,
            symbol: symbol,
            country: country
          })
          if(typeof(response) === "string"){
            const tempJSON = JSON.parse(
              response.replaceAll('NaN', null).replaceAll('Infinity', null)
            )
            setData(tempJSON)
            setSectorData(tempJSON?.in_05)
          }
          else {
            setData(response)
            setSectorData(response?.in_05)
          }
        }
      }
    }finally {
      setLoading(false)
    }
  }

  // const getSectorData = async () => {
  //   try {
  //     setSectorLoading(true)
  //     const resp = await getSectorTableData()
  //     if (typeof resp === 'string') {
  //       const tempJSON = JSON.parse(
  //         resp.replaceAll('NaN', null).replaceAll('Infinity', null)
  //       )
  //       setSectorData(tempJSON)
  //     } else {
  //       setSectorData(resp)
  //     }
  //   } catch {
  //     setSectorData(null)
  //   } finally {
  //     setSectorLoading(false)
  //   }
  // }

  const getAndSetColumnList = () => {
    // switch (activeTab) {
    //   case TYPE.capitalStructure.value:
    //     setColumnList(CAPITAL_STRUCTURE_COLUMNS)
    //     break
    //   case TYPE.pricing.value:
    //     setColumnList(PRICING_COLUMNS)
    //     break
    //   case TYPE.efficiencyRatios.value:
    //     setColumnList(EFFICIENCY_RATIO_COLUMNS)
    //     break
    //   case TYPE.returns.value:
    //     setColumnList(RETURN_COLUMNS)
    //     break
    //   case TYPE.margins.value:
    //     setColumnList(MARGIN_COLUMNS)
    //     break
    //   case TYPE.leverageRatios.value:
    //     setColumnList(LEVERAGE_RATIO_COLUMNS)
    //     break
    //   case TYPE.liquidityRatios.value:
    //     setColumnList(LIQUIDITY_RATIO_COLUMNS)
    //     break
    //   case TYPE.earningsDividends.value:
    //     setColumnList(EARNING_DIVIDEND_COLUMNS)
    //     break
    //   case TYPE.cashFlowRatios.value:
    //     setColumnList(CASH_FLOW_RATIO_COLUMNS)
    //     break
    //   default:
    //     setColumnList(CAPITAL_STRUCTURE_COLUMNS)
    // }
    setColumnList(PRICING_COLUMNS);
  }

  const onFullIndustryClick = async () => {
    try {
      setLoading(true)
      const resp = await getRelativeValuationByIndustry({ industry: industry })
      if (resp) {
        setFullIndustryData(resp)
      }
      setLoading(false)
    } catch {
      setFullIndustryData(null)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='col-lg-12'>
        <div className='d-flex align-items-center justify-content-between mt-5'>
          <h4 className='me-auto mb-0'>Relative Valuation</h4>

          {!loading && !sectorLoading && (
            <>
              <select
                value={country}  
                className="btn btn-outline-none bold "
                onChange={(e) => setCountry(e.target.value)}
                style={{ height: "35px", marginRight: 10, borderColor: "black" }}
              >
                <option value="None">Select Contry</option>
                <option value="Usa">USA</option>
                <option value="Nonusa">Non USA</option>
              </select>
              <a
                className='btn btn-primary me-3'
                onClick={() => {
                  onFullIndustryClick()
                }}
              >
                Full Industry Analysis
              </a>

              <a
                className='btn btn-light me-3'
                onClick={() => {
                  getRelativeValuationData()
                }}
              >
                Reset
              </a>
            </>
          )}
        </div>
      </div>
      <div className='col-lg-12'>
        <div className='top_button_panel v2 mt-4 mb-3'>
          {/* {Object.keys(TYPE).map((key, index) => {
            return (
              <button
                key={index}
                type='button'
                onClick={() => setActiveTab(TYPE[key].value)}
                className={`btn ${
                  activeTab === TYPE[key].value ? 'btn-info' : 'btn-light'
                }`}
              >
                {TYPE[key].label}
              </button>
            )
          })} */}
          {/* <button
                key={TYPE.pricing.label}
                type='button'
                onClick={() => setActiveTab(TYPE.pricing.value)}
                className={`btn ${
                  activeTab === TYPE.pricing.value ? 'btn-info' : 'btn-light'
                }`}
              >
                {TYPE.pricing.label}
              </button> */}
        </div>
      </div>

      <RelativeValuationGenerator
        data={data}
        columnList={columnList}
        industry={industry}
        loading={loading || sectorLoading}
        fullIndustryData={fullIndustryData}
        sectorData={sectorData}
      />
    </>
  )
}

export default RelativeValuation
