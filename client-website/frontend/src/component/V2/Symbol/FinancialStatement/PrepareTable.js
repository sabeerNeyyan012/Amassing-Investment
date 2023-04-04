import React from 'react';
import abbreviateNumber from '../../../Common/NumberFormat';

const PrepareTable = ({ colData, data, onChange, headingName = '-' }) => {
  return (
    <div className='mb-5'>
      {data && (
        <div className='table-responsive sticky-table-container sticky-first-column-container'>
          <table className='table table-bordered table-striped m-0 most_tables normal_table first_fixed_width'>
            <thead>
              <tr>
                <th scope='col'>{headingName}</th>
                <th scope='col'>HV</th>
                {colData &&
                  colData.map((row, index) => {
                    return (
                      <th key={index} scope='col'>
                        {row?.column}
                      </th>
                    )
                  })}
              </tr>
            </thead>
            <tbody className='border-top-0'>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row?.heading}</td>
                    <td>
                      <input
                        key={row['col1']}
                        className='form-check-input'
                        type='checkbox'
                        defaultValue
                        id='flexCheckChecked'
                        onChange={(e) => onChange(e, row.key)}
                      />
                    </td>
                    {colData &&
                      colData.map((value, i) => {
                        return (
                          <td key={i}>{abbreviateNumber(row[`col${i}`])}</td>
                        )
                      })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
};

export default PrepareTable;
