import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  getTextColorByValue,
  replaceEmpty,
  replaceEmptyWithPostFix,
} from '../../../../Common/CommonFunctions'

const MostActiveOptions = ({ values }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(values)
  }, [values])

  return (
    <div className='mb-5'>
      <h6 className='mb-4 mt-3'>
        <strong>Most Active Options</strong>
      </h6>

      <>
        <div className='table-responsive'>
          <table className='table table-bordered m-0 most_tables'>
            <thead className='table-light'>
              <tr>
                <th scope='col'>Symbol</th>
                <th scope='col'>Last</th>
                <th scope='col'>Volume</th>
                <th scope='col'>1 Day Change</th>
                <th scope='col'>Weekly Change</th>
                <th scope='col'>Monthly Change</th>
                <th scope='col'>Quarterly Change</th>
              </tr>
            </thead>
            <tbody className='border-top-0'>
              {data &&
                data.Symbol &&
                Object.values(data.Symbol).map((row, index) => {
                  const last =
                    data.Last && data.Last[index] && data.Last[index].toFixed(2)
                  const volume = data.volume && data.volume[index]
                  const dailyChange =
                    data['Daily_change'] && data['Daily_change'][index]
                  const weeklyChange =
                    data['Weekly_change'] && data['Weekly_change'][index]
                  const monthlyChange =
                    data['Monthly_change'] && data['Monthly_change'][index]
                  const quarterlyChange =
                    data['Quarterly_change'] && data['Quarterly_change'][index]

                  return (
                    <tr key={index}>
                      <td>{data.Symbol && data.Symbol[index]}</td>
                      <td>
                        <span className={`${getTextColorByValue(last)}`}>
                          {replaceEmpty(last)}
                        </span>
                      </td>
                      <td>
                        <span className={`${getTextColorByValue(volume)}`}>
                          {volume}
                        </span>
                      </td>
                      <td>
                        <span className={`${getTextColorByValue(dailyChange)}`}>
                          {replaceEmptyWithPostFix(dailyChange)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${getTextColorByValue(weeklyChange)}`}
                        >
                          {replaceEmptyWithPostFix(weeklyChange)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${getTextColorByValue(monthlyChange)}`}
                        >
                          {replaceEmptyWithPostFix(monthlyChange)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${getTextColorByValue(quarterlyChange)}`}
                        >
                          {replaceEmptyWithPostFix(quarterlyChange)}
                        </span>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </>
    </div>
  )
}

export default MostActiveOptions;
