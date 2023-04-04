import React, { useEffect, useState } from 'react'
import { getEarningsCalender } from '../../../api/V2/marketApi'
import { capitalizeFirstLetterOfEachWord } from '../../../Common/CommonFunctions'
import InvexLoader from '../../../Common/InvexLoader'

const EarningsCalender = () => {
  const [duration, setDuration] = useState('this_week')
  const [noData, setNoData] = useState(false)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (duration) {
      getEarnings()
    }
  }, [duration])

  const getEarnings = async () => {
    try {
      setIsLoading(true)
      const resp = await getEarningsCalender({ period: duration })
      if (resp && resp.data && resp.status === 200) {
        if (resp.data && resp.data.length > 0) {
          setNoData(false)
        } else {
          setNoData(true)
        }
        setData(resp.data.reverse())
      }
    } catch {
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const DURATION = [
    { label: 'This Week', value: 'this_week' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Next Month', value: 'next_month' },
  ]
  const COLUMNS = ['Symbol', 'Earnings Date', 'Time', 'Publish Date', 'Link']

  return (
    <div className='mb-5'>
      <div className='mt-2 mb-2 d-flex justify-content-between align-items-center'>
        <h5 className='me-auto mb-0'>Earnings Calender</h5>

        <div>
          <select
            className='form-select me-3'
            aria-label='Default select example'
            onChange={(e) => {
              setDuration(e.target.value)
            }}
          >
            {DURATION.map((type, index) => {
              return (
                <option
                  key={index}
                  value={type.value}
                  selected={type.value === duration}
                >
                  {type.label}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {isLoading && <InvexLoader height='550px' />}

      {!isLoading && !noData && (
        <div className='table-responsive'>
          <table className='table table-bordered m-0 most_tables table-striped normal_table mt-3'>
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

            {data && (
              <tbody className='border-top-0'>
                {data.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row?.symbol}</td>
                      <td>{row?.date}</td>
                      <td>
                        {row?.time}
                        {'  '}
                        {row?.when
                          ? capitalizeFirstLetterOfEachWord(row?.when)
                          : ''}
                      </td>
                      <td>{row?.publicationDate}</td>
                      <td>
                        <a href={row?.url} target='_blank'>
                          View{'  '}
                          <i class='bi bi-box-arrow-up-right'></i>
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            )}
          </table>
        </div>
      )}

      {!isLoading && noData && (
        <div className='d-flex justify-content-center align-items-center height400'>
          <h6>No Data Available</h6>
        </div>
      )}
    </div>
  )
}

export default EarningsCalender
