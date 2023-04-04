import React, { useState, useEffect } from 'react';
import { getOptionVolumeGainers } from '../../../../api/OptionMarket';
import {
  getOneDayBeforeDate,
  getTextColorByValue,
  replaceEmpty,
  replaceEmptyWithPostFix,
} from '../../../../Common/CommonFunctions'
import InvexLoader from '../../../../Common/InvexLoader';

const OptionVolumeGainers = ({ values }) => {
  const [data, setData] = useState([]);
  const [orderFilter, setOrderFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(values);
  }, [values]);

  useEffect(() => {
    (async () => {
      if (orderFilter) {
        const currentDate = getOneDayBeforeDate();
        const obj = { date: currentDate, order_data: orderFilter };
        setIsLoading(true);
        const data = await getOptionVolumeGainers(obj);
        setIsLoading(false);
        setData(data);
      }
    })();
  }, [orderFilter]);

  return (
    <div className='mb-5'>
      <div className='d-flex align-items-center justify-content-between mb-4 mt-3'>
        <h6 className='me-auto mb-0'>
          <strong>Option Volume Gainers</strong>
        </h6>
        <select
          className='form-select w-25 me-3'
          aria-label='Default select example'
          onChange={(e) => setOrderFilter(e.target.value)}
        >
          <option value='Daily_change'>Daily</option>
          <option selected value={'Weekly_change'}>
            Weekly
          </option>
          <option value='Monthly_change'>Monthly</option>
          <option value='Quarterly_change'>Quarterly</option>
        </select>
      </div>

      {!isLoading && (
        <>
          <div className='table-responsive'>
            <table className='table table-bordered m-0 most_tables'>
              <thead className='table-light'>
                <tr>
                  <th scope='col'>Symbol</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>Volume</th>
                  <th
                    scope='col'
                    className={orderFilter === 'Daily_change' ? 'fw-bold' : ''}
                  >
                    1 Day Change
                  </th>
                  <th
                    scope='col'
                    className={
                      (orderFilter === 'Weekly_change') | (orderFilter === '')
                        ? 'fw-bold'
                        : ''
                    }
                  >
                    Weekly Change
                  </th>
                  <th
                    scope='col'
                    className={
                      orderFilter === 'Monthly_change' ? 'fw-bold' : ''
                    }
                  >
                    Monthly Change
                  </th>
                  <th
                    scope='col'
                    className={
                      orderFilter === 'Quarterly_change' ? 'fw-bold' : ''
                    }
                  >
                    Quarterly Change
                  </th>
                </tr>
              </thead>
              <tbody className='border-top-0'>
                {data &&
                  data.Symbol &&
                  Object.values(data.Symbol).map((row, index) => {
                    const last =
                      data.Last &&
                      data.Last[index] &&
                      data.Last[index].toFixed(2)
                    const volume = data.volume && data.volume[index]
                    const dailyChange =
                      data['Daily_change'] && data['Daily_change'][index]
                    const weeklyChange =
                      data['Weekly_change'] && data['Weekly_change'][index]
                    const monthlyChange =
                      data['Monthly_change'] && data['Monthly_change'][index]
                    const quarterlyChange =
                      data['Quarterly_change'] &&
                      data['Quarterly_change'][index]

                    return (
                      <tr key={index}>
                        <td>{data.Symbol && data.Symbol[index]}</td>
                        <td>
                          <span className={`${getTextColorByValue(volume)}`}>
                            {replaceEmpty(last)}
                          </span>
                        </td>
                        <td>
                          <span className={`${getTextColorByValue(volume)}`}>
                            {volume}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${getTextColorByValue(dailyChange)}`}
                          >
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
                            className={`${getTextColorByValue(
                              quarterlyChange
                            )}`}
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
      )}

      {isLoading && <InvexLoader height='443px' />}
    </div>
  )
};

export default OptionVolumeGainers;
