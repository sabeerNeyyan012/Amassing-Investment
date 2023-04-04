import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getValuationData } from '../../../api/valuation';
import { getCompanyProfileQuote } from '../../../api/Symbol';
import ValuationFCFFM from './ValuationFCFFM';
import ValuationDividend from './ValuationDividend';
import InvexRoutes from '../../../../InvexRoutes';
import InvexLoader from '../../../Common/InvexLoader';
import SymbolNotPublished from './SymbolNotPublished'
import {
  getSectorRevenueData,
  getSectorTableData
} from '../../../api/V2/sectorApi'

const Valuation = () => {
  const { symbol } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [type, setType] = useState('DIVIDEND') //DIVIDEND, FCFFM
  const [Company, setCompany] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [companyQuote, setCompanyQuote] = useState(null)
  const [sectorRevenueData, setSectorRevenueData] = useState(null)
  const [sectorTableData, setSectorTableData] = useState({
    percentile25: '',
    percentile50: '',
    percentile75: '',
    percentile90: ''
  })
  const [notFount, setNotFound] = useState()

  useEffect(() => {
    ;(async () => {
      if (symbol) {
        setLoading(true)
        try {
          var data = await getValuationData(symbol)
          if (data && data.type) {
            setType(data.type)

            if (data.type === 'DIVIDEND') {
              if (
                data.data[0]['DivDisModelInputs'][0].is_published === false ||
                data.data[0]['DivDisModelInputs'][0].content_verified === 'No'
              ) {
                setNotFound(true)
                navigate(InvexRoutes.SymbolNotPublished.path)
              }
            }
            if (data.type === 'FCFFM') {
              if (
                data.data[0]['CompanyValuations'][0].is_published === false ||
                data.data[0]['CompanyValuations'][0].content_verified === 'No'
              ) {
                setNotFound(true)
                navigate(InvexRoutes.SymbolNotPublished.path)
              }
            }
          }
          if (data && data.data) {
            setData(data.data[0])
          }
        } catch (error) {
          setData(null)
        }

        try {
          const data = await getCompanyProfileQuote({ symbol: symbol })

          if (data && data.status == 200 && data.data) {
            setCompanyQuote(data.data)
            if (data.data.sector) {
              try {
                const resp = await getSectorRevenueData({
                  all_sectors: 0,
                  is_sector: data.data.sector,
                  is_industry: null
                })
                if (resp && resp[data.data.industry]) {
                  setSectorRevenueData(resp[data.data.industry])
                }
              } catch {
                setSectorRevenueData(null)
              }
              if (data.data.industry) {
                try {
                  const resp = await getSectorTableData()
                  let tempResp = resp
                  if (typeof resp === 'string') {
                    const tempJSON = JSON.parse(
                      resp.replaceAll('NaN', null).replaceAll('Infinity', null)
                    )
                    tempResp = tempJSON
                  }
                  const percentile25 =
                    tempResp?.industry['0.25']['operatingProfitMarginTTM'][
                      data.data.industry
                    ]
                  const percentile50 =
                    tempResp?.industry['0.5']['operatingProfitMarginTTM'][
                      data.data.industry
                    ]
                  const percentile75 =
                    tempResp?.industry['0.75']['operatingProfitMarginTTM'][
                      data.data.industry
                    ]
                  const percentile90 =
                    tempResp?.industry['0.9']['operatingProfitMarginTTM'][
                      data.data.industry
                    ]
                  setSectorTableData({
                    percentile25: percentile25,
                    percentile50: percentile50,
                    percentile75: percentile75,
                    percentile90: percentile90
                  })
                } catch {
                  setSectorTableData(null)
                }
              }

              setLoading(false)
            }
          }
        } catch (error) {
          setCompanyQuote(null)
        }
      }
    })()
  }, [symbol])

  return (
    <>
      {data &&
        type &&
        !Loading &&
        !notFount &&
        (type === 'FCFFM' ? (
          <ValuationFCFFM
            allData={data}
            companyQuote={companyQuote}
            revenueData={sectorRevenueData}
            operatingMarginOfIndustry={sectorTableData}
          />
        ) : (
          <ValuationDividend allData={data} companyQuote={companyQuote} />
        ))}

      {notFount ? <SymbolNotPublished /> : null}

      {Loading && !notFount && <InvexLoader height='600px' />}
    </>
  )
}

export default Valuation;
