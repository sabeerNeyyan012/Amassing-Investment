import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Chart = ({
    title,
    loading,
    chartLables,
    dataSets,
    checkedValues,
    onChange,
    setCheckedValues,
    tableData }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: title
            },
        },
        scales: {
            y: {
                reverse: true
            }
        }
    }

    const data = {
        labels: chartLables,
        datasets: dataSets
    }

    const INDEX = {
        key: 0,
        heading: 3,
        dataStart: 6,
        median: 4,
        baseSymbol: 5
    }

    const data2 = ['relative_worst', 'relative_best', 'relative_base'];

    return (
        <>
            <div className="container-fluid">
                <div
                 style={{ justifyContent: 'center', textAlign: 'center', alignContent: 'center' }}
                className="row  card d-flex flex-row flex-wrap align-items-center w-100  p-4 mt-4 mb-2">
            <h5><b>Select to see comparision</b></h5>
                    <div
                        style={{ justifyContent: 'flex-start', textAlign: 'center', alignContent: 'center' }}
                        className='d-flex flex-row flex-wrap align-items-center w-100 col mb-2 ps-5 ms-5'
                    >
                        {tableData?.map((row, index) => {
                            return (
                                <>
                                    {Object.values(row)
                                        .slice(INDEX.heading, Object.values(row).length)
                                        ?.map((val, i) => {
                                            return (
                                                <>
                                                    {i === 0 && data2 && data2?.map((k) => {
                                                        return (
                                                            <>
                                                                {row?.key === k && (
                                                                    <>
                                                                        <div className='p-3'>
                                                                            <input
                                                                                key={`checkbox${val}`}
                                                                                className='form-check-input'
                                                                                type='checkbox'
                                                                                defaultValue
                                                                                id='flexCheckChecked'
                                                                                onChange={(e) => onChange(e, index)}
                                                                            />
                                                                        </div>
                                                                        <div style={{fontWeight:'600'}}>
                                                                            {val}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })}
                                </>
                            )
                        })}
                    </div>
                    <div className="col-12">
                        {data && dataSets && (
                            <Bar options={options} data={data} />
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Chart
