import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomRange from '../../../Common/CustomRange/CustomRange';
import {
  CHART_TIME_DURATION,
  CHART_TYPE,
  DATE_FORMAT,
} from '../../../Common/Constants';
import { getHistoricalPriceChart } from '../../../api/Symbol';
import { convertDateFormat } from '../../../Common/DateFunctions';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Chart from 'react-apexcharts';
import InvexLoader from '../../../Common/InvexLoader';

const ChartComponent = () => {
  const { symbol } = useParams();
  const [chartPeriod, setChartPeriod] = useState('1d'); //1d,1w,1m,1y,5y,max
  const [companyEssentialsData, setCompanyEssentialsData] = useState(null);
  const [candleChartData, setCandleChartData] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [ticks, setTicks] = useState([]);
  const [chartType, setChartType] = useState('CANDLE_CHART');

  useEffect(() => {
    if (symbol) {
      getCompanyEssentialsChartData();
    }
  }, [chartPeriod]);

  const options = {
    chart: {
      type: 'candlestick',
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM yyyy',
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const getCompanyEssentialsChartData = async () => {
    setIsChartLoading(true);

    const chartResp = await getHistoricalPriceChart({
      symbol: symbol,
      period: chartPeriod,
    });

    if (chartResp && chartResp.status === 200) {
      if (chartPeriod === '1d') {
        const tempTime = [];
        const tempTicks = [];
        const chart = chartResp?.data;
        var tempArr = [];
        tempArr = chart?.map((el, i) => {
          el.close = el?.close ? el?.close.toFixed(2) : '';
          const convertedTime = convertDateFormat(el.date, DATE_FORMAT[3]);
          el.minute = convertedTime;
          if (convertedTime) {
            const hour = convertedTime.substring(0, 2);
            if (!tempTime.includes(hour)) {
              tempTime.push(hour);
              tempTicks.push(convertedTime);
            }
          }
          return el;
        });

        tempArr.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
        });

        const candleData = chart
          ?.filter((el) => {
            return el.open && el.close && el.high && el.low;
          })
          .map((el) => {
            const convertedDate = new Date(el.date);
            let newObj = {};
            newObj.x = convertedDate;
            newObj.y = [el.open, el.high, el.low, el.close];
            return newObj;
          });
        setCandleChartData(candleData);
        setTicks(tempTicks);
        setCompanyEssentialsData(tempArr);
      } else {
        const chart = chartResp?.data?.historical;
        const tempTicks = [];
        var tempArr = [];
        tempArr = chart?.map((el, i) => {
          el.close = el?.close ? el?.close.toFixed(2) : '';
          el.marketClose = el.close;
          const convertedDate = convertDateFormat(el.date, DATE_FORMAT[4]);
          el.minute = convertedDate;
          tempTicks.push(convertedDate);
          return el;
        });

        const candleData = chart
          ?.filter((el) => {
            return el.open && el.close && el.high && el.low;
          })
          .map((el) => {
            let newObj = {};
            newObj.x = el.date;
            newObj.y = [el.open, el.high, el.low, el.close];
            return newObj;
          });
        setCandleChartData(candleData);
        setTicks(tempTicks);
        setCompanyEssentialsData(tempArr.reverse());
      }
    }

    setIsChartLoading(false);
  };

  return (
    <div>
      <div className='col-lg-12 mb-4'>
        <div className='row mt-4 mb-4'>
          <div className='d-flex align-items-center justify-content-between'>
            <h3 className='d-inline-block m-0'>Price Chart</h3>
            <CustomRange />
          </div>
        </div>
        <div className='row mt-4 mb-4'>
          <div className='d-flex align-items-center justify-content-between '>
            <div className='mb-3'>
              <label htmlFor>Absolute Return</label>
              <span className='up up-light-bg p-1 ms-2'>+17.3%</span>
            </div>

            <div className='top_button_panel top_button_panel_light mb-3'>
              {CHART_TYPE.map((chart, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    className={`btn ${
                      chartType === chart.value ? 'btn-info' : 'btn-light'
                    } `}
                    onClick={() => setChartType(chart.value)}
                  >
                    {chart.label}
                  </button>
                )
              })}
            </div>

            <div className='top_button_panel top_button_panel_light mb-3'>
              {CHART_TIME_DURATION.map((duration, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    className={`btn ${
                      chartPeriod === duration.value ? 'btn-info' : 'btn-light'
                    } `}
                    onClick={() => setChartPeriod(duration.value)}
                  >
                    {duration.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className='row'>
          {isChartLoading && <InvexLoader height='450px' />}

          {!isChartLoading && chartType === 'LINE_CHART' && (
            <ResponsiveContainer width='100%' aspect={1} maxHeight={450}>
              <AreaChart
                data={companyEssentialsData}
                margin={{ top: 10, right: 30, left: -50, bottom: 0 }}
              >
                <defs>
                  <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey='minute'
                  axisLine={false}
                  tick={{ fill: '#212121', fontSize: '12px' }}
                  padding={{ top: 20 }}
                />
                <YAxis
                  axisLine={false}
                  tick={false}
                  domain={
                    chartPeriod === '5y' || chartPeriod === 'max'
                      ? [0, 'dataMax + 100']
                      : ['dataMin', 'dataMax']
                  }
                />
                <Tooltip />
                <Area
                  connectNulls
                  type='monotone'
                  dataKey='close'
                  stroke='#82ca9d'
                  fillOpacity={1}
                  fill='url(#colorPv)'
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {!isChartLoading && chartType === 'CANDLE_CHART' && (
            <>
              {candleChartData && candleChartData.length > 0 && (
                <Chart
                  options={options}
                  data={candleChartData}
                  series={[{ data: candleChartData }]}
                  type='candlestick'
                  height={350}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
};

export default ChartComponent;
