import React, { useState, useEffect } from 'react'
import MarketTable from '../MarketTable'
import { getCompanyQuote, getStockMarketActives } from '../../../api/Symbol'
import { NormalFormat } from '../../../Common/NumberFormat'
import InvexLoader from '../../../Common/InvexLoader'

const MostActiveStocks = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    getActiveStocks()
  }, [])

  const getActiveStocks = async () => {
    try {
      setIsLoading(true)
      const resp = await getStockMarketActives()
      if (resp && resp?.status === 200 && resp?.data) {
        Promise.all(
          resp?.data.map((row) => {
            return getCompanyQuote({ symbol: row?.symbol })
          })
        )
          .then((values) => {
            const allSymbol = values.map((value, index) => {
              const prevApiData = resp?.data
              let newObj = {}
              const tempResp = value?.data[0]
              newObj.ticker = tempResp?.symbol
              newObj.currentPrice = prevApiData[index].price
                ? prevApiData[index].price.toFixed(2)
                : '-'
              newObj.changePercentage = prevApiData[index]?.changesPercentage
                ? `${prevApiData[index]?.changesPercentage.toFixed(2)}`
                : '-'
              newObj.change = prevApiData[index]?.change
                ? prevApiData[index]?.change.toFixed(2)
                : '-'
              newObj.marketCap = tempResp?.marketCap
                ? NormalFormat(tempResp?.marketCap)
                : '-'
              newObj.yearHigh = tempResp?.yearHigh
              newObj.yearLow = tempResp?.yearLow
              return newObj
            })
            setData(allSymbol)
            setNoData(false)
          })
          .catch((error) => {
            setNoData(true)
            setData(null)
          })
      }
    } catch {
      setNoData(true)
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mb-5'>
      <h5 className='mb-4 mt-3'>
        <>Most Active Stocks</>
      </h5>

      {isLoading && <InvexLoader height='550px' />}
      {!isLoading && data && <MarketTable data={data} />}
      {!isLoading && noData && (
        <div className='d-flex justify-content-center align-items-center height400'>
          <h6>No Data Available</h6>
        </div>
      )}
    </div>
  )
}

export default MostActiveStocks
