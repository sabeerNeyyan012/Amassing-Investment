import React, { useState, useEffect } from 'react';
import {
  getStockMarketActives,
  getHeaderMarqueeDetails
} from '../../api/Symbol'

const MarqueeHeader = () => {
  const [marketActives, setMarketActives] = useState(null)
  const [index, setIndex] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [commodity, setCommodity] = useState(null)

  useEffect(() => {
    getMarketActives()
  }, [])

  const getMarketActives = async () => {
    try {
      const data = await getStockMarketActives()
      if (data && data.status === 200 && data.data) {
        setMarketActives(data.data)
      }
    } catch (error) {
      setMarketActives(null)
    }

    try {
      const data = await getHeaderMarqueeDetails()
      if (data && data.status === 200 && data.data) {
        const tempData = data.data
        setIndex(tempData?.index)
        setCurrency(tempData?.currency)
        setCommodity(tempData?.commodity)
      }
    } catch (error) {}
  }

  const getIndexName = (value) => {
    let indexName = ''
    switch (value) {
      case '^TNX':
        indexName = '10Y Bond'
        break
      case '^VIX':
        indexName = 'VIX'
        break
      case '^DJI':
        indexName = 'DOW'
        break
      case '^IXIC':
        indexName = 'Nasdaq'
        break
      case '^GSPC':
        indexName = 'S&P 500'
        break
      case '^FTSE':
        indexName = 'FTSE 100 (England)'
        break
      case '^RUT':
        indexName = 'Russell 2000'
        break
      case '^HSI':
        indexName = 'HSI (Hong Kong)'
        break
      case '^N225':
        indexName = 'Nikkie 225 (Japan)'
        break
      default:
        indexName = 'Nasdaq'
        break
    }
    return indexName
  }

  return (
    <>
      <div className='marquee-header marquee-sticky'>
        <div className='track'>
          <ul className='list-inline m-0'>
            {marketActives &&
              marketActives.map((stock, index) => {
                return (
                  <li className='list-unstyled list-inline-item' key={index}>
                    {stock?.symbol}
                    <span className='mx-2'>
                      ${stock?.price.toFixed(2)}
                    </span>{' '}
                    <span
                      className={`me-3 ${
                        stock?.changesPercentage > 0 ? 'up' : 'down'
                      }`}
                    >
                      {stock?.changesPercentage > 0
                        ? `+${stock?.changesPercentage.toFixed(2)}`
                        : stock?.changesPercentage.toFixed(2)}
                      %
                    </span>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
      <div className='marquee2 marquee2-sticky'>
        {/* <span>
          <b>Currency</b>
        </span> */}
        {index && currency && commodity && (
          <div className='track'>
            {/* <Marquee speed={5}> */}
            <ul className='list-inline m-0'>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              <li className='list-unstyled list-inline-item'>
                <b>{'     '}</b>
              </li>
              {index && currency && commodity && (
                <li className='list-unstyled list-inline-item'>
                  <b>Index</b>
                </li>
              )}

              <>
                {index &&
                  index.map((stock, index) => {
                    return (
                      <li
                        className='list-unstyled list-inline-item'
                        key={index}
                      >
                        {getIndexName(stock?.symbol)}
                        <span className='mx-2'>
                          ${stock?.price.toFixed(2)}
                        </span>{' '}
                        <span
                          className={`me-3 ${
                            stock?.changesPercentage > 0 ? 'up' : 'down'
                          }`}
                        >
                          {stock?.changesPercentage > 0
                            ? `+${stock?.changesPercentage.toFixed(2)}`
                            : stock?.changesPercentage.toFixed(2)}
                          %
                        </span>
                      </li>
                    )
                  })}
              </>
              {index && currency && commodity && (
                <li className='list-unstyled list-inline-item'>
                  <b>Currency</b>
                </li>
              )}
              {currency &&
                currency.map((stock, index) => {
                  return (
                    <li className='list-unstyled list-inline-item' key={index}>
                      {stock?.name}
                      <span className='mx-2'>
                        {stock?.price.toFixed(2)}
                      </span>{' '}
                      <span
                        className={`me-3 ${
                          stock?.changesPercentage > 0 ? 'up' : 'down'
                        }`}
                      >
                        {stock?.changesPercentage > 0
                          ? `+${stock?.changesPercentage.toFixed(2)}`
                          : stock?.changesPercentage.toFixed(2)}
                        %
                      </span>
                    </li>
                  )
                })}
              {index && currency && commodity && (
                <li className='list-unstyled list-inline-item'>
                  <b>Commodity</b>
                </li>
              )}
              {commodity &&
                commodity.map((stock, index) => {
                  return (
                    <li
                      className='list-unstyled list-inline-item'
                      key={stock?.name}
                    >
                      {stock?.name}
                      <span className='mx-2'>
                        ${stock?.price.toFixed(2)}
                      </span>{' '}
                      <span
                        className={`me-3 ${
                          stock?.changesPercentage > 0 ? 'up' : 'down'
                        }`}
                      >
                        {stock?.changesPercentage > 0
                          ? `+${stock?.changesPercentage.toFixed(2)}`
                          : stock?.changesPercentage.toFixed(2)}
                        %
                      </span>
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default MarqueeHeader
