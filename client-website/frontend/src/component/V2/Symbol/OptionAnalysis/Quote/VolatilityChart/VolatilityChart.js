import React, { useState, useEffect, PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RemoveDot } from '../../../../../Common/Chart/Recharts';
import moment from 'moment';

const CustomizedAxisTick = (props) => {
  const { x, y, stroke, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor='end' fill='#212121' fontSize={'12px'}>
        {payload.value}
      </text>
    </g>
  );
};

const VolatilityChart = ({ data }) => {
  const [graphData, setGraphData] = useState([]);
  const [period, setPeriod] = useState('YEAR'); // possible values YEAR, 6MONTHS, 3MONTHS
  const [volume, setVolume] = useState('INDEX_CALL'); //possible values
  const [days, setDays] = useState(30); //possible values
  const [ticks, setTicks] = useState([]);
  const [dataMax, setDataMax] = useState(0);

  useEffect(() => {
    const todaysDate = new Date();
    let pastDate = '';
    if (period === 'YEAR') {
      pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    } else if (period === '6MONTHS') {
      pastDate = new Date(new Date().setMonth(new Date().getMonth() - 6));
    } else if (period === '3MONTHS') {
      pastDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
    }
    if (data && data.Graph_data) {
      const graph = [];
      const tempDate = [];
      const uniqueMonthDates = [];
      data.Graph_data.date.map((row, index) => {
        if (new Date(row) > pastDate && new Date(row) < todaysDate) {
          const month = new Date(row).getMonth();
          const year = new Date(row).getFullYear();
          const currentDate = `${month}${year}`;
          if (!tempDate.includes(currentDate)) {
            tempDate.push(currentDate);
            uniqueMonthDates.push(row);
          }
          const obj = {};
          if (volume === 'INDEX_CALL') {
            obj.percentage = getDaysData(volume, index);
          } else if (volume === 'INDEX_PUT') {
            obj.percentage = getDaysData(volume, index);
          } else if (volume === 'INDEX_MEAN') {
            obj.percentage = getDaysData(volume, index);
          } else if (volume === 'INDEX_CALL_PUT') {
            const tempData = getDaysData(volume, index);
            obj.percentage = tempData[0];
            obj.put = tempData[1];
          }
          obj.date = row;
          graph.push(obj);
        }
      });

      const max = Math.max(
        ...graph.map((row) => {
          return parseFloat(row.percentage);
        })
      );
      setDataMax(Math.round(max));
      setTicks(uniqueMonthDates);
      setGraphData(graph);
    }
  }, [data, period, volume, days]);

  const getDaysData = (volume, index) => {
    let daysData = [];
    switch (volume) {
      case 'INDEX_CALL':
        switch (days) {
          case 30:
            daysData = data.Graph_data.iv30call[index];
            break;
          case 60:
            daysData = data.Graph_data.iv60call[index];
            break;
          case 90:
            daysData = data.Graph_data.iv90call[index];
            break;
          case 120:
            daysData = data.Graph_data.iv120call[index];
            break;
          case 150:
            daysData = data.Graph_data.iv150call[index];
            break;
          case 180:
            daysData = data.Graph_data.iv180call[index];
            break;
          case 360:
            daysData = data.Graph_data.iv360call[index];
            break;
        }
        break;
      case 'INDEX_PUT':
        switch (days) {
          case 30:
            daysData = data.Graph_data.iv30put[index];
            break;
          case 60:
            daysData = data.Graph_data.iv60put[index];
            break;
          case 90:
            daysData = data.Graph_data.iv90put[index];
            break;
          case 120:
            daysData = data.Graph_data.iv120put[index];
            break;
          case 150:
            daysData = data.Graph_data.iv150put[index];
            break;
          case 180:
            daysData = data.Graph_data.iv180put[index];
            break;
          case 360:
            daysData = data.Graph_data.iv360put[index];
            break;
        }
        break;
      case 'INDEX_MEAN':
        switch (days) {
          case 30:
            daysData = data.Graph_data.iv30mean[index];
            break;
          case 60:
            daysData = data.Graph_data.iv60mean[index];
            break;
          case 90:
            daysData = data.Graph_data.iv90mean[index];
            break;
          case 120:
            daysData = data.Graph_data.iv120mean[index];
            break;
          case 150:
            daysData = data.Graph_data.iv150mean[index];
            break;
          case 180:
            daysData = data.Graph_data.iv180mean[index];
            break;
          case 360:
            daysData = data.Graph_data.iv360mean[index];
            break;
        }
        break;
      case 'INDEX_CALL_PUT':
        switch (days) {
          case 30:
            daysData = [
              data.Graph_data.iv30call[index],
              data.Graph_data.iv30put[index],
            ];
            break;
          case 60:
            daysData = [
              data.Graph_data.iv60call[index],
              data.Graph_data.iv60put[index],
            ];
            break;
          case 90:
            daysData = [
              data.Graph_data.iv90call[index],
              data.Graph_data.iv90put[index],
            ];
            break;
          case 120:
            daysData = [
              data.Graph_data.iv120call[index],
              data.Graph_data.iv120put[index],
            ];
            break;
          case 150:
            daysData = [
              data.Graph_data.iv150call[index],
              data.Graph_data.iv150put[index],
            ];
            break;
          case 180:
            daysData = [
              data.Graph_data.iv180call[index],
              data.Graph_data.iv180put[index],
            ];
            break;
          case 360:
            daysData = [
              data.Graph_data.iv360call[index],
              data.Graph_data.iv360put[index],
            ];
            break;
        }
        break;
    }
    if (volume === 'INDEX_CALL_PUT') {
      let temp = (daysData[0] * 100).toFixed(2);
      let temp2 = (daysData[1] * 100).toFixed(2);
      return [temp, temp2];
    } else {
      return (daysData * 100).toFixed(2);
    }
  };

  return (
    <div className='row mb-5'>
      <h6 className='mb-4'>
        <strong>AAPL: Daily 1 Year Volatility</strong>
      </h6>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='top_button_panel top_button_panel_light mb-3'>
          <button
            type='button'
            className={`btn ${days === 30 ? 'btn-info' : 'btn-light'}`}
            onClick={() => setDays(30)}
          >
            30
          </button>
          <button
            type='button'
            className={`btn ${days === 60 ? 'btn-info' : 'btn-light'}`}
            onClick={() => setDays(60)}
          >
            60
          </button>
          <button
            type='button'
            className={`btn ${days === 90 ? 'btn-info' : 'btn-light'}`}
            onClick={() => setDays(90)}
          >
            90
          </button>
          <button
            type='button'
            className={`btn ${days === 120 ? 'btn-info' : 'btn-light'}`}
            onClick={() => setDays(120)}
          >
            120
          </button>
          <button
            type='button'
            className={`btn ${days === 150 ? 'btn-info' : 'btn-light'}`}
            onClick={() => setDays(150)}
          >
            150
          </button>
          <button
            type='button'
            className={`btn ${days === 180 ? 'btn-info' : 'btn-light'}`}
            onClick={() => setDays(180)}
          >
            180
          </button>
          <button
            type='button'
            className={`btn ${days === 360 ? 'btn-info' : 'btn-light'}`}
            onClick={() => setDays(360)}
          >
            360
          </button>
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='top_button_panel top_button_panel_light mb-3'>
          <button
            type='button'
            className={`btn ${
              volume === 'INDEX_CALL' ? 'btn-info' : 'btn-light'
            }`}
            onClick={() => setVolume('INDEX_CALL')}
          >
            IV Index Call
          </button>
          <button
            type='button'
            className={`btn ${
              volume === 'INDEX_PUT' ? 'btn-info' : 'btn-light'
            }`}
            onClick={() => setVolume('INDEX_PUT')}
          >
            {' '}
            IV Index Put
          </button>
          <button
            type='button'
            className={`btn ${
              volume === 'INDEX_CALL_PUT' ? 'btn-info' : 'btn-light'
            }`}
            onClick={() => setVolume('INDEX_CALL_PUT')}
          >
            {' '}
            IV Index Call & Put
          </button>
          <button
            type='button'
            className={`btn ${
              volume === 'INDEX_MEAN' ? 'btn-info' : 'btn-light'
            }`}
            onClick={() => setVolume('INDEX_MEAN')}
          >
            {' '}
            IV Index Mean
          </button>
        </div>
        <div className='top_button_panel top_button_panel_light mb-3'>
          <button
            type='button'
            className={`btn ${period === '3MONTHS' ? 'btn-info' : 'btn-light'}`}
            onClick={() => setPeriod('3MONTHS')}
          >
            {' '}
            3 Months
          </button>
          <button
            type='button'
            className={`btn ${period === '6MONTHS' ? 'btn-info' : 'btn-light'}`}
            onClick={() => setPeriod('6MONTHS')}
          >
            {' '}
            6 Months
          </button>
          <button
            type='button'
            className={`btn ${period === 'YEAR' ? 'btn-info' : 'btn-light'}`}
            onClick={() => setPeriod('YEAR')}
          >
            {' '}
            1 Year
          </button>
        </div>
      </div>

      <ResponsiveContainer width='100%' aspect={1} maxHeight={400}>
        <LineChart data={graphData} tick={false}>
          <XAxis
            dataKey='date'
            tickFormatter={(date) => {
              return moment(date).format('MMM');
            }}
            axisLine={false}
            ticks={ticks}
            tick={{ fill: '#212121', fontSize: '12px' }}
          />
          <YAxis
            axisLine={false}
            tick={<CustomizedAxisTick />}
            type='number'
            domain={[0, dataMax]}
          />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='percentage'
            stroke='#3751FF'
            dot={<RemoveDot />}
            name='30-Day HV'
          />

          {volume === 'INDEX_CALL_PUT' && (
            <Line
              type='monotone'
              dataKey='put'
              stroke='#13A41B'
              dot={<RemoveDot />}
              name='IV Index Call'
            />
          )}
          <Legend
            wrapperStyle={{
              bottom: -20,
              left: 25,
              fontSize: '12px',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolatilityChart;
