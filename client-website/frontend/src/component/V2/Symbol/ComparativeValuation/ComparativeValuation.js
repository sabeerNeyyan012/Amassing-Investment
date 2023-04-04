import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TYPE, TYPE_C } from '../FinancialStatisticsNew/Data/Constants'
import {
  CAPITAL_STRUCTURE_COLUMNS,
  PRICING_COLUMNS,
  EFFICIENCY_RATIO_COLUMNS,
  RETURN_COLUMNS,
  MARGIN_COLUMNS,
  LEVERAGE_RATIO_COLUMNS,
  LIQUIDITY_RATIO_COLUMNS,
  EARNING_DIVIDEND_COLUMNS,
  CASH_FLOW_RATIO_COLUMNS,
} from './Constants'
import {
  getCompanyProfile,
  getComparativeValuation,
  getComparativeValuationByIndustry,
} from '../../../api/Symbol'
import ComparativeValuationGenerator from './ComparativeValuationGenerator/ComparativeValuationGenerator'
import { getSectorTableData } from '../../../api/V2/sectorApi'

const ComparativeValuation = () => {
  const { symbol, subId } = useParams()
  const navigate = useNavigate();
  const checkActiveTab = Object.keys(TYPE_C).filter((data) => TYPE_C[data].value === subId)
  const [activeTab, setActiveTab] = useState(subId === undefined ? TYPE_C.capitalStructure.value : TYPE_C[checkActiveTab]?.value)
  const [loading, setLoading] = useState(false)
  const [columnList, setColumnList] = useState(CAPITAL_STRUCTURE_COLUMNS)
  const [data, setData] = useState(null)
  const [industry, setIndustry] = useState(null)
  const [fullIndustryData, setFullIndustryData] = useState(null)
  const [sectorData, setSectorData] = useState(null)
  const [sectorLoading, setSectorLoading] = useState(false)
  const [country, setCountry] = useState("None")

  useEffect(() => {
    navigate(`COMPARATIVE_VALUATION/${TYPE_C.capitalStructure.value}`)
  },[])
  useEffect(() => {
    if (symbol) {
      getComparativeValuationData()
      getSectorData()
    }
  }, [symbol, country])

  useEffect(() => {
    getAndSetColumnList()
  }, [activeTab])

  const getComparativeValuationData = async () => {
    try {
      setLoading(true)
      const resp = await getCompanyProfile({ symbol: symbol })

      if (resp && resp.status == 200 && resp.data) {
        const tempInfo = resp.data[0]
        if (tempInfo?.industry) {
          setIndustry(tempInfo?.industry)
          const response = await getComparativeValuation({
            industry: tempInfo?.industry,
            symbol: symbol,
            country: country
          })
          if (typeof response === 'string') {
            const tempJSON = JSON.parse(
              response.replaceAll('NaN', null).replaceAll('Infinity', null)
            )
            setData(tempJSON)
          } else {
            setData(response)
          }
        }
      }
    } catch {
      setIndustry(null)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const getSectorData = async () => {
    try {
      setSectorLoading(true)
      const resp = await getSectorTableData()
      if (typeof resp === 'string') {
        const tempJSON = JSON.parse(
          resp.replaceAll('NaN', null).replaceAll('Infinity', null)
        )

        setSectorData(tempJSON)
      } else {
        setSectorData(resp)
      }
    } catch {
      setSectorData(null)
    } finally {
      setSectorLoading(false)
    }
  }

  const getAndSetColumnList = () => {
    switch (activeTab) {
      case TYPE_C.capitalStructure.value:
        setColumnList(CAPITAL_STRUCTURE_COLUMNS)
        break
      case TYPE_C.pricing.value:
        setColumnList(PRICING_COLUMNS)
        break
      case TYPE_C.efficiencyRatios.value:
        setColumnList(EFFICIENCY_RATIO_COLUMNS)
        break
      case TYPE_C.returns.value:
        setColumnList(RETURN_COLUMNS)
        break
      case TYPE_C.margins.value:
        setColumnList(MARGIN_COLUMNS)
        break
      case TYPE_C.leverageRatios.value:
        setColumnList(LEVERAGE_RATIO_COLUMNS)
        break
      case TYPE_C.liquidityRatios.value:
        setColumnList(LIQUIDITY_RATIO_COLUMNS)
        break
      case TYPE_C.earningsDividends.value:
        setColumnList(EARNING_DIVIDEND_COLUMNS)
        break
      case TYPE_C.cashFlowRatios.value:
        setColumnList(CASH_FLOW_RATIO_COLUMNS)
        break
      default:
        setColumnList(CAPITAL_STRUCTURE_COLUMNS)
    }
  }

  const onFullIndustryClick = async () => {
    try {
      setLoading(true)
      const resp = await getComparativeValuationByIndustry({ industry: industry })
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
          <h4 className='me-auto mb-0'>Comparative Analysis</h4>

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
                  getComparativeValuationData()
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
          {Object.keys(TYPE_C).map((key, index) => {
            return (
              <button
                key={index}
                type='button'
                onClick={() => {setActiveTab(TYPE_C[key].value);navigate(`COMPARATIVE_VALUATION/${TYPE_C[key].value}`)}}
                className={`btn ${
                  activeTab === TYPE_C[key].value ? 'btn-info' : 'btn-light'
                }`}
              >
                {TYPE_C[key].label}
              </button>
            )
          })}
        </div>
      </div>

      <ComparativeValuationGenerator
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

export default ComparativeValuation
