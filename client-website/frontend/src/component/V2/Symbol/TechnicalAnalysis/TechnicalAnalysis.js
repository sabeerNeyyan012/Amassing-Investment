import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { getTechnicalAnalysisGraphData } from '../../../api/Symbol';
import { getCurrentDate } from '../../../Common/CommonFunctions';
import { DATE_FORMAT } from '../../../Common/Constants';
import { convertDateFormat } from '../../../Common/DateFunctions';
import InvexLoader from '../../../Common/InvexLoader';

const TechnicalAnalysis = () => {
  const { symbol } = useParams();

  const INIT_STATE = {
    date: getCurrentDate(DATE_FORMAT[5]),
    date_range: '1y',
    filter_days: '180',
    rolling: 20,
  };
  const LINE_CHART = 'LINE_CHART';
  const CANDLE_CHART = 'CANDLE_CHART';

  const CHART_TYPE = [
    { label: 'Line', value: LINE_CHART },
    { label: 'Candle', value: CANDLE_CHART },
  ];

  const [data, setData] = useState(null);
  const [params, setParams] = useState(INIT_STATE);
  const [candleChartData, setCandleChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [chartType, setChartType] = useState(CANDLE_CHART);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGraphData();
  }, [params, symbol]);

  const getGraphData = async () => {
    setLoading(true);
    try {
      const data = await getTechnicalAnalysisGraphData({
        ...params,
        ticker: symbol,
      });

      setData(data);

      const trace = {
        x: data.date,

        close: data.close,

        decreasing: { line: { color: 'red' } },

        high: data.high,

        increasing: { line: { color: 'green' } },

        line: { color: 'rgba(31,119,180,1)' },

        low: data.low,

        open: data.open,

        type: 'candlestick',
        xaxis: 'x',
        name: 'Candle',
      };

      const trace2 = {
        x: data.percentages,
        y: data.pred_high,
        xaxis: 'x2',
        type: 'scatter',
        line: { color: 'green' },
        name: 'High',
        hovertemplate: '(%{x}%, %{y})',
      }

      const trace3 = {
        x: data.percentages,
        y: data.pred_low,
        xaxis: 'x2',
        type: 'scatter',
        line: { color: 'red' },
        name: 'Low',
        hovertemplate: '(%{x}%, %{y})',
      }

      setCandleChartData([trace, trace2, trace3]);

      const lineTrace1 = {
        x: data.date,
        y: data.close,
        xaxis: 'x',
        type: 'scatter',
        line: { color: '#3751ff' },
        name: 'Line',
      };

      setLineChartData([lineTrace1, trace2, trace3]);
    } catch {
      setCandleChartData(null);
    } finally {
      setLoading(false);
    }
  };

  const FILTER_DAYS = [
    { label: '6 Months', value: 180 },
    { label: '1 Year', value: 365 },
    { label: '2 Years', value: 730 },
    { label: '5 Years', value: 1825 },
  ];

  const ROLLING = [
    { label: 'Weekly', value: 5 },
    { label: 'Biweekly', value: 10 },
    { label: 'Monthly', value: 20 },
    { label: '3 Monthly', value: 60 },
  ];

  const DATE_RANGE = [
    { label: '5D', value: '5d' },
    { label: '1M', value: '1m' },
    { label: '3M', value: '3m' },
    { label: '6M', value: '6m' },
    { label: '1Y', value: '1y' },
    { label: '2Y', value: '2y' },
    { label: '5Y', value: '5y' },
  ];

  const LAYOUT = {
    xaxis: { domain: [0, 0.7] },
    xaxis2: {
      domain: [0.7, 1],
      dtick: 5,
      title: {
        text: 'Probabilities',
      },
    },
  };

  const DESCRIPTION = `These prediction is solely based on historical data. It is not an offer, recommendation, or solicitation to enter into any transaction or to adopt any hedging, trading, or investment strategy, nor is it a prediction of likely future movement in prices, or a representation that such future movements will not exceed those shown in any illustration. Users should seek professional advice before investing in any of the stocks, financial instruments, or investment strategies mentioned, and they should be aware that assertions about future prospects may not be realized. Opinions, estimates, and projections are all subject to change.
It is highly recommended for the user to first refer the Valuation of the Company and then refer these projections because the Fundamental of the Company may change irrespective of Earnings, news, etc which changes the Future Volatility in comparison with the Historical Volatility.`;

  return (
    <>
      <div className='col-lg-12'>
        <div className='d-flex align-items-center justify-content-between mt-5'>
          <h4 className='me-auto mb-0'>Technical Analysis</h4>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-4 mt-5'>
          <div className='input-wrapper'>
            <p className='my-auto me-3'>Filter Days</p>
            <select
              className='form-select me-3'
              aria-label='Default select example'
              onChange={(e) => {
                setParams((prevValue) => {
                  return { ...prevValue, filter_days: e.target.value }
                })
              }}
            >
              {FILTER_DAYS.map((option, index) => {
                return (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className='col-lg-4 mt-5'>
          <div className='input-wrapper'>
            <p className='my-auto me-3'>Rolling</p>
            <select
              className='form-select me-3'
              aria-label='Default select example'
              onChange={(e) => {
                setParams((prevValue) => {
                  return { ...prevValue, rolling: e.target.value }
                })
              }}
            >
              {ROLLING.map((option, index) => {
                return (
                  <option
                    value={option.value}
                    key={index}
                    selected={params.rolling === option.value}
                  >
                    {option.label}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className='col-lg-4 mt-5'>
          <div className='input-wrapper'>
            <p className='my-auto me-3'>Start Date</p>
            <input
              type='date'
              className='form-control'
              placeholder='Date'
              value={params.date}
              onChange={(e) => {
                setParams((prevValue) => {
                  return {
                    ...prevValue,
                    date: convertDateFormat(e.target.value, DATE_FORMAT[5])
                  }
                })
              }}
            />
          </div>
        </div>
      </div>

      <div className='col-12 mt-5 d-flex justify-content-between'>
        <div className='top_button_panel top_button_panel_light mb-3 justify-content-end'>
          {CHART_TYPE.map((duration, index) => {
            return (
              <button
                key={index}
                type='button'
                className={`btn ${
                  duration.value === chartType ? 'btn-info' : 'btn-light'
                } `}
                onClick={() => setChartType(duration.value)}
              >
                {duration.label}
              </button>
            )
          })}
        </div>

        <div className='top_button_panel top_button_panel_light mb-3 justify-content-end'>
          {DATE_RANGE.map((duration, index) => {
            return (
              <button
                key={index}
                type='button'
                className={`btn ${
                  params.date_range === duration.value
                    ? 'btn-info'
                    : 'btn-light'
                } `}
                onClick={() =>
                  setParams((prevValue) => {
                    return { ...prevValue, date_range: duration.value }
                  })
                }
              >
                {duration.label}
              </button>
            )
          })}
        </div>
      </div>

      {loading && <InvexLoader height='450px' />}

      {!loading && data && (
        <div className='table-responsive mt-3'>
          <table className='table table-bordered table-striped m-0'>
            <thead>
              <tr>
                <th scope='col'>Probability</th>
                {data?.percentages.map((val, index) => {
                  return <th key={index}>{val}%</th>
                })}
              </tr>
            </thead>
            <tbody className='border-top-0'>
              <tr>
                <td className='fw-bold'>High</td>
                {data?.pred_high.map((val, index) => {
                  return <td key={index}>{val ? val.toFixed(2) : '-'}</td>
                })}
              </tr>
              <tr>
                <td className='fw-bold'>Low</td>
                {data?.pred_low.map((val, index) => {
                  return <td key={index}>{val ? val.toFixed(2) : '-'}</td>
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {!loading && chartType === CANDLE_CHART && (
        <div className='row mt-3'>
          <Plot
            data={candleChartData}
            layout={LAYOUT}
            candle={{ responsive: true }}
            displaylogo={false}
          />
        </div>
      )}

      {!loading && chartType === LINE_CHART && (
        <div className='row mt-3'>
          <Plot
            data={lineChartData}
            layout={LAYOUT}
            candle={{ responsive: true }}
            displaylogo={false}
          />
        </div>
      )}

      <p className='mb-5'>{DESCRIPTION}</p>
    </>
  )
};

export default TechnicalAnalysis;
