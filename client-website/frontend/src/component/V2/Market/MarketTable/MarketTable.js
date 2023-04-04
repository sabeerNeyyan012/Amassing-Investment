import React, { useEffect } from 'react'
import { getTextColorByValue } from '../../../Common/CommonFunctions'

const MarketTable = ({ data }) => {
  const COLUMNS = [
    'Ticker',
    'Current Price',
    'Change Percentage',
    'Change',
    'Market Cap',
    '52W Low',
    '52W High',
  ]
  return (
    <>
      {data && (
        <div className=''>
          <div className='table-responsive sticky-table-container'>
            <table className='table table-bordered m-0 most_tables table-striped normal_table'>
              <thead className='table-light'>
                <tr>
                  {COLUMNS.map((col, index) => {
                    return (
                      <th scope='col' key={index}>
                        {col}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className='border-top-0'>
                {data &&
                  data.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>{row?.ticker}</td>
                        <td>{row?.currentPrice}</td>
                        <td>
                          <span
                            className={`${getTextColorByValue(
                              row?.changePercentage
                            )}`}
                          >
                            {row?.changePercentage
                              ? `${row?.changePercentage}%`
                              : '-'}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${getTextColorByValue(row?.change)}`}
                          >
                            {row?.change}
                          </span>
                        </td>
                        <td>{row?.marketCap}</td>
                        <td>{row?.yearLow ? row?.yearLow.toFixed(2) : '-'}</td>
                        <td>
                          {row?.yearHigh ? row?.yearHigh.toFixed(2) : '-'}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default MarketTable
